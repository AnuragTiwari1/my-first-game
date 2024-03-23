export const introScene = () => {
  scene("intro", () => {
    add([sprite("preview")]);

    // Add text
    add([
      text("Welcome to the Snake Game!", {
        size: 24, // Font size
      }),
      pos(width() / 2, height() / 2), // Position the text in the center
      anchor("center"), // Center the text's origin point
    ]);

    add([
      text("Press [H], [J], [K], [L] for controls", {
        size: 16, // Adjust the size as needed
      }),
      pos(20, height() - 40), // Position it at the bottom left, adjust as necessary
      anchor("left"), // Align text to the left
    ]);

    // Prompt to start
    add([
      text('Press "Space" to start', {
        size: 16, // Adjust the size as needed
      }),
      pos(20, height() - 20), // Position it slightly below the first line
      anchor("left"), // Align text to the left
    ]);

    onKeyRelease("space", () => {
      go("game");
    });
  });
};
