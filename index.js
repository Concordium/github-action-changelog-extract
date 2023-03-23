const {getInput, setOutput, error} = require('@actions/core');
const {EOL} = require('os');
const {readFileSync} = require('fs');
const {extractSectionLines} = require('./lib');

// Read inputs and file to which we write outputs.
const file = getInput('file')
const version = getInput('version')

// Read changelog file synchronously into a list of lines.
const lines = readFileSync(file, 'utf8').split(/\r?\n/);

let extractedLines = extractSectionLines(version, lines);

// Join extracted lines and trim surrounding whitespace.
// Trailing newline should be re-added automatically.
const sectionText = extractedLines.join(EOL).trim();

try {
    setOutput('changelog', sectionText);
} catch (e) {
    error(e)
}
