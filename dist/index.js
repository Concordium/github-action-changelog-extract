require('./sourcemap-register.js');/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ 909:
/***/ ((module) => {

const sectionHeaderPattern = /^## \[(.*)]/;

function extractSection(version, lines) {
    // Find line index of the section of interest.
    const sectionLineIdx = lines.findIndex((line) => {
        const v = sectionHeaderPattern.exec(line);
        return v && version.startsWith(v[1]);
    });

    // If a matching section was found, extract to end of file look for the line index of the next section in this slice.
    // Otherwise, leave the list of extracted lines empty.
    let extractedLines = [];
    if (sectionLineIdx >= 0) {
        extractedLines = lines.slice(sectionLineIdx);
        const nextSectionLineIdx = extractedLines.findIndex((line, idx) => idx > 0 && sectionHeaderPattern.test(line));
        // If a subsequent section was found, extract the lines up to and excluding the next section.
        if (nextSectionLineIdx >= 0) {
            extractedLines = extractedLines.slice(0, nextSectionLineIdx);
        }
    }
    return extractedLines;
}


module.exports = {extractSection};


/***/ }),

/***/ 147:
/***/ ((module) => {

"use strict";
module.exports = require("fs");

/***/ }),

/***/ 37:
/***/ ((module) => {

"use strict";
module.exports = require("os");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __nccwpck_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		var threw = true;
/******/ 		try {
/******/ 			__webpack_modules__[moduleId](module, module.exports, __nccwpck_require__);
/******/ 			threw = false;
/******/ 		} finally {
/******/ 			if(threw) delete __webpack_module_cache__[moduleId];
/******/ 		}
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat */
/******/ 	
/******/ 	if (typeof __nccwpck_require__ !== 'undefined') __nccwpck_require__.ab = __dirname + "/";
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
// Import std lib modules.
const { EOL } = __nccwpck_require__(37);
const { readFileSync, writeFileSync } = __nccwpck_require__(147);
const { extractSection } = __nccwpck_require__(909);

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

})();

module.exports = __webpack_exports__;
/******/ })()
;
//# sourceMappingURL=index.js.map