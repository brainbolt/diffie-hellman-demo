'use strict';

const math = require('mathjs');

const BadGuy = require('./bad-guy');
const GoodGuy = require('./good-guy');

let generator = 5;
let prime = 23;

let eve = new BadGuy('Eve', generator, prime);
let bob = new GoodGuy('Bob', eve, generator, prime);
let alice = new GoodGuy('Alice', eve, generator, prime);

bob.sendMessage({
  to: alice.name, 
  content: 'Hi, Alice. I think someone is watching our conversation.'
});

alice.sendMessage({
  to: bob.name,
  content: "Ok, let's securely exchange a private key using the Diffie-Hellman method."
});

bob.sendMessage({
  to: alice.name,
  type: 'publicKey',
  content: bob.publicKey
});

alice.sendMessage({
  to: bob.name,
  type: 'publicKey',
  content: alice.publicKey
});


