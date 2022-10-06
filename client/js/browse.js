import { fetchMedia } from "./fetch-script.js";
import { createMediaArticle } from "./media-component.js";
// import { fetchUsers } from "./fetch-script.js";

let userSignedIn;
const greetingsDiv = document.querySelector(".greeting");

const userType = sessionStorage.getItem("ut");
if (checkSignedin() && userType == "admin") {
  document.querySelector(".admin-menu-item").hidden = false;
} else {
  document.querySelector(".admin-menu-item").hidden = true;
}

window.addEventListener("load", async function () {
  userSignedIn = checkSignedin();
  addGreetingMessage(userSignedIn);

  const form = document.querySelector(".choose-topic");
  if (form) {
    form.addEventListener("submit", getMedia);
  }
});

async function getMedia(event) {
  event.preventDefault();

  if (userSignedIn) {
    greetingsDiv.classList.remove("error");
    const form = event.target;
    const container = document.querySelector(".articles-found");
    container.innerHTML = "";
    const topic = form.elements.topics.value;
    const userId = sessionStorage.getItem("uid");
    const media = await fetchMedia(topic, userId);
    media.forEach((elem) => {
      const article = createMediaArticle(elem);
      container.appendChild(article);
    });
  } else {
    greetingsDiv.classList.add("error");
  }
}

export function checkSignedin() {
  if (sessionStorage.getItem("tk")) {
    return true;
  } else {
    return false;
  }
}

function addGreetingMessage(userSignedin) {
  if (greetingsDiv) {
    if (userSignedin) {
      const userFullName = sessionStorage.getItem("un");
      const userType = sessionStorage.getItem("ut");
      if (userType == "student") {
        greetingsDiv.textContent = `Hello ${userFullName}, your user role is ${userType}.`;
      } else if (userType == "admin") {
        greetingsDiv.innerHTML = `Hello ${userFullName}, your user role is ${userType}. Track students' activities 
          <a href="activities.html" class="activities-link">
            here
          </a>
        `;
      }
    } else {
      greetingsDiv.textContent = "Please sign in order to browse the content.";
    }
  }
}

// function populateUserOptions(users) {
//   const list = document.querySelector("#users");
//   users.forEach((user) => {
//     const option = document.createElement("option");
//     option.value = user._id;
//     option.textContent = user.username;
//     option.dataset.name = user.name;
//     // option.dataset.role = user.role;
//     list.appendChild(option);
//   });
// }
