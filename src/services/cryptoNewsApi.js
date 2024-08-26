import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const cryptoNewsHeaders = {
  "x-rapidapi-key": "8123663c78mshecae4b7ab2eb4c9p1bff52jsn970a8bdfd508",
  "x-rapidapi-host": "bing-search-apis.p.rapidapi.com",
};

const baseUrl = "https://newsdata.io/api/1";
const createRequest = (url) => ({ url, headers: cryptoNewsHeaders });

// const options = {
//   method: "GET",
//   hostname: "bing-search-apis.p.rapidapi.com",
//   port: null,
//   path: "/api/rapid/web_search?keyword=how-to-use-excel-for-free&page=0&size=30",
//   headers: {
//     "x-rapidapi-key": "8123663c78mshecae4b7ab2eb4c9p1bff52jsn970a8bdfd508",
//     "x-rapidapi-host": "bing-search-apis.p.rapidapi.com",
//   },
// };
export const cryptoNewsApi = createApi({
  reducerPath: "cryptoNewsApi",
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    getCryptoNews: builder.query({
      query: (subject) =>
        createRequest(
          `/news?apikey=pub_5128603ec965d5782efac921acc16e2596d79&q=${subject}`
        ),
    }),
  }),
});

export const { useGetCryptoNewsQuery } = cryptoNewsApi;
