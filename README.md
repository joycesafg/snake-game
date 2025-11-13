# Snake Game

Jogo da cobrinha nostálgico desenvolvido com Python e HTML.

## Tecnologias

- Python 3.12+
- FastAPI 0.115+
- Uvicorn (ASGI server)
- HTML5 Canvas
- JavaScript
- CSS3

## Instalação

```bash
uv sync
```

## Execução

```bash
uv run python main.py
```

Ou usando Uvicorn diretamente:

```bash
uv run uvicorn main:app --host 0.0.0.0 --port 8000
```

O jogo estará disponível em `http://localhost:8000`

## Testes

Execute os testes com pytest:

```bash
uv run pytest tests/ -v
```

## Estrutura do Projeto

```
snake_game/
├── main.py           # Servidor FastAPI
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

