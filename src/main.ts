import kaboom from "kaboom";
import "./style.css";
import typescriptLogo from "./typescript.svg";
import viteLogo from "/vite.svg";
import { gameScene } from "./scenes/game";

kaboom({
  global: true,
  width: 320,
  height: 240,
  font: "sans-serif",
  canvas: document.querySelector("#myGameCanvas") as any,
  background: [0, 0, 255],
});

setGravity(2000);
loadBean();
loadSprite("vite", viteLogo);

gameScene();

go("game");
