function cleanTag(tag) {
    const refsTags = 'refs/tags/';
    if (tag.startsWith(refsTags)) {
        tag = tag.substring(refsTags.length);
        if (!tag.length) {
            throw new Error('empty tag name');
        }
    }
    return {ref: refsTags+tag, tag};
}

function parseTag(tag) {
    const slashIdx = tag.indexOf('/');
    if (slashIdx === -1) {
        throw new Error(`no '/' in tag`);
    }
    const projectName = tag.substring(0, slashIdx);
    const projectVersion = tag.substring(slashIdx + 1);
    if (!projectName.length) {
        throw new Error(`empty project name`)
    }
    if (!projectVersion.length) {
        throw new Error(`empty project version`)
    }
    return {projectName, projectVersion};
}

module.exports = {cleanTag, parseTag};
