#!/usr/bin/env python3
"""Print the integrated OneSquad version; run explicitly from the project root."""

import json
from pathlib import Path


if __name__ == "__main__":
    metadata = json.loads(Path(".github/onesquad/state.json").read_text())
    print(f"OneSquad integrated version: {metadata['version']}")
