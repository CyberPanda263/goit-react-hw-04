import axios from "axios";

const fetchGalery = async (query, page = 1, per_page = 12) => {
  const accessKey = "j_qTNdKOkwJ1X4PKFSDUAo0y8ouetFbWOThOfKd0JsU";
  const response = await axios.get("https://api.unsplash.com/search/photos", {
    headers: {
      Authorization: `Client-ID ${accessKey}`,
    },
    params: {
      query: query,
      page,
      per_page,
    },
  });
  return response.data;
};

export default fetchGalery;