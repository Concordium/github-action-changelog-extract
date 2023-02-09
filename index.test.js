const {parseTag} = require('./parse');

test(`can parse tag with project and version`, () => {
    const {projectName, projectVersion} = parseTag('project/version');
    expect(projectName).toBe('project');
    expect(projectVersion).toBe('version');
});

test(`can parse tag ref with project with version`, () => {
    const {projectName, projectVersion} = parseTag('refs/tags/project/version');
    expect(projectName).toBe('project');
    expect(projectVersion).toBe('version');
});

test(`cannot parse empty tag`, () => {
    expect(() => parseTag('')).toThrowError(`no '/' in tag`)
});

test(`cannot parse empty tag ref`, () => {
    expect(() => parseTag('refs/tags/')).toThrowError(`no '/' in tag`)
});

test(`cannot parse tag with name only`, () => {
    expect(() => parseTag('name')).toThrowError(`no '/' in tag`)
});

test(`cannot parse ref with name only`, () => {
    expect(() => parseTag('refs/tags/name')).toThrowError(`no '/' in tag`)
});

test(`'refs/tags' without trailing slash is treated as tag name`, () => {
    const {projectName, projectVersion} = parseTag('refs/tags');
    expect(projectName).toBe('refs');
    expect(projectVersion).toBe('tags');
});

test(`version can contain slash`, () => {
    const {projectName, projectVersion} = parseTag('refs/tags/name/slashy/version');
    expect(projectName).toBe('name');
    expect(projectVersion).toBe('slashy/version');
});

test(`cannot parse tag with empty name`, () => {
    expect(() => parseTag('/version')).toThrowError(`empty project name`)
});

test(`cannot parse tag with empty version`, () => {
    expect(() => parseTag('name/')).toThrowError(`empty project version`)
});
