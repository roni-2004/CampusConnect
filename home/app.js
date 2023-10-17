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

console.log("hello")
console.log("HELLO")
console.log(getCookie('role'))

if (getCookie('role') === 'admin') {
	document.getElementById('postbutton').style.visibility = 'visible'
}

document.getElementById('postbutton').addEventListener('click', () => {
	window.location.href = '/postevent';
})

function renderUserCard(location, title, description, registration_link, image) {
	const template = `
	<div class="col-md-6">
		  <div class="row g-0 border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">
			<div class="col p-4 d-flex flex-column position-static">
			  <strong class="d-inline-block mb-2 text-success-emphasis">${location}</strong>
			  <h3 class="mb-0">${title}</h3>
			  <div class="mb-1 text-body-secondary">Club Name</div>
			  <p class="mb-auto">${description}</p>
			  <button type="button" onClick="registerEvent(${registration_link})" class="btn btn-success">Register</button>
			</div>
			<div class="col-auto d-none d-lg-block">
			  <img src="${image}" class="bd-placeholder-img" width="250" height="250">
			</div>
		  </div>
		</div>
	`

	return template
}

function renderAdminCard(location, title, users) {
	const participants = users.map(user => {return user.username})

	console.log(participants)
	let lists = ""
	
	participants.forEach(participant => {
		lists += `<li>${participant}</li>`;
	})

	console.log(lists);

	const template = `
	<div class="col-md-6">
	  <div class="row g-0 border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">
		<div class="col p-4 d-flex flex-column position-static">
		  <strong class="d-inline-block mb-2 text-success-emphasis">${location}</strong>
		  <h3 class="mb-0">${title}</h3>
		  <div class="mb-1 text-body-secondary">Participants</div>
		  <p class="mb-auto"><ol>${lists}</ol></p>
		  <p>Total participants: ${participants.length}</p>
		</div>
	  </div>
	</div>
	`

	return template
}

if (getCookie('access_token') == null) {
	window.location.replace('http://143.110.254.118:3000/login')
}

function registerEvent(registration_link) {
	fetch(`http://143.110.254.118:3000/join?event_id=${registration_link}`, { 
		method: 'POST',
		headers: {	
			'Authorization': `Bearer ${getCookie('access_token')}`
		}
	})
	.then(response => {
		console.log(response)
		if (response.status == 202) {
			alert('You have successfully registered for the event!')
		} else if (response.status == 409) {
			alert('You have already registered for the event!')
		}
	})
}

fetch('http://143.110.254.118:3000/event', {
	headers: {
		'Authorization': `Bearer ${getCookie('access_token')}`
	}
})
.then(response => response.json())
.then(data => {
	const container = document.getElementById('event-container')
	data.forEach(event => {
		if (getCookie('role') === 'admin') {
			container.innerHTML += renderAdminCard(event.location, event.title, event.user)
			return;
		}

		else {
			container.innerHTML += renderUserCard(event.location, event.title, event.description, event.id, event.image)
			return;
		}
	})
})