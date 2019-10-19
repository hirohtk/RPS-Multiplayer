

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



    $(".selectionButtonP1").on("click", function (event) {
        event.preventDefault();

        function newGamePush() {
            database.ref().push({
                choice: choice,
            });
            newGame = false;
            $(".player-one-selection").append("<h3 style='color:green';>Confirmed!</h3>")
        }
        
        function notNewGameSet() {
            database.ref().set({
                choice: choice,
                dateAdded: firebase.database.ServerValue.TIMESTAMP
            });
            $(".player-one-selection").append("<h3 style='color:green';>Confirmed!</h3>")
        }

        if ($(this).attr("id") === "rock-button1" && newGame) {
            console.log("Rock has been chosen");
            var choice = "rock";
            $(".player-one-selection").html("<h3>Player one choice: "+ choice + "</h3>")
            $("#submit-button").on("click", function (event) {
                event.preventDefault();
                newGamePush();
            });

            database.ref().on("child_added", function (snapshot) { 
                console.log("snapshot key is " + snapshot.key);
                var snapshotKey = snapshot.key;
                window.snapshotKey = snapshotKey; // maybe I can use this?  this sets the snapshot key to a global variable, supposedly so I can call it below. 
            });
        }
        else if ($(this).attr("id") === "rock-button1" && newGame === false) {
            console.log("rock has been chosen (2nd choice)");
            var choice = "rock";

            $(".player-one-selection").html("<h3>Player one choice: "+ choice + "</h3>")
            $("#submit-button").on("click", function (event) {
                event.preventDefault();
                notNewGameSet();
            });
            
            console.log("snapshot key is " + window.snapshotKey);

        }
        else if ($(this).attr("id") === "paper-button1" && newGame) {
            console.log("Paper has been chosen");
            var choice = "paper";
            $(".player-one-selection").html("<h3>Player one choice: "+ choice + "</h3>")
            $("#submit-button").on("click", function (event) {
                event.preventDefault();
                newGamePush();
            });

            database.ref().on("child_added", function (snapshot) { 
                console.log("snapshot key is " + snapshot.key);
                var snapshotKey = snapshot.key;
                window.snapshotKey = snapshotKey; // maybe I can use this?  this sets the snapshot key to a global variable, supposedly so I can call it below. 
            });
        }
        else if ($(this).attr("id") === "paper-button1" && newGame === false) {
            console.log("Paper has been chosen (2nd choice)");
            var choice = "paper";

            $(".player-one-selection").html("<h3>Player one choice: "+ choice + "</h3>")

            $("#submit-button").on("click", function (event) {
                event.preventDefault();
                notNewGameSet();
            });
            console.log("snapshot key is " + window.snapshotKey);
        }
        else if ($(this).attr("id") === "scissors-button1" && newGame){
            console.log("Scissors has been chosen");
            var choice = "scissors";
            $(".player-one-selection").html("<h3>Player one choice: "+ choice + "</h3>")
            $("#submit-button").on("click", function (event) {
                event.preventDefault();
                newGamePush();
            });
            
            database.ref().on("child_added", function (snapshot) { 
                console.log("snapshot key is " + snapshot.key);
                var snapshotKey = snapshot.key;
                window.snapshotKey = snapshotKey; // maybe I can use this?  this sets the snapshot key to a global variable, supposedly so I can call it below. 
            });
        }
        else if ($(this).attr("id") === "scissors-button1" && newGame === false){
            console.log("Scissors has been chosen (2nd choice)");
            var choice = "scissors";

            $(".player-one-selection").html("<h3>Player one choice: "+ choice + "</h3>")
            $("#submit-button").on("click", function (event) {
                event.preventDefault();
                notNewGameSet();
            });
            console.log("snapshot key is " + window.snapshotKey);
            
        }  

        
    });

/*  */

});

