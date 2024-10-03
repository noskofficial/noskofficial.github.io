const events_div = document.getElementById("event-list");

let date = new Date();
let today_month = date.getMonth();
let today_date = date.getDate();
let today_year = date.getFullYear();
let curr_hour = date.getHours();

const eventsPerPage = 6;
let currentPage = 1;
let totalPages = 1;
let allEvents = [];

/* Create a container for pagination controls */
const paginationContainer = document.createElement("div");
paginationContainer.classList.add(
  "pagination-container",
  "text-center",
  "fixed-bottom",
  "mb-2"
);

/* Previous button */
const prevButton = document.createElement("button");
prevButton.innerText = "Previous";
prevButton.classList.add("btn", "btn-primary", "mx-2");
prevButton.disabled = true;
prevButton.addEventListener("click", () => {
  if (currentPage > 1) {
    currentPage--;
    renderEvents();
    updatePaginationButtons();
  }
});

/* Next button */
const nextButton = document.createElement("button");
nextButton.innerText = "Next";
nextButton.classList.add("btn", "btn-primary", "mx-2");
nextButton.addEventListener("click", () => {
  if (currentPage < totalPages) {
    currentPage++;
    renderEvents();
    updatePaginationButtons();
  }
});

/* Append pagination controls */
paginationContainer.appendChild(prevButton);
paginationContainer.appendChild(nextButton);
document.body.appendChild(paginationContainer);

/* Fetch event data from the JSON file */
fetch("/events.json")
  .then((data) => data.json())
  .then((data) => {
    allEvents = data;
    totalPages = Math.ceil(allEvents.length / eventsPerPage);
    renderEvents();
    updatePaginationButtons();
  });

/* Render events based on the current page */
function renderEvents() {
  events_div.innerHTML = "";
  const eventGrid = document.createElement("div");
  eventGrid.classList.add("event-grid");

  const start = (currentPage - 1) * eventsPerPage;
  const end = start + eventsPerPage;
  const paginatedEvents = allEvents.slice(start, end);

  // Loop through and display each event
  paginatedEvents.forEach((elt) => {
    const container = document.createElement("div");
    container.classList.add("event-container", "d-flex", "align-items-start");

    const details = document.createElement("div");
    details.classList.add("event-details", "ml-3");

    const title = document.createElement("a");
    const status = document.createElement("span");
    const guest = document.createElement("p");

    const start_detail = elt.Date.split("-");
    const start_time = elt.Time.split(":");

    // Determine the event status
    var event_status = "Completed";
    if (today_year < start_detail[2]) event_status = "Registration Open";
    else if (today_year == start_detail[2] && today_month + 1 < start_detail[1])
      event_status = "Registration Open";
    else if (today_year == start_detail[2] && today_month + 1 == start_detail[1] && today_date <= start_detail[0])
      event_status = "Registration Open";

    // Apply CSS class based on event status
    if (event_status === "Completed") {
      status.classList.add("event-status", "completed"); 
    } else if (event_status === "Registration Open") {
      status.classList.add("event-status", "registration-open"); 
    }

    // If event is not complete, refer to registration for the event
    // otherwise, refer to the gallery section of the corresponding event
    if (event_status !== "Completed") {
      title.href = elt.URL;
    } else {
      if (elt.IMGURL) title.href = elt.IMGURL;
      else title.href = elt.URL;
    }

    title.innerText = elt.Title;
    title.classList.add("event-title");
    status.innerText = event_status;
    guest.innerText = "By: ";
    guest.classList.add("event-guest");

    elt.By.forEach((collaborator, index) => {
      const profileLink = document.createElement("a");
      profileLink.href = elt.ProfileLink[index] || "#";
      profileLink.innerText = collaborator;
      profileLink.target = "_blank";
      profileLink.classList.add("profile-link");

      guest.appendChild(profileLink);

      if (index < elt.By.length - 1) {
        guest.appendChild(document.createTextNode(", "));
      }
    });

    container.appendChild(title);
    container.appendChild(status);
    container.appendChild(guest);
    events_div.appendChild(container);
  });

  events_div.appendChild(eventGrid);
}

/* Update pagination buttons */
function updatePaginationButtons() {
  // Clear the old page buttons (Previous, Page Numbers, Next)
  paginationContainer.innerHTML = "";

  // Handle Previous button
  prevButton.disabled = currentPage === 1;
  paginationContainer.appendChild(prevButton);

  // Create numbered page buttons
  for (let i = 1; i <= totalPages; i++) {
    const pageButton = document.createElement("button");
    pageButton.innerText = i;
    pageButton.classList.add("btn", "mx-1");

    // Highlight the current page button
    if (i === currentPage) {
      pageButton.classList.add("btn-primary");
    } else {
      pageButton.classList.add("btn-light");
    }

    pageButton.addEventListener("click", () => {
      currentPage = i;
      renderEvents();
      updatePaginationButtons();
    });
    paginationContainer.appendChild(pageButton);
  }

  // Handle Next button
  nextButton.disabled = currentPage === totalPages;
  paginationContainer.appendChild(nextButton);
}
