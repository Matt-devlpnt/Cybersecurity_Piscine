#!/usr/bin/env python3

##########
# Import #
##########

import signal
import daemon

from pathlib import Path

from ..monitors.file_monitor import files_folders_observer
from .logger import setup_logger, shutdown_logger
from .signal_handler import stop

###########
# Program #
###########

class IronDomeDaemon:

    def __init__(self, paths: list[Path], daemon_context: daemon.daemon.DaemonContext, log_file):
        self.paths = paths
        self.daemon_context = daemon_context
        self.log_file = log_file

    def start(self):
        with self.daemon_context:
            logger = setup_logger()

            try:
                logger.info("irondome daemon is up")

                signal.signal(signal.SIGTERM, stop)
                signal.signal(signal.SIGINT, stop)

                files_folders_observer(self.paths, logger)

            except Exception as e:
                logger.error(e)

            finally:
                self.stop()

    # il faut creer dune fonction qui boucle sur la creation des threads, puis apres mettre un wait , puis join

    def stop(self):
            logger.info("Cleaning up the Demon")
            shutdown_logger()
            self.log_file.close()
