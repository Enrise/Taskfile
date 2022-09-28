# Taskfile

A Taskfile adds a list of commonly used tasks in a quick overview in your CLI. Enable your users to quickly setup a
project and run common tasks via super simple commands.

![CLI Taskfile preview](./images/cli-preview.gif)

## Why

- Automate your most common tasks (updating, starting development, building, etc...)
- Have a uniform method to run tasks for all your pojects
- No project specific knowledge is required to get things done

# Create your own taskfile

This project gives you a `Taskfile` base, and gives you a collection of usefull tasks to help out on your project.

- [The Taskfile base](./taskfile-base.md)

We strongly recommend that your project uses a project section containing a `init` and a `update` task. Check out our
example:

- [Project section](./section/project.md)

## Usefull tasks

Check out the following sections for tasks that could be helpfull for your project's Taskfile:

- [Docker](./section/docker.md)
- [GitHub](./section/github.md)
- [GitLab](./section/gitlab.md)

# Credits

This Taskfile setup is based on [Adrian Cooney's Taskfile setup](https://github.com/adriancooney/Taskfile) and
[Enrise](https://enrise.com) their internal implementation of the Taskfile.

# Contribute

Feel free to add your own Taskfile tasks via a PR. The more usefull tasks, the easier we make the life of other
developers.
