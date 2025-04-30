// print-args.js
const args = process.argv.slice(2);
console.log('Received arguments:', args);

const alphabet = 'abcdefghijklmnopqrstuvwxyz';

for (let i = 0; i < alphabet.length; i++) {
  console.log('INSIDE FOR', i);
  const letter = alphabet[i];
  if (args[0].includes(letter)) {
    console.log('letter is included', i, letter);
  }
}
