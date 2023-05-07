
let images = Array.from(document.getElementsByClassName("view-image"));
let gallery = document.getElementById("gallery");
var modal = document.getElementById('myModal');


const close_modal = () => {
    gallery.style.display = "block";
    modal.style.display = "none";
}


const view_image = (e) => {
    gallery.style.display = "none";
 
    var modalImg = document.getElementById("modal-img");
    modal.style.display = "block";
    modalImg.src = e.target.src;
    modalImg.alt = e.target.alt;
    modalImg.style.width = e.target.naturalWidth;
    modalImg.style.height = e.target.naturalHeight;

    var close_button = document.getElementById("close-btn")
    close_button.addEventListener("click", close_modal);
}

images.forEach(image => {
    image.addEventListener("click", view_image);
});



