#!/bin/bash
# =========================================================
## Example sub task
# =========================================================

function task:example { ## This is an example sub task
    title "Run example sub task"
	echo -e "${GREEN}Success!${RESET}"
}

# =========================================================
# Sub Taskfile helper
# =========================================================

function task:subtasks-help { # Show all available tasks
    task:help "$SUBTASKFILE_DIR/SubTaskfile"
}
