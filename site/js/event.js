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
prevButton.disabled = true; // Initially disabled
prevButton.addEventListener("click", () => {
  if (currentPage > 1) {
    currentPage--;
    renderEvents();
    updatePaginationButtons(); // Update buttons when page changes
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
    updatePaginationButtons(); // Update buttons when page changes
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
    allEvents = data; // Store all events
    totalPages = Math.ceil(allEvents.length / eventsPerPage); // Calculate total pages
    renderEvents(); // Initial render of events
    updatePaginationButtons(); // Set up pagination after initial render
  });

/* Render events based on the current page */
function renderEvents() {
  events_div.innerHTML = ""; // Clear the previous content

  const eventGrid = document.createElement("div");
  eventGrid.classList.add("event-grid");

  const start = (currentPage - 1) * eventsPerPage;
  const end = start + eventsPerPage;
  const paginatedEvents = allEvents.slice(start, end); // Get events for the current page

  // Loop through and display each event
  paginatedEvents.forEach((elt) => {
    const container = document.createElement("div");
    container.classList.add("event-container", "d-flex", "align-items-start");

    const details = document.createElement("div");
    details.classList.add("event-details", "ml-3");

    const title = document.createElement("a");
    const status = document.createElement("span");
    const date = document.createElement("p");
    const guest = document.createElement("p");

    const start_detail = elt.Date.split("-");
    const start_time = elt.Time.split(":");

    // Determine the event status
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

    // Set the href based on status
    if (event_status !== "Completed") {
      title.href = elt.URL;
    } else {
      title.href = elt.IMGURL || elt.URL;
    }

    title.classList.add("event-title");

    if (event_status === "Completed") {
      status.classList.add("event-status", "completed");
    } else if (event_status === "Registration Open") {
      status.classList.add("event-status", "registration-open");
    }
    guest.classList.add("event-guest");

    title.innerText = elt.Title;
    status.innerText = event_status;
    date.innerText = `Date: ${elt.Date} Time: ${elt.Time}`;
    guest.innerText = `By: ${elt.By}`;

    details.appendChild(title);
    details.appendChild(date);
    details.appendChild(status);
    details.appendChild(guest);

    container.appendChild(details);

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
      renderEvents(); // Re-render the event list for the selected page
      updatePaginationButtons(); // Update buttons when page changes
    });
    paginationContainer.appendChild(pageButton);
  }

  // Handle Next button
  nextButton.disabled = currentPage === totalPages;
  paginationContainer.appendChild(nextButton);
}
