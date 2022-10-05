import { signinUser } from "./fetch-script.js";
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
    username: form.elements.username.value.trim(),
    password: form.elements.password.value,
  };
  const signinResponse = await signinUser(user);
  console.log(signinResponse);
  if (signinResponse.success) {
    document.querySelector(".message").classList.remove("error");
    sessionStorage.setItem("un", signinResponse.user_full_name);
    sessionStorage.setItem("tk", signinResponse.token);
    sessionStorage.setItem("ut", signinResponse.user_type);
    document.querySelector(".message").textContent = signinResponse.message;
    form.querySelectorAll("input").forEach((input) => {
      input.value = "";
      document.querySelector(".admin-menu-item").hidden = false;
    });
    if (signinResponse.user_type == "admin") {
      document.querySelector(".admin-menu-item").hidden = false;
    } else {
      document.querySelector(".admin-menu-item").hidden = true;
    }
  } else {
    document.querySelector(".message").textContent = signinResponse.message;
    document.querySelector(".message").classList.add("error");
  }
});
