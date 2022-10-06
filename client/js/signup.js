import { createUser } from "./fetch-script.js";
import { checkSignedin } from "./browse.js";

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
  document.querySelector(".admin-menu-item").hidden = true;
}

if (checkSignedin() && userType == "admin") {
  document.querySelector(".admin-menu-item").hidden = false;
} else {
  document.querySelector(".admin-menu-item").hidden = true;
}

const form = document.querySelector(".singin-form");
form.addEventListener("submit", async function (event) {
  event.preventDefault();
  const user = {
    name: form.elements.name.value.trim(),
    username: form.elements.username.value.trim(),
    password: form.elements.password.value,
  };
  const newUserResponse = await createUser(user);
  console.log(newUserResponse);
  if (await newUserResponse.success) {
    document.querySelector(".message").classList.remove("error");
  } else {
    document.querySelector(".message").classList.add("error");
  }
  document.querySelector(".message").textContent = newUserResponse.message;
});
