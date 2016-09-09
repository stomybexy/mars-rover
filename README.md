# mars-rover
The mars rover kata in typescript.

## Tools

This is a [gulp](http://gulpjs.com/) project using [typescript](https://www.typescriptlang.org/) 
and [jasmine](http://jasmine.github.io/) as test framework.

### Versions

* ```Gulp```: 3.9.1
* ```typings```: 1.3.3
* ```node```: 4.4.2

## Development

* ```git clone ...``` : clone the repository
* ``` npm install ``` : Install npm dependencies
* ``` typings install ``` : Install types definitions
* ``` gulp build ```: Build the sources files and the specs  (Transpile into javascript in the dist folder)
* ``` gulp test ```: Run tests with jasmine.
* ``` gulp watch ```: Run build and test continously reruning on files changes.
* ``` npm run sample ```: Execute the api with data entered on console. The command prompts for the following data: 
    - ```maxX```: horizontal dimension of the grid, i.e 100
    - ```maxY```: vertical dimension of the grid, i.e: 100
    - ```obstacles```: comma-separated coordinates in the form x:y, i.e: 5:5, 4:8
    - ```x```: the initial x-coordinate of the rover, i.e 4
    - ```y```: the initial y-coordinate of the rover, i.e 3
    - ```direction```: the initial direction of the rover, i.e N (it is case-insensitive)
    - ```commands```: the sequence of command to execute by the rover, i.e ffrblbfr  (it is case-insensitive)

This command must be executed after a build (``` gulp build ``` or ``` gulp watch ``` or ``` gulp test ``` (this last command triggers a build)).

