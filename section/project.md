➤ [Overview](../../README.md) ➤ [Usefull tasks](../usefull-tasks.md) ➤ Project

# Project section

A project section can be very usefull to quickly get your project up and running,
including the latest changes. A common practice is to include a `task:init` to get your
entire project up and running with a single command, and a `task:update` to make sure everything
is up to date.

```bash
# ===========================
## Project
# ===========================

function task:init { ## Initialise the project for local development
	project:local-files
	project:update
	# docker:start
	task:help
}

function task:update { ## Update all dependencies and files
	project:update
}

function project:update {
	title "Run project updates"
	# Todo: install dependencies, build scripts, etc...
}

function project:local-files {
	title "Setting local files"
	# cp --no-clobber local.env .env
	# echo "Created .env file for local usage from local.env."
}
```
