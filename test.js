const { MarkovMachine } = require('./markov');

const sampleText = 'the cat in the hat in the hat';
const mm = new MarkovMachine(sampleText);

let generatedText = mm.makeText();
console.log(generatedText);
