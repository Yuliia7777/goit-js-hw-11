import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import pixabay from './js/pixabay-api';
import renderData from './js/render-functions';

{
  const form = document.getElementById('searchForm');
  const input = document.getElementById('searchInput');
  const loader = document.getElementById('loader');
  loader.style.display = 'none';

  form.addEventListener('submit', async event => {
    event.preventDefault();

    const searchTerm = input.value.trim();

    if (searchTerm === '') {
      let message = 'Please enter a search term.';
      iziToast.error({
        title: 'Error:',
        message: message,
        position: 'topRight',
      });
      return;
    }

   
    loader.style.display = 'block';

   // await setTimeout(async () => {
      try {
        let response = await pixabay(searchTerm);
        console.log('m:data', response);
        const data = response.hits;
        console.log('m:hits:', data);
        input.value = ``;

        if (data.length === 0) {
          renderData(data);
          iziToast.error({
            message: `main: Sorry, there are no images matching your search query: [${searchTerm}]. Please try again!`,
          });
          return;
        }

        renderData(data);
      } catch (error) {
        console.error('Error fetching images:', error);
        iziToast.error({
          title: 'Error:',
          message:
            'An error occurred while fetching images. Please try again later.',
        });
      } finally {
        
        loader.style.display = 'none';
    }  
    //},4000);
   
    return;
  });
}
