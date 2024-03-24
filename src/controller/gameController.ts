import { GameObj, Vec2 } from "kaboom";
import { Snake } from "../components/snake";
import { Food } from "../components/food";

export class GameController {
  //state variables
  private runAction: boolean;
  private timer: number;
  private hasSnakeGotFood: boolean;
  private hasGameOver: boolean;
  private score: number;

  //graphics
  private background: GameObj;
  private scoreLabel: any;

  //game objects
  private snake: Snake;
  private food: Food;

  //constants
  private readonly move_delay = 0.5;

  constructor(private wallCoordinates: Vec2[] = []) {
    this.runAction = true;
    this.timer = 0;
    this.hasSnakeGotFood = false;
    this.hasGameOver = false;
    this.score = 0;

    this.background = add([fixed(), z(0)]);

    this.snake = new Snake();
    this.food = new Food();
  }

  onUpdate() {
    if (!this.runAction) return;
    this.timer += dt();
    if (this.timer < this.move_delay) return;
    this.timer = 0;

    this.snake.update(this.hasSnakeGotFood);
    if (this.hasSnakeGotFood) {
      const newFoodPos = this.food.getNewPositionAvoiding([
        ...this.snake.body.map((e) => e.pos),
        ...this.wallCoordinates,
      ]);

      this.food.respawnFoodAt(newFoodPos);
    }
    this.hasSnakeGotFood = false;
    this.snake.draw();
  }

  setUpGraphicsAndController() {
    this.background.add([sprite("game-background")]);
    this.scoreLabel = add([
      text(`${this.score}`),
      pos(width(), 0),
      anchor("topright"),
      color(255, 0, 0),
    ]);

    wait(1, () => {
      this.food.respawnFoodAt(vec2(10, 10));
    });

    onKeyPress("h", () => {
      this.snake.changeDirection(vec2(-1, 0));
    });
    onKeyPress("j", () => {
      this.snake.changeDirection(vec2(0, 1));
    });
    onKeyPress("k", () => {
      this.snake.changeDirection(vec2(0, -1));
    });
    onKeyPress("l", () => {
      this.snake.changeDirection(vec2(1, 0));
    });

    onKeyPress("enter", () => {
      if (this.hasGameOver) {
        destroyAll("ui");

        this.snake.reset();
        this.food.respawnFoodAt(vec2(10, 10));
        this.runAction = true;
        this.timer = 0;
        this.hasGameOver = false;
        this.score = 0;
        this.scoreLabel.text = `${this.score}`;
      }
    });

    onCollide("snake", "apple", () => {
      this.hasSnakeGotFood = true;
      this.scoreLabel.text = `${++this.score}`;
    });

    onCollide("snake", "grass", () => {
      this.gameOver();
    });

    onCollide("snake", "snake", () => {
      this.gameOver();
    });
  }

  private gameOver = () => {
    this.runAction = false;
    this.hasGameOver = true;
    shake(3);
    add([
      text("Game Over"),
      anchor("center"),
      pos(width() / 2, height() / 2 - 50),
      color(1, 0, 0),
      "ui",
    ]);

    add([
      text(`Score: ${this.score}`),
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
}
