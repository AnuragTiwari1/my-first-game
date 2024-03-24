import { Vec2 } from "kaboom";
import GAME_CONSTANT from "../constant";

export class Food {
  constructor() {}

  respawnFoodAt(newPos: Vec2) {
    destroyAll("apple");
    add([
      sprite("apple"),
      pos(newPos.scale(GAME_CONSTANT.BLOCK_SIZE)),
      scale(0.8),
      area({ offset: vec2(24, 24), scale: 0.5 }),
      "apple",
    ]);
  }

  getNewPositionAvoiding(segments: Vec2[]) {
    let position: Vec2;

    do {
      const v = rand(vec2(0, 0), vec2(20, 20));
      position = vec2(Math.floor(v.x), Math.floor(v.y));
    } while (segments.some((s) => s.eq(position)));

    return position;
  }
}
