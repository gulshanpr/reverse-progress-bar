const { createCanvas } = require('canvas');
const fs = require('fs');
const path = require('path');

function generateProgressBarImage(day: any) {
  const width = 1740;
  const height = 346;
  const parts = 365;

  const canvas = createCanvas(width, height);
  const ctx = canvas.getContext('2d');

  ctx.fillStyle = '#ffffff';
  ctx.fillRect(0, 0, width, height);

  const imageBorderWidth = 10;
  ctx.strokeStyle = '#000000';
  ctx.lineWidth = imageBorderWidth;
  ctx.strokeRect(imageBorderWidth / 2, imageBorderWidth / 2, width - imageBorderWidth, height - imageBorderWidth);

  const barHeight = 170;
  const barX = 50;
  const barY = 88;
  const barWidth = width - 100;
  const partWidth = barWidth / parts;

  const progressBarBorderWidth = 5;
  ctx.strokeStyle = '#000000';
  ctx.lineWidth = progressBarBorderWidth;
  ctx.strokeRect(barX, barY, barWidth, barHeight);

  ctx.fillStyle = '#000000';
  ctx.fillRect(barX, barY, partWidth * day, barHeight);

  ctx.fillStyle = '#D4D4D4';
  ctx.fillRect(barX + partWidth * day, barY, barWidth - partWidth * day, barHeight);

  // ctx.fillStyle = '#000000';
  // ctx.font = '50px Arial';
  // ctx.fillText(`Day ${day}/365`, width / 2 - 50, barY + barHeight + 40);

  const buffer = canvas.toBuffer('image/png');
  fs.writeFileSync(path.join(__dirname, `progress-bar-day-${day}.png`), buffer);

  return buffer;
}

generateProgressBarImage(268);
