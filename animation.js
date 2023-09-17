document.addEventListener('DOMContentLoaded', (event) => {
    const h1 = document.querySelector('h1');
    let op = 0;
    let isIncreasing = true;

    setInterval(() => {
        if (isIncreasing) {
            op += 0.01;
        } else {
            op -= 0.01;
        }

        if (op > 1 && isIncreasing) {
            isIncreasing = false;
        } else if (op < 0 && !isIncreasing) {
            isIncreasing = true;
        }

        h1.style.opacity = op;
    }, 30);
});
