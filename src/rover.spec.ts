
import { Rover } from "./rover";
import { Grid } from "./grid";

describe("Rover => ", function () {

    describe("Constructor", function () {
        let rover: Rover;

        beforeAll(function () {
            rover = rover = new Rover(10, 20, "N");
        });

        it("Should create a rover with the given initial position", function () {
            expect(rover.getPosition()).toEqual([10, 20]);
        });

        it("Should create a rover with the given inital direction", function () {
            expect(rover.getDirection()).toBe("N");
        });
    });
    describe("move", function () {
        let rover: Rover;

        beforeEach(function () {
            let obstacles = {};
            rover = new Rover(5, 8, "N", new Grid(100, 150, obstacles));
        });

        describe("moveForward", function () {

            it("should move towards North when facing North", function () {
                rover.setDirection("N");
                let expected = [5, 9];
                rover.moveForward();
                expect(rover.getPosition()).toEqual(expected);
            });

            it("should move towards South when facing South", function () {
                rover.setDirection("S");
                let expected = [5, 7];
                rover.moveForward();
                expect(rover.getPosition()).toEqual(expected);
            });

            it("should move towards East when facing East", function () {
                rover.setDirection("E");
                let expected = [6, 8];
                rover.moveForward();
                expect(rover.getPosition()).toEqual(expected);
            });

            it("should move towards West when facing West", function () {
                rover.setDirection("W");
                let expected = [4, 8];
                rover.moveForward();
                expect(rover.getPosition()).toEqual(expected);
            });
        });

        describe("moveBackward", function () {

            it("should move towards South when facing North", function () {
                rover.setDirection("N");
                let expected = [5, 7];
                rover.moveBackward();
                expect(rover.getPosition()).toEqual(expected);
            });

            it("should move towards North when facing South", function () {
                rover.setDirection("S");
                let expected = [5, 9];
                rover.moveBackward();
                expect(rover.getPosition()).toEqual(expected);
            });

            it("should move towards West when facing East", function () {
                rover.setDirection("E");
                let expected = [4, 8];
                rover.moveBackward();
                expect(rover.getPosition()).toEqual(expected);
            });

            it("should move towards East when facing West", function () {
                rover.setDirection("W");
                let expected = [6, 8];
                rover.moveBackward();
                expect(rover.getPosition()).toEqual(expected);
            });
        });

        describe("turnRight", function () {
            it("Should set the direction to East when facing North", function () {
                rover.setDirection("N");
                let expected = "E";
                rover.turnRight();
                expect(rover.getDirection()).toBe(expected);
            });

            it("Should set the direction to West when facing South", function () {
                rover.setDirection("S");
                let expected = "W";
                rover.turnRight();
                expect(rover.getDirection()).toBe(expected);
            });

            it("Should set the direction to South when facing East", function () {
                rover.setDirection("E");
                let expected = "S";
                rover.turnRight();
                expect(rover.getDirection()).toBe(expected);
            });

            it("Should set the direction to North when facing West", function () {
                rover.setDirection("W");
                let expected = "N";
                rover.turnRight();
                expect(rover.getDirection()).toBe(expected);
            });
        });

        describe("turnLeft", function () {
            it("Should set the direction to West when facing North", function () {
                rover.setDirection("N");
                let expected = "W";
                rover.turnLeft();
                expect(rover.getDirection()).toBe(expected);
            });

            it("Should set the direction to East when facing South", function () {
                rover.setDirection("S");
                let expected = "E";
                rover.turnLeft();
                expect(rover.getDirection()).toBe(expected);
            });

            it("Should set the direction to North when facing East", function () {
                rover.setDirection("E");
                let expected = "N";
                rover.turnLeft();
                expect(rover.getDirection()).toBe(expected);
            });

            it("Should set the direction to South when facing West", function () {
                rover.setDirection("W");
                let expected = "S";
                rover.turnLeft();
                expect(rover.getDirection()).toBe(expected);
            });
        });

        describe("adjustAndValidateMove", function () {
            it("should wrap from  edge Est of the grid to the West one", function () {
                let lookupX = 101;
                let lookupY = 16;
                let expectedPosition = [0, 16];
                let result = rover._adjustAndValidateMove(lookupX, lookupY);
                expect(rover.getPosition()).toEqual(expectedPosition);
            });

            it("should wrap from  edge West of the grid to the Est one", function () {
                let lookupX = -1;
                let lookupY = 16;
                let expectedPosition = [100, 16];
                let result = rover._adjustAndValidateMove(lookupX, lookupY);
                expect(rover.getPosition()).toEqual(expectedPosition);
            });

            it("should wrap from  edge North of the grid to the South one", function () {
                let lookupX = 48;
                let lookupY = 151;
                let expectedPosition = [48, 0];
                let result = rover._adjustAndValidateMove(lookupX, lookupY);
                expect(rover.getPosition()).toEqual(expectedPosition);
            });

            it("should wrap from  edge South of the grid to the North one", function () {
                let lookupX = 48;
                let lookupY = -1;
                let expectedPosition = [48, 150];
                let result = rover._adjustAndValidateMove(lookupX, lookupY);
                expect(rover.getPosition()).toEqual(expectedPosition);
            });

        });

        describe("receiveCommands", function () {
            let commands;

            beforeEach(function () {
                commands = "FLFRFFRFFLFRFLBRFLBR";
                rover.setDirection("N");
                rover.setX(1);
                rover.setY(1);
            });

            it("should perform the given sequence of commands until the target position without obstacles", function () {
                let expectedPosition = [4, 3];
                let expectedDirection = "E";
                let result = rover.receiveCommands(commands);
                expect(rover.getPosition()).toEqual(expectedPosition);
                expect(rover.getDirection()).toBe(expectedDirection);
            });

            it("should stop to the position before obstacle and report", function () {
                rover.getGrid().addObstacle(1, 4);
                let expectedPosition = [0, 4];
                let expectedDirection = "E";
                let report = {
                    success: false,
                    message: "Obstacle found at [1, 4]",
                    currentPosition: expectedPosition,
                    currentDirection: expectedDirection
                };
                let result = rover.receiveCommands(commands);
                expect(rover.getPosition()).toEqual(expectedPosition);
                expect(rover.getDirection()).toBe(expectedDirection);
                expect(result).toEqual(report);
            });
        });
    });
});
