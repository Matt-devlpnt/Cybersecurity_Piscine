#!/usr/bin/env python3

##########
# Import #
##########

from . import state

###########
# Program #
###########

def stop(signum, frame):
    state.shutdown_event.set()
