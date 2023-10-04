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
  const { data, error } = await supabase.storage
    .from(bucket_name)
    .createSignedUrl(image, time);
  if (data?.signedUrl != undefined) return data?.signedUrl;
  return "";
}

async function getUserData(id: string) {
  let user_data: any;
  var requestOptions: RequestInit = {
    method: "GET",
    redirect: "follow",
  };

  await fetch(`${process.env.REACT_APP_BACKEND}/userData/${id}`, requestOptions)
    .then((response) => response.json())
    .then(async (result: any) => {
      user_data = result;

      let image_link = "Sdsd";
      user_data = {
        ...user_data,
        user_image_link: image_link,
      };
    })
    .catch((error) => console.log("error", error));
  return user_data;
}

export { getUserData, getImageSigned };
