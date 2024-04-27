function setCookie(name,value,days) {
    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days*24*60*60*1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "")  + expires + "; path=/";
}

function getCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
}

function eraseCookie(name) {   
    document.cookie = name +'=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}

const button = document.getElementById('login')

// button.addEventListener('click', () => {
// 	console.log("HELLO PLS WORK FFS")
// })

button.addEventListener('click', () => {
	const username = document.getElementById('username').value
	const password = document.getElementById('password').value
	if (document.getElementById("isAdmin").checked) {
		setCookie('role', 'admin', 1)
	}

	if (!document.getElementById("isAdmin").checked) {
		setCookie('role', 'user', 1)
	}
	
	console.log(username)
	console.log(password)
	const data = {
		username,
		password,
		isAdmin: document.getElementById("isAdmin").checked
	}

	fetch('https://api.bharathshanmugam.dev/login', {
		method: 'POST',
		body: JSON.stringify(data),
		headers: {
			'Content-Type': 'application/json'
		},
	})
		.then(res => res.json())
		.then(data => {
			console.log(data)
			if (data.error) {
				alert(data.error)
			} else {
				console.log(data.access_token);
				setCookie('access_token', data.access_token, 1);
				window.location.href = '/home/';

			}
		})
		.catch(err => console.log(err))
})

// line 41