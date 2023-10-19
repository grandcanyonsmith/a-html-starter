function validateForm(event) {
    event.preventDefault();
    var x = document.forms["contactForm"]["phone"].value;
    var regex = /^[0-9-+]+$/;
    if (!x.match(regex)) {
        alert("Phone number must be valid");
        return false;
    } else {
        document.forms["contactForm"].reset();
    }
}
