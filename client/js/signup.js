import { createUser } from "./fetch-script.js";
import { checkSignedin } from "./browse.js";

const userType = sessionStorage.getItem("ut");
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
});
