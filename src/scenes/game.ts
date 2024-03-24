import { GameController } from "../controller/gameController";

export const gameScene = () => {
  scene("game", () => {
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
    });
  });
};
