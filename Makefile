.PHONY: run
run:
	@echo "🚀 Rodando Projeto..."
	npm run dev --prefix website

.PHONY: lint
lint:
	npm run lint --prefix website