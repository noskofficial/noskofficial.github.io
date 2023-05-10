
let images = Array.from(document.getElementsByClassName("view-image"));
let gallery = document.getElementById("gallery");
var modal = document.getElementById('myModal');
var modalImg = document.getElementById("modal-img");
let userClickedImagePosition;
const close_modal = () => {
    gallery.style.display = "block";
    modal.style.display = "none";
}
const managePrevnNext = (position) => {
    userClickedImagePosition = position
}
const view_image = ({ src, alt }) => {
    gallery.style.display = "none";
    modal.style.display = "block";
    modalImg.src = src;
    modalImg.alt = alt;
    var close_button = document.getElementById("close-btn")
    const previousButton = document.getElementById("previousButton")
    const nextButton = document.getElementById("nextButton")
    close_button.addEventListener("click", close_modal);
    previousButton.addEventListener('click', () => {
        if ((userClickedImagePosition == 0) || (userClickedImagePosition > 0)) {
            userClickedImagePosition == 0 ? "" : userClickedImagePosition--
            modalImg.src = images[userClickedImagePosition].currentSrc;
        }
    })
    nextButton.addEventListener('click', () => {
        if ((userClickedImagePosition == (images.length - 2)) || (userClickedImagePosition < images.length)) {
            userClickedImagePosition == (images.length - 2) ? "" : userClickedImagePosition++
            modalImg.src = images[userClickedImagePosition].currentSrc;
        }
    })
}
images.forEach((image, index) => {
    image.addEventListener("click", () => {
        view_image(image)
        managePrevnNext(index)
    });
});