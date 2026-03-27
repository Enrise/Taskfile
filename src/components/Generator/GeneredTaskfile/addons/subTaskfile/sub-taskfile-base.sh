#!/usr/bin/env bash
# =========================================================
## Example sub task
# =========================================================

function task:example { ## This is an example sub task
    title "Run example sub task"
	echo -e "./SubTaskfile location: ${YELLOW}$SUBTASKFILE_PATH${RESET}"
	echo -e "${GREEN}Success!${RESET}"
}
