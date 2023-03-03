const {parseTag, cleanTag} = require('./lib');

test(`can clean tag name`, () => {
    const {ref, tag} = cleanTag('project/version');
    expect(ref).toBe('refs/tags/project/version');
    expect(tag).toBe('project/version');
});

test(`can clean tag ref`, () => {
    const {ref, tag} = cleanTag('refs/tags/project/version');
    expect(ref).toBe('refs/tags/project/version');
    expect(tag).toBe('project/version');
});

test(`cannot clean ref with empty tag name`, () => {
    expect(() => cleanTag('refs/tags/')).toThrowError(`empty tag name`)
});

test(`'refs/tags' without trailing slash is treated as tag name`, () => {
    const {ref, tag} = cleanTag('refs/tags');
    expect(ref).toBe('refs/tags/refs/tags');
    expect(tag).toBe('refs/tags');
});

test(`can parse tag with project and version`, () => {
    const {projectName, projectVersion} = parseTag('project/version');
    expect(projectName).toBe('project');
    expect(projectVersion).toBe('version');
});

test(`cannot parse empty tag`, () => {
    expect(() => parseTag('')).toThrowError(`no '/' in tag`)
});

test(`cannot parse tag with name only`, () => {
    expect(() => parseTag('name')).toThrowError(`no '/' in tag`)
});

test(`cannot parse tag with empty name`, () => {
    expect(() => parseTag('/version')).toThrowError(`empty project name`)
});

test(`cannot parse tag with empty version`, () => {
    expect(() => parseTag('name/')).toThrowError(`empty project version`)
});

test(`'refs/tags' is not special`, () => {
    const {projectName, projectVersion} = parseTag('refs/tags');
    expect(projectName).toBe('refs');
    expect(projectVersion).toBe('tags');
});

test(`version can contain slash`, () => {
    const {projectName, projectVersion} = parseTag('name/slashy/version');
    expect(projectName).toBe('name');
    expect(projectVersion).toBe('slashy/version');
});
