
export class Grid {
    private obstacles: any;
    private maxX: number;
    private maxY: number;

    constructor(maxX: number = 100, maxY: number = 100, obstacles = {}) {
        this.maxX = maxX;
        this.maxY = maxY;
        this.obstacles = obstacles;
    }

    isObstacle(coordinates: [number]): boolean {
        return this.obstacles[coordinates[0]] === coordinates[1];
    }

    getMaxX() {
        return this.maxX;
    }

    getMaxY() {
        return this.maxY;
    }

    addObstacle(x, y) {
        if (x <= this.maxX && x >= 0 && y >= 0 && y <= this.maxY) {
            this.obstacles[x] = y;
            return true;
        }
        return false;
    }
}