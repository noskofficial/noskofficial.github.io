
let announcement = document.getElementById('announcement')

let date = new Date();
let today_month = date.getMonth();
let today_date = date.getDate();
let today_year = date.getFullYear();
let curr_hour = date.getHours();

/* Read a event.json file*/
fetch('events.json')
.then((data)=> data.json())
.then((data)=>{
   data.forEach(elt => {

    const start_detail = elt.Date.split("-");
    const start_time = elt.Time.split(":");

    if (today_year <= start_detail[2]){
        if (today_month + 1 <= start_detail[1]){
           if (today_date <= start_detail[0]){
                const event = document.createElement('p');
                event.innerHTML = "Registration now open for: "
                const title = document.createElement('a');
                title.href = elt.URL;
                title.innerText = " " +  elt.Title;
                title.classList.add('event-title')
                event.appendChild(title)
                announcement.appendChild(event)
           }
        }
      }
   }
  );
})


