#!/usr/bin/env python3

import time
import signal
from ..logger.logger import logger


running = True

def stop(signum, frame):
    global running
    running = False

def coucou():
    while running:
        logger.error("C est une erreur")
        time.sleep(2)
