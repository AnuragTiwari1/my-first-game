import { GameObj, Vec2 } from "kaboom";
import GAME_CONSTANT from "../constant";

export class Snake {
  segments: { pos: Vec2; spriteName: string }[];
  speed: number;
  direction: Vec2;

  constructor() {
    this.segments = [
      { pos: vec2(0, 6), spriteName: "head_down" },
      { pos: vec2(0, 5), spriteName: "body_vertical" },
      { pos: vec2(0, 4), spriteName: "body_vertical" },
      { pos: vec2(0, 3), spriteName: "body_vertical" },
      { pos: vec2(0, 2), spriteName: "body_vertical" },
      { pos: vec2(0, 1), spriteName: "body_vertical" },
      { pos: vec2(0, 0), spriteName: "tail_up" },
    ];
    this.direction = vec2(0, 1); // Initial direction of the snake (moving right)
    this.speed = 1; // Initial speed of the snake
  }

  update() {
    let updatedSegments: typeof this.segments = [];
    for (let i = this.segments.length - 1; i >= 0; i--) {
      let { pos: oldPos, spriteName } = this.segments[i];
      const newPos = this.getNextPositionWithIndex(i);

      if (i === 0) {
        spriteName = `head_${this.getNameFromDirection(this.direction)}`;
      } else if (i === this.segments.length - 1) {
        const nextNodePos = this.getNextPositionWithIndex(i - 1);
        spriteName = `tail_${this.getNameFromDirection(
          newPos.sub(nextNodePos)
        )}`;
      } else {
        const nextNodePos = this.getNextPositionWithIndex(i - 1);
        const prevNodePos = this.getNextPositionWithIndex(i + 1);
        const nextDiff = nextNodePos.sub(newPos);
        const prevDiff = newPos.sub(prevNodePos);

        const crossProduct = nextDiff.cross(prevDiff);
        if (crossProduct === 0) {
          spriteName = nextDiff.x === 0 ? "body_vertical" : "body_horizontal";
        } else if (crossProduct > 0) {
          //snake is moving anti-clockwise
          if (nextDiff.x === -1 || prevDiff.x === -1) {
            spriteName =
              prevDiff.y === 1 || nextDiff.y === 1
                ? "body_bottomright"
                : "body_bottomleft";
            console.log("inside first condition", spriteName);
          } else {
            spriteName =
              prevDiff.y === 1 || nextDiff.y === 1
                ? "body_topright"
                : "body_topleft";
            console.log("inside second condition", spriteName);
          }
        } else {
          //snake is moving clockwise
          //snake is moving anti-clockwise
          if (nextDiff.x === -1 || prevDiff.x === -1) {
            spriteName =
              prevDiff.y === 1 || nextDiff.y === 1
                ? "body_topleft"
                : "body_topright";
            console.log("inside first condition", spriteName);
          } else {
            spriteName =
              prevDiff.y === 1 || nextDiff.y === 1
                ? "body_bottomleft"
                : "body_bottomright";
            console.log("inside second condition", spriteName);
          }
        }
      }

      updatedSegments = [{ pos: newPos, spriteName }, ...updatedSegments];
    }

    this.segments = updatedSegments;
  }

  changeDirection(dir: Vec2) {
    if (dir.dot(this.direction) === 0) {
      this.direction = dir;
    }
  }

  draw() {
    destroyAll("snake");
    this.segments.forEach((segment) => {
      // Draw each segment of the snake
      add([
        sprite(segment.spriteName),
        pos(
          segment.pos.x * GAME_CONSTANT.BLOCK_SIZE,
          segment.pos.y * GAME_CONSTANT.BLOCK_SIZE
        ),
        scale(0.8),
        "snake",
      ]);
    });
  }

  private getNameFromDirection(dir: Vec2) {
    if (dir.eq(vec2(0, 1))) {
      // Moving upwards
      return "down";
    } else if (dir.eq(vec2(0, -1))) {
      // Moving downwards
      return "up";
    } else if (dir.eq(vec2(1, 0))) {
      // Moving rightwards
      return "right";
    } else if (dir.eq(vec2(-1, 0))) {
      // Moving leftwards
      return "left";
    } else {
      // Default sprite name
      return "head_right"; // Choose a default sprite name or handle error as needed
    }
  }

  private getNextPositionWithIndex(i: number) {
    let { pos, spriteName } = this.segments[i];

    if (i === 0) {
      pos = this.segments[i].pos.add(this.direction.scale(this.speed));
    } else {
      pos = this.segments[i - 1].pos.clone();
    }
    return pos;
  }
}
