async function getUserData(id: number) {
  let user_data;
  var requestOptions: RequestInit = {
    method: "GET",
    redirect: "follow",
  };

  await fetch(`http://localhost:5000/userData/${id}`, requestOptions)
    .then((response) => response.json())
    .then((result) => {
      user_data = result;
      console.log("User", result);
    })
    .catch((error) => console.log("error", error));
  return user_data;
}

export default getUserData;
