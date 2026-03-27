# =========================================================
## SubTaskfiles
# =========================================================

function task:frontend { ## Run a frontend task
	# This runs ./frontend-folder/SubTaskfile
	subtaskfile "frontend" "./frontend-folder" "$@"
}
