var teams = 16
,   data = require('./data.js').data
,   rankPoints = require('./data.js').rankPoints(teams);

var totalPoints = 0
,   playersPerTeam = 5
,   pointsPerTeam = 0;

main();

function main(){
    init();
};

function init(){
    for(var x = 0; x < teams*playersPerTeam; x++){
        totalPoints = totalPoints + rankPoints[data[x].liga];
    };

    pointsPerTeam = totalPoints/teams;
};
