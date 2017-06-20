'use strict';

class BadGuy {
  constructor(name, generator, prime) {
    this.generator = generator;
    this.prime = prime;
    this.name = name;
    this.recipients = [];
    this.publicKeys = {};
    this.counter = 0;

    this.addMessageRecipient = function (recipient) {
      this.recipients.push(recipient);
    }

    this.sendMessage = function (message) {
      console.log(`${this.name} spied on a message ${message.id} from ${message.from} to ${message.to}: (${message.type}) ${message.content} \n`);

      this.recipients.forEach(function (r) {
        if (r.name === message.to) {
          r.receiveMessage(message);
        }
      });

      if (message.type === 'publicKey') {
        this.publicKeys[message.from] = message.content;

        let objKeys = Object.keys(this.publicKeys);
        if (objKeys.length === this.recipients.length) {
          console.log(`${this.name} now has all the public information:`);
          console.log(`  Shared keys: ${JSON.stringify(this.publicKeys)}`);
          console.log(`  Prime base: ${this.prime}`);
          console.log(`  Prime modulus (generator): ${this.generator}\n`)

          console.log(`${this.name} has seen all the messages exchanged by Bob and Alice, \nbut can only calculate the private keys by trying all possibilities for 'n' in: \n(${this.generator}**n) % ${this.prime} = ${this.publicKeys[objKeys[0]]} *AND* (${this.generator}**n) % ${this.prime} = ${this.publicKeys[objKeys[1]]}\n`)

          let secretKey1 = this.calculatePrivateKey(this.publicKeys[objKeys[0]], objKeys[0]);
          let secretKey2 = this.calculatePrivateKey(this.publicKeys[objKeys[1]], objKeys[1])

          console.log(`${this.name} can now calculate the secret: (${this.generator} ** (${secretKey1} * ${secretKey2})) % ${this.prime}`);
          console.log(`\n${this.name} figured out the secret, but had to try ${this.counter} times`);
        }
      }
    }

    this.calculatePrivateKey = function (publicKey, name) {
      let secretKey;
      console.log(` finding ${name}'s key:`);
      
      for (let i = 0; true; i++) {
        this.counter++;
        let testKey = this.generator ** i % this.prime;
        let match = testKey === publicKey;

        console.log(`   trying ${i}: ${match}`);
        
        if (match) {
          secretKey = i;
          console.log(`   Eve found a match after ${i + 1} tries`);
          console.log(`   ${name}'s private key is ${i}\n`)
          break;
        }
      }

      return secretKey;
    }
  }
}

module.exports = BadGuy;
