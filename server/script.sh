#!/bin/sh
docker-compose -f docker-compose.yml down
docker system prune -fa
docker-compose -f docker-compose.yml up
docker-machine ip sqatim

