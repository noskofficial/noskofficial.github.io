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
    console.log(start_detail[2]);
    if (start_detail[2] == today_year){
      if ( start_detail[1] > today_month + 1 ){
         if (start_detail[0] <= today_date ){
              const event = document.createElement('p');
              event.innerHTML = "Registration now open for: "
              const title = document.createElement('a');
              title.href = elt.URL;
              title.innerText = " " + elt.Title;
              title.classList.add('event-title')
              event.appendChild(title)
              announcement.appendChild(event)
         }
      } else if(start_detail[1] == today_month + 1){
         if (start_detail[0] >= today_date ){
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
    } else if (start_detail[2] > today_year){
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
  );
})


