var user = JSON.parse(localStorage.getItem('user'));
const baseURL = 'http://localhost:5000';

function headers() {
    return {
        Accept: "application/json",
        "Content-Type": "application/json",
        Connection: "close",
    };
}

function agent() {
    // console.log('user in agent page: ', user)
    document.getElementById("agentRole").innerHTML = user.username;
}
agent();



const leadPosting = async (method, leadId, pno) => {
    // console.log("method: ", method, ", username: ", username, ", password ", pwd);
    const response = await fetch(baseURL + '/users/' + user.id + '/leads', {
        method: method,
        body: JSON.stringify({
            lead_id: leadId,
            phone_number: pno,
        }),
        headers: headers(),
    });
    const myJson = await response.json(); 
    return myJson;
}

//- Using an anonymous function:
const lead = async () => {
    var leadId = document.getElementById("leadId").value;
    var phoneNo = document.getElementById("phoneNo").value;

    // console.log("leadId: ", leadId, " | pno: ", phoneNo);

    leadPosting("POST", leadId, phoneNo).then((resp) => {
        // console.log("response is: ", resp);
        if (resp == 'API Error') {
            alert("Something went wrong! Try Again");
        } else {
            document.getElementById('leadId').value = '';
            document.getElementById('phoneNo').value = '';
            alert("Lead Posted Successfully :)");

        }
    })
};