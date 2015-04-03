var numberOfTeams = 16
,   data = require('./data.js').data
,   rankPoints = require('./data.js').rankPoints(numberOfTeams)
,   _ = require('underscore');

var totalPoints = 0
,   playersPerTeam = 5
,   pointsPerTeam = 0
,   players = []
,   suplents = []
,   teams = [];

main();

function main(){
    printValues();
    init();
    match();
};

function printValues(){
    console.log(rankPoints);
};

function init(){

    //Evalue the players' points
    _.each(data, function(player){ player.points = rankPoints[player.liga]; });

    //Separate the players and suplents
    players = _.filter(
        data, function(player){ return player.role == 'Player'; }
        );
    suplents = _.filter(
        data, function(player){ return player.role == 'Suplent'; }
        );

    //Sort by points
    players = _.sortBy(players, 'points');
    suplents = _.sortBy(suplents, 'points');

    //Evalue the numberOfTeams' points
    for(var x = 0; x < numberOfTeams*playersPerTeam; x++){
        totalPoints = totalPoints + rankPoints[data[x].liga];
    };

    pointsPerTeam = totalPoints/numberOfTeams;
};

function match(){

    var provTeams = [];

    // init teams
    for(var z = 0; z < numberOfTeams; z++){
        provTeams.push([]);
    }

    // complete the teams
    for(var x = 0; x < playersPerTeam; x++){
        _.each(provTeams, function(team, index){
            team.push(_.last(players));
            players.splice(players.length-1, 1);
        });
    }

    _.each(provTeams, function(team, index){

        var teamPoints = _.reduce(team, function(player, num){
            return num.points + player;
        }, 0);

        if(teamPoints < pointsPerTeam - 30 || teamPoints > pointsPerTeam + 30){

            console.log('Rechazado', teamPoints, pointsPerTeam);

            _.each(team, function(player){
                players.push(player);
            });
        }
        else{
            teams.push(team);
        }

    });

    delete provTeams;

    console.log('Players', players.length);
    console.log('Teams', teams.length);
    console.log('*********************************');

    numberOfTeams =  16 - teams.length;
    players.sort();

    if(teams.length < 15  && numberOfTeams > 0){
        match();
    }
    else{
        console.log('Finish', teams);
        _.each(teams, function(team){

            _.sortBy(team, 'points');

            var teamPoints = _.reduce(team, function(player, num){
                return num.points + player;
            }, 0);

            console.log(team[0].liga, team[1].liga, team[2].liga, team[3].liga,
                        team[4].liga, teamPoints);
        })
    }
};
