const clickCheck = document.getElementsByClassName("nav-link");
const navBox = document.getElementById("nav-list");
const buttonData = [
    {
        name: "Home",
        link: "#"
    },
    {
        name: "About",
        link: "#"
    },
    {
        name: "Gallery",
        link: "#"
    },
    {
        name: "Events",
        link: "#"
    },
    {
        name: "Contact",
        link: "#"
    },
];
buttonData.map((button, i) => {
    const mainButtonData = `<li class="nav-item">
    <a class="nav-link" href="${button.link}" onclick="buttonClick(${i})">${button.name}</a>
  </li>`;
    navBox.insertAdjacentHTML("beforeend", mainButtonData);
})
const navLink = document.getElementsByClassName("nav-link");
let prevClick;
const buttonClick = (clickValue) => {
    if (prevClick !== undefined) {
        Array.from(navLink).map((prevButton, i) => {
            if (i == prevClick) {
                prevButton.classList.remove("active");
            }
        })
        Array.from(navLink).map((appenNew, is) => {
            if (is == clickValue) {
                appenNew.classList.add("active");
                prevClick = is;
            }
        })
    } else {
        Array.from(navLink).map((clickedButton, position) => {
            if (clickValue == position) {
                clickedButton.classList.add("active");
                prevClick = position;
            }
        })
    }

}