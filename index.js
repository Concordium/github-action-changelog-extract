const core = require('@actions/core');
const {parseTag} = require("./parse");

try {
    const tag = core.getInput('tag');
    const {projectName, projectVersion} = parseTag(tag);
    core.setOutput('project-name', projectName);
    core.setOutput('project-version', projectVersion);
} catch (error) {
    core.setFailed(error.message);
}
