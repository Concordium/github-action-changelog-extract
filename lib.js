const sectionHeaderPattern = /^## \[(.*)]/;

function extractSectionLines(version, lines) {
    // Find line index of the section of interest.
    const sectionLineIdx = lines.findIndex((line) => {
        const v = sectionHeaderPattern.exec(line);
        return v && version.startsWith(v[1]);
    });

    // If a matching section was found, extract to end of file look for the line index of the next section in this slice.
    // Otherwise, leave the list of extracted lines empty.
    if (sectionLineIdx < 0) {
        return [];
    }

    const sectionLines = lines.slice(sectionLineIdx);
    const nextSectionLineIdx = sectionLines.findIndex((line, idx) => idx > 0 && sectionHeaderPattern.test(line));

    // If a subsequent section was found, extract the lines up to and excluding the next section.
    if (nextSectionLineIdx < 0) {
        return sectionLines;
    }
    return sectionLines.slice(0, nextSectionLineIdx);
}

module.exports = {extractSectionLines};
