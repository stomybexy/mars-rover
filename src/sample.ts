
import * as prompt from "prompt";

import { Grid } from "./grid";
import { Rover } from "./rover";

prompt.start();

prompt.get(["maxX", "maxY", "obstacles", "x", "y", "direction", "commands"], (err, res) => {
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