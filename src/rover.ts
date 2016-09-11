
import { Grid } from "./grid";

export class Rover {
    private x: number; // Rover" x coordinate
    private y: number; // Rover" y coordinate
    private direction: string; // Rover direction: N S E W
    private grid: Grid;

    constructor(x: number = 0, y: number = 0, direction: string = "N", grid: Grid = new Grid()) {
        this.setX(x);
        this.setY(y);
        this.x = this.x || 0;
        this.y = this.y || 0;
        this.setDirection(direction);
        this.direction = this.direction || "N";
        this.grid = grid;
    }

    /**
     * Return the current position [x, y] of the rover
     */
    getPosition() {
        return [this.x, this.y];
    }

    setX(x: number) {
        if (x >= 0) {
            this.x = x;
        }
    }

    setY(y: number) {
        if (y >= 0) {
            this.y = y;
        }
    }

    /**
     *  Return the current direction N S E W of the rover
     */
    getDirection() {
        return this.direction;
    }

    /**
     * set the direction of the rover to the given value if it is valid 
     * i.e N or S or E or W - it"s case insensitive
     */
    setDirection(direction: string = "") {
        if (["N", "S", "E", "W"].indexOf(direction.toUpperCase()) > -1) {
            this.direction = direction.toUpperCase();
        }
    }

    setGrid(grid: Grid) {
        this.grid = grid;
    }

    getGrid() {
        return this.grid;
    }

    /**
     * Move the rover forward in the current direction
     */
    moveForward() {
        let lookupX = this.x;
        let lookupY = this.y;

        switch (this.direction) {
            case "N":
                lookupY++;
                break;
            case "S":
                lookupY--;
                break;
            case "E":
                lookupX++;
                break;
            case "W":
                lookupX--;
                break;
        }
        return this._adjustAndValidateMove(lookupX, lookupY);
    }

    /**
    * Move the rover backward to the current direction
    */
    moveBackward() {
        let lookupX = this.x;
        let lookupY = this.y;
        switch (this.direction) {
            case "N":
                lookupY--;
                break;
            case "S":
                lookupY++;
                break;
            case "E":
                lookupX--;
                break;
            case "W":
                lookupX++;
                break;
        }
        return this._adjustAndValidateMove(lookupX, lookupY);
    }

    /**
     * Set the direction to the right according to the current direction
     */
    turnLeft() {
        switch (this.direction) {
            case "N":
                this.direction = "W";
                break;
            case "S":
                this.direction = "E";
                break;
            case "E":
                this.direction = "N";
                break;
            case "W":
                this.direction = "S";
                break;
        }
        return {
            success: true,
            message: "",
            currentPosition: [this.x, this.y],
            currentDirection: this.direction
        };
    }

    /**
     * Set direction to the left according to the current direction
     */
    turnRight() {
        switch (this.direction) {
            case "N":
                this.direction = "E";
                break;
            case "S":
                this.direction = "W";
                break;
            case "E":
                this.direction = "S";
                break;
            case "W":
                this.direction = "N";
                break;
        }
        return {
            success: true,
            message: "",
            currentPosition: [this.x, this.y],
            currentDirection: this.direction
        };
    }

    /**
     * wrap from one edge of the grid to another when necessary and check for obstacles
     */
    _adjustAndValidateMove(lookupX: number, lookupY: number) {
        if (lookupX > this.grid.getMaxX()) {
            lookupX = 0;
        } else if (lookupX < 0) {
            lookupX = this.grid.getMaxX();
        }
        if (lookupY > this.grid.getMaxY()) {
            lookupY = 0;
        } else if (lookupY < 0) {
            lookupY = this.grid.getMaxY();
        }
        if (this.grid.isObstacle([lookupX, lookupY])) {
            return {
                success: false,
                message: `Obstacle found at [${lookupX}, ${lookupY}]`,
                currentPosition: [this.x, this.y],
                currentDirection: this.direction
            };
        } else {
            this.x = lookupX;
            this.y = lookupY;
            return {
                success: true,
                message: "",
                currentPosition: [this.x, this.y],
                currentDirection: this.direction
            };
        }

    }

    /**
     * Receive a array of string or a string and perform each command corresponding to caracters 
     * F= forward, B=backward, L=left, R=right - it is case insensitive. 
     */
    receiveCommands(commands: string | Array<string>) {
        let finalResult = {
            success: false,
            message: `Invalid commands ${commands}`,
            currentPosition: [this.x, this.y],
            currentDirection: this.direction
        };
        for (let i = 0; i < commands.length; i++) {
            let command = commands[i];
            switch (command.toUpperCase()) {
                case "F":
                    finalResult = this.moveForward();
                    break;
                case "B":
                    finalResult = this.moveBackward();
                    break;
                case "L":
                    finalResult = this.turnLeft();
                    break;
                case "R":
                    finalResult = this.turnRight();
                    break;
                default:
                    finalResult = {
                        success: false,
                        message: `Invalid command ${command}`,
                        currentPosition: [this.x, this.y],
                        currentDirection: this.direction
                    };
            }
            if (!finalResult.success) {
                break;
            }
        }
        return finalResult;

    }
}