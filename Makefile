BUILD_DIR := out
DOMAIN_NAME := pp.mathieularose.com
GIT_PUBLISH_REPO := https://actions:$(GITHUB_TOKEN)@github.com/$(GITHUB_REPOSITORY)
GIT_PUBLISH_BRANCH := gh-pages

.PHONY: build
build:
	npx next build && npx next export

.PHONY: dev
dev:
	npx next dev

.PHONY: fix
fix:
	npx npx eslint . --ext js,ts,tsx --fix

.PHONY: install
install:
	npm ci
	npx next telemetry disable

.PHONY: publish
publish:
	echo -n $(DOMAIN_NAME) > $(BUILD_DIR)/CNAME
	touch $(BUILD_DIR)/.nojekyll

	cd $(BUILD_DIR) && \
		git init && \
		git config user.email "actions@users.noreply.github.com" && \
		git config user.name "GitHub Actions" && \
		git add . && \
		git commit --allow-empty-message -m "" && \
		git push -f $(GIT_PUBLISH_REPO) HEAD:$(GIT_PUBLISH_BRANCH)

.PHONY: start
start:
	npx next start

.PHONY: test
test: test.eslint test.types

.PHONY: test.eslint
test.eslint:
	npx npx eslint . --ext js,ts,tsx

.PHONY: test.types
test.types:
	npx tsc