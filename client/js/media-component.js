export function createMediaArticle(mediaObject) {
  console.log(mediaObject.media_type_details[0].media_type_title);
  const article = document.createElement("article");
  article.className = "media-article";
  let html;

  switch (mediaObject.media_type_details[0].media_type_title) {
    case "text":
      html = `<a href="#" class="media-link">
                    <h3 class="media-heading">
                        ${mediaObject.title}
                    </h3>
                </a>
                <p class="media-text">
                    ${mediaObject.description.substring(0, 300)} ...
                </p>`;
      break;
    case "video":
      html = `<a href="#" class="media-link">
                    <h3 class="media-heading">
                        ${mediaObject.title}
                    </h3>
                </a>
                <div class="video-container">
                    <video controls poster="img/video-placeholder.png" > 
                        <source data-src="#" type="video/mp4">
                    </video>
                    <p class="media-text">
                        ${mediaObject.description.substring(0, 200)} ...
                    </p>
                </div>`;
      break;
    case "audio":
      html = `<a href="#" class="media-link">
                    <h3 class="media-heading">
                        ${mediaObject.title}
                    </h3>
                </a>
                <div class="audio-container">
                    <audio controls>
                        <source src="#" type="audio/ogg">
                    </audio>
                    <p class="media-text">
                        ${mediaObject.description.substring(0, 200)} ...
                    </p>
                </div>`;
      break;
  }

  article.insertAdjacentHTML("afterbegin", html);
  return article;
}
