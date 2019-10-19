

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

    firstPlayer();
    secondPlayer();

    var timer = 5;
    var intervalId;
    
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
        $("#tieGame").empty();
        timer = 5;
        playerOneChoice = "";
        playerTwoChoice = "";
        playerOneDone = false;
        playerTwoDone = false;
        $(".selectionButtonP1").attr("style", "visibility: visible");
        $(".selectionButtonP2").attr("style", "visibility: visible");
        $("#submit-button1").attr("style", "visibility: visible");
        $("#submit-button2").attr("style", "visibility: visible");
    }

    function firstPlayer() {
        var choice; 

        function newGamePush() {
            database.ref().push({
                choice: choice,
            });
            $("#submit-button1").attr("style", "visibility: hidden");
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
            $(".selectionButtonP1").attr("style", "visibility: hidden");
            event.preventDefault();
            newGamePush();
            playerOneDone = true;
            setTimeout(validateForBothInputs, 500); // NEEDED THIS - VALIDATION WOULD HAPPEN BEFORE THE FIREBASE CALL COULD COME BACK!!!
        });
        
    }

    function secondPlayer() {
        var choice; 

        function newGamePush() {
            database.ref().push({
                choice: choice,
            });
            $("#submit-button2").attr("style", "visibility: hidden");
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
            $(".selectionButtonP2").attr("style", "visibility: hidden");
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
            $("#tieGame").html("<h3 style='color:blue';>Answers Tied!</h3>")
        }
        
        gameEndStart();
        setTimeout(gameReset, 5000);

        function gameEndStart() {
            intervalId = setInterval(decrement, 1000); // setting interval.  every 1 second, perform decrements 
        }
    
        function decrement() {
            
            timer--; // take one second off from timer
            $("#gameEndTimer").html("<br><h3> Game Ending in " + timer + " seconds."); 
    
            if (timer === 0) {
                stopTimer(); // stop the timer function
                $("#gameEndTimer").empty(); 
            }
        }
    
        function stopTimer() {
            clearInterval(intervalId);  // emptys cubbyhole, remove setInterval
        }
        
    }

});




