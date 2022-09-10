import axios from 'axios';

export const apiCustList = async (search, page = 1, perPage) => {
  try {
    const { string } = search;
    const url = `https://core.ac.uk:443/api-v2/search/${string}?page=${page}&pageSize=${perPage}&apiKey=RxFGPhoNOJjkDAvgVX6ZU1Wa2HsQ4q53
    `;

    const fetchApi = await axios.get(url);
    const response = await fetchApi.data;
    return response;
  } catch (error) {
    console.log(error);
  }
};
