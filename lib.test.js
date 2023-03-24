const {extractSectionLines} = require('./lib');

test(`empty changelog`, () => {
    const contents = [];
    expect(extractSectionLines('1.1', contents)).toEqual([]);
});

test(`no sections`, () => {
    const contents = ['foo', 'bar'];
    expect(extractSectionLines('1.1', contents)).toEqual([]);
});

test(`no matching sections`, () => {
    const contents = ['## [1.0]', 'foo'];
    expect(extractSectionLines('1.1', contents)).toEqual([]);
});

test(`only matching section with one line contents`, () => {
    const contents = ['## [1.1]', 'foo'];
    expect(extractSectionLines('1.1', contents)).toEqual(['foo']);
});

test(`match section by version prefix`, () => {
    const contents = ['## [1.1]', 'foo'];
    expect(extractSectionLines('1.1-rc28', contents)).toEqual(['foo']);
});

test(`match section with header suffix`, () => {
    const contents = ['## [1.1] - suffix', 'foo'];
    expect(extractSectionLines('1.1', contents)).toEqual(['foo']);
});

test(`only matching section with multiline contents`, () => {
    const contents = ['## [1.1]', 'foo', '### Changes', 'bar'];
    expect(extractSectionLines('1.1', contents)).toEqual(['foo', '### Changes', 'bar']);
});

test(`matching section follows non-matching section`, () => {
    const contents = ['## [1.0]', 'foo', '## [1.1]', 'bar'];
    expect(extractSectionLines('1.1', contents)).toEqual(['bar']);
});

test(`matching section followed by non-matching section`, () => {
    const contents = ['## [1.1]', 'foo', '## [1.2]', 'bar'];
    expect(extractSectionLines('1.1', contents)).toEqual(['foo']);
});
