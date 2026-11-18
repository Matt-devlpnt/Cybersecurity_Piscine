#!/usr/bin/env python3

##########
# Import #
##########

import os
import sys

###########
# Program #
###########

def user_root_checker():
    if (os.geteuid() != 0):
        print("Please, be in root to run this software", file=sys.stderr)
        sys.exit(os.EX_NOPERM)
