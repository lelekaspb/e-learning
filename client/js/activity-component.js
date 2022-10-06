export function createActivityArticle(activityObject) {
  const article = document.createElement("article");
  article.className = "activity-article";

  const html = `<div class="date">${new Date(
    activityObject.date
  ).toLocaleDateString("en-GB")}</div>
                <div class="topic">${activityObject.topic}</div>`;

  article.insertAdjacentHTML("afterbegin", html);
  return article;
}
