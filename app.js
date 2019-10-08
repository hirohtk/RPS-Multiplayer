

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
    window.snapshotKey;

    $(".selectionButtonP1").on("click", function (event) {
        event.preventDefault();
        if ($(this).attr("id") === "rock-button1" && newGame) {
            console.log("Rock has been chosen");
            var choice = "rock";
            database.ref().push({
                choice: choice,
                dateAdded: firebase.database.ServerValue.TIMESTAMP
            });
            newGame = false;

            database.ref().on("child_added", function (snapshot) { 
                console.log(snapshot.key);
                var snapshotKey = snapshot.key;
                window.snapshotKey = snapshotKey; // maybe I can use this?  this sets the snapshot key to a global variable, supposedly so I can call it below. 
            });
        }
        else if ($(this).attr("id") === "rock-button1" && !newGame) {
            console.log("rock has been chosen (2nd choice)");
            var choice = "rock";
            database.ref().set({
                choice: choice,
                dateAdded: firebase.database.ServerValue.TIMESTAMP
            });
            console.log(window.snapshotKey);

        }
        else if ($(this).attr("id") === "paper-button1" && newGame) {
            console.log("Paper has been chosen");
            var choice = "paper";
            database.ref().push({
                choice: choice,
                dateAdded: firebase.database.ServerValue.TIMESTAMP
            });
            newGame = false;
        }
        else if ($(this).attr("id") === "paper-button1" && !newGame) {
            console.log("Paper has been chosen (2nd choice)");
            var choice = "paper";
            database.ref().set({
                choice: choice,
                dateAdded: firebase.database.ServerValue.TIMESTAMP
            });
        }
        else if ($(this).attr("id") === "scissors-button1" && newGame){
            console.log("Scissors has been chosen");
            var choice = "scissors";
            database.ref().push({
                choice: choice,
                dateAdded: firebase.database.ServerValue.TIMESTAMP
            });
            newGame = false;
        }
        else if ($(this).attr("id") === "scissors-button1" && !newGame){
            console.log("Scissors has been chosen (2nd choice)");
            var choice = "scissors";
            database.ref().set({
                choice: choice,
                dateAdded: firebase.database.ServerValue.TIMESTAMP
            });
            
        }  

        
    });

/*  */

});

