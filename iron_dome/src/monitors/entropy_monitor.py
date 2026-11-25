#!/usr/bin/env python3

##########
# Import #
##########

import threading
from queue import Empty

###########
# Program #
###########

class EntropyMonitor:

    def __init__(self, event_queue, analysis_queue, logger):
        self.event_queue = event_queue
        self.analysis_queue = analysis_queue
        self.logger = logger

        self.file_entropies = {}
        self.running = threading.Event()

    def calculate_entropy(self, file_path):
        pass

    def register_file(self, file_path):
        pass

    def update_entropy(self, file_path):
        pass

    def remove_file(self, file_path):
        pass

    def compare_entropy(self, old_entropy, new_entropy):
        pass

    def process_event(self, event):
        pass




# file_created         Calculer l'entropie initiale
# file_modified        Programmer un recalcul de l'entropie
# file_closed          Recalculer l'entropie après écriture
# file_moved           Mettre à jour le chemin associé au fichier
# file_deleted         Supprimer la référence d'entropie
# file_opened          Ignorer
# file_attrib          Ignorer
# file_closed_no_write Ignorer
# monitor_events_lost  Signaler une perte de surveillance
