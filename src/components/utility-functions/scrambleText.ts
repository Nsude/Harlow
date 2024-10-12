// Function to scramble text
export const scrambleText = (
  element: HTMLElement | null,
  finalText: string,
  duration = 300,
  chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
) => {
  if (!element) return;
  const length = finalText.length;
  let currentFrame = 0;
  const totalFrames = Math.floor(duration / 16.67);
  let scrambledText = "";

  const randomChar = () => chars[Math.floor(Math.random() * length)];

  const scramInterval = setInterval(() => {
    scrambledText = "";
    for (let i = 0; i < length; i++) {
      if (currentFrame >= totalFrames * (i / length)) {
        // reveal current frame text
        scrambledText += finalText[i];
      } else {
        // randomize characters during scramble
        scrambledText += randomChar();
      }
    }
    element.innerText = scrambledText;

    currentFrame++;
    if (currentFrame < totalFrames) return;
    clearInterval(scramInterval);
    element.innerText = finalText;
  }, 16.67);
};
