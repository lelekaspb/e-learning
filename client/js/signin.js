import { signinUser } from "./fetch-script.js";
import { checkSignedin } from "./browse.js";

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
    sessionStorage.setItem("uid", signinResponse.user_id);
    // document.querySelector(".message").textContent = signinResponse.message;
    // form.querySelectorAll("input").forEach((input) => {
    //   input.value = "";
    //   document.querySelector(".admin-menu-item").hidden = false;
    // });
    if (signinResponse.user_type == "admin") {
      document.querySelector(".admin-menu-item").hidden = false;
    } else {
      document.querySelector(".admin-menu-item").hidden = true;
    }
    window.location.replace("browse.html");
  } else {
    document.querySelector(".message").textContent = signinResponse.message;
    document.querySelector(".message").classList.add("error");
  }
});
