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
    // console.log('user in manager page: ', user)
    document.getElementById("managerRole").innerHTML = user.username;
}
manager();


// add user api function
const addUserAPI = async (method, un, pwd, role) => {
    const response = await fetch(baseURL + '/users/' + 0, {
        method: method,
        body: JSON.stringify({
            username: un,
            password: pwd,
            role: role,
        }),
        headers: headers(),
    });
    const myJson = await response.json();
    return myJson;
}
// get user info and add in db
const userFun = async () => {
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;
    var role = document.querySelector('input[name="role"]:checked').value;;
    
    addUserAPI("POST", username, password, role).then((resp) => {
        if(resp == 'API Error'){
            alert("Something went wrong! Try Again");
        } else {
            document.getElementById('username').value = '';
            document.getElementById('password').value = '';
            alert("User Added Successfully :)");
        }
    })
};

// agents stats API
const agentStatsAPI = async (method) => {
    const response = await fetch(baseURL + '/agents/' + 0 + '/stats', {
        method: method,
        headers: headers(),
    });
    const myJson = await response.json();
    return myJson;
}
// agent stats function
const agentStats = async () => {
 
    // console.log("username: ", username, " | password: ", password, " | role: ", role);
    
    agentStatsAPI("GET").then((resp) => {
        if(resp == 'API Error'){
            alert("Something went wrong! Try Again");
        } else {
            // console.log("agent stats", resp.agent_stats);
            tableFromJson(resp);
        }
    })
};
agentStats();

// leads between dates API
const leadsBwAPI= async (method, start_date, end_date) => {
    const response = await fetch(baseURL + '/leads/' + start_date + '/' + end_date, {
        method: method,
        headers: headers(),
    });
    const myJson = await response.json();
    return myJson;
}
// leads between dates function
const leadsBw = async () => {
    var start_date = document.getElementById("start_date").value;
    var end_date = document.getElementById("end_date").value;

    leadsBwAPI("GET", start_date, end_date).then((resp) => {
        if(resp == 'API Error'){
            alert("Something went wrong! Try Again");
        } else {
            // console.log("stats between dates:",  resp);
            document.getElementById("leadBwWrite").innerHTML = resp.leads_between_dates;
        }
    })
};
// leadsBw();

// total leads
const totalLeadsAPI= async (method) => {
    const response = await fetch(baseURL + '/leads/0/0', {
        method: method,
        headers: headers(),
    });
    const myJson = await response.json();
    return myJson;
}
// total leads function
const totalLeads = async () => {
    totalLeadsAPI("GET").then((resp) => {
        if(resp == 'API Error'){
            alert("Something went wrong! Try Again");
        } else {
            // console.log("total leads:",  resp);
            document.getElementById("totalLead").innerHTML = resp.total_leads;
        }
    })
};
totalLeads();


// using ES6 features.
    
let tableFromJson = (resp) => {
    // the json data.
    // console.log('in json: ', resp)
    
    // Extract value from table header. 
    // ('Book ID', 'Book Name', 'Category' and 'Price')
    let col = [];
    for (let i = 0; i < resp.length; i++) {
        for (let key in resp[i]) {
            if (col.indexOf(key) === -1) {
                col.push(key);
            }
        }
    }
    
    // Create a table.
    const table = document.createElement("table");

    // Create table header row using the extracted headers above.
    let tr = table.insertRow(-1);                   // table row.

    for (let i = 0; i < col.length; i++) {
        let th = document.createElement("th");      // table header.
        th.innerHTML = col[i];
        tr.appendChild(th);
    }

    // add json data to the table as rows.
    for (let i = 0; i < resp.length; i++) {

        tr = table.insertRow(-1);

        for (let j = 0; j < col.length; j++) {
            let tabCell = tr.insertCell(-1);
            tabCell.innerHTML = resp[i] [col[j]];
            // console.log('resp['+i+']', resp[i]);
        }
    }

    // Now, add the newly created table with json data, to a container.
    const divShowData = document.getElementById('showData');
    divShowData.innerHTML = "";
    divShowData.appendChild(table);
}