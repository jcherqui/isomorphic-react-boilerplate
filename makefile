install: ## Install application
	@ npm i

run: ## Run application
	@ echo '* Start webpack dev server *'
	@ NODE_ENV=development TARGET=web ./node_modules/.bin/webpack-dev-server \
		-d \
		--host=0.0.0.0 \
		--port 9000 \
		--colors \
		--progress \
		--no-info \
		--hot \
		--history-api-fallback \
		--inline

build: ## Build with webpack
	@ mkdir -p dist
	@ ./node_modules/.bin/webpack -p --progress --colors
