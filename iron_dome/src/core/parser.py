#!/usr/bin/env python3

##########
# Import #
##########

import sys
import argparse

from pathlib import Path

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
