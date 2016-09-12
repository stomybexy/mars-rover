
import * as prompt from "prompt";
import { Grid } from "./rover";
import { Rover } from "./rover";

let schema = {
    properties: {
        maxX: {
            pattern: /^\d+$/,
            message: "maxX must be a positive integer",
            required: true
        },
        maxY: {
            pattern: /^\d+$/,
            message: "maxY must be a positive integer",
            required: true
        },
        obstacles: {
            pattern: /^\d+:\d+(,\d+:\d+)*$/,
            message: "obstacles must be in the form x1:y1,x2:y2, ... where xi, yi are positive integers",
            required: false
        },
        x: {
            pattern: /^\d+$/,
            message: "x must be a positive integer",
            required: true
        },
        y: {
            pattern: /^\d+$/,
            message: "y must be a positive integer",
            required: true
        },
        direction: {
            pattern: /^[nsewNSEW]$/,
            message: "invalid direction. Possible values: n s e w N S E W",
            required: true
        },
        commands: {
            required: false
        }
    }
};
prompt.start();
prompt.get(schema, (err, res) => {
    if (err) {
        return onError(err);
    }
    let obstacles = {};
    res.obstacles.split(",").forEach((coord) => {
        let point = coord.split(":").map((xOrY) => Number(xOrY.trim()));
        obstacles[point[0]] = point[1];
    });
    let grid = new Grid(+res.maxX, +res.maxY, obstacles);
    let rover = new Rover(+res.x, +res.y, res.direction, grid);
    let result = rover.receiveCommands(res.commands);
    console.log(result);
});

function onError(err) {
    console.log(err);
    return 1;
}