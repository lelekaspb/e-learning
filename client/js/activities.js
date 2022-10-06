import { fetchStudents } from "./fetch-script.js";
import { getActivities } from "./fetch-script.js";
import { createActivityArticle } from "./activity-component.js";
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

window.addEventListener("load", async function () {
  console.log("window load");
  const response = await fetchStudents();
  const studentSelect = document.querySelector("#students");
  populateStudentOptions(response.students);
  studentSelect.addEventListener("change", displayActivities);
});

function populateStudentOptions(students) {
  console.log("populate student options");
  console.log(students);
  const list = document.querySelector("#students");
  students.forEach((user) => {
    const option = document.createElement("option");
    option.value = user._id;
    option.textContent = user.name;
    list.appendChild(option);
  });
}

async function displayActivities(event) {
  const activities = await getActivities(event.target.value);
  console.log(activities);

  const container = document.querySelector(".activities-found");

  if (activities.activities.length > 0) {
    container.innerHTML = "";
    const header = document.createElement("article");
    header.className = "activity-article";

    const html = `<div class="date">Date</div>
                  <div class="topic">Topic</div>`;

    header.insertAdjacentHTML("afterbegin", html);
    container.appendChild(header);

    activities.activities.forEach((activity) => {
      const article = createActivityArticle(activity);
      container.appendChild(article);
    });
  } else {
    container.innerHTML = "No activities to display";
  }
}
