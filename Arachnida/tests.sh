#!/bin/sh

PYTHON_VERSION="python3.10"

GREEN="\e[32m"
RESET="\e[0m"

echo "${GREEN}Test: 404 error${RESET}"
${PYTHON_VERSION} spider.py https://httpbin.org/status/404
echo ""

echo "${GREEN}Test: 500 error${RESET}"
${PYTHON_VERSION} spider.py https://httpbin.org/status/500
echo ""

echo "${GREEN}Test: timeout error${RESET}"
${PYTHON_VERSION} spider.py https://httpbin.org/delay/11
echo ""

echo "${GREEN}Test: unexisting page error${RESET}"
${PYTHON_VERSION} spider.py http://site.qui.n.existe.pas/
echo ""

echo "${GREEN}Test: infinite redirect${RESET}"
${PYTHON_VERSION} spider.py https://httpbin.org/redirect/100
echo ""

exit 0
