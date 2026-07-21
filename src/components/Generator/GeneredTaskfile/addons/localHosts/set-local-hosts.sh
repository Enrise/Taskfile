function task:set-local-hosts { ## Add required local hosts to /etc/hosts
	title "Checking local hosts"
	local domains=(
[[domains]]
	)
	local domain pattern
	for domain in "${domains[@]}"; do
		pattern="^127\.0\.0\.1[[:space:]]+${domain//./\\.}([[:space:]]|\$)"
		if grep -qE "$pattern" /etc/hosts; then
			echo -e "${GREEN}✓${RESET} host ${GREEN}${domain}${RESET} is present."
		else
			echo -e "Adding ${YELLOW}${domain}${RESET} to ${YELLOW}/etc/hosts${RESET} (${RED}sudo required${RESET})..."
			echo "127.0.0.1 ${domain} # project: [[project]]" | sudo tee -a /etc/hosts > /dev/null
			echo -e "${GREEN}✓${RESET} added host ${GREEN}${domain}${RESET}."
		fi
	done
}
