#!/usr/bin/env bash
# =========================================================
## Example sub task
# =========================================================

function task:example { ## This is an example sub task
    title "Run example sub task"
	echo -e "./SubTaskfile location: ${YELLOW}$SUBTASKFILE_DIR${RESET}"
	echo -e "${GREEN}Success!${RESET}"
}

# =========================================================
# SubTaskfile helper
# Note: Optional, if you want to have an explicit
#       SubTaskfile help command (can't be named `help`)
# =========================================================

function task:subtask-help { ## Show all available sub-tasks
	task:help
}
