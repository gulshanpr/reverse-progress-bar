const { createCanvas } = require("canvas");
const fs = require("fs");
const path = require("path");

function generateProgressBarImage(day: any) {
  const width = 1740;
  const height = 346;
  const parts = 365;
  const padding = 55;

  const canvas = createCanvas(width, height);
  const ctx = canvas.getContext("2d");

  ctx.fillStyle = "#ffffff";
  ctx.fillRect(0, 0, width, height);

  const imageBorderWidth = 6;
  ctx.strokeStyle = "#000000";
  ctx.lineWidth = imageBorderWidth;
  ctx.strokeRect(padding, padding, width - padding * 2, height - padding * 2);

  const barHeight = 170;
  const barX = padding + 45;
  const barY = padding + 35;
  const barWidth = width - (padding + 50) * 2;
  const partWidth = barWidth / parts;

  const progressBarBorderWidth = 6;
  ctx.strokeStyle = "#000000";
  ctx.lineWidth = progressBarBorderWidth;
  ctx.strokeRect(barX, barY, barWidth, barHeight);

  ctx.fillStyle = "#3D8240";
  ctx.fillRect(barX, barY, partWidth * day, barHeight);

  ctx.fillStyle = "#ffffff";
  ctx.fillRect(
    barX + partWidth * day,
    barY,
    barWidth - partWidth * day,
    barHeight
  );

  // const percentage = (day/365 * 100).toFixed(1);
  // ctx.fillStyle = "#000000";
  // ctx.font = "50px Arial";
  // ctx.fillText(`${percentage}% left of 2024` , width / 2 - 180 , barY + barHeight - 217);

  const buffer = canvas.toBuffer("image/png");
  fs.writeFileSync(path.join(__dirname, `progress-bar-day-${day}.png`), buffer);

  return buffer;
}

generateProgressBarImage(365 - 268);
