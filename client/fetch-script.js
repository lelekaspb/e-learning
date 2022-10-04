const mediaUrl = "http://127.0.0.1:3000/media";
// const usersUrl = "http://127.0.0.1:3000/users";

export async function fetchMedia(topic) {
  const getUrl = mediaUrl + `/${topic}`;
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

// export async function fetchUsers() {
//   const options = {
//     method: "GET",
//     headers: { "Content-Type": "application/json" },
//   };

//   try {
//     const response = await fetch(usersUrl, options);
//     console.log(response.status);
//     return response.json();
//   } catch (err) {
//     console.error(err);
//   }
// }
