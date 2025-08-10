# Clone do Flappy Bird com Phaser 3 🕊
## https://foxmoondev.github.io/Flappybird/ <------------- Play Game 🎮
![demo](https://github.com/user-attachments/assets/65e6a8be-7802-4a5a-918e-d83266edac23)

Este é um clone fiel do clássico jogo "Flappy Bird", desenvolvido do zero em JavaScript puro utilizando o framework de jogos 2D [Phaser 3](https://phaser.io/).

O projeto foi criado para ser um jogo de navegador leve e funcional, recriando a experiência original, desde a física do pássaro e a geração de obstáculos até o fluxo completo de jogo com menu, pontuação e tela de fim de jogo.

## Screenshot do Jogo

**Instrução:** Grave um GIF curto do seu jogo (usando um programa como [ScreenToGif](https://www.screentogif.com/) ou LICEcap) ou tire uma screenshot, nomeie o arquivo como `gameplay.gif` (ou `gameplay.png`) e coloque-o na pasta principal do seu projeto. A imagem abaixo aparecerá automaticamente.

![Gameplay do Flappy Bird](gameplay.gif)

---

## ✨ Features (Funcionalidades)

*   **Controles Simples:** Jogue com um único clique do mouse ou com a barra de espaço.
*   **Física Fiel:** Gravidade e força de pulo ("flap") calibradas para se parecerem com o jogo original.
*   **Geração Procedural de Canos:** Os obstáculos são gerados infinitamente e com alturas aleatórias, garantindo que cada partida seja única.
*   **Detecção de Colisão:** O jogo detecta colisões com os canos e com o chão.
*   **Sistema de Pontuação:** Marque um ponto para cada par de canos que conseguir atravessar.
*   **Fluxo de Jogo Completo:**
    *   Tela de Início "Get Ready".
    *   Sessão de jogo principal.
    *   Tela de "Game Over" com a pontuação final.
*   **Melhor Pontuação (Best Score):** O jogo salva sua maior pontuação no navegador usando `localStorage`.
*   **Animações e Assets:** Utiliza os sprites clássicos para o pássaro (com animação de bater de asas), canos, fundo e chão.

---

## 🛠️ Tecnologias Utilizadas

*   **JavaScript (ES6+)**
*   **Phaser 3** - Framework principal para a lógica do jogo, física e renderização.
*   **HTML5 Canvas** - Renderizado pelo Phaser para exibir o jogo.
*   **CSS3** - Para estilização básica da página.
*   **Visual Studio Code** - Editor de código recomendado.
*   **Live Server** (Extensão do VS Code) - Para rodar o projeto em um servidor de desenvolvimento local.

---

## 📂 Estrutura do Projeto
* /
* ├── assets/ # Pasta contendo todas as imagens (.png) do jogo.
* ├── index.html # O ponto de entrada da aplicação. Carrega o Phaser e o script do jogo.
* ├── game.js # O coração do projeto. Contém toda a lógica e as cenas do jogo em JavaScript.
* └── README.md # Este arquivo.
