/* ------------------------------ TASK 9 -----------------------------------
Parašykite JS kodą, kuris leis vartotojui paspaudus ant mygtuko "Show users"
pamatyti vartotojus iš Github API (endpoint'as pateiktas žemiau).

Paspaudus mygtuką "Show users":
1. Informacija atvaizduojama <div id="output"></div> bloke
1.1. Informacija, kuri pateikiama: "login" ir "avatar_url" reikšmės (kortelėje)
2. Žinutė "Press "Show Users" button to see users" turi išnykti;
3. Isrykiuoti pagal varda mazejimo tvarka

Pastaba: Sukurta kortelė, kurioje yra pateikiama vartotojo informacija, turi 
būti stilizuota su CSS ir būti responsive;
-------------------------------------------------------------------------- */

const ENDPOINT = "https://api.github.com/users";
const btn = document.querySelector("#btn");
const output = document.querySelector("#output");

let usersData = "";
//1. duomenys is API
async function getUsersList() {
  const response = await fetch(ENDPOINT, {
    method: "GET",
  });
  if (response.status === 200) {
    return await response.json();
  } else {
    console.log(response.statusText);
  }
}

async function onButtonClick() {
  const users = await getUsersList();
  usersData = [];
  users.forEach((el) => {
    usersData.push({
      login: el.login,
      url: el.avatar_url,
    });
  });
  const sortedArray = usersData.sort((a, b) => {
    //3. rusiavimas pagal varda mazejimo tvarka
    if (b.login.length - a.login.length) {
      return b.login.length - a.login.length;
    }
  });
  renderUsers(sortedArray);
}

function renderUsers(arr) {
  output.innerHTML = "";
  const htmlData = [];
  arr.forEach((el) => {
    htmlData.push(`
        <div>
            <img src="${el.url}"/>
            <br />
            <p>
                ${el.login}
            </p>
        </div>`);
  });
  output.innerHTML = htmlData.join("");
}

btn.addEventListener("click", function () {
  btn.classList.toggle("active");

  if (btn.classList.contains("active")) {
    // onButtonClick();
    console.log(usersData);
    if (!usersData) {
      onButtonClick();
    } else {
      output.style.display = "block";
    }
  } else {
    output.style.display = "none";
  }
});
