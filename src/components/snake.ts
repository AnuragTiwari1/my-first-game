import { Vec2 } from "kaboom";
import GAME_CONSTANT from "../constant";

export class Snake {
  private segments: { pos: Vec2; spriteName: string }[];
  private direction: Vec2;
  private changeDirectionDisabled: boolean;

  constructor() {
    this.segments = this._getInitialSegment(GAME_CONSTANT.INITIAL_SNAKE_SIZE);
    this.direction = vec2(0, 1); // Initial direction of the snake (moving down)
    this.changeDirectionDisabled = false;
  }

  reset() {
    this.segments = this._getInitialSegment(GAME_CONSTANT.INITIAL_SNAKE_SIZE);
    this.direction = vec2(0, 1); // Initial direction of the snake
  }

  update(shouldGrow: boolean) {
    let updatedSegments: typeof this.segments = [];

    if (shouldGrow) {
      const newHead = this._getNextPositionWithIndex(0, false);
      this.segments = [{ ...this.segments[0], pos: newHead }, ...this.segments];
    }

    for (let i = this.segments.length - 1; i >= 0; i--) {
      let { spriteName } = this.segments[i];
      const newPos = this._getNextPositionWithIndex(i, shouldGrow);

      if (i === 0) {
        spriteName = `head_${this._getNameFromDirection(
          this.direction,
          spriteName.split("_")[1]
        )}`;
      } else if (i === this.segments.length - 1) {
        const nextNodePos = this._getNextPositionWithIndex(i - 1, shouldGrow);
        spriteName = `tail_${this._getNameFromDirection(
          newPos.sub(nextNodePos),
          spriteName.split("_")[1]
        )}`;
      } else {
        const nextNodePos = this._getNextPositionWithIndex(i - 1, shouldGrow);
        const prevNodePos = this._getNextPositionWithIndex(i + 1, shouldGrow);
        const nextDiff = nextNodePos.sub(newPos);
        const prevDiff = newPos.sub(prevNodePos);

        const crossProduct = nextDiff.cross(prevDiff);
        if (crossProduct === 0) {
          spriteName = nextDiff.x === 0 ? "body_vertical" : "body_horizontal";
        } else if (crossProduct > 0) {
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
          }
        } else {
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
          }
        }
      }

      updatedSegments = [{ pos: newPos, spriteName }, ...updatedSegments];
    }

    this.segments = updatedSegments;
    this.changeDirectionDisabled = false;
  }

  changeDirection(dir: Vec2) {
    if (dir.dot(this.direction) === 0 && !this.changeDirectionDisabled) {
      this.direction = dir;
      this.changeDirectionDisabled = true;
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
        area({ scale: 0.5, offset: vec2(24, 24) }),
        scale(0.8),
        "snake",
      ]);
    });
  }

  get body(): typeof this.segments {
    return this.segments;
  }

  private _getNameFromDirection(dir: Vec2, defaultValue?: string) {
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
      return defaultValue || "";
    }
  }

  private _getNextPositionWithIndex(i: number, shouldGrow: boolean) {
    let { pos } = this.segments[i];
    if (shouldGrow) {
      return pos;
    }

    if (i === 0) {
      pos = this.segments[i].pos.add(this.direction);

      if (pos.x >= width() / GAME_CONSTANT.BLOCK_SIZE) {
        pos.x = 0;
      } else if (pos.x < 0) {
        pos.x = width() / GAME_CONSTANT.BLOCK_SIZE;
      }

      if (pos.y >= height() / GAME_CONSTANT.BLOCK_SIZE) {
        pos.y = 0;
      } else if (pos.y < 0) {
        pos.y = height() / GAME_CONSTANT.BLOCK_SIZE;
      }
    } else {
      pos = this.segments[i - 1].pos.clone();
    }

    return pos;
  }

  private _getInitialSegment(size: number) {
    const segments: typeof this.segments = [];
    for (let i = 0; i < size; i++) {
      segments.push({
        pos: vec2(1, size - i),
        spriteName:
          i === 0 ? "head_down" : i === size - 1 ? "tail_up" : "body_vertical",
      });
    }

    return segments;
  }
}
