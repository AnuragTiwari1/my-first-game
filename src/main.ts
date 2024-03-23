import kaboom from "kaboom";
import "./style.css";
import { gameScene, introScene } from "./scenes";

kaboom({
  global: true,
  width: 640,
  height: 640,
  font: "sans-serif",
  canvas: document.querySelector("#myGameCanvas") as any,
});

loadSprite("preview", "preview.png");
loadSprite("game-background", "game-background.png");
loadSprite("head_down", "head_down.png");
loadSprite("head_left", "head_left.png");
loadSprite("head_right", "head_right.png");
loadSprite("head_up", "head_up.png");
loadSprite("tail_down", "tail_down.png");
loadSprite("tail_left", "tail_left.png");
loadSprite("tail_right", "tail_right.png");
loadSprite("tail_up", "tail_up.png");
loadSprite("body_bottomleft", "body_bottomleft.png");
loadSprite("body_bottomright", "body_bottomright.png");
loadSprite("body_horizontal", "body_horizontal.png");
loadSprite("body_topleft", "body_topleft.png");
loadSprite("body_topright", "body_topright.png");
loadSprite("body_vertical", "body_vertical.png");

introScene();
gameScene();

go("intro");
