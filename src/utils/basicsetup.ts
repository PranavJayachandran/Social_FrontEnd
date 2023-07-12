import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.REACT_APP_SUPABASEURL!,
  process.env.REACT_APP_SUPABASEKEY!,
  { auth: { persistSession: false } }
);

async function getImageSigned(
  image: string,
  bucket_name: string,
  time: number
) {
  console.log("image");
  const { data, error } = await supabase.storage
    .from(bucket_name)
    .createSignedUrl(image, time);
  return data?.signedUrl;
}

async function getUserData(id: number) {
  let user_data: any;
  var requestOptions: RequestInit = {
    method: "GET",
    redirect: "follow",
  };

  await fetch(`${process.env.REACT_APP_BACKEND}/userData/${id}`, requestOptions)
    .then((response) => response.json())
    .then(async (result: any) => {
      user_data = result;
      let image_link = await getImageSigned(
        user_data.user_image,
        "UserImages",
        6000
      );
      user_data = {
        ...user_data,
        user_image_link: image_link,
      };
    })
    .catch((error) => console.log("error", error));

  return user_data;
}

export { getUserData, getImageSigned };
