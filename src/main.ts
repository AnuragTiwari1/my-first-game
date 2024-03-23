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

introScene();
gameScene();

go("intro");
