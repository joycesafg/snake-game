# Snake Game

Jogo da cobrinha nostálgico desenvolvido com Python e HTML.

## Tecnologias

- Python 3.12+
- FastAPI 0.115+
- Uvicorn (ASGI server)
- HTML5 Canvas
- JavaScript
- CSS3

## Início Rápido

### Usando Make (Recomendado)

```bash
# Instalar dependências
make install-dev

# Executar servidor de desenvolvimento
make dev

# Executar testes
make test
```

Para ver todos os comandos disponíveis:
```bash
make help
```

### Comandos Make Disponíveis

| Comando | Descrição |
|---------|-----------|
| `make help` | Mostra todos os comandos disponíveis |
| `make install` | Instala dependências de produção |
| `make install-dev` | Instala todas as dependências (incluindo dev) |
| `make dev` | Executa servidor com auto-reload (desenvolvimento) |
| `make run` | Alias para `make dev` |
| `make start` | Executa servidor em modo produção |
| `make test` | Executa todos os testes |
| `make test-verbose` | Executa testes com output detalhado |
| `make test-cov` | Executa testes com relatório de cobertura |
| `make clean` | Remove arquivos temporários e caches |
| `make setup` | Setup inicial completo para novos desenvolvedores |

### Instalação Manual

```bash
uv sync --extra dev
```

### Execução Manual

```bash
# Modo desenvolvimento
uv run uvicorn main:app --reload --host 0.0.0.0 --port 8000

# Modo produção
uv run python main.py
```

O jogo estará disponível em `http://localhost:8000`

### Testes Manuais

```bash
uv run pytest tests/ -v
```

## Estrutura do Projeto

```
snake_game/
├── main.py           # Servidor FastAPI
├── Makefile          # Comandos de automação
├── templates/        # Templates HTML
│   └── index.html
├── static/          # Arquivos estáticos
│   ├── css/
│   │   └── style.css
│   └── js/
│       └── game.js
├── tests/           # Testes automatizados
│   ├── __init__.py
│   └── test_main.py
└── pyproject.toml   # Dependências do projeto
```

## Como Jogar

Use as setas do teclado para controlar a direção da cobra:
- ⬆️ Seta para cima
- ⬇️ Seta para baixo
- ⬅️ Seta para esquerda
- ➡️ Seta para direita

Coma a comida para crescer e aumentar sua pontuação. Evite colidir com as paredes ou com o próprio corpo!

