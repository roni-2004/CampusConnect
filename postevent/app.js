const form = document.getElementById('event-form');
const submit = document.getElementById('event-submit');

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


const _status = document.getElementById('status');
submit.addEventListener('click', () => {
  _status.style.visibility = 'visible';

  const formData = new FormData();
  const fileInput = document.getElementById('eventimage');

//   for (const element of form.elements) {
//     console.log(element.name, element.value)
//     formData.append(element.name, element.value);
//   }

  console.log(form.elements.title.value);
  console.log(form.elements.description.value);
  console.log(form.elements.date.value);
  console.log(form.elements.venue.value);
  console.log(fileInput.files[0]);

  formData.append('title', form.elements.title.value);
  formData.append('description', form.elements.description.value);
  formData.append('date', form.elements.date.value);
  formData.append('location', form.elements.venue.value);
  formData.append('image', fileInput.files[0]);


  console.log(getCookie('access_token'));

  fetch('http://143.110.254.118:3000/event', {
	method: 'POST',
	body: formData,
	headers: {
		'Authorization': `Bearer ${getCookie('access_token')}`,
	},
  })
  .then(response => {
    _status.style.visibility = 'hidden'
    window.location.href = '/home';
  })
});
