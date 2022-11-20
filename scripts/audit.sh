#!/bin/bash

# Exit when any command fail
set -eo pipefail

yarn improved-yarn-audit \
  --min-severity moderate \
  --ignore-dev-deps \
  --retry-on-network-failure
