#!/usr/bin/env python3

##########
# Import #
##########

from queue import Queue

###########
# Program #
###########

#Queue between watchdog and utils
event_queue = Queue(maxsize=10000)

#Queue between utils and detection engine
analysis_queue = Queue(maxsize=10000)
