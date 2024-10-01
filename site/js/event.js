
const events_div = document.getElementById("event-list");
const paginationControls = document.getElementById("pagination-controls");

let date = new Date();
let today_month = date.getMonth();
let today_date = date.getDate();
let today_year = date.getFullYear();
let curr_hour = date.getHours();

const eventsPerPage = 10;
let currentPage = 1;
let events = [];

/* Read a json file that contains data about Events */
fetch("/events.json")
  .then((data) => data.json())
  .then((data) => {
    events = data;
    renderEvents();
    createPaginationControls();
  });

function renderEvents() {
  events_div.innerHTML = "";
  const start = (currentPage - 1) * eventsPerPage;
  const end = start + eventsPerPage;
  const paginatedEvents = events.slice(start, end);

  paginatedEvents.forEach((elt) => {
    const container = document.createElement("div");
    const title = document.createElement("a");
    const status = document.createElement("p");
    const guest = document.createElement("p");

    const start_detail = elt.Date.split("-");
    const start_time = elt.Time.split(":");

    var event_status = "Completed";

    if (today_year < start_detail[2]) event_status = "Registration Open";
    else if (today_year == start_detail[2] && today_month + 1 < start_detail[1])
      event_status = "Registration Open";
    else if (
      today_year == start_detail[2] &&
      today_month + 1 == start_detail[1] &&
      today_date <= start_detail[0]
    )
      event_status = "Registration Open";

    if (event_status != "Completed") {
      title.href = elt.URL;

   }else{
      if (elt.IMGURL)
        title.href = elt.IMGURL;
      else 
	 title.href = elt.URL;
   }



   title.innerText = elt.Title;
   title.classList.add('event-title');
   status.innerText = `Status: ${event_status}`;
   status.classList.add('event-status');
   guest.innerText = "By: ";
   guest.classList.add('event-guest');

 
   elt.By.forEach((collaborator, index) => {
     const profileLink = document.createElement('a');
     profileLink.href = elt.ProfileLink[index] || '#';
     profileLink.innerText = collaborator; 
     profileLink.target = '_blank'; 
     profileLink.classList.add('profile-link');

     guest.appendChild(profileLink);


     if (index < elt.By.length - 1) {
       guest.appendChild(document.createTextNode(', '));
     }
   });


   container.appendChild(title);
   container.appendChild(status);
   container.appendChild(guest);
   const events_div = document.getElementById('event-list');
   events_div.appendChild(container);
 });
});

    } else {
      if (elt.IMGURL) title.href = elt.IMGURL;
      else title.href = elt.URL;
    }

    title.classList.add("event-title");
    status.classList.add("event-status");
    guest.classList.add("event-guest");

    title.innerText = elt.Title;
    status.innerText = "Status:" + event_status;
    guest.innerText = "By:" + elt.By;

    container.appendChild(title);
    container.appendChild(status);
    container.appendChild(guest);

    events_div.appendChild(container);
  });
}

function createPaginationControls() {
  paginationControls.innerHTML = "";
  const totalPages = Math.ceil(events.length / eventsPerPage);

  for (let i = 1; i <= totalPages; i++) {
    const button = document.createElement("button");
    button.textContent = i;
    if (i === currentPage) {
      button.classList.add("active");
    }
    button.addEventListener("click", () => {
      currentPage = i;
      renderEvents();
      createPaginationControls();
    });
    paginationControls.appendChild(button);
  }
}

