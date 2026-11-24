#!/usr/bin/env python3

#Détecter les créations, suppressions et modifications de fichiers

##########
# Import #
##########

from pathlib import Path
from watchdog import events
from watchdog.observers import Observer

from ..logger.logger import logger
from ..signal import state

###########
# Program #
###########

class MyEventHandler(events.FileSystemEventHandler):
    def on_any_event(self, event: events.FileSystemEvent) -> None:
        logger.info("Any event: %s", event)

    def on_created(self, event: events.DirCreatedEvent | events.FileCreatedEvent) -> None:
        logger.info("Created: %s", event)

    def on_deleted(self, event: events.DirDeletedEvent | events.FileDeletedEvent) -> None:
        logger.info("Deleted: %s", event)

    def on_modified(self, event: events.DirModifiedEvent | events.FileModifiedEvent) -> None:
        logger.info("Modified: %s", event)

    def on_moved(self, event: events.DirMovedEvent | events.FileMovedEvent) -> None:
        logger.info("Moved: %s", event)

    def on_opened(self, event: events.FileOpenedEvent) -> None:
        logger.info("Opened: %s", event)

    def on_closed(self, event: events.FileClosedEvent) -> None:
        logger.info("Closed: %s", event)

    def on_closed_no_write(self, event: events.FileClosedNoWriteEvent) -> None:
        logger.info("Closed no write: %s", event)


def files_folders_observer(paths: list[Path]):

    event_handler = MyEventHandler()
    observer = Observer()

    for path in paths:
        if path.is_dir():
            observer.schedule(event_handler, path, recursive=True)
        elif path.is_file():
            observer.schedule(event_handler, path, recursive=False)

    observer.start()

    try:
        state.shutdown_event.wait()

    finally:
        observer.stop()
        observer.join()
