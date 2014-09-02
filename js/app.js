(function() {

  var app = angular.module('extremeTtt', []);

  app.controller('tttController' , ["$scope", "$http", function($scope, $http) {
      
      
    $scope.nextPlayer = "X"
    $scope.message = "Next Player " + $scope.nextPlayer
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
        game8: { id: 8, squares: {square0: "", square1: "", square2: "O", square3: "", square4: "", square5: "O", square6: "", square7: "", square8: ""}}
       },
       squares: {square0: "", square1: "", square2: "", square3: "", square4: "", square5: "", square6: "", square7: "", square8: ""},
       winner: ""

      }


    // $scope.game = { squares: {square0: "", square1: "", square2: "", square3: "", square4: "", square5: "", square6: "", square7: "", square8: ""}}
      
    $scope.playSquare = function(game_id, square_id) {

      console.log(game_id)
      $scope.masterGame.games["game" + game_id].squares["square" + square_id] = $scope.nextPlayer
      if($scope.checkWinner($scope.masterGame.games["game" + game_id].squares)) {
        console.log("winner")
        $scope.masterGame.squares["square" + game_id] = $scope.nextPlayer
        $scope.messageWinner =  $scope.nextPlayer + "'s won square " + (game_id + 1)

        if($scope.checkWinner($scope.masterGame.squares)) {
            console.log("Big winner")

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
      console.log("checkingwinner")
      for(var i = 0; i < winingPositions.length; i++) {
          // console.log("Here" + i)
          // console.log(squares["square" + winingPositions[i][0]])
          // console.log(squares["square" + winingPositions[i][1]])
          // console.log(squares["square" + winingPositions[i][2]])
          if(squares["square" + winingPositions[i][0]] != "" && 
              squares["square" + winingPositions[i][0]] == squares["square" + winingPositions[i][1]] &&
              squares["square" + winingPositions[i][1]] == squares["square" + winingPositions[i][2]]) {
              return true
          }
      }
      return false
  }

  $scope.canPlayBig = function(game_id) {
    if($scope.masterGame.winner === "" && (game_id == $scope.nextBigSquare || $scope.nextBigSquare == "")) {
      return true
    } else {
      return false
    }

  } 


  }])

  app.directive('newStallForm', function() {
      return {
        restrict: 'AEC',
        templateUrl: 'new-stall-form.html'
      }
  })

   app.directive('stallList', function() {
      return {
        restrict: 'AEC',
        templateUrl: 'stall-list.html'
      }
  })

     app.directive('tttBoard', function() {
      return {
        restrict: 'AEC',
        templateUrl: 'tictactoe-board.html'
      }
  })



winingPositions = [ [0,1,2], [3,4,5], [6,7,8], [0,3,6], [1,4,7],[2,5,8], [0,4,8], [2,4,6] ]







stalls = [  
  {  
    name: "Burrito",  
    price: 5,  
    description:  "Meat and vegetables in a delicious wrap"  
  },  
  {  
    name: "Pizza",  
    price: 6.5,  
    description:  "Cheese and meat and veg on some dough"  
  },  
  {
    name: "Fallafel",  
    price: 4.5,  
    description: "Deep fried delicious chickpeas"  
  }  
]


})();




