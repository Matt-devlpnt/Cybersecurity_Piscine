#!/usr/bin/env python3

##########
# Import #
##########

import logging
from pathlib import Path
from logging.handlers import RotatingFileHandler

####################
# Globale variable #
####################

LOG_DIR = Path("/var/log/irondome")

###########
# Program #
###########

LOG_DIR.mkdir(parents=True, exist_ok=True)


file_handler = RotatingFileHandler(
    LOG_DIR / "irondome.log",
    maxBytes=5_000_000,
    backupCount=5,
    encoding="utf-8"
)


logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] %(name)s: %(message)s",
    handlers=[
        file_handler
    ]
)


logger = logging.getLogger("irondome")
