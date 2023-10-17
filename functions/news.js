const fetch = require('node-fetch');

exports.handler = async (event, context) => {
  try {
const API_KEY="1756bd1a6bce4492b2312060a7eb8f80";
    const query = event.queryStringParameters.q;

    // const apiUrl = `https://newsapi.org/v2/everything?q=${query}&from=2023-09-17&sortBy=publishedAt&apiKey=${API_KEY}`;
    const apiUrl = `https://newsapi.org/v2/everything?q="pak"&apiKey=1756bd1a6bce4492b2312060a7eb8f80`;
    // https://newsapi.org/v2/everything?q=tesla&from=2023-09-17&sortBy=publishedAt&apiKey=1756bd1a6bce4492b2312060a7eb8f80
    const response = await fetch(apiUrl,{method:"GET"});
    const data = await response.json();

    return {
      statusCode: 200,
      body: JSON.stringify(data),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'An error occurred' }),
    };
  }
};
