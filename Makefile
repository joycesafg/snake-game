.DEFAULT_GOAL := help
.PHONY: help install install-dev run dev start test test-verbose test-cov clean

# Colors for output
BLUE := \033[0;34m
GREEN := \033[0;32m
YELLOW := \033[0;33m
NC := \033[0m # No Color

help: ## Show this help message
	@echo "$(BLUE)Snake Game - Available Commands$(NC)"
	@echo ""
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | \
		awk 'BEGIN {FS = ":.*?## "}; {printf "  $(GREEN)%-20s$(NC) %s\n", $$1, $$2}'
	@echo ""

install: ## Install production dependencies
	@echo "$(YELLOW)Installing production dependencies...$(NC)"
	uv sync

install-dev: ## Install all dependencies including dev tools
	@echo "$(YELLOW)Installing all dependencies...$(NC)"
	uv sync --extra dev

run: ## Run development server (alias for 'dev')
	@$(MAKE) dev

dev: ## Run development server with auto-reload
	@echo "$(GREEN)Starting development server on http://localhost:8000$(NC)"
	uv run uvicorn main:app --reload --host 0.0.0.0 --port 8000

start: ## Run production server
	@echo "$(GREEN)Starting production server on http://localhost:8000$(NC)"
	uv run python main.py

test: ## Run all tests
	@echo "$(YELLOW)Running tests...$(NC)"
	uv run pytest tests/

test-verbose: ## Run tests with verbose output
	@echo "$(YELLOW)Running tests (verbose)...$(NC)"
	uv run pytest tests/ -v

test-cov: ## Run tests with coverage report
	@echo "$(YELLOW)Running tests with coverage...$(NC)"
	uv run pytest tests/ -v --cov=. --cov-report=term-missing

clean: ## Clean temporary files and caches
	@echo "$(YELLOW)Cleaning temporary files...$(NC)"
	find . -type d -name "__pycache__" -exec rm -rf {} + 2>/dev/null || true
	find . -type d -name ".pytest_cache" -exec rm -rf {} + 2>/dev/null || true
	find . -type d -name "*.egg-info" -exec rm -rf {} + 2>/dev/null || true
	find . -type f -name "*.pyc" -delete 2>/dev/null || true
	find . -type f -name "*.pyo" -delete 2>/dev/null || true
	find . -type f -name ".coverage" -delete 2>/dev/null || true
	find . -type d -name ".coverage" -exec rm -rf {} + 2>/dev/null || true
	find . -type d -name "htmlcov" -exec rm -rf {} + 2>/dev/null || true
	@echo "$(GREEN)Clean complete!$(NC)"

setup: install-dev ## Initial setup for new developers
	@echo "$(GREEN)Setup complete! Run 'make dev' to start the server.$(NC)"
