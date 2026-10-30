SHELL:=/bin/bash

VIOLET=\033[1;38;5;141m
GREEN=\033[1;38;5;79m
NC=\033[0m

.PHONY: all help down up exec get_onion_url ssh_connect

all: help

help:
	@echo -e '${VIOLET}You can use these followings command:${NC}'
	@echo -e '    ${GREEN}down${NC}: Stop and remove web_server_nginx container'
	@echo -e '    ${GREEN}up${NC}: Create and start web_server_nginx container'
	@echo -e '    ${GREEN}exec${NC}: Enter in web_server_nginx container'
	@echo -e '    ${GREEN}get_onion_url${NC}: Get url of website'
	@echo -e '    ${GREEN}ssh_connect${NC}: ssh connexion to nginx container'

down:
	@ssh-keygen -f $$HOME/.ssh/known_hosts -R "[172.20.0.2]:4242"
	@rm -rf ./srcs/requirements/web_server_nginx/secrets
	@sudo docker compose -f ./srcs/compose.yaml down
	@if [ $$(sudo docker images -qa | wc -l) -ne 0 ]; then \
		sudo docker rmi -f $$(sudo docker images -q); \
	fi

up: down
	@mkdir ./srcs/requirements/web_server_nginx/secrets
	@if [ ! -e ./srcs/requirements/web_server_nginx/secrets/ssh_password ]; then \
		printf 'Please init sshuser password: '; \
		stty -echo; \
		read SSHUSER_PWD; \
		stty echo; \
		printf '\n'; \
		printf '%s' "$$SSHUSER_PWD" > ./srcs/requirements/web_server_nginx/secrets/ssh_password; \
		chmod 600 ./srcs/requirements/web_server_nginx/secrets/ssh_password; \
	fi
	@ssh-keygen -t ed25519 -N ""   -C ""   -f ./srcs/requirements/web_server_nginx/secrets/id_ed25519
	@sudo docker compose -f ./srcs/compose.yaml up

exec:
	@sudo docker exec -it web_server_nginx sh

get_onion_url:
	@sudo docker exec onion_service cat /var/lib/tor/hidden_service/hostname

ssh_connect:
	@ssh -o IdentitiesOnly=yes -i ./srcs/requirements/web_server_nginx/secrets/id_ed25519 -p 4242 sshuser@172.20.0.2
