const url = "http://127.0.0.1:3000/media";

export async function fetchMedia(topic) {
  const getUrl = url + `/${topic}`;
  const options = {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  };

  try {
    const response = await fetch(getUrl, options);
    console.log(response.status);
    return response.json();
  } catch (err) {
    console.error(err);
  }
}
