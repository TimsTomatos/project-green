//step up
var userField = document.getElementById("user")
var passField = document.getElementById("pass")

var signUserField = document.getElementById("user1")
var signPassField = document.getElementById("pass1")

var provider = new firebase.auth.GoogleAuthProvider();
var selectedFile;

auth.onAuthStateChanged(function  (user) { // Checks if they are signed in or signed out
    if (user)
    {
        console.log("Logged in")
    }
    else 
    {
        console.log("Logged out")
    }
}) 


function signOut()
{
    auth.signOut()
    .then(
        console.log("You have logged out!")

    )
}

function signUp()
{
    var userValue = userField.value
    var passValue = passField.value

    auth.createUserWithEmailAndPassword(userValue, passValue) //const from index html 
    
}

function signIn()
{

    var user1Value = signUserField.value
    var pass2Value = signPassField.value
    auth.signInWithEmailAndPassword(user1Value, pass2Value)
}



$("sumbittedImage").on("change", function (event) {
    selectedFile = event.target.files[0]
})


function uploadFile() {
    var storageRef = firebase.storage().ref('/reports')
    var fileName = selectedFile.fileName
    var fileRef = storage().child(fileName)
    var uploadTask = storage.put(selectedFile)

    uploadTask.on('state_changed', function(snapshot) {

    }, function(error) {

    }, function () {
        
    })
}