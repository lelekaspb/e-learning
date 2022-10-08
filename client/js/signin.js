import { signinUser } from "./fetch-script.js";

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

    window.location.replace("browse.html");
  } else {
    document.querySelector(".message").textContent = signinResponse.message;
    document.querySelector(".message").classList.add("error");
  }
});
