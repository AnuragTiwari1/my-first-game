import { Food } from "../components/food";
import { Snake } from "../components/snake";

export const gameScene = () => {
  scene("game", () => {
    const background = add([fixed(), z(0)]);
    // const ui = add([fixed(), z(100)]);

    let run_action = true;
    let timer = 0;
    let hasSnakeGotFood = false;
    const move_delay = 0.5;

    background.add([sprite("game-background")]);

    const snake = new Snake();
    const food = new Food();

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

    onKeyDown("space", () => {
      run_action = false;
    });

    onKeyRelease("space", () => {
      run_action = true;
    });

    onCollide("snake", "apple", () => {
      hasSnakeGotFood = true;
    });
  });
};
