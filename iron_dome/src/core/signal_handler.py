#!/usr/bin/env python3

##########
# Import #
##########

from . import signal_state

###########
# Program #
###########

def stop(signum, frame):
    signal_state.shutdown_event.set()
