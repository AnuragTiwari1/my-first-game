import { Food } from "../components/food";
import { Snake } from "../components/snake";
import GAME_CONSTANT from "../constant";

export const gameScene = () => {
  scene("game", () => {
    const background = add([fixed(), z(0)]);
    const move_delay = 0.5;

    addLevel(
      [
        "####################",
        "#                  #",
        "#                  #",
        "#                  #",
        "#                  #",
        "#                  #",
        "#                  #",
        "#                  #",
        "#                  #",
        "#                  #",
        "#                  #",
        "#                  #",
        "#                  #",
        "#                  #",
        "#                  #",
        "#                  #",
        "#                  #",
        "#                  #",
        "#                  #",
        "####################",
      ],
      {
        tileHeight: 32,
        tileWidth: 32,
        tiles: {
          ["#"]: () => [
            sprite("grass"),
            area({ scale: 0.5, offset: vec2(24, 24) }),
            scale(1 / 3),
            "grass",
          ],
        },
      }
    );

    let run_action = true;
    let timer = 0;
    let hasSnakeGotFood = false;
    let hasGameOver = false;
    let score = 0;

    background.add([sprite("game-background")]);
    const scoreLabel = add([
      text(`${score}`),
      pos(width(), 0),
      anchor("topright"),
      color(255, 0, 0),
    ]);

    const snake = new Snake();
    const food = new Food();

    const gameOver = () => {
      run_action = false;
      hasGameOver = true;
      shake(3);
      add([
        text("Game Over"),
        anchor("center"),
        pos(width() / 2, height() / 2 - 50),
        color(1, 0, 0),
        "ui",
      ]);

      add([
        text(`Score: ${score}`),
        anchor("center"),
        pos(width() / 2, height() / 2 + 50),
        color(1, 1, 1),
        "ui",
      ]);

      add([
        text("Press Enter to restart"),
        anchor("center"),
        pos(width() / 2, height() - 50),
        color(1, 1, 1),
        "ui",
      ]);
    };

    wait(1, () => {
      food.respawnFoodAt(vec2(10, 10));
    });

    onUpdate(() => {
      if (!run_action) return;
      timer += dt();
      if (timer < move_delay) return;
      timer = 0;

      snake.update(hasSnakeGotFood);
      if (hasSnakeGotFood) {
        const newFoodPos = food.getNewPositionAvoiding(
          snake.body.map((e) => e.pos)
        );

        food.respawnFoodAt(newFoodPos);
      }
      hasSnakeGotFood = false;
      snake.draw();
    });

    onKeyPress("h", () => {
      snake.changeDirection(vec2(-1, 0));
    });
    onKeyPress("j", () => {
      snake.changeDirection(vec2(0, 1));
    });
    onKeyPress("k", () => {
      snake.changeDirection(vec2(0, -1));
    });
    onKeyPress("l", () => {
      snake.changeDirection(vec2(1, 0));
    });

    onKeyPress("enter", () => {
      if (hasGameOver) {
        destroyAll("ui");

        snake.reset();
        food.respawnFoodAt(vec2(10, 10));
        run_action = true;
        timer = 0;
        hasGameOver = false;
        score = 0;
        scoreLabel.text = `${score}`;
      }
    });

    onCollide("snake", "apple", () => {
      hasSnakeGotFood = true;
      scoreLabel.text = `${++score}`;
    });

    onCollide("snake", "grass", () => {
      gameOver();
    });

    onCollide("snake", "snake", () => {
      gameOver();
    });
  });
};
