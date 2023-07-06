async function getUserData(id: number) {
  let user_data;
  var requestOptions: RequestInit = {
    method: "GET",
    redirect: "follow",
  };

  await fetch(`https://8mnzrw-5000.csb.app/userData/${id}`, requestOptions)
    .then((response) => response.json())
    .then((result) => {
      user_data = result;
    })
    .catch((error) => console.log("error", error));
  return user_data;
}

export default getUserData;
