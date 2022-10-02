# GitHub

If you use GitHub and want an easy way to check out Pull Requests locally, `task:pr` is a great
addition to your project section in the Taskfile.

```bash
# ===========================
## Project
# ===========================

function task:pr { ## Check out pull request <number> and update
	project:checkout-pr $1
	project:update
}

function project:checkout-pr {
	title "Checking out pull request"
	if [ -z "$1" ]
	then
		echo "You need to provide a pull request number to check out."
		echo -e "${BLUE}Usage:${RESET} $0 pr ${YELLOW}<number>${RESET}"
		exit 422
	fi
	echo "Checking out pull request $1..."
	git fetch origin refs/pull/$1/head:refs/remotes/origin/pr/$1
	git checkout origin/pr/$1
}
```
