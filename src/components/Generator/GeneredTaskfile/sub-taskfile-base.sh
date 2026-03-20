#!/usr/bin/env bash
# =========================================================
## Example sub task
# =========================================================

function task:example { ## This is an example sub task
    title "Run example sub task"
	echo -e "${GREEN}Success!${RESET}"
}

# =========================================================
# SubTaskfile helper
#
# Note: Optional, but without this you can only run
# `./Taskfile foo` to get help output
# =========================================================

function task:subtask-help { ## Show all available tasks
	task:help
}
