

var config = {
    apiKey: "AIzaSyAGNzY2bNoKMzmOgKfVPifESLlkJd7qIBM",
    authDomain: "train-scheduler-16bf7.firebaseapp.com",
    databaseURL: "https://train-scheduler-16bf7.firebaseio.com",
    projectId: "train-scheduler-16bf7",
    storageBucket: "train-scheduler-16bf7.appspot.com",
    messagingSenderId: "407190328546"
  };
  firebase.initializeApp(config);

  var database = firebase.database();

  $("#add-train-btn").on("click", function(event) {
  	event.preventDefault();

  	var trainName = $("#train-name-input").val().trim();
  	var trainDestination = $("#destination-input").val().trim();
 	var firstTrain = moment($("#first-train-input").val().trim(), "HH:mm A").format("X");
 	var trainFrequency = $("#frequency-input").val().trim();

 	var newTrain = {
 		train: trainName,
 		destination: trainDestination,
 		first: firstTrain,
 		frequency: trainFrequency
 	};

 	database.ref().push(newTrain);

 	console.log((newTrain.train));	
 	console.log((newTrain.destination));
 	console.log((newTrain.first));
 	console.log((newTrain.frequency));

 	alert("Train successfully added");

 	$("#train-name-input").val("");
 	$("#destination-input").val("");
 	$("#first-train-input").val("");
 	$("#frequency-input").val("");

  });

  database.ref().on("child_added", function(childSnapshot) {
  	console.log(childSnapshot);

  	var trainName = childSnapshot.val().train;
  	var trainDestination = childSnapshot.val().destination;
  	var firstTrain = childSnapshot.val().first;
  	var trainFrequency = childSnapshot.val().frequency;

  	console.log(trainName);
  	console.log(trainDestination);
  	console.log(firstTrain);
  	console.log(trainFrequency);

  	// var firstTrainPretty = moment.unix(firstTrain).format("HH:mm A");

  	// var firstTrainConverted = moment(firstTrain, "HH:mm A").subtract(1, "years");
  	// console.log("+++++++");
  	// console.log(firstTrainConverted);

  	// var firstTrainConverted = moment(firstTrain, "HH:mm A");
  	// console.log(firstTrainConverted);

  	// var currentTime = moment();
   // 	console.log("CURRENT TIME: " + moment(currentTime).format("HH:mm A"));

  	var diffTime = moment().diff(moment.unix(firstTrain, "X"), "minutes");
  	console.log("DIFFERENCE IN TIME: " + diffTime);

  	var tRemainder = diffTime % trainFrequency;
  	console.log(tRemainder);

  	var tMinutesTillTrain = trainFrequency - tRemainder;
  	console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

  	var nextTrain = moment().add(tMinutesTillTrain, "minutes");
  	console.log("ARRIVAL TIME: " + moment(nextTrain).format("HH:mm A"));

  	var nextTrainPretty = moment(nextTrain).format("HH:mm A");

  	// var firstTrainPretty = moment(firstTrain).format("HH:mm A");
  	// console.log(firstTrainPretty);

  	$("#train-schedule > tbody").append("<tr><td>" + trainName + "</td><td>" + trainDestination + "</td><td>" + trainFrequency + "</td><td>" + nextTrainPretty + "</td><td>" + tMinutesTillTrain + "</td></tr>");

  });