import axios from "axios";

const featured = axios.create({
  baseURL: "https://api.pexels.com",
});

export const getFeaturedPics = async (pageParam, options = {}) => {
  const { data } = await featured.get("/v1/curated", {
    params: {
      page: `${pageParam}`,
      per_page: "15",
    },
    headers: {
      Authorization: "563492ad6f917000010000016009cf422a864bd38e1f935b8b0832f1",
    },
    options,
  });
  return data;
};

const search = axios.create({
  baseURL: "https://api.pexels.com",
});

export const getSearchPics = async (pageParam, options = {},keyword) => {
  const { data } = await search.get("/v1/search", {
    params: {
      query:keyword,
      page: `${pageParam}`,
      per_page: "15",
    },
    headers: {
      Authorization: "563492ad6f917000010000016009cf422a864bd38e1f935b8b0832f1",
    },
    options,
  });
  return data;
};