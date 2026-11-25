#!/usr/bin/env python3

from .core import permissions, system

permissions.user_root_checker()
system.system_checker()

##########
# Import #
##########

import sys

from pathlib import Path
from daemon import DaemonContext
from daemon.pidfile import TimeoutPIDLockFile

from .core.irondome_daemon import IronDomeDaemon
from .core.parser import parse_args

###########
# Program #
###########

def logfile_creator():
    log_dir = Path("/var/log/irondome")
    log_dir.mkdir(parents=True, exist_ok=True)

    log_file = log_dir / "irondome.log"
    log_file.touch(mode=644, exist_ok=True)
    log_file_fd = open(log_file, 'r', encoding='utf-8')

    return log_file_fd


def daemon_context_generator(log_file_fd):
    daemon_context = DaemonContext(
        chroot_directory=None,
        working_directory='/',
        umask=0o077,
        uid=0,
        gid=0,
        initgroups=False,
        prevent_core=True,
        detach_process=True,
        files_preserve=[log_file_fd.fileno()],
        pidfile=TimeoutPIDLockFile(
            "/run/irondome.pid",
            acquire_timeout=0
        ),
        stdin=None,
        stdout=None,
        stderr=None,
        signal_map=None
    )

    return daemon_context


def main():
    try:
        paths = parse_args()

        log_file_fd = logfile_creator()
        daemon_context = daemon_context_generator(log_file_fd)

        irondome_daemon = IronDomeDaemon(paths, daemon_context, log_file_fd)
        irondome_daemon.start()

    except PermissionError as e:
        print(e, file=sys.stderr)
    except Exception as e:
        print(e, file=sys.stderr)


if __name__ == '__main__':
    main()
