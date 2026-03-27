# SubTaskfiles

SubTaskfiles allow you to divide your tasks across multiple files while still calling them from a single entrypoint (a
familiar, regular Taskfile).

Use them to split off groups of tasks that can be logically grouped together, like for specific use-cases or because
they are rarely used. For example: git-hooks, frontend- / backend-specific tasks, tasks for (infrequently occurring)
procedures, CI-only tasks, etc.

Tasks in SubTaskfiles are never called directly, but "via" a task in the root Taskfile, like this:
`Usage: ./Taskfile foo <task> <args>`

## Live example

In the Taskfile generator, you can check the "Include SubTaskfile example" checkbox, to see a full implementation
example.

## How does it work

When you generate a new Taskfile via the Taskfile generator, you have a `subtaskfile` proxy function available to you.
That allows you to create a new task to open your `SubTaskfile` from your `Taskfile`:

```shell
function task:name-of-your-subtask { ## Run a sub-task
	subtaskfile "name-of-your-subtask" "./folder-name" "$@"
}
```

Then, create a file named `SubTaskfile` in a relevant location (in the example above we have `folder-name/SubTaskfile`).
Only the tasks that are relevant for this specific part of you application, go in here.

**No need to redefine anything that's already in your primary Taskfile.**

```shell
#!/usr/bin/env bash

function task:example { ## This is an example sub task
    title "Run example sub task"
	echo -e "./SubTaskfile location: ${YELLOW}$SUBTASKFILE_PATH${RESET}"
	echo -e "${GREEN}Success!${RESET}"
}
```

Optionally, you can include an explicit helper function for your SubTaskfile output too.

```shell
function task:subtask-help { ## Show all available sub-tasks
	task:help
}
```

## Note

If you use the same task name in your SubTaskfile as what was already defined in the primary Taskfile, the task will be
overwritten.
