#!/usr/bin/env python3

import time
import signal
from ..logger.logger import logger, shutdown_logger


running = True

def stop(signum, frame):
    if signum == signal.SIGTERM:
        logger.error(f'SIGTERMSIGTERM')
    if signum == signal.SIGINT:
        logger.error(f'SIGINTSIGINT')
    logger.info(f'signum:{signum}')
    logger.info(f'frame:{frame}')
    logger.error(f'SALUT')
    running = False
    shutdown_logger()
    exit(0)

def coucou():
    while running:
        logger.error("C est une erreur")
        time.sleep(2)
