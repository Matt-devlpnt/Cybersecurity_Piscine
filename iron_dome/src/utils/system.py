#!/usr/bin/env python3

##########
# Import #
##########

import os
import sys

###########
# Program #
###########

def system_checker():
    if not sys.platform.startswith("linux"):
        print("Irondome only supports Linux")
        sys.exit(os.EX_OSERR)
