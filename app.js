

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

    var newGame = true;
    //window.snapshotKey;

    var player1Wins = 0;
    var player2Wins = 0;

//Player one
    firstGame();
    
    //nextGames();

    function firstGame() {
        var choice; 
        
        function newGamePush() {
            database.ref().push({
                choice: choice,
            });
            newGame = false;
            $(".player-one-selection").append("<h3 style='color:green';>Confirmed!</h3>")

            database.ref().on("child_added", function (snapshot) {
                console.log("snapshot key is " + snapshot.key);
                var snapshotKey = snapshot.key;
                window.snapshotKey = snapshotKey; 
            });
        }

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
            // USER SHOULD BE ABLE TO KEEP CLICKING TO CHANGE THEIR MIND, NEVER GETS TO EXECUTE NEWGAMEPUSH UNLESS SUBMITBUTTON IS CLICKED

        });

        $("#submit-button").on("click", function (event) {
            event.preventDefault();
            newGamePush();
        });
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




