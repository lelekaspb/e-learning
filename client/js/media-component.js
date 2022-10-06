export function createMediaArticle(mediaObject) {
  const article = document.createElement("article");
  article.className = "media-article";

  const html = `<a href="#" class="media-link">
                    <h3 class="media-heading">
                        ${mediaObject.topic.title}
                    </h3>
                </a>
                <p class="media-text">
                    ${mediaObject.description.substring(0, 300)} ...
                </p>`;

  article.insertAdjacentHTML("afterbegin", html);
  return article;
}
