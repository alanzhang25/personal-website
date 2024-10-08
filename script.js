const skier = document.querySelector('.emoji-skier');
const avoidContainer = document.querySelector('.container');

const windowWidth = window.innerWidth;
const windowHeight = window.innerHeight;

function getRandomStartPosition() {
    const containerRect = avoidContainer.getBoundingClientRect();
    let x, y;

    do {
        x = Math.random() * (windowWidth - skier.offsetWidth);
        y = Math.random() * (windowHeight - skier.offsetHeight);
    } while (
        x + skier.offsetWidth > containerRect.left &&
        x < containerRect.right &&
        y + skier.offsetHeight > containerRect.top &&
        y < containerRect.bottom
    );

    return { x, y };
}

let { x, y } = getRandomStartPosition();

let speed = 4; 
let vx = speed;
let vy = speed; 

function getRandomAngleAdjustment() {
    return (Math.random() - 0.5) * 0.8;
}

function updateSkierPosition() {
    const skierWidth = skier.offsetWidth;
    const skierHeight = skier.offsetHeight;
    const containerRect = avoidContainer.getBoundingClientRect();
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;

    
    x += vx;
    y += vy;


    if (x <= 0 || x + skierWidth >= windowWidth) {
        vx *= -1; // Reverse x direction
        vx += getRandomAngleAdjustment(); // Add slight randomness to the x velocity
        vy += getRandomAngleAdjustment(); // Add slight randomness to the y velocity
    }
    if (y <= 0 || y + skierHeight >= windowHeight) {
        vy *= -1; // Reverse y direction
        vx += getRandomAngleAdjustment(); // Add slight randomness to the x velocity
        vy += getRandomAngleAdjustment(); // Add slight randomness to the y velocity
    }

    // Bounce off the container
    if (
        x + skierWidth > containerRect.left &&
        x < containerRect.right &&
        y + skierHeight > containerRect.top &&
        y < containerRect.bottom
    ) {
        if (x < containerRect.left || x + skierWidth > containerRect.right) {
            vx *= -1; // Reverse x direction if colliding horizontally
        }
        if (y < containerRect.top || y + skierHeight > containerRect.bottom) {
            vy *= -1; // Reverse y direction if colliding vertically
        }
        vx += getRandomAngleAdjustment(); // Add slight randomness to the x velocity
        vy += getRandomAngleAdjustment(); // Add slight randomness to the y velocity
    }


    skier.style.transform = `translate(${x}px, ${y}px)`;


    requestAnimationFrame(updateSkierPosition);
}


requestAnimationFrame(updateSkierPosition);
