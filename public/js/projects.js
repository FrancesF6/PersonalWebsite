let modal = document.getElementById("demo-modal");
let modalPic = document.getElementById("modal-pic");
let modalCaption = document.getElementById("modal-caption");
let modalChoose = document.getElementById("modal-prev-next");

function displayModal(projectURL, picID) {
    modal.style.display = "block";
    
    let demo = document.getElementById(`demo-${projectURL}`);
    let numPics = demo.childNodes.length;
    let demoPic = demo.childNodes[picID];
    modalPic.src = demoPic.src;
    modalPic.onclick = () => { window.open(demoPic.src, '_blank').focus(); };

    modalCaption.innerHTML = demoPic.alt;

    modalChoose.innerHTML = '';
    if (picID > 0) modalChoose.innerHTML += `<span id="modal-previous" style="display: block;" onclick="displayModal('${projectURL}', '${Number(picID)-1}')">&lt;</span>`;
    if (picID < numPics-1) modalChoose.innerHTML += `<span id="modal-next" style="display: block;" onclick="displayModal('${projectURL}', '${Number(picID)+1}')">&gt;</span>`;
}

function closeModal() {
    modal.style.display = "none";
    modalPic.removeAttribute("src");
    modalCaption.innerHTML = '';
    modalChoose.innerHTML = '';
}