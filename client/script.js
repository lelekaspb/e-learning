import { fetchMedia } from "./fetch-script.js";
import { createMediaArticle } from "./media-component.js";
// import { fetchUsers } from "./fetch-script.js";

window.addEventListener("load", async function () {
  // const users = await fetchUsers();
  // populateUserOptions(users);
  // const userInput = this.document.querySelector("#users");
  // userInput.addEventListener("change", greetUser);
  const form = document.querySelector(".choose-topic");
  console.log(form);
  form.addEventListener("submit", getMedia);
});

async function getMedia(event) {
  event.preventDefault();

  const form = event.target;
  const container = document.querySelector(".articles-found");
  container.innerHTML = "";
  console.log(form.elements.topics.value);
  const topic = form.elements.topics.value;
  const media = await fetchMedia(topic);
  console.log(media);
  media.forEach((elem) => {
    const article = createMediaArticle(elem);
    container.appendChild(article);
  });
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

function greetUser(event) {
  console.log(event.target);
  const userId = event.target.value;
  console.log(userId);
  const userFullName = event.target.querySelector(`option[value="${userId}"]`)
    .dataset.name;
  console.log(userFullName);
}
