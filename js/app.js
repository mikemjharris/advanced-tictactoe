(function() {

  var app = angular.module('extremeTtt', []);

  app.controller('tttController' , ["$scope", "$http", function($scope, $http) {
      
      
    $scope.nextPlayer = "X"
    $scope.message = "Next Player: " + $scope.nextPlayer
    $scope.nextBigSquare = ""

    $scope.masterGame = { games: {
        game0: { id: 0,  squares: {square0: "", square1: "", square2: "", square3: "", square4: "", square5: "", square6: "", square7: "", square8: ""}},
        game1: { id: 1, squares: {square0: "", square1: "", square2: "", square3: "", square4: "", square5: "", square6: "", square7: "", square8: ""}},
        game2: { id: 2, squares: {square0: "", square1: "", square2: "", square3: "", square4: "", square5: "", square6: "", square7: "", square8: ""}},
        game3: { id: 3, squares: {square0: "", square1: "", square2: "", square3: "", square4: "", square5: "", square6: "", square7: "", square8: ""}},
        game4: { id: 4, squares: {square0: "", square1: "", square2: "", square3: "", square4: "", square5: "", square6: "", square7: "", square8: ""}},
        game5: { id: 5, squares: {square0: "", square1: "", square2: "", square3: "", square4: "", square5: "", square6: "", square7: "", square8: ""}},
        game6: { id: 6, squares: {square0: "", square1: "", square2: "", square3: "", square4: "", square5: "", square6: "", square7: "", square8: ""}},
        game7: { id: 7, squares: {square0: "", square1: "", square2: "", square3: "", square4: "", square5: "", square6: "", square7: "", square8: ""}},
        game8: { id: 8, squares: {square0: "", square1: "", square2: "", square3: "", square4: "", square5: "", square6: "", square7: "", square8: ""}}
       },
       squares: {square0: "", square1: "", square2: "", square3: "", square4: "", square5: "", square6: "", square7: "", square8: ""},
       winner: ""

      }


    // $scope.game = { squares: {square0: "", square1: "", square2: "", square3: "", square4: "", square5: "", square6: "", square7: "", square8: ""}}
      
    $scope.playSquare = function(game_id, square_id) {
      $scope.masterGame.games["game" + game_id].squares["square" + square_id] = $scope.nextPlayer
      if($scope.checkWinner($scope.masterGame.games["game" + game_id].squares)) {
        $scope.masterGame.squares["square" + game_id] = $scope.nextPlayer
        $scope.messageWinner =  $scope.nextPlayer + "'s won square " + (game_id + 1)

        if($scope.checkWinner($scope.masterGame.squares)) {
            $scope.messageWinner = $scope.nextPlayer + " won!"
            $scope.masterGame.winner = $scope.nextPlayer
        }
      } 

          $scope.changePlayer()
      
          if($scope.masterGame.squares["square" + square_id] === "") {
              $scope.nextBigSquare = square_id
          } else {
              $scope.nextBigSquare = ""
          }

    }  

    $scope.changePlayer = function() {
      if ($scope.nextPlayer == "X") {
          $scope.nextPlayer ="O"
      } else {
        $scope.nextPlayer = "X"
      }
        $scope.message = "Next Player " + $scope.nextPlayer
    }

    $scope.checkWinner = function(squares) {
      for(var i = 0; i < winingPositions.length; i++) {
        
          if(squares["square" + winingPositions[i][0]] != "" && 
              squares["square" + winingPositions[i][0]] == squares["square" + winingPositions[i][1]] &&
              squares["square" + winingPositions[i][1]] == squares["square" + winingPositions[i][2]]) {
              return true
          }
      }
      return false
  }

  $scope.canPlay = function(game_id, index) {

     if($scope.masterGame.winner === "") {
        if($scope.canPlayBig(game_id)) {
            $scope.playSquare(game_id, index) 
        } 
    }
  }

  $scope.canPlayBig = function(game_id) {
      
     if(game_id == $scope.nextBigSquare || $scope.nextBigSquare === "") {
      return true
    } else {
      return false
    }

  } 


  }])

  

     app.directive('tttBoard', function() {
      return {
        restrict: 'AEC',
        templateUrl: 'tictactoe-board.html'
      }
  })



winingPositions = [ [0,1,2], [3,4,5], [6,7,8], [0,3,6], [1,4,7],[2,5,8], [0,4,8], [2,4,6] ]





})();

$(document).ready(function() {

  var twist = 100

  $('.cont').on('click', function() {
    $('main').toggleClass('three_d')
    if ($('.cont').text() == "Go 3D") {
        $('.cont').text("Go 2D")
    } else {
        $('.cont').text("Go 3D")
    }

  })
  var moveBox = function(axis, amount) {
    interval =  setInterval(function() {
      var origin = $('.holder').css('perspective-origin').split(" ")
      origin[axis] = parseInt(origin[axis]) + amount  + "px"
      origin = origin.join(" ")
      $('.holder').css('perspective-origin',  origin)
    }, 33);
  }

  $('#up').on('mousedown' , function () {
    moveBox(1,twist)
    
  })

  $('#down').on('mousedown' , function () {
     moveBox(1,-twist)
  })

    $('#left').on('mousedown' , function () {
     moveBox(0,twist)
  })

  $('#right').on('mousedown' , function () {
     moveBox(0, -twist)
  })


  $('.button').on('mouseup', function() {
    clearInterval(interval);
  })

  $('.button').on('mouseout', function() {
    clearInterval(interval)
  })

})


