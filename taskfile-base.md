# The Taskfile base

Below is the Taskfile base we recommend you use. Below we will explain what sections are in the base
and why.

```shell
#!/bin/bash
set -eo pipefail

# =========================================================
# Taskfile gives you a set of quick tasks for your project
# More info: https://enri.se/taskfile
# =========================================================

PATH=./node_modules/.bin:$PATH

# TODO:
# This is where you add relevant tasks for your project.
# Examples: https://enri.se/taskfile-examples

# =========================================================
## Taskfile
# =========================================================

BLUE=$(printf '\033[36m')
YELLOW=$(printf '\033[33m')
RESET=$(printf '\033[0m')

function title {
	echo -e "\n${BLUE}=>${RESET} $1\n"
}

function banner {
	echo ""
	echo "████████╗ █████╗ ███████╗██╗  ██╗███████╗██╗██╗     ███████╗"
	echo "╚══██╔══╝██╔══██╗██╔════╝██║ ██╔╝██╔════╝██║██║     ██╔════╝"
	echo "   ██║   ███████║███████╗█████╔╝ █████╗  ██║██║     █████╗"
	echo "   ██║   ██╔══██║╚════██║██╔═██╗ ██╔══╝  ██║██║     ██╔══╝"
	echo "   ██║   ██║  ██║███████║██║  ██╗██║     ██║███████╗███████╗"
	echo "   ╚═╝   ╚═╝  ╚═╝╚══════╝╚═╝  ╚═╝╚═╝     ╚═╝╚══════╝╚══════╝"
}

function task:help { ## Show all available tasks
	title "Available tasks"
	awk 'BEGIN {FS = " { [#][#][ ]?"} /^([a-zA-Z_-]*:?.*)(\{ )?[#][#][ ]?/ \
		{printf "\033[33m%-34s\033[0m %s\n", $1, $2}' $0 |\
		sed -E "s/[#]{2,}[ ]*/${RESET}/g" |\
		sed -E "s/function task:*/  /g"
	echo -e "\n${BLUE}Usage:${RESET} $0 ${YELLOW}<task>${RESET} <args>"
}

function task:shorthand { ## Create CLI shorthand task instead of ./Taskfile
	title "Creating task shorthand"
	if [ -f /usr/local/bin/task ]
	then
		echo "/usr/local/bin/task already exists."
	else
		echo -e "You are about to create /usr/local/bin/task that requires root permission..."
		sudo curl --location --silent --output /usr/local/bin/task https://enri.se/taskfile-bin
		sudo chmod +x /usr/local/bin/task
	fi
	echo -e "${BLUE}You can now use:${RESET} task ${YELLOW}<task>${RESET} <args>"
}

# Execute tasks (defaults to help)
banner
"task:${@:-help}"
```

## Banner

By default, we include a banner in your Taskfile. In the base you have a pretty ascii art of
"Taskfile", but we recommend you replace this with your own project title. You can use
http://patorjk.com/software/taag/ for that.

## Title

In order to give all the tasks a pretty and clear structre, a title function is added that we
recommend you use at the start of every task. This will create a nice divider and let your user know
that your Taskfile is about to start a new process.

```shell
function task:my-new-task { ## My new task example
	title "Starting with my new task"
	# Your task continues here...
}
```

## Help section

A help section for your Taskfile is generated automatically. This is done by scanning the Taskfile
itself, and checking if a line contains `##` (double comment). When it finds a `##`, it will either
use the line as a new section in the help overview, or when it's combined with a
`function task:* { ## Descriptoin` then the comment will be used as the task description. Using this
will give your user a clear overview of what tasks can be run.

## PATH

In the taskfile base, you see that the PATH variable is updated with an additional path
(`PATH=./node_modules/.bin:$PATH`). In this example `./node_modules/.bin` is added to the bash PATH
variable. For example, if you have a `eslint` binary in that folder, you can now call
`eslint --fix .` directly from your tasks, instead of having to call
`./node_modules/.bin/eslint --fix .`. If you don't need it, remove it. If you need to include a
different binary path, update it.

## Shorthand

If you're a lazy developer (that's a good thing, trust me), you're probably already tired of having
to type `./Taskfile <task>` all the time. The `task:shorthand` gives you a quick and easy option to
create a `task` binary on your system, so you can use `task <task>` in the future. It will look for
a `Taskfile` in the current directory.

# Adding relevant tasks

Relevant tasks for your project can be found in [the tasks overview](./README.md#usefull-tasks).
