function turnRight(orientation) {
    const directions = ['N', 'E', 'S', 'W'];
    return directions[(directions.indexOf(orientation) + 1) % 4];
}

function turnLeft(orientation) {
    const directions = ['N', 'W', 'S', 'E'];
    return directions[(directions.indexOf(orientation) + 1) % 4];
}

function moveForward(x, y, orientation, maxX, maxY) {
    if (orientation === 'N' && y < maxY) {
        y += 1;
    } else if (orientation === 'E' && x < maxX) {
        x += 1;
    } else if (orientation === 'S' && y > 0) {
        y -= 1;
    } else if (orientation === 'W' && x > 0) {
        x -= 1;
    }

    return [x, y];
}

function moveMower(position, instructions, maxX, maxY) {
    let [x, y, orientation] = position;
    
    for (let instruction of instructions) {
        if (instruction === 'L') {
            orientation = turnLeft(orientation);
        } else if (instruction === 'R') {
            orientation = turnRight(orientation);
        } else if (instruction === 'F') {
            [x, y] = moveForward(x, y, orientation, maxX, maxY);
        }
    }

    return [x, y, orientation];
}

function main(input) {
    const lines = input.trim().split('\n');
    
    const [maxX, maxY] = lines[0].split(' ').map(Number);
    
    let results = [];
    
    for (let i = 1; i < lines.length; i += 2) {
        const [x, y, orientation] = lines[i].split(' ');
        const instructions = lines[i + 1];
        
        const [finalX, finalY, finalOrientation] = moveMower([parseInt(x), parseInt(y), orientation], instructions, maxX, maxY);
        
        results.push(`${finalX} ${finalY} ${finalOrientation}`);
    }
    
    results.forEach(result => console.log(result));
}

const input = `
5 5
1 2 N
LFLFLFLFF
3 3 E
FFRFFRFRRF
`;

main(input);
