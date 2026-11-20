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
	@echo -e '    ${GREEN}clean${NC}: Remove /var/log/irondome folder'

run:
	sudo $(PYTHON) -m src.irondome $(PATHS)

clean:
	sudo rm -rf /var/log/irondome
