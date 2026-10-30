#!/bin/sh

set -eu

SSH_PASSWORD=$(cat /run/secrets/pwd_sshuser)

printf '%s\n%s\n' $SSH_PASSWORD $SSH_PASSWORD | passwd sshuser > /dev/null

exec /usr/bin/supervisord -c /etc/supervisord.conf
