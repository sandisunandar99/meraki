DOCKER_FILE := ./docker/Dockerfile
DOCKER_FILE_DEV := ./docker/Dockerfile.dev

DOCKER_APP_NAME := meraki

DOCKER_DEV := -f docker-compose.yml
DOCKER_DEV_EXEC := ${DOCKER_DEV} exec ${DOCKER_APP_NAME}

DOCKER_IMAGES := meraki:latest
DOCKER_IMAGES_DEV := meraki-dev:latest

SHELL=bash

###################################################################################################
## INITIALISATION
###################################################################################################

export DOCKER_BUILDKIT=1
export COMPOSE_DOCKER_CLI_BUILD=1

###################################################################################################
## DEV
###################################################################################################
.PHONY: build-dev build-dev-no-cache build-test start start-detached stop shell

build-dev: ##@dev Build the application for dev
	docker compose build

build-dev-no-cache: ##@dev Build the application for dev without using cache
	docker compose build --no-cache

build-test: ##@dev Build the application to run tests
	docker build \
		--build-arg NODE_ENV=production \
		--target test \
		-t app-test:1.00 .

start: ##@dev Start the development environment
	docker compose up

start-detached: ##@dev Start the development environment (detached)
	docker compose up -d

stop: ##@dev Stop the development environment
	docker compose down

shell: ##@dev Go into the running container (the app name should match what's in docker-compose.yml)
	docker compose exec app /bin/sh

###################################################################################################
## HELP
###################################################################################################

.PHONY: default
default: help

GREEN  := $(shell tput -Txterm setaf 2)
WHITE  := $(shell tput -Txterm setaf 7)
YELLOW := $(shell tput -Txterm setaf 3)
RESET  := $(shell tput -Txterm sgr0)

HELP_FUN = \
	%help; \
	while(<>) { push @{$$help{$$2 // 'options'}}, [$$1, $$3] if /^([a-zA-Z\-]+)\s*:.*\#\#(?:@([a-zA-Z\-]+))?\s(.*)$$/ }; \
	print "usage: make [target]\n\n"; \
	for (sort keys %help) { \
	print "${WHITE}$$_:${RESET}\n"; \
	for (@{$$help{$$_}}) { \
	$$sep = " " x (32 - length $$_->[0]); \
	print "  ${YELLOW}$$_->[0]${RESET}$$sep${GREEN}$$_->[1]${RESET}\n"; \
	}; \
	print "\n"; }

help: ##@other Show this help
	@perl -e '$(HELP_FUN)' $(MAKEFILE_LIST)