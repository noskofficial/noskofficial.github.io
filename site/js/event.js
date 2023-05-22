const events_div = document.getElementById('event-list');

let date = new Date();
let today_month = date.getMonth();
let today_date = date.getDate();
let today_year = date.getFullYear();
let curr_hour = date.getHours();

/* Read a json file that contents data about Events */
fetch('/events.json')
.then((data)=> data.json())
.then((data)=>{
   data.forEach(elt => {

    const container = document.createElement('div');  
    const title = document.createElement('a');
    const status = document.createElement('p');
    const guest = document.createElement('p');

    const start_detail = elt.Date.split("-");
    const start_time = elt.Time.split(":");

    var event_status = "Completed"

    if (today_year <= start_detail[2]){
      if (today_month + 1 <= start_detail[1]){
         if (today_date <= start_detail[0]){
                 event_status = "Registration Open"
         }
      }
    }

   //  If event is not complete refer to registration for event 
   // otherwise refer to gallery section of corresponsing event

   if (event_status != "Completed"){
      title.href = elt.URL;
   }else{
      title.href = elt.IMGURL;
   }
    
    title.classList.add('event-title');
    status.classList.add('event-status');
    guest.classList.add('event-guest');

    title.innerText  = elt.Title;
    status.innerText = "Status:" + event_status;
    guest.innerText  = "By:" + elt.By;

    container.appendChild(title)
    container.appendChild(status)
    container.appendChild(guest)

    events_div.appendChild(container)

   });
})
