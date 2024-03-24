import { GameController } from "../controller/gameController";
import GAME_CONSTANT from "../constant";

export const levelOne = () => {
  scene("levelOne", () => {
    const controller = new GameController();

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

    controller.setUpGraphicsAndController();

    onUpdate(() => {
      controller.onUpdate();

      if (controller.currentScore >= GAME_CONSTANT.SCORE_TO_UPGRADE) {
        go("levelTwo");
      }
    });
  });
};
