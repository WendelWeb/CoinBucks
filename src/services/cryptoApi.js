import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const cryptoApiHeaders = {
  "x-rapidapi-key": "8123663c78mshecae4b7ab2eb4c9p1bff52jsn970a8bdfd508",
  "x-rapidapi-host": "coinranking1.p.rapidapi.com",
};

const baseUrl = "https://coinranking1.p.rapidapi.com";
const createRequest = (url) => ({ url, headers: cryptoApiHeaders });
// const options = {
//   method: "GET",
//   hostname: "coinranking1.p.rapidapi.com",
//   port: null,
//   path: "/stats?referenceCurrencyUuid=yhjMzLPhuIDl",
//   headers: {
//     "x-rapidapi-key": "8123663c78mshecae4b7ab2eb4c9p1bff52jsn970a8bdfd508",
//     "x-rapidapi-host": "coinranking1.p.rapidapi.com",
//   },
// };

export const cryptoApi = createApi({
  reducerPath: "cryptoApi",
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    getCryptos: builder.query({
      query: (count) => createRequest(`/coins?limit=${count}`),
    }),
    getCryptoDetails: builder.query({
      query: (coinId) => createRequest(`/coin/${coinId}`),
    }),
    getCryptoHistory: builder.query({
      query: ({ coinId, timePeriod }) =>
        createRequest(`/coin/${coinId}/history?timeperiod=${timePeriod}`),
    }),

    getExchanges: builder.query({
      query: () =>
        createRequest(`/coin/Qwsogvtv82FCd/exchanges?referenceCurrencyUuid=yhjMzLPhuIDl&limit=50&offset=0&orderBy=24hVolume&orderDirection=desc',
	`),
    }),
  }),
});

export const {
  useGetCryptosQuery,
  useGetCryptoDetailsQuery,
  useGetCryptoHistoryQuery,
  useGetExchangesQuery,
} = cryptoApi;
