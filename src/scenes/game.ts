export const gameScene = () => {
  scene("game", () => {
    // add character to screen, from a list of components
    const player = add([
      sprite("bean"), // renders as a sprite
      pos(120, 80), // position in world
      area(), // has a collider
      body(), // responds to physics and gravity
    ]);

    const viteCharacter = add([sprite("vite"), pos(120, 120)]);

    add([
      rect(width(), 48),
      pos(0, height() - 48),
      outline(4),
      area(),
      body({ isStatic: true }),
      color(127, 200, 255),
    ]);

    add([
      rect(48, 64),
      area(),
      outline(4),
      pos(width(), height() - 48),
      anchor("botleft"),
      color(255, 180, 255),
      move(LEFT, 240),
    ]);

    // jump when player presses "space" key
    onKeyPress("space", () => {
      // .jump() is provided by the body() component
      player.jump();
    });
  });
};
