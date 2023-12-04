//PLEASE DO NOT MODIFY THIS CODE 
//ELSE THE CONNECT FOUR GAME WONT BE ABLE TO WORK
//MADE BY DIEGOSON FENANDEZ
//@AZTEC MD WABOT


  const pointsData = {};

  function givePoints(username, points) {
  if (pointsData[username]) {
   pointsData[username] += points;
  } else {
  pointsData[username] = points;
  }
  }

   function getPoints(username) {
   if (pointsData[username]) {
   return pointsData[username];
  } else {
    return 0;
  }
  }

  function PointsSystem() {
  this.givePoints = function (username, points) {
  givePoints(username, points);
  };

  this.getPoints = function (username) {
  return getPoints(username);
  };
  
  this.addPointsForAztec = function (points) {
  givePoints('Aztec', points);
  };
  
  this.addPointsForVorterx = function (points) {
  givePoints('Vorterx', points);
  };
  }

  module.exports = PointsSystem;
