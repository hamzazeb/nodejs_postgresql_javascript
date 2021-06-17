var user = JSON.parse(localStorage.getItem('user'));
const baseURL = 'http://localhost:5000';

function headers() {
    return {
        Accept: "application/json",
        "Content-Type": "application/json",
        Connection: "close",
    };
}

function manager() {
    var user = JSON.parse(localStorage.getItem('user'));
    console.log('user in manager page: ', user)
    document.getElementById("managerRole").innerHTML = user.username;
}
manager();


// add user api function
const addUser = async (method, un, pwd, role) => {
    // console.log("method: ", method, ", username: ", username, ", password ", pwd);
    const response = await fetch(baseURL + '/users/' + 0, {
        method: method,
        body: JSON.stringify({
            username: un,
            password: pwd,
            role: role,
        }),
        headers: headers(),
    });
    const myJson = await response.json(); //extract JSON from the http response
    // do something with myJson
    return myJson;
    // console.log("reaponse json is: ", myJson)
}

// get user info and add in db
const userFun = async () => {
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;
    var role = document.querySelector('input[name="role"]:checked').value;;

    // console.log("username: ", username, " | password: ", password, " | role: ", role);
    
    addUser("POST", username, password, role).then((resp) => {
        // console.log("response is: ", resp);
        if(resp == 'API Error'){
            alert("Something went wrong! Try Again");
        } else {
            alert("User Added Successfully :)");
        }
    })
};