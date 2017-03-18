.PHONY: install run build test

PORT := 8080

check: ## Check dependencies
	@ command -v node > /dev/null 2>&1 || (echo "node is not available please install" && exit 1)
	@ command -v yarn > /dev/null 2>&1 || (echo "yarn is not available please install: npm i -g yarn" && exit 1)

install: check ## Install application
	@ yarn --ignore-engines
	@ ./node_modules/.bin/selenium-standalone install

run: ## Run application
	@ NODE_ENV=production PORT=${PORT} node dist/server.js

dev: ## Run dev environment
	@ NODE_ENV=development PORT=${PORT} ./node_modules/.bin/pm2 --no-daemon start --interpreter ./node_modules/.bin/babel-node src/js/server/server.js --watch \
	& make watch & make browser-sync

watch: ## Watch
	@ mkdir -p dist
	@ ./node_modules/.bin/webpack --watch -d

build: ## Build with webpack
	@ mkdir -p dist
	@ NODE_ENV=production ./node_modules/.bin/babel --minified --compact true -d dist/ src/js/server
	@ NODE_ENV=production ./node_modules/.bin/webpack -p --progress --colors

start-selenium:
	@ ./node_modules/.bin/selenium-standalone start

test: ## Run tests
	@ NODE_ENV=test ./node_modules/.bin/mocha -t 99999999 --compilers js:babel-core/register --require babel-polyfill test/hook.js test/specs/*.spec.js

browser-sync:
	@ ./node_modules/.bin/browser-sync start --proxy "http://0.0.0.0:${PORT}" --files "dist/*"

lint:
	@ ./node_modules/.bin/eslint src/

lint-fix:
	@ ./node_modules/.bin/eslint --fix src/
