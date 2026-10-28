FROM nginx@sha256:959ae6b898852db82e5b29b929388e59914f42be0a8f4d44c89a4c1f53b49208 AS base

RUN apk update \
    && apk upgrade \
    && apk add --no-cache vim openssh-server-pam supervisor sudo


FROM base AS conf

RUN adduser -D -s /bin/sh sshuser \
    && addgroup sshgroup \
    && adduser sshuser sshgroup \
    && mkdir -m 700 /home/sshuser/.ssh \
    && chown sshuser:sshuser /home/sshuser/.ssh \
    && for name in base-auth base-account base-password base-session base-session-noninteractive; do  \
            ln -s "/usr/lib/pam.d/$name" "/etc/pam.d/$name"; \
        done \
    && ssh-keygen -A

COPY --chmod=440 --chown=root:root ./conf/sudoers /etc/sudoers.d
COPY --chmod=600 --chown=sshuser:sshuser ./secrets/id_ed25519.pub /home/sshuser/.ssh/authorized_keys
COPY --chmod=644 --chown=root:root ./conf/sshd_config /etc/ssh
COPY --chmod=644 --chown=root:root ./conf/nginx.conf /etc/nginx
COPY --chmod=600 --chown=root:root ./conf/supervisord.conf /etc/supervisord.conf


FROM conf AS prod

EXPOSE 80/tcp
EXPOSE 4242/tcp

COPY --chmod=755 --chown=root:root ./conf/entrypoint.sh /usr/local/bin/entrypoint.sh

ENTRYPOINT ["/usr/local/bin/entrypoint.sh"]
