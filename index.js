tab = "home";

function displayPullout() {
  let pullout = document.getElementById("pullout");
  if (tab == "home") {
    pullout.style = `
            border-width: 0px;
            margin-left: 0px;
            width: 0%; 
        `;
    pullout.innerHTML = "";
  } else {
    pullout.style = `
            border-width: 8px;
            margin-left: 12px;
            width: 100%; 
        `;
    let html = document.getElementById("info_" + tab);
    pullout.innerHTML = html.innerHTML;
  }
}
displayPullout();

function switchTab(target) {
  // css for tab highlighting
  let tabs = document.getElementsByClassName("tab");
  tabs[tab].style = "";
  target.style = "background-color: var(--prim); width: 80px;";
  // set tab variable to refer to later
  tab = target.id;
  // set the hash fragment
  let currentUrl = new URL(window.location.href);
  currentUrl.hash = "tab" + tab;
  window.location.href = currentUrl.toString();
  displayPullout();
}

// check hash fragment on page load to decide on a tab to open
function checkHash() {
  let currentUrl = new URL(window.location.href);
  if (currentUrl.hash != "") {
    let element = document.getElementById(currentUrl.hash.replace("#tab", ""));
    console.log(currentUrl.hash);
    switchTab(element);
  }
}

function handleTabSwitch(e) {
  let target = e.target;
  if (target.className == "icon") target = target.parentElement;
  switchTab(target);
}

let tabs = document.getElementsByClassName("tab");
console.log(tabs.about);
for (const element of tabs) {
  element.onclick = handleTabSwitch;
}