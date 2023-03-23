# `concordium/github-action-changelog-extract`

GitHub Action for extracting a section of a changelog corresponding to a specific version.

The section is delimited by headers, which are lines that start with `## [<version>]`, where `<version>` is a version to match against.
The first line in the section is the header where the version matches the provided one.
The last line in the section is the one before the next section starts, if one exists.
Otherwise, the section extends to the end of the file.

## Inputs

- `file`: The changelog file.
- `version` The version used to identify the section to extract. 
  Remember to quote the value to ensure that it's parsed as a string.

## Outputs

- `section`: The extracted section. Surrounding whitespace is trimmed automatically.

The output is available in the template variable `${{steps.<step-id>.outputs.section}}`,
where `<step-id>` is the value of the `id` field on the step that `uses` this action.

## Example workflow

```yaml
name: Example workflow

...

jobs:
  my_job:
    runs-on: ubuntu-latest
    steps:
      ...
      - uses: concordium/github-action-changelog-extract@v1
        id: my_step
        with:
          file: CHANGELOG.md
          version: "1.0"
      - run: |
          echo "changelog section: ${{steps.my_step.outputs.section}}"
```
