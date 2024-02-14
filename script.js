const canvas = document.getElementById('solarSystemCanvas');
const ctx = canvas.getContext('2d');
let planetSize = 1;
let satelliteSize = 1;
let textSize = 1;
let textColor = '#fff';

const planets = [
  { name: 'Sun', radius: 50, distance: 0, color: '#FFD700', speed: 0 },
  { name: 'Mercury', radius: 10, distance: 150, color: '#BFBFBF', speed: 0.001 },
  { name: 'Venus', radius: 14, distance: 200, color: '#FFA500', speed: 0.00075 },
  { name: 'Earth', radius: 16, distance: 270, color: '#00BFFF', speed: 0.0005 },
  { name: 'Mars', radius: 15, distance: 330, color: '#FF6347', speed: 0.00035 },
  { name: 'Jupiter', radius: 30, distance: 400, color: '#FF4500', speed: 0.00015 },
  { name: 'Saturn', radius: 28, distance: 500, color: '#DAA520', speed: 0.000075 },
  { name: 'Uranus', radius: 25, distance: 600, color: '#87CEEB', speed: 0.00005 },
  { name: 'Neptune', radius: 24, distance: 700, color: '#0000FF', speed: 0.000025 },
];

const moons = {
  Earth: ['Moon (Luna)'],
  Mars: ['Phobos', 'Deimos'],
  Jupiter: ['Io', 'Europa', 'Ganymede', 'Callisto', 'And many more smaller moons'],
  Saturn: ['Titan', 'Enceladus', 'Mimas', 'Rhea', 'And several other smaller moons and moonlets'],
  Uranus: ['Titania', 'Oberon', 'Umbriel', 'Ariel', 'Miranda'],
  Neptune: ['Triton', 'Nereid']
};

function drawPlanet(x, y, radius, color, name) {
  ctx.beginPath();
  ctx.fillStyle = color;
  ctx.arc(x, y, radius * planetSize, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = textColor;
  ctx.font = `${12 * textSize}px Arial`;
  ctx.fillText(name, x + radius + 10 * planetSize, y + 5 * planetSize);
}

function drawMoon(x, y, radius, color, name) {
  ctx.beginPath();
  ctx.fillStyle = color;
  ctx.arc(x, y, radius * satelliteSize, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = textColor;
  ctx.font = `${10 * textSize}px Arial`;
  ctx.fillText(name, x + radius * satelliteSize + 5, y + 5);
}

function draw() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const centerX = canvas.width / 2;
  const centerY = canvas.height / 2;

  // Background - Milky Way effect
  const bgGradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, Math.max(canvas.width, canvas.height));
  bgGradient.addColorStop(0, '#000');
  bgGradient.addColorStop(1, '#654321'); // Brownish color for a Milky Way look
  ctx.fillStyle = bgGradient;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  planets.forEach((planet) => {
    const angle = planet.speed * Date.now();
    const x = centerX + planet.distance * Math.cos(angle);
    const y = centerY + planet.distance * Math.sin(angle);
    
    // Shooting star effect
    if (Math.random() < 0.01) {
      const starX = Math.random() * canvas.width;
      const starY = Math.random() * canvas.height;
      ctx.beginPath();
      ctx.fillStyle = '#fff';
      ctx.arc(starX, starY, 1, 0, Math.PI * 2);
      ctx.fill();
    }
    
    ctx.beginPath();
    ctx.arc(centerX, centerY, planet.distance, 0, Math.PI * 2);
    ctx.setLineDash([5, 10]);
    ctx.strokeStyle = '#888';
    ctx.stroke();
    ctx.setLineDash([]);
    
    drawPlanet(x, y, planet.radius, planet.color, planet.name);

    if (moons[planet.name]) {
      const moonDistance = planet.radius * 2;
      moons[planet.name].forEach((moon, index) => {
        const moonAngle = (planet.speed * Date.now() / 2) / (index + 2);
        const moonX = x + moonDistance * Math.cos(moonAngle);
        const moonY = y + moonDistance * Math.sin(moonAngle);
        drawMoon(moonX, moonY, 5, '#888', moon);
      });
    }
  });

  requestAnimationFrame(draw);
}

function increasePlanetSize() {
  planetSize += 0.1;
}

function decreasePlanetSize() {
  if (planetSize > 0.1) {
    planetSize -= 0.1;
  }
}

function increaseSatelliteSize() {
  satelliteSize += 0.1;
}

function decreaseSatelliteSize() {
  if (satelliteSize > 0.1) {
    satelliteSize -= 0.1;
  }
}

function increaseTextSize() {
  textSize += 0.1;
}

function decreaseTextSize() {
  if (textSize > 0.1) {
    textSize -= 0.1;
  }
}

function changeTextColor() {
  const colorPicker = document.getElementById('textColor');
  textColor = colorPicker.value;
}

draw();
