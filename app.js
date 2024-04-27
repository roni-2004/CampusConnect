async function signup(){
    var email = document.getElementsByClassName("emailadd")[0].value;
    var password = document.getElementsByClassName("password")[0].value;
    
    console.log(email);
    console.log(password);

    const rawRes = await fetch("https://api.bharathshanmugam.dev/signup", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            username: email,
            password: password,
            isAdmin: document.getElementById("isAdmin").checked
        })
    })

    const res = await rawRes.json();
    alert("Signup successful! Enter your credentials to Login.");
    // the below code redirects the user to the login page after signup
    window.location.href = "/login/";

}

const button = document.getElementById("signupbtn");
button.addEventListener("click", signup);