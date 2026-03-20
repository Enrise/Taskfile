# Auto-completion

Autocompletion works when you use `zsh` and `oh-my-zsh`. Create the following file in your oh-my-zsh directory
`~/.oh-my-zsh/completions/_task.zsh`:

```shell
#compdef task

_task() {
	local -a commands
	local tasks=$(task comp_targets)

	while IFS= read -r line; do
		if [[ -n "$line" ]]; then
			commands+=("$line")
		fi
	done <<< "$tasks"

	_describe -t commands 'task commands' commands
}

_task "$@"
```

Now after running `task shorthand`, your `task` commands will get autocompleted.
