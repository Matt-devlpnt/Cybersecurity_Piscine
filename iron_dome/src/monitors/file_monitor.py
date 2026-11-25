#!/usr/bin/env python3

#Détecter les créations, suppressions et modifications de fichiers

##########
# Import #
##########

import logging

from pathlib import Path
from watchdog import events
from watchdog.observers import Observer
from datetime import datetime

from ..core.event_queue import event_queue, analysis_queue
from ..core import signal_state

###########
# Program #
###########

#def my_event_handler_printer(event_type: str, doc_type: bool, path: str) -> None:
#    if doc_type == True:
#        logger.info(f'{event_type.upper()} | directory | {path}')
#    else:
#        logger.info(f'{event_type.upper()} | file | {path}')


def timestamp() -> str:
    return datetime.now().isoformat(sep=" ", timespec="milliseconds").replace(".", ",")


class MyEventHandler(events.FileSystemEventHandler):
    def __init__(self, logger: logging.Logger):
        super().__init__()
        self.logger = logger

    def on_any_event(self, event: events.FileSystemEvent) -> None:
        #timestamp = datetime.now().isoformat(sep=" ", timespec="milliseconds").replace(".", ",")
        #logger.info("Any event: %s", event)
        event_queue.put_nowait({"timestamp": timestamp(), "event": event})
        self.logger.error(f'>>>{event_queue.get_nowait()}<<<')
        #if event_queue.qsize() == 8:
        #    logger.error("---")
        #    logger.error(event_queue.qsize())
        #    for i in range(event_queue.qsize()):
        #        logger.error(f'>>>>>{event_queue.get_nowait()}')
        #    logger.error("---")

    #def on_created(self, event: events.DirCreatedEvent | events.FileCreatedEvent) -> None:
    #    timestamp = datetime.now().isoformat(sep=" ", timespec="milliseconds").replace(".", ",")
    #    event_queue.put_nowait({"timestamp": timestamp, "event": event})
    #    #my_event_handler_printer(event.event_type, event.is_directory, f'path:{event.src_path}')

    #def on_deleted(self, event: events.DirDeletedEvent | events.FileDeletedEvent) -> None:
    #    #my_event_handler_printer(event.event_type, event.is_directory, f'path:{event.src_path}')

    #def on_modified(self, event: events.DirModifiedEvent | events.FileModifiedEvent) -> None:
    #    #my_event_handler_printer(event.event_type, event.is_directory, f'path:{event.src_path}')

    #def on_moved(self, event: events.DirMovedEvent | events.FileMovedEvent) -> None:
    #    #my_event_handler_printer(event.event_type, event.is_directory, f'path:{event.src_path} | dest:{event.dest_path}')

    #def on_attrib(self, event: events.FileAttribEvent | events.DirAttribEvent) -> None:
    #    #logger.error("on attrib: %s", event)

    #def on_opened(self, event: events.FileOpenedEvent) -> None:
    #    #my_event_handler_printer(event.event_type, event.is_directory, f'path:{event.src_path}')

    #def on_closed(self, event: events.FileClosedEvent) -> None:
    #    #my_event_handler_printer(event.event_type, event.is_directory, f'path:{event.src_path}')

    #def on_closed_no_write(self, event: events.FileClosedNoWriteEvent) -> None:
    #    #my_event_handler_printer(event.event_type, event.is_directory, f'path:{event.src_path}')

    #def on_events_lost(self, event: events.EventsLostEvent) -> None:
    #    logger.error(event)


def files_folders_observer(paths: list[Path], logger: logging.Logger) -> None:

    event_handler = MyEventHandler(logger)
    observer = Observer()

    for path in paths:
        if path.is_dir():
            observer.schedule(event_handler, path, recursive=True)
        elif path.is_file():
            observer.schedule(event_handler, path, recursive=False)

    observer.start()

    try:
        signal_state.shutdown_event.wait()

    finally:
        observer.stop()
        observer.join()
