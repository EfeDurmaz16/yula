#!/bin/bash

# YULA Production MVP - Ralph Wiggum Loop Runner
# This script runs Claude Code in a loop until the project is complete

set -e

# Configuration
MAX_ITERATIONS=300
COMPLETION_PROMISE="YULA_PRODUCTION_MVP_COMPLETE"
PROMPT_FILE="RALPH_LOOP_PROMPT.md"
LOG_FILE="ralph-loop.log"
ITERATION=0

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}================================${NC}"
echo -e "${BLUE}  YULA Ralph Wiggum Loop${NC}"
echo -e "${BLUE}  Max Iterations: $MAX_ITERATIONS${NC}"
echo -e "${BLUE}  Completion: $COMPLETION_PROMISE${NC}"
echo -e "${BLUE}================================${NC}"
echo ""

# Check if prompt file exists
if [ ! -f "$PROMPT_FILE" ]; then
    echo -e "${RED}Error: $PROMPT_FILE not found!${NC}"
    exit 1
fi

# Initialize log
echo "Ralph Loop Started: $(date)" > "$LOG_FILE"
echo "Max Iterations: $MAX_ITERATIONS" >> "$LOG_FILE"
echo "---" >> "$LOG_FILE"

# Main loop
while [ $ITERATION -lt $MAX_ITERATIONS ]; do
    ITERATION=$((ITERATION + 1))

    echo -e "${YELLOW}[Iteration $ITERATION/$MAX_ITERATIONS]${NC} Starting..."
    echo "[Iteration $ITERATION] Started at $(date)" >> "$LOG_FILE"

    # Run Claude with the prompt
    OUTPUT=$(cat "$PROMPT_FILE" | claude --print 2>&1) || true

    # Log output
    echo "$OUTPUT" >> "$LOG_FILE"
    echo "---" >> "$LOG_FILE"

    # Check for completion
    if echo "$OUTPUT" | grep -q "$COMPLETION_PROMISE"; then
        echo -e "${GREEN}================================${NC}"
        echo -e "${GREEN}  COMPLETION DETECTED!${NC}"
        echo -e "${GREEN}  Iteration: $ITERATION${NC}"
        echo -e "${GREEN}  Time: $(date)${NC}"
        echo -e "${GREEN}================================${NC}"
        echo ""
        echo "COMPLETION at Iteration $ITERATION: $(date)" >> "$LOG_FILE"
        exit 0
    fi

    # Brief pause between iterations
    sleep 2
done

echo -e "${RED}================================${NC}"
echo -e "${RED}  MAX ITERATIONS REACHED${NC}"
echo -e "${RED}  Did not complete in $MAX_ITERATIONS iterations${NC}"
echo -e "${RED}================================${NC}"
echo "MAX ITERATIONS REACHED: $(date)" >> "$LOG_FILE"
exit 1
