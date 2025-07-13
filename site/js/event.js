const events_div = document.getElementById("event-list");

let date = new Date();
let today_month = date.getMonth();
let today_date = date.getDate();
let today_year = date.getFullYear();

let allEvents = [];
let currentPage = 1;
const eventsPerPage = 5;

// Load events from JSON file
async function loadEvents() {
  console.log('Loading events...');
  
  // Try multiple paths
  const paths = [
    '../../events.json',
    '/events.json',
    './events.json',
    '../events.json'
  ];
  
  for (const path of paths) {
    try {
      console.log(`Trying to fetch from: ${path}`);
      const response = await fetch(path);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const events = await response.json();
      console.log(`Successfully loaded ${events.length} events from ${path}`);
      allEvents = events;
      renderEvents();
      renderPagination();
      return; // Success, exit function
    } catch (error) {
      console.error(`Failed to load from ${path}:`, error);
    }
  }
  
  // If all paths failed
  console.error('All fetch attempts failed');
  events_div.innerHTML = '<p style="text-align: center; color: #666; padding: 3rem;">Error loading events. Please check the console for details.</p>';
}

// Render events with pagination
function renderEvents() {
  events_div.innerHTML = "";

  // Calculate pagination
  const startIndex = (currentPage - 1) * eventsPerPage;
  const endIndex = startIndex + eventsPerPage;
  const eventsToShow = allEvents.slice(startIndex, endIndex);

  // Loop through and display each event
  eventsToShow.forEach((elt) => {
    const eventCard = document.createElement("div");
    eventCard.classList.add("event-card");

    // Create event content
    const eventContent = document.createElement("div");
    eventContent.classList.add("event-content");

    // Event title
    const title = document.createElement("h3");
    title.innerText = elt.Title;

    // Event meta information
    const eventMeta = document.createElement("div");
    eventMeta.classList.add("event-meta");

    const start_detail = elt.Date.split("-");
    const dateSpan = document.createElement("span");
    dateSpan.innerHTML = `<i class="fas fa-calendar"></i> ${start_detail[0]}/${start_detail[1]}/${start_detail[2]}`;

    const timeSpan = document.createElement("span");
    timeSpan.innerHTML = `<i class="fas fa-clock"></i> ${elt.Time}`;

    eventMeta.appendChild(dateSpan);
    eventMeta.appendChild(timeSpan);

    // Event speakers
    const speakers = document.createElement("div");
    speakers.classList.add("event-speakers");
    speakers.innerHTML = `<strong>Speakers:</strong> ${elt.By.join(", ")}`;

    // Event actions
    const eventActions = document.createElement("div");
    eventActions.classList.add("event-actions");

    // Determine the event status
    var event_status = "completed";
    if (today_year < start_detail[2]) event_status = "upcoming";
    else if (today_year == start_detail[2] && today_month + 1 < start_detail[1])
      event_status = "upcoming";
    else if (today_year == start_detail[2] && today_month + 1 == start_detail[1] && today_date <= start_detail[0])
      event_status = "upcoming";

    // Create appropriate buttons based on event status
    if (event_status !== "completed") {
      if (elt.URL) {
        const registerBtn = document.createElement("a");
        registerBtn.href = elt.URL;
        registerBtn.target = "_blank";
        registerBtn.classList.add("event-btn", "primary");
        registerBtn.innerHTML = `<i class="fas fa-user-plus"></i> Register Now`;
        eventActions.appendChild(registerBtn);
      }
    } else {
      if (elt.IMGURL) {
        const galleryBtn = document.createElement("a");
        galleryBtn.href = elt.IMGURL;
        galleryBtn.classList.add("event-btn", "secondary");
        galleryBtn.innerHTML = `<i class="fas fa-images"></i> View Gallery`;
        eventActions.appendChild(galleryBtn);
      }
    }

    if (elt.URL && event_status === "completed") {
      const detailsBtn = document.createElement("a");
      detailsBtn.href = elt.URL;
      detailsBtn.target = "_blank";
      detailsBtn.classList.add("event-btn", "secondary");
      detailsBtn.innerHTML = `<i class="fas fa-info-circle"></i> Details`;
      eventActions.appendChild(detailsBtn);
    }

    // Assemble event content
    eventContent.appendChild(title);
    eventContent.appendChild(eventMeta);
    eventContent.appendChild(speakers);
    eventContent.appendChild(eventActions);

    // Assemble event card
    eventCard.appendChild(eventContent);

    events_div.appendChild(eventCard);
  });
}

// Render pagination controls
function renderPagination() {
  const totalPages = Math.ceil(allEvents.length / eventsPerPage);
  
  // Remove existing pagination if any
  let existingPagination = document.querySelector('.pagination-container');
  if (existingPagination) {
    existingPagination.remove();
  }
  
  // Don't show pagination if there's only one page or no events
  if (totalPages <= 1) {
    return;
  }
  
  const paginationContainer = document.createElement("div");
  paginationContainer.classList.add("pagination-container");
  
  const pagination = document.createElement("div");
  pagination.classList.add("pagination");

  // Previous button
  const prevBtn = document.createElement("button");
  prevBtn.innerHTML = `&lt;`;
  prevBtn.disabled = currentPage === 1;
  prevBtn.addEventListener('click', () => {
    if (currentPage > 1) {
      currentPage--;
      renderEvents();
      renderPagination();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  });
  pagination.appendChild(prevBtn);

  // Page numbers
  for (let i = 1; i <= totalPages; i++) {
    const pageBtn = document.createElement("button");
    pageBtn.innerText = i;
    if (i === currentPage) {
      pageBtn.classList.add("active");
    }
    pageBtn.addEventListener('click', () => {
      currentPage = i;
      renderEvents();
      renderPagination();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
    pagination.appendChild(pageBtn);
  }

  // Next button
  const nextBtn = document.createElement("button");
  nextBtn.innerHTML = `&gt;`;
  nextBtn.disabled = currentPage === totalPages;
  nextBtn.addEventListener('click', () => {
    if (currentPage < totalPages) {
      currentPage++;
      renderEvents();
      renderPagination();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  });
  pagination.appendChild(nextBtn);

  paginationContainer.appendChild(pagination);
  
  // Add pagination after events
  events_div.parentNode.appendChild(paginationContainer);
}

// Load events when page loads
document.addEventListener('DOMContentLoaded', loadEvents);
