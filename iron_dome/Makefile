SHELL:=/bin/bash

VIOLET=\033[1;38;5;141m
GREEN=\033[1;38;5;79m
NC=\033[0m

PYTHON = venv/bin/python


.PHONY: help run

all: help

help:
	@echo -e '${VIOLET}You can use these followings command:${NC}'
	@echo -e '    ${GREEN}run${NC}: Run software'
	@echo -e '    ${GREEN}stop${NC}: Stop software'
	@echo -e '    ${GREEN}clean${NC}: Remove /var/log/irondome folder'
	@echo -e '    ${GREEN}full_clean${NC}: Stop software and remove /var/log/irondome folder'

stop:
	@if [ -e /run/irondome.pid ]; then \
		if sudo kill -TERM $$(sudo cat /run/irondome.pid); then \
			echo "irondome is stopped"; \
		fi \
	fi

run: stop
	@echo "irondome is started"
	@sudo $(PYTHON) -m src.irondome $(PATHS)

clean:
	@echo "irondome logfile is removed"
	@sudo rm -rf /var/log/irondome

full_clean: stop clean
