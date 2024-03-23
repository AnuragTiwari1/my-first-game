import kaboom from "kaboom";
import "./style.css";
import { gameScene } from "./scenes/game";

kaboom({
  global: true,
  width: 600,
  height: 600,
  font: "sans-serif",
  canvas: document.querySelector("#myGameCanvas") as any,
});
