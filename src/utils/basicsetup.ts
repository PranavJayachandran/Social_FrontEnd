async function getUserData(id: number) {
  let user_data;
  var requestOptions: RequestInit = {
    method: "GET",
    redirect: "follow",
  };

  await fetch(`${process.env.REACT_APP_BACKEND}/userData/${id}`, requestOptions)
    .then((response) => response.json())
    .then((result) => {
      user_data = result;
    })
    .catch((error) => console.log("error", error));
  return user_data;
}

export default getUserData;
