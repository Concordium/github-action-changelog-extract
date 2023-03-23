// Import std lib modules.
const { EOL } = require('os');
const { readFileSync, writeFileSync } = require('fs');
const { extractSection } = require('./lib');

// Read inputs and file to which we write outputs.
const file = process.env.INPUT_FILE;
const version = process.env.INPUT_VERSION;
const outputFile = process.env.GITHUB_OUTPUT;

// Read changelog file synchronously into a list of lines.
const lines = readFileSync(file, 'utf8').split(/\r?\n/);

let extractedLines = extractSection(version, lines);

// Join extracted lines and trim surrounding whitespace. Trailing newline will be (re)added in 'toOutput'.
const res = extractedLines.join(EOL).trim();

// Write result as an output.
function toOutput(key, delimiter, value) {
    return `${key}<<${delimiter}${EOL}${value}${EOL}${delimiter}${EOL}`;
}
try {
    writeFileSync(outputFile, toOutput('changelog', 'EOT', res), { encoding: 'utf8' });
} catch (e) {
    // TODO Report error properly.
    console.error(`error: cannot write output file ${outputFile}:`, e);
}
