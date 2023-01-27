// js for back to top button starts here
//Get the button
var backToTopBtn = document.getElementById("btn-back-to-top");

// show the button, when scrolled down 40px from the top 
window.onscroll = function () {
  scrollFunction();
};

function scrollFunction() {
  if (
    document.body.scrollTop > 40 ||
    document.documentElement.scrollTop > 40
  ) {
    backToTopBtn.style.display = "block";
  } else {
    backToTopBtn.style.display = "none";
  }
}
//scroll to the top, when clicked on the button, 
backToTopBtn.addEventListener("click", backToTop);

function backToTop() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}
// for back to top ends here