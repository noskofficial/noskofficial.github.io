
let announcement = document.getElementById('announcement')

/* Read a event.json file*/
fetch('events.json')
.then((data)=> data.json())
.then((data)=>{
   data.forEach(elt => {
    if(elt.Status === "Registration Open"){
        const title = document.createElement('a');
        title.href = elt.URL;
        title.innerText = elt.Title;
        title.classList.add('event-title')
        announcement.appendChild(title)
    }
   });
})