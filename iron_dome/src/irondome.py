#!/usr/bin/env python3

from .utils import permissions, system

permissions.user_root_checker()
system.system_checker()

##########
# Import #
##########

import sys
import argparse
import daemon
import signal
from pathlib import Path
from daemon.pidfile import TimeoutPIDLockFile

from .monitors.file_monitor import files_folders_observer
from .logger.logger import setup_logger, shutdown_logger
from .signal.handler import stop

####################
# Globale variable #
####################

DEFAULT_FILES_AND_FOLDERS = [
    "/home",
    "/root",
    "/etc",
    "/boot",
    "/var/www",
    "/usr/local/bin",
    "/usr/local/sbin"
]

LOG_DIR = Path("/var/log/irondome")
LOG_FILE = LOG_DIR / "irondome.log"

LOG_DIR.mkdir(parents=True, exist_ok=True)
LOG_FILE.touch(mode=644, exist_ok=True)
log_file = open(LOG_FILE, 'r', encoding='utf-8')
pid_log_file = log_file.fileno()

###########
# Program #
###########

def normalize_paths(paths: list[str]) -> list[Path]:
    normalized = set()

    for path in paths:
        try:
            resolved_path = Path(path).resolve(strict=True)

            if not resolved_path.exists():
                continue

            normalized.add(resolved_path)
        except (OSError, RuntimeError) as e:
            print(e, file=sys.stderr)

    result = []

    for path in sorted(normalized, key=lambda p: len(p.parts)):
        if not any(parent in path.parents for parent in result):
            result.append(path)

    return result


def check_path(path: str) -> Path:
    path_name = Path(path)

    if (not path_name.exists()):
        print(f"{path}: path does not exist")
        return None 

    if not path_name.is_file() and not path_name.is_dir():
        print(f"{path}: invalid pathname")
        return None 

    return path_name


def parse_args() -> list[Path]:
    parser = argparse.ArgumentParser(description='irondome - tool that detect anomalous activity by monitoring different operating system parameters ', prog='irondome')
    parser.add_argument('-v', '--version', action='version', version='%(prog)s 1.0')
    parser.add_argument('paths', nargs='*', type=check_path, help='list of files and folders')

    args = parser.parse_args()

    args.paths = [path for path in args.paths if path is not None]

    if (len(args.paths) == 0):
        args.paths = [path for path in DEFAULT_FILES_AND_FOLDERS if check_path(path) is not None]

    return normalize_paths(args.paths)


def start_daemon(paths: list[Path]) -> None:
    irondome_daemon = daemon.DaemonContext(
        chroot_directory=None,
        working_directory='/',
        umask=0o077,
        uid=0,
        gid=0,
        initgroups=False,
        prevent_core=True,
        detach_process=True,
        files_preserve=[pid_log_file],
        pidfile=TimeoutPIDLockFile(
            "/run/irondome.pid",
            acquire_timeout=0
        ),
        stdin=None,
        stdout=None,
        stderr=None,
        signal_map=None
    )

    with irondome_daemon:
        logger = setup_logger()

        try:
            logger.info("irondome daemon is up")

            signal.signal(signal.SIGTERM, stop)
            signal.signal(signal.SIGINT, stop)

            files_folders_observer(paths)

        except Exception as e:
            logger.error(e)

        finally:
            logger.info("Cleaning up the Demon")
            shutdown_logger()
            log_file.close()


def main():
    try:
        paths = parse_args()

    except PermissionError as e:
        print(e, file=sys.stderr)
    except Exception as e:
        print(e, file=sys.stderr)

    start_daemon(paths)


if __name__ == '__main__':
    main()
