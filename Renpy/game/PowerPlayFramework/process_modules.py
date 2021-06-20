import os

BASE_PATH = "../Modules/"
DISABLED_PREFIX = "disabled"

def find_modules():
    modules_list = []
    module_candidates = os.listdir(BASE_PATH)
    for m in module_candidates:
        if not m.lower().startswith(DISABLED_PREFIX) and os.path.isdir(BASE_PATH + m):
            modules_list.append(m)

def process_modules():
    modules_list = find_modules()
    # TODO: Find the pre-processing report within the module.
    # TODO: Check each file within the module, comparing their update timestamp with the report pre-processing report's timestamp.
    # TODO: For each file with a more recent timestamp, process it.
    # TODO: For each processed file, replace all _M_NAME_ strings with the module's name.

    # TODO: Produce a pre-processing report for the module.
    # TODO: If any errors were found, show a popup instructing the player to read the pre-processing report.

process_modules()
