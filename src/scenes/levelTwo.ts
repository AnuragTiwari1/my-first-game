import { GameController } from "../controller/gameController";

export const levelTwo = () => {
  scene("levelTwo", () => {
    const controller = new GameController([
      vec2(7, 4),
      vec2(8, 4),
      vec2(9, 4),
      vec2(10, 4),
      vec2(11, 4),
      vec2(12, 4),
      vec2(13, 4),
      vec2(14, 4),
      vec2(7, 15),
      vec2(8, 15),
      vec2(9, 15),
      vec2(10, 15),
      vec2(11, 15),
      vec2(12, 15),
      vec2(13, 15),
      vec2(14, 15),
    ]);

    addLevel(
      [
        "####################",
        "#                  #",
        "#                  #",
        "#                  #",
        "#    #####         #",
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
        "#        #####     #",
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
