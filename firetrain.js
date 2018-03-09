
// Initialize Firebase
var config = {
    apiKey: "AIzaSyA9033IH0s0rhc3PdZtaQBqvYec_UGLyLo",
    authDomain: "firetrain-ccd4e.firebaseapp.com",
    databaseURL: "https://firetrain-ccd4e.firebaseio.com",
    projectId: "firetrain-ccd4e",
    storageBucket: "firetrain-ccd4e.appspot.com",
    messagingSenderId: "501164299776"
};
firebase.initializeApp(config);

var database = firebase.database()
var path = database.ref("/users")


$("#submitBTN").on("click", function () {
    event.preventDefault()
    var name = $("#name").val().trim()
    var destination = $("#destin").val().trim()
    var start = $("#firstTTime").val()
    var frequency = $("#freq").val().trim()

    $("#name").val("")
    $("#destin").val("")
    $("#firstTTime").val("")
    $("#freq").val("")

    path.push({
        TrainName: name,
        Destination: destination,
        FirstTrainTime: start,
        Frequency: frequency

    })
})

path.on('child_added', function(snapshot) {
    $("#tName").append(snapshot.val().TrainName + "<br>")
    $("#tDestination").append(snapshot.val().Destination + "<br>")
    $("#tFrequency").append(snapshot.val().Frequency + "<br>")
});

path.on('child_added', function(snapshot) {
    // Frequency is pulled from firebase
    var tFrequency = snapshot.val().Frequency;

    // Time is pulled from firebase
    var firstTime = snapshot.val().FirstTrainTime;

    // First Time (pushed back 1 year to make sure it comes before current time)
    var firstTimeConverted = moment(firstTime, "hh:mm").subtract(1, "years");
    
    // Current Time
    var currentTime = moment();
   
    // Difference between the times
    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    
    // Time apart (remainder)
    var tRemainder = diffTime % tFrequency;
    
    // Minute Until Train
    var tMinutesTillTrain = tFrequency - tRemainder;
    $("#tMinAway").append(tMinutesTillTrain  + "<br>")
  
    // Next Train
    var nextTrain = moment().add(tMinutesTillTrain, "minutes");
    $("#tNextArrival").append(moment(nextTrain).format("hh:mm")  + "<br>")

});