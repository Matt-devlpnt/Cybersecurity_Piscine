#!/usr/bin/env python3

##########
# Import #
##########

import logging
from pathlib import Path
from logging.handlers import RotatingFileHandler

####################
# Global variables #
####################

LOG_DIR = Path("/var/log/irondome")
LOG_FILE = LOG_DIR / "irondome.log"

logger = logging.getLogger("irondome")

#############
# Functions #
#############

def setup_logger():

    if logger.handlers:
        return logger

    file_handler = RotatingFileHandler(
        LOG_FILE,
        maxBytes=5_000_000,
        backupCount=5,
        encoding="utf-8"
    )

    formatter = logging.Formatter(
        "%(asctime)s [%(levelname)s] %(name)s: %(message)s"
    )

    file_handler.setFormatter(formatter)

    logger.setLevel(logging.INFO)
    logger.addHandler(file_handler)

    return logger


def shutdown_logger():
    logger.info("Shutdown logger")

    for handler in logger.handlers[:]:
        handler.flush()
        handler.close()
        logger.removeHandler(handler)
