# Taskfile ([taskfile.sh](https://taskfile.sh))

A `./Taskfile` is a task runner in plain and easy [Bash](https://en.wikipedia.org/wiki/Bash_(Unix_shell)). It adds a list of
available tasks to your project.

Generate your own Taskfile at [taskfile.sh](https://taskfile.sh).

[![CLI Taskfile preview](public/cli-preview.gif)](https://taskfile.sh)

## Why

- Works on any OS (any bash terminal)
- A uniform way to run your projects
- Very easy to use
- Automate your most common tasks (updating, starting, building, etc...)
- Easy to understand and maintain
- Automatically generated list of available tasks

# How does it work?

Taskfiles are simple bash scripts, but an easy-to-read function format. There are some things that we need to explain
for our Taskfile setup. It all starts with a `Taskfile`. Download your `Taskfile` from
[taskfile.sh](https://taskfile.sh) and save it. Make sure the Taskfile is executable: `chmod +x ./Taskfile`. You can now
run `./Taskfile` in your terminal.

## Tasks

A task is defined by creating a function that starts with `task:`. This defines a task that can be triggered by running
the `./Taskfile`. Right next to the task, you should add a task definition with two hashes. This will let the
`task:help` function know that you're writing the task function definition. So an example task will look like the
following:

```shell
function task:example { ## Show some example text
    title "Example"
    echo "This is an example task."
}
```

In a task you can call other functions, and run all tooling you desire. Now running `./Taskfile example` will execute
the new task.

## Sections

To group multiple tasks, sections can be created in your Taskfile. A section is created by creating a comment line with
a double hashtag like so:

```shell
## Project section
```

Lines with only a single `#` will not appear as section in `task:help` and can be seen as plain comments.

## Help command

Running `./Taskfile help`, the `task:help` function is triggered. This task will list all available sections and tasks
using the double `##` comments you've learned about above. Now it's clear how you can run any other task!

# Advanced
## Auto-completion

Autocompletion works when you use `zsh` and `oh-my-zsh`. Create the following file in your oh-my-zsh directory
`~/.oh-my-zsh/completions/_task.zsh`:

```shell
#compdef task

_task() {
	local -a commands
	local tasks=$(task comp_targets)

	while IFS= read -r line; do
		if [[ -n "$line" ]]; then
			commands+=("$line")
		fi
	done <<< "$tasks"

	_describe -t commands 'task commands' commands
}

_task "$@"
```

Now after running `task shorthand`, your `task` commands will get autocompleted.

## SubTaskfiles

Have a (mono)repo with multiple projects, a group of less-used or specialized tasks or just waaay to many tasks for a
single Taskfile? Splitting your Taskfile might be for you! Using SubTaskfiles allows you to divide your tasks across
multiple files while still calling them from a single entrypoint (a familiar, regular Taskfile). Most useful for
splitting off a group of tasks that can be logically grouped together, like for specific use-cases or because they are
rarely used.

Example use-cases: git-hooks, frontend- / backend-specific tasks, tasks that fix (infrequently occurring) bugs, etc.

Tasks in SubTaskfiles are not called directly, but "via" a task in the root Taskfile, like this:
`Usage: ./Taskfile foo <task> <args>`

### How

Put this in the root Taskfile:
```shell
function task:foo { ## bar
	SUBTASKFILE_DIR="./path/to/subtaskfile/"

	source "$SUBTASKFILE_DIR/SubTaskfile"

	task:"${@-_help}"
}

# Optional: use proxy-tasks like this for tasks you want to run straight from the root Taskfile
function task:baz { ## Call `foo baz` directly
	task:foo baz
}
```

Give the SubTaskfile the filename `SubTaskfile`. It needs to contain only the tasks and sections you think useful (while
still having access to stuff like `file:ensure` from the root Taskfile!), but it has a few notes:
```shell
#!/bin/bash
# Adding `#!/bin/bash` is optional but recommended, as it hints editors etc. what syntax highlighting to use.

# When you refer to files in the SubTaskfile's directory, you need prefix them with $SUBTASKFILE_DIR
function task:call-script { ## Call a script
	"$SUBTASKFILE_DIR/some-script.sh"
}

# Without this, you cannot run `./Taskfile foo` or `./Taskfile foo help`
function task:_help { ## Show all available tasks
	task:help "$SUBTASKFILE_DIR/SubTaskfile"
}
```

# Credits

This Taskfile setup is based on [Adrian Cooney's Taskfile](https://github.com/adriancooney/Taskfile) and is widely
adopted by [Enrise](https://enrise.com) in our modified flavor.

# Contributors

A big thanks to all the contributors of Taskfile!

![contributor avatars](https://contrib.rocks/image?repo=enrise/taskfile)
