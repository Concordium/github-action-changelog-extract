# `concordium/parse-tag`

The only input of the action is the string `tag` which is expected to match the format
`[refs/tags/]<project-name>/<project-version>`.

The action parses the tag into these components and outputs `<project-name>` and `<project-version>`
as fields of the same names.

It also outputs the fields `<tag-ref>` and `<tag-name>` which hold the tag with and without the `refs/tags/` prefix, respectively.

## Example workflow

The following example workflow illustrates how to run the action against the git ref `github.GITHUB_REF`
that the workflow is invoked with.
As this ref must be a tag, the workflow is invoked manually to allow the user to select the appropriate tag.

```yaml
name: Example workflow
on:
  workflow_dispatch: # workflow is invoked manually

jobs:
  my_job:
    runs-on: ubuntu-latest
    outputs:
      tag-ref: "${{steps.my_step.outputs.tag-ref}}"
      tag-name: "${{steps.my_step.outputs.tag-name}}"
      project-name: "${{steps.my_step.outputs.project-name}}"
      project-version: "${{steps.my_step.outputs.project-name}}"
    steps:
      - uses: actions/checkout@v3
      - uses: concordium/parse-tag@v1
        id: my_step
        with:
          tag: "${{github.GITHUB_REF}}"
      - run: |
          echo "tag-ref: ${{steps.my_step.outputs.tag-ref}}"
          echo "tag-name: ${{steps.my_step.outputs.tag-name}}"
          echo "project-name: ${{steps.my_step.outputs.project-name}}"
          echo "project-version: ${{steps.my_step.outputs.project-version}}"
  my_dependent_job:
    runs-on: ubuntu-latest
    needs: my_job
    steps:
      - run: |
          echo "tag-ref: ${{needs.my_job.outputs.tag-ref}}"
          echo "tag-name: ${{needs.my_job.outputs.tag-name}}"
          echo "project-name: ${{needs.my_job.outputs.project-name}}"
          echo "project-version: ${{needs.my_job.outputs.project-version}}"
```

The parsed tag components are now available in subsequent steps of the job `my_job` as the template variables

* `tag-name`: `${{steps.my_step.outputs.tag-name}}`
* `tag-ref`: `${{steps.my_step.outputs.tag-ref}}`
* `project-name`: `${{steps.my_step.outputs.project-name}}`
* `project-version`: `${{steps.my_step.outputs.project-version}}`

Since we declared the [`output`](https://docs.github.com/en/actions/using-jobs/defining-outputs-for-jobs) block in `my_job`,
the variables are also exposed to the dependent job `my_dependent_job`:

* `tag-name`: `${{needs.my_job.outputs.tag-name}}`
* `tag-ref`: `${{needs.my_job.outputs.tag-ref}}`
* `project-name`: `${{needs.my_job.outputs.project-name}}`
* `project-version`: `${{needs.my_job.outputs.project-version}}`

See the [Test](./.github/workflows/test.yml) workflow for a use of the example in "action".
