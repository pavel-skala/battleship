const refreshSection = document.getElementById("refreshSection");
const refreshYes = document.getElementById("refreshYes");
const refreshNo = document.getElementById("refreshNo");
const refreshButton = document.getElementById("refreshButton");

refreshButton.onclick = () => {
    refreshSection.style.display = "flex";
};

refreshYes.onclick = () => {
    refreshSection.style.display = "none";

    localStorage.clear();
};

refreshNo.onclick = () => {
    refreshSection.style.display = "none";
};
