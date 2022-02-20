function sendMessage() {
    let name = document.getElementById("form-name").value.trim();
    let email = document.getElementById("form-email").value.trim();
    let message = document.getElementById("form-message").value.trim();
    if (message.length == 0) {
        alert(`Message is empty.`);
        return;
    }
    if (email.length != 0 && !(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(input.value))) {
        alert(`Email address is not valid.`);
        return;
    }

    let newMessage = {content: message};
    if (name.length != 0) newMessage.name = name;
    if (email.length != 0) newMessage.email = email; 

    let privacyRadios = document.getElementsByClassName("radios");
    for (let radio of privacyRadios) {
        if (radio.checked) {
            if (radio.id == 'form-true') newMessage.privacy = true;
            else if (radio.id == 'form-false') newMessage.privacy = false;
        }
    }

    // console.log("new message: ", newMessage);
    if (typeof newMessage.content != 'string') return;   // ignore bad request

    let req = new XMLHttpRequest();
    req.onreadystatechange = function() {
        if (this.readyState == 4) {
            if (this.status == 201) {
                window.location.href = `/guestbook`;
            } else if (this.status == 400) {
                alert(this.responseText);
            }
        }
    }
    req.open("POST", `/guestbook`, true);
    req.setRequestHeader("Content-Type", "application/json");
    req.setRequestHeader("Accept", "application/json");
    req.send(JSON.stringify(newMessage));
}