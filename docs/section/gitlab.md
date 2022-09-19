# GitLab

➤ [Overview](../../README.md) ➤ [Usefull tasks](../usefull-tasks.md) ➤ GitLab

If you use GitLab and want an easy way to check out Merge Requests locally,
`task:mr` is a great addition to your project section in the Taskfile.

```bash
function task:mr { ## Check out merge request <number> and update
	project:checkout-mr
	project:update
}

function project:checkout-mr {
	title "Checking out merge request"
	if [ -z "$1" ]
	then
		echo "You need to provide a merge request number to check out."
		echo -e "${BLUE}Usage:${RESET} $0 mr ${YELLOW}<number>${RESET}"
		exit 422
	fi
	echo "Checking out merge request $1..."
	git fetch origin refs/merge-requests/$1/head:refs/remotes/origin/merge-requests/$1
	git checkout origin/merge-requests/$1
}
```
