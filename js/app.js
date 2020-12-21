const field = document.querySelector('.field');
const cellSize = 100;

const empty = {
    value: 0,
    top: 0,
    left: 0
}

const cells =[];
cells.push(empty)

function move(index) {
    const cell = cells[index];

    const leftDiff = Math.abs(empty.left - cell.left);
    const topDiff = Math.abs(empty.top - cell.top);

    if (leftDiff + topDiff > 1) {
        return;
    }

    cell.element.style.left = `${empty.left * cellSize}px`;
    cell.element.style.top = `${empty.top * cellSize}px`;

    const emptyLeft = empty.left;
    const emptyTop = empty.top;
    empty.left = cell.left;
    empty.top = cell.top;
    cell.left = emptyLeft;
    cell.top = emptyTop;

    const isFinished = cells.every(cell => {
        return cell.value === cell.top * 4 + cell.left
    });

    if (isFinished) {
        alert('You win!');
    }
}

const numbers = [...Array(15).keys()]
    .sort(() => Math.random() - 0.5);

for (let i = 1; i <= 15; i++) {
    const cell = document.createElement('div');
    const value = numbers[i - 1] + 1;
    cell.className = 'cell'
    cell.innerHTML = value;

    const left = i % 4;
    const top = (i - left) / 4;

    cells.push({
        value,
        left,
        top,
        element: cell
    })

    cell.style.left = `${left * cellSize}px`;
    cell.style.top = `${top * cellSize}px`;

    field.append(cell);

    cell.addEventListener('click', () => {
        move(i);
    })
}