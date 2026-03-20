# =========================================================
## SubTaskfiles
# =========================================================

function task:frontend { ## Run frontend task
	# This runs ./frontend/SubTaskfile
	subtaskfile "frontend" "./frontend"
}

function task:backend { ## Run backend task
	# This runs ./backend/SubTaskfile
	subtaskfile "backend" "./backend"
}
