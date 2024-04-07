const pixabay = async searchTerm => {
    console.log(`pixabay:search=>[${searchTerm}]`);
    const baseUrl = 'https://pixabay.com/api/';
    const api_key = '43273309-00e3b6b60594751f75d0d2555';
    const queryParams = {
      key: api_key,
      q: searchTerm,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
    };
    const queryString = new URLSearchParams(queryParams).toString();
    console.log('queryParams:', queryParams);
    const url = `${baseUrl}?${queryString}`;
    const options = {
      method: 'GET',
    };
  
    try {
      const response = await fetch(url, options);
      const json = await response.json();
      return json;
    } catch (error) {
      console.error('p:Error fetching images:', error);
      throw error;
    } finally {
      console.log(`pixabay:search.end;`);
    }
  };
  export default pixabay;