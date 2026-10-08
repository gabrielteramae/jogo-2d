# Jogo 2D — plataforma no canvas

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black)

Platformer em canvas, sem framework. Três fases no menu: Campo, Castelo e Vulcão. HUD de moedas, vidas e fase. O canonical do HTML é [gabrielteramae.github.io/jogo-2d](https://gabrielteramae.github.io/jogo-2d/).

| Escolha | Motivo |
| --- | --- |
| Áudio no próprio `game.js` | Música e efeitos saem da Web Audio API, sem arquivo de som no repositório |

## Stack

- HTML5 Canvas, CSS e JavaScript
- Web Audio API

## Estrutura

```
index.html
style.css
game.js
```

## Como rodar

```bash
git clone https://github.com/gabrielteramae/jogo-2d.git
cd jogo-2d
```

Abra `index.html` no navegador.

Controles: setas ou A/D para mover, espaço ou seta para cima para pular (dois pulos). No celular, os botões da tela. O menu também liga e desliga o som e a tela cheia.

---

© 2026 Gabriel Teramae Chan
