const core = require('@actions/core');
const {cleanTag, parseTag} = require("./lib");

try {
    const inputTag = core.getInput('tag');
    const {ref, tag} = cleanTag(inputTag);
    const {projectName, projectVersion} = parseTag(tag);
    core.setOutput('tag-name', tag);
    core.setOutput('tag-ref', ref)
    core.setOutput('project-name', projectName);
    core.setOutput('project-version', projectVersion);
} catch (error) {
    core.setFailed(`invalid tag: ${error.message}`);
}
