import { fetchMedia } from "./fetch-script.js";
import { createMediaArticle } from "./media-component.js";

window.addEventListener("load", function () {
  const form = document.querySelector(".choose-topic");
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
