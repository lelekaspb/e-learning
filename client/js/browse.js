import { fetchMedia } from "./fetch-script.js";
import { createMediaArticle } from "./media-component.js";
// import { fetchUsers } from "./fetch-script.js";

let userSignedIn;
const greetingsDiv = document.querySelector(".greeting");

const userType = sessionStorage.getItem("ut");
if (checkSignedin()) {
  // hide sign in and up links, show sign out link
  document.querySelector(".signup-menu-item").hidden = true;
  document.querySelector(".signin-menu-item").hidden = true;
  document.querySelector(".signout-menu-item").hidden = false;
} else {
  // show sign in and up links, hide sign out link
  document.querySelector(".signup-menu-item").hidden = false;
  document.querySelector(".signin-menu-item").hidden = false;
  document.querySelector(".signout-menu-item").hidden = true;
}

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

  const signoutBtn = document.querySelector(".signout-menu-item");
  signoutBtn.addEventListener("click", signUserOut);
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
    console.log(media);
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

function signUserOut(event) {
  event.preventDefault();
  sessionStorage.clear();
  window.location.replace("index.html");
}
