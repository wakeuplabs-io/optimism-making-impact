// print-args.js
const args = process.argv.slice(2);
const env = process.env;
console.log('Received arguments:', args);
console.log('env:', env);
