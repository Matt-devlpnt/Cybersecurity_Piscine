FROM alpine@sha256:c26612752c78b18faacd63c7d50f4592c2e7b0f25e0e20e82bd74e465c57ab0d AS base

RUN apk update \
    && apk upgrade \
    && apk add --no-cache vim tor


FROM base AS conf

COPY --chmod=644 --chown=tor:tor ./conf/torrc /etc/tor


FROM conf AS prod

USER tor

ENTRYPOINT ["/usr/bin/tor", "-f", "/etc/tor/torrc", "--RunAsDaemon", "0"]
