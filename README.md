# Snake Game

Jogo da cobrinha nostálgico desenvolvido com Python e HTML.

## Tecnologias

- Python 3.12+
- Flask 3.0
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

O jogo estará disponível em `http://localhost:8000`

## Estrutura do Projeto

```
snake_game/
├── main.py           # Servidor Flask
├── templates/        # Templates HTML
│   └── index.html
├── static/          # Arquivos estáticos
│   ├── css/
│   │   └── style.css
│   └── js/
│       └── game.js
└── pyproject.toml   # Dependências do projeto
```

## Como Jogar

Use as setas do teclado para controlar a direção da cobra:
- ⬆️ Seta para cima
- ⬇️ Seta para baixo
- ⬅️ Seta para esquerda
- ➡️ Seta para direita

Coma a comida para crescer e aumentar sua pontuação. Evite colidir com as paredes ou com o próprio corpo!

