var siteName = document.getElementById("SiteName");
var siteURL = document.getElementById("SiteURL");
var Submit = document.getElementById("Submit");
var tbody = document.getElementById("tbody");

function valditionName() {
  if (siteName.value.length < 3) {
    alert("Site name must contain at least 3 characters");
    return false;
  } else {
    return true;
  }
}

function valditionUrl() {
  let url = siteURL.value.trim();
  let pattern = /^(https?:\/\/)?([\w-]+\.)+[\w-]{2,}(\/[\w-]*)*\/?$/;
  if (!pattern.test(url)) {
    alert("Site URL must be a valid one");
    return false;
  }
  return true;
}
function deletevalue() {
  siteName.value = "";
  siteURL.value = "";
}
var item;
function itemArrey() {
  if (localStorage.product != null) {
    item = JSON.parse(localStorage.product);
  } else {
    item = [];
  }
}
itemArrey();
function goToSection() {
  document.getElementById("result").scrollIntoView({ 
    behavior: "smooth" 
  });
}
Submit.onclick = function Submit() {
  if (valditionUrl() === true && valditionName() === true) {
    var opject_item = {
      name: siteName.value,
      url: siteURL.value,
    };

    item.push(opject_item);
    localStorage.setItem("product", JSON.stringify(item));

    deletevalue();
    tbody.innerHTML = "";  
    addTOTable();
    goToSection();
  }
};

function addTOTable() {
    tbody.innerHTML = ""; 
  for (let i = 0; i < item.length; i++) {
    tbody.innerHTML += `
            <tr>
              <td>${i + 1}</td>
              <td>${item[i].name}</td>
              <td>
                <p
                    onclick="visititem(${i})"
                  class="d-flex gap-2 align-items-baseline py-2 px-3 border-0 rounded-3 justify-content-center bg-info hover-bg-gray my-3 mx-4"
                >
                  <i class="fa-solid fa-eye"></i>Visit
                </p>
              </td>
              <td>
                <p
                  onclick="deleteITEM(${i})" class="d-flex gap-2 align-items-baseline py-2 px-3 border-0 rounded-3 justify-content-center bg-info hover-bg-gray my-3 mx-4"
                >
                  <i class="fa-solid fa-trash"></i>Delete
                </p>
              </td>
            </tr>
              `;
  }
  
}
function deleteITEM(i){
    item.splice(i,1);
    localStorage.setItem('product',JSON.stringify(item));
    location.reload();
}
function visititem(numper){
    window.open(item[numper].url);
}
itemArrey();
addTOTable();