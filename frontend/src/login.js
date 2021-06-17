const baseURL = 'http://localhost:5000';

function headers() {
    return {
        Accept: "application/json",
        "Content-Type": "application/json",
        Connection: "close",
    };
}

const checkLogin = () => {
    console.info("checking login");
    var user = JSON.parse(localStorage.getItem('user'));
    console.log("user in localstorage:", user)
    // if (user != null) {
    //     if (user.role == 'manager') {
    //         window.location.href = './manager.html';
    //     } else if (user.role == 'agent') {
    //         window.location.href = './agent.html';
    //     }
    // } else {
    //     window.location.href = './login.html';
    // }
}

// render();


const loginAPI = async (method, username, pwd) => {
    console.log("method: ", method, ", username: ", username, ", password ", pwd);
    const response = await fetch(baseURL + '/users/login', {
        method: method,
        body: JSON.stringify({
            username: username,
            password: pwd,
        }),
        headers: headers(),
    });
    const myJson = await response.json(); //extract JSON from the http response
    // do something with myJson
    return myJson;
    // console.log("reaponse json is: ", myJson)
}

//- Using an anonymous function:
const login = async () => {
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;
    console.log("login called with: ", username, " | ", password);
    loginAPI("PUT", username, password).then((resp) => {
        console.log("response is: ", resp);
        if (resp.role == 'manager') {
            // alert("Welcome manager", resp.username)
            callManager(resp);

        } else if (resp.role == 'agent') {
            // alert("Welcome agent: ", resp.username)
            callAgent(resp);
        } else {
            alert("Please Enter Correct Credentials!")
        }
    })
};

function callManager(user) {
    localStorage.setItem('user', JSON.stringify(user));
    window.location.href = './manager.html';
}

function callAgent(user) {
    localStorage.setItem('user', JSON.stringify(user));
    window.location.href = './agent.html';
}