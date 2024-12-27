document
  .getElementById("contact-form")
  .addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent default form submission

    if (validateCaptcha()) {
      // Get form values
      var name = document.getElementById("name").value;
      var email = document.getElementById("email").value;
      var subject = document.getElementById("subject").value;
      var message = document.getElementById("message").value;

      // Create the template parameters object
      var templateParams = {
        name: name,
        subject: subject,
        message: message,
      };

      // Send the email using EmailJS
      emailjs.send("your_service_id", "your_template_id", templateParams).then( // replace with your service id and template id from Emailjs
        function (response) {
          console.log("SUCCESS!", response.status, response.text);
          // On success, redirect to the success page
          window.location.href = "/site/html/contact-success.html";
        },
        function (error) {
          console.log("FAILED...", error);
          alert("Failed to send message. Please try again later.");
        }
      );
    }
  });

function validateCaptcha() {
  const response = grecaptcha.getResponse();
  if (response.length === 0) {
    alert("Please verify the reCAPTCHA.");
    return false; // Prevent form submission
  }
  return true; // Allow form submission
}
