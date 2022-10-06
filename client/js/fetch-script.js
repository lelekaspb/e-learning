const mediaUrl = "http://127.0.0.1:3000/media";
// const usersUrl = "http://127.0.0.1:3000/users";

export async function fetchMedia(topic, userId) {
  const options = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      topic: topic,
      user_id: userId,
    }),
  };

  try {
    const response = await fetch(mediaUrl, options);
    console.log(response.status);
    return response.json();
  } catch (err) {
    console.error(err);
  }
}

export async function createUser(user) {
  const url = "http://127.0.0.1:3000/auth/signup";
  const options = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user),
  };

  try {
    const response = await fetch(url, options);
    console.log(response.status);
    return await response.json();
  } catch (err) {
    console.error(err);
  }
}

export async function signinUser(user) {
  const url = "http://127.0.0.1:3000/auth/signin";
  const options = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user),
  };

  try {
    const response = await fetch(url, options);
    console.log(response.status);
    return await response.json();
  } catch (err) {
    console.error(err);
  }
}

export async function fetchStudents() {
  console.log("fetch students");
  const url = "http://127.0.0.1:3000/students";
  const options = {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  };

  try {
    const response = await fetch(url, options);
    console.log(response.status);
    return response.json();
  } catch (err) {
    console.error(err);
  }
}

export async function getActivities(studentId) {
  console.log("fetch activities");
  const url = "http://127.0.0.1:3000/activities";
  const options = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      student_id: studentId,
    }),
  };

  try {
    const response = await fetch(url, options);
    console.log(response.status);
    return response.json();
  } catch (err) {
    console.error(err);
  }
}
