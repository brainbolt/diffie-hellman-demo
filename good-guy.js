'use strict';

const math = require('mathjs');

class GoodGuy {
  constructor(name, sender, generator, prime) {
    let _privateKey = math.randomInt(1, 13);
    let _sender = sender;
    let _friendsPublicKey;

    this.generator = generator;
    this.prime = prime;
    this.name = name;
    this.publicKey = (this.generator **_privateKey) % this.prime;

    this.receiveMessage = function (message) {
      let p;
      let secret;
      console.log(`${this.name} received message ${message.id}: ${JSON.stringify(message)} \n`);

      if (message.type === 'publicKey') {
        _friendsPublicKey = message.content;
        p = _friendsPublicKey ** _privateKey;
        secret = p % this.prime;

        console.log(`${this.name} sees that ${message.from}'s public key is ${_friendsPublicKey} \n`);
        console.log(`##########################################################`);
        console.log(`${this.name} calculates that the secret is ${secret} ((${_friendsPublicKey} ** ${_privateKey}) % ${this.prime} = ${secret})`);
        console.log(`##########################################################\n`);
      }
    }

    this.sendMessage = function (message) {
      message.id = new Date().valueOf();
      message.from = this.name;

      if (!message.type) {
        message.type = 'default';
      }

      console.log(`${this.name} sent message ${message.id} to ${message.to} \n`)

      _sender.sendMessage(message)
    }

    _sender.addMessageRecipient(this);    
  }
}

module.exports = GoodGuy;
