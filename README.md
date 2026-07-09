# Jogo Online
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black)

Jogo de plataforma 2D feito em JavaScript puro com HTML5 Canvas, direto no navegador, sem frameworks e sem build.

## Sobre

Um platformer com 3 fases de temática e dificuldade crescente, personagem original animado, física própria (com double jump), inimigos com comportamentos e aparências diferentes por fase, trilha sonora e efeitos sonoros gerados por código via Web Audio API, e um menu completo com seleção de fase e configurações.

## Funcionalidades

- **3 fases**: Campo, Castelo abandonado e Vulcão em erupção, cada uma com cenário, paleta e inimigos próprios
- **Personagem** com animação de andar e pulo duplo (double jump)
- **Inimigos únicos por fase**: slime, fantasma flutuante e criatura de fogo
- **Física por tempo real** (delta time), consistente independente do FPS
- **Áudio 100% gerado por código**: música de fundo diferente por fase e efeitos sonoros (pulo, moeda, inimigo derrotado, dano, vitória/derrota), sem arquivos externos
- **Menu principal**: Iniciar Jogo, seleção de Fases e Configurações (som e tela cheia)
- **Controles touch** para celular, além do teclado
- **Tela cheia** e layout responsivo

## Controles

- **Mover**: setas ou A/D
- **Pular**: espaço ou seta para cima (dá pra pular 2x no ar)

## Stack

- HTML5 Canvas
- JavaScript (vanilla, sem frameworks)
- CSS puro
- Web Audio API (música e efeitos sonoros)

---

## Como rodar localmente

Não precisa de instalação. Só abrir o `index.html` no navegador, ou rodar com um live server (ex: extensão Live Server do VS Code).
