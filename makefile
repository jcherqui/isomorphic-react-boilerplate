.PHONY: install run build test

PORT := 8080

check: ## Check dependencies
	@ command -v node > /dev/null 2>&1 || (echo "node is not available please install" && exit 1)
	@ command -v yarn > /dev/null 2>&1 || (echo "yarn is not available please install: npm i -g yarn" && exit 1)

install: check ## Install application
	@ yarn --ignore-engines
	@ ./node_modules/.bin/selenium-standalone install

run: ## Run application
	@ NODE_ENV=production PORT=${PORT} node public/index.js

dev: ## Run dev environment
	@ PORT=${PORT} NODE_ENV=development ./node_modules/.bin/pm2 start --watch src/ --no-daemon src/server/index.js --interpreter ./node_modules/.bin/babel-node & make watch

watch: ## Watch
	@ mkdir -p public
	@ ./node_modules/.bin/webpack --watch -d

build: ## Build with webpack
	@ rm -rf public && mkdir -p public
	@ NODE_ENV=production ./node_modules/.bin/babel --minified --no-comments --compact true -d public/ src/server
	@ NODE_ENV=production ./node_modules/.bin/webpack -p --progress --colors

start-selenium:
	@ ./node_modules/.bin/selenium-standalone start

test: ## Run tests
	@ NODE_ENV=test ./node_modules/.bin/mocha -t 99999999 --require babel-register --require babel-polyfill test/hook.js test/specs/*.spec.js

browser-sync:
	@ ./node_modules/.bin/browser-sync start --proxy "http://0.0.0.0:${PORT}" --files "public/*"

lint:
	@ ./node_modules/.bin/eslint src/

lint-fix:
	@ ./node_modules/.bin/eslint --fix src/
