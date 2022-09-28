➤ [Overview](../../README.md) ➤ [Usefull tasks](../usefull-tasks.md) ➤ Docker

# Docker

An absolute must if your project is running via docker locally.

```bash
# ===========================
## Docker
# ===========================

function task:build { ## (re)build the project docker containers
	title "Building project container"
	docker compose build
}

function task:start { ## Run the project locally
	title "Starting project container"
	docker compose up -d
	title "Project running"
	echo "View the project on <project link>"
}

function task:stop { ## Stop the local project
	title "Stopping project container"
	docker compose stop
}

function task:restart { ## Restart the local project
	task:stop
	task:start
}

function task:logs { ## Stop the local project
	title "Show the logs of the running project containers"
	docker compose logs -f
}
```

## Easily jump into your container

To do.
