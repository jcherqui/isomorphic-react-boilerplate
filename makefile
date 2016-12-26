install: ## Install application
	@ npm i

build: ## Build with webpack
	@ mkdir -p public
	@ ./node_modules/.bin/webpack -p --progress --colors

run: ## Run application
	@ PORT=9000 ./node_modules/.bin/babel-node src/js/server.js

watch: ## Watch
	@ ./node_modules/.bin/webpack --watch -d

# run: ## Run application
	# @ NODE_ENV=development TARGET=web ./node_modules/.bin/webpack-dev-server \
		# -d \
		# --host=0.0.0.0 \
		# --port 9000 \
		# --colors \
		# --progress \
		# --no-info \
		# --hot \
		# --history-api-fallback \
		# --inline

