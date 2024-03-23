import { Snake } from "../components/snake";
import GAME_CONSTANT from "../constant";

const _blockSize = 32;

export const gameScene = () => {
  scene("game", () => {
    const background = add([fixed(), z(0)]);
    const ui = add([fixed(), z(100)]);

    let run_action = true;
    let timer = 0;
    const move_delay = 0.5;

    background.add([sprite("game-background")]);

    const snake = new Snake();

    onUpdate(() => {
      if (!run_action) return;
      timer += dt();
      if (timer < move_delay) return;
      timer = 0;

      snake.update();
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
  });
};
