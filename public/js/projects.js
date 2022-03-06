// project modal section
let modal = document.getElementById("demo-modal");
let modalPic = document.getElementById("modal-pic");
let modalCaption = document.getElementById("modal-caption");
let modalChoose = document.getElementById("modal-prev-next");

function displayModal(prjID, picID) {
    modal.style.display = "block";
    
    let demo = document.getElementById(`${prjID}-demo`);
    let numPics = demo.childNodes.length;
    let demoPic = demo.childNodes[picID];
    modalPic.src = demoPic.src;
    modalPic.onclick = () => { window.open(demoPic.src, '_blank').focus(); };

    modalCaption.innerHTML = demoPic.alt;

    modalChoose.innerHTML = '';
    if (picID > 0) modalChoose.innerHTML += `<span id="modal-previous" style="display: block;" onclick="displayModal('${prjID}', '${Number(picID)-1}')">&lt;</span>`;
    if (picID < numPics-1) modalChoose.innerHTML += `<span id="modal-next" style="display: block;" onclick="displayModal('${prjID}', '${Number(picID)+1}')">&gt;</span>`;
}

function closeModal() {
    modal.style.display = "none";
    modalPic.removeAttribute("src");
    modalCaption.innerHTML = '';
    modalChoose.innerHTML = '';
}


// expand and collapse descriptions and details
function expandCollapse(elem) {
    let delim = elem.id.indexOf('-');
    let section = elem.id.slice(0, delim);
    let prjID = elem.id.slice(delim+1);
    let block = document.getElementById(`${prjID}-${section}`);

    if (elem.className == "expand") {
        elem.className = "collapse";
        block.style.display = "block";
        if (section == "des") elem.innerHTML = "Description &#9662;";
        else if (section == "det") elem.innerHTML = "Details &#9662;";
        else if (section == "demo") elem.innerHTML = "Screenshots &#9662;";
    } else if (elem.className == "collapse") {
        elem.className = "expand";
        block.style.display = "none";
        if (section == "des") elem.innerHTML = "Description &#9656;";
        else if (section == "det") elem.innerHTML = "Details &#9656;";
        else if (section == "demo") elem.innerHTML = "Screenshots &#9656;";
    }
}
