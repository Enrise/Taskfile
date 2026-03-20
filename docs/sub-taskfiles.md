# SubTaskfiles

SubTaskfiles allow you to divide your tasks across multiple files while still calling them from a single entrypoint (a
familiar, regular Taskfile).

Use them to split off groups of tasks that can be logically grouped together, like for specific use-cases or because
they are rarely used. For example: git-hooks, frontend- / backend-specific tasks, tasks for (infrequently occurring)
procedures, CI-only tasks, etc.

Tasks in SubTaskfiles are never called directly, but "via" a task in the root Taskfile, like this:
`Usage: ./Taskfile foo <task> <args>`

## How

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

Create a file named `SubTaskfile` in a relevant location. It should only contain the tasks and sections you think useful
for that location (as utility stuff like `task:help`, `BLUE` env vars, `file:ensure`, etc. are provided by the root
Taskfile), and has a few notes:

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
