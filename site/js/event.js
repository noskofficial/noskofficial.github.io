const events_div = document.getElementById('event-list');

/* Read a json file that contents data about Events */
fetch('/events.json')
.then((data)=> data.json())
.then((data)=>{
   data.forEach(elt => {
    const title = document.createElement('a');
    const status = document.createElement('p');
    const guest = document.createElement('p');

    title.href = elt.URL;
    title.classList.add('event-title');
    status.classList.add('event-status');
    guest.classList.add('event-guest');

    title.innerText  = elt.Title;
    status.innerText = "Status:" + elt.Status;
    guest.innerText  = "By:" + elt.By;

    events_div.appendChild(title)
    events_div.appendChild(status)
    events_div.appendChild(guest)

   });
})