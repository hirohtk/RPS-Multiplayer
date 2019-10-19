

$(document).ready(function () {

    //    function refreshPage() {
    //       location.reload();
    // }
    //setTimeout(refreshPage, 60000); // cheap way of updating all information every minute.  won't happen at the start of every minute though, depends on when user loads page

    var firebaseConfig = {
        apiKey: "AIzaSyBRjceTnf6ENxSdrE-HKkdX1tpONjDd-PU",
        authDomain: "rps-multiplayer-22663.firebaseapp.com",
        databaseURL: "https://rps-multiplayer-22663.firebaseio.com",
        projectId: "rps-multiplayer-22663",
        storageBucket: "",
        messagingSenderId: "858118411086",
        appId: "1:858118411086:web:813ef68701cc721dc6841f"
    };


    firebase.initializeApp(firebaseConfig);
    var database = firebase.database();

    var player1Wins = 0;
    var player2Wins = 0;

    var playerOneChoice;
    var playerTwoChoice;

    var playerOneDone = false;
    var playerTwoDone = false;

    firstPlayerfirstGame();
    secondPlayerFirstGame();

    

    
    //nextGames();
    function validateForBothInputs () {
        if (playerOneDone && playerTwoDone){
            compareChoices();
        }
    }

    function gameReset() {
        $(".player-one-selection").empty();
        $(".player-two-selection").empty();
        $("#winnerIsP1").empty();
        $("#winnerIsP2").empty();
    }

    function firstPlayerfirstGame() {
        var choice; 

        function newGamePush() {
            database.ref().push({
                choice: choice,
            });
            $(".player-one-selection").append("<h3 style='color:green';>Confirmed!</h3>")

            // DOING ONCE INSTEAD OF ON SOLVED MY ISSUE.  SOMEHOW ONCE ONLY REFERS TO THE CHILD YOU'RE WORKING ON RIGHT NOW.  PREVIOUSLY IT WAS REFERRING TO ALL CHILDREN.
            database.ref().once("child_added").then(function (Snapshot) {   
                console.log("snapshot key is " + Snapshot.key);
                console.log("firebase: FIRST PLAYER's CHOICE is " + Snapshot.val().choice);
                console.log("-----------------------------------------------------------")
                playerOneChoice = Snapshot.val().choice}
            );
        }

        
        //when this is clicked, modifies Choice variable.  user can keep clicking until they decide their final choice.  
        $(".selectionButtonP1").on("click", function (event) {
            event.preventDefault();

            if ($(this).attr("id") === "rock-button1") {
                console.log("Rock has been chosen");
                choice = "rock";
                $(".player-one-selection").html("<h3>Player one choice: " + choice + "</h3>")
            }
            else if ($(this).attr("id") === "paper-button1") {
                console.log("Paper has been chosen");
                choice = "paper";
                $(".player-one-selection").html("<h3>Player one choice: " + choice + "</h3>")
            }
            else if ($(this).attr("id") === "scissors-button1") {
                console.log("Scissors has been chosen");
                choice = "scissors";
                $(".player-one-selection").html("<h3>Player one choice: " + choice + "</h3>")
            }
            
        });
        // Now when this is clicked, the Choice is pushed to firebase (choice becomes permanent)
        $("#submit-button1").on("click", function (event) {
            event.preventDefault();
            newGamePush();
            playerOneDone = true;
            setTimeout(validateForBothInputs, 500); // NEEDED THIS - VALIDATION WOULD HAPPEN BEFORE THE FIREBASE CALL COULD COME BACK!!!
        });
        
    }

    function secondPlayerFirstGame() {
        var choice; 

        function newGamePush() {
            database.ref().push({
                choice: choice,
            });
            $(".player-two-selection").append("<h3 style='color:green';>Confirmed!</h3>")
            // DOING ONCE INSTEAD OF ON SOLVED MY ISSUE.  SOMEHOW ONCE ONLY REFERS TO THE CHILD YOU'RE WORKING ON RIGHT NOW.  PREVIOUSLY IT WAS REFERRING TO ALL CHILDREN.
            database.ref().once("child_added").then(function (Snapshot) {
                console.log("snapshot key is " + Snapshot.key);
                console.log("firebase: SECOND PLAYER's CHOICE is " + Snapshot.val().choice);
                console.log("-----------------------------------------------------------")
                playerTwoChoice = Snapshot.val().choice}
            );
            
        }
        //when this is clicked, modifies Choice variable.  user can keep clicking until they decide their final choice.  
        $(".selectionButtonP2").on("click", function (event) {
            event.preventDefault();

            if ($(this).attr("id") === "rock-button2") {
                console.log("Rock has been chosen");
                choice = "rock";
                $(".player-two-selection").html("<h3>Player two choice: " + choice + "</h3>")
            }
            else if ($(this).attr("id") === "paper-button2") {
                console.log("Paper has been chosen");
                choice = "paper";
                $(".player-two-selection").html("<h3>Player two choice: " + choice + "</h3>")
            }
            else if ($(this).attr("id") === "scissors-button2") {
                console.log("Scissors has been chosen");
                choice = "scissors";
                $(".player-two-selection").html("<h3>Player two choice: " + choice + "</h3>")
            }
            
        });
        // Now when this is clicked, the Choice is pushed to firebase (choice becomes permanent)
        $("#submit-button2").on("click", function (event) {
            event.preventDefault();
            newGamePush();
            playerTwoDone = true;
            setTimeout(validateForBothInputs, 500);  // NEEDED THIS - VALIDATION WOULD HAPPEN BEFORE THE FIREBASE CALL COULD COME BACK!!!
        });
    }

    function compareChoices() {
        console.log("TIME TO COMPARE CHOICES MENG");
        console.log("Now comparing... Player One's choice is " + playerOneChoice);
        console.log("Now comparing... Player Two's choice is " + playerTwoChoice);

        if (playerOneChoice === "paper" && playerTwoChoice === "rock" || playerOneChoice === "rock" && playerTwoChoice === "scissors" || playerOneChoice === "scissors" && playerTwoChoice == "paper") {
            $("#winnerIsP1").html("<h3 style='color:gold';>Winner is... PLAYER ONE!</h3>")
            player1Wins++;
            console.log("Player one now has " + player1Wins + " wins.");
        }
        else if (playerOneChoice === "rock" && playerTwoChoice === "paper" || playerOneChoice === "scissors" && playerTwoChoice === "rock" || playerOneChoice === "paper" && playerTwoChoice === "scissors") {
            $("#winnerIsP2").html("<h3 style='color:gold';>Winner is... PLAYER TWO!</h3>")
            player2Wins++;
            console.log("Player two now has " + player2Wins + " wins.");
        }
        else {
            alert("Encountered a win condition I didn't expect!")
        }

        
        setTimeOut(gameReset, 5000);
    }


    function nextGames() {
        function notNewGameSet() {
            database.ref().set({
                choice: choice,
                dateAdded: firebase.database.ServerValue.TIMESTAMP
            });
            $(".player-one-selection").append("<h3 style='color:green';>Confirmed!</h3>")
        }

        if ($(this).attr("id") === "rock-button1") {
            console.log("rock has been chosen (2nd choice)");
            var choice = "rock";

            $(".player-one-selection").html("<h3>Player one choice: " + choice + "</h3>")
            $("#submit-button").on("click", function (event) {
                event.preventDefault();
                notNewGameSet();
            });

            console.log("snapshot key is " + window.snapshotKey);

        }

        else if ($(this).attr("id") === "paper-button1") {
            console.log("Paper has been chosen (2nd choice)");
            var choice = "paper";

            $(".player-one-selection").html("<h3>Player one choice: " + choice + "</h3>")

            $("#submit-button").on("click", function (event) {
                event.preventDefault();
                notNewGameSet();
            });
            console.log("snapshot key is " + window.snapshotKey);
        }

        else if ($(this).attr("id") === "scissors-button1") {
            console.log("Scissors has been chosen (2nd choice)");
            var choice = "scissors";

            $(".player-one-selection").html("<h3>Player one choice: " + choice + "</h3>")
            $("#submit-button").on("click", function (event) {
                event.preventDefault();
                notNewGameSet();
            });
            console.log("snapshot key is " + window.snapshotKey);

        }
    }
    
        





    /*  */

});




