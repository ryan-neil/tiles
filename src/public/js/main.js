// target DOM elements
const tilesDOM = document.querySelector('.tiles');
const loadingDOM = document.querySelector('.loading-text');
const formDOM = document.querySelector('.tile-form');
const tileInputDOM = document.querySelector('.tile-input');
const formAlertDOM = document.querySelector('.form-alert');

// fetch and load tiles from '/api/tiles'
const showTiles = async () => {
  // show loading spinner
  loadingDOM.style.visibility = 'visible';

  try {
    // fetch all tiles
    const {
      data: { tiles },
    } = await axios.get('/api/v1/tiles');

    // check for tiles in database
    if (tiles.length < 1) {
      tilesDOM.innerHTML =
        '<h2 class="empty-list">No tiles on your board...</h2>';
      // hide loading spinner
      loadingDOM.style.visibility = 'hidden';
      return;
    }

    // note
    const allTiles = tiles
      .map((tile) => {
        const { completed, _id: tileID, name } = tile;

        return `
          <div class="single-tile ${completed && 'tile-completed'}">
            
            <div class="tile-links">

              <!-- Edit Button/Link -->
              <a href="edit.html?id=${tileID}" class="tile-icon-wrap">
                <div class="tile-icon edit"></div>
              </a>

              <!-- Delete Button -->
              <button type="button"  class="tile-icon-wrap delete-btn" data-id="${tileID}">
                <div class="tile-icon delete"></div>
              </button>
              
            </div>
            
            <!-- Tile Heading -->
            <h3>${name}</h3>
          </div>
        `;
      })
      .join('');

    // note
    tilesDOM.innerHTML = allTiles;
  } catch (error) {
    // note
    tilesDOM.innerHTML =
      '<h2 class="empty-list">There was an error, please try later....</h2>';
  }

  // hide loading spinner
  loadingDOM.style.visibility = 'hidden';
};
showTiles();

// delete tile /api/tiles/:id
tilesDOM.addEventListener('click', async (e) => {
  // note
  const el = e.target;

  // if element contains the 'delete-btn' class
  if (el.parentElement.classList.contains('delete-btn')) {
    // show loading spinner
    loadingDOM.style.visibility = 'visible';
    // note
    const id = el.parentElement.dataset.id;

    try {
      // axios delete: https://axios-http.com/docs/api_intro
      await axios.delete(`/api/v1/tiles/${id}`);
      // re-fetch all tiles
      showTiles();
    } catch (error) {
      console.log(error);
    }
  }

  // hide loading spinner
  loadingDOM.style.visibility = 'hidden';
});

// form on submit
formDOM.addEventListener('submit', async (e) => {
  // prevent page refresh
  e.preventDefault();
  // get value from the input
  const name = tileInputDOM.value;

  try {
    // if successful: pass data (name) to the server
    // axios post: https://axios-http.com/docs/post_example
    await axios.post('/api/v1/tiles', { name });
    // re-fetch tiles
    showTiles();
    // add correct alerts
    tileInputDOM.value = '';
    formAlertDOM.style.display = 'block';
    formAlertDOM.textContent = `success, tile added`;
    formAlertDOM.classList.add('text-success');
  } catch (error) {
    formAlertDOM.style.display = 'block';
    formAlertDOM.innerHTML = `error, please try again`;
  }

  // note
  setTimeout(() => {
    formAlertDOM.style.display = 'none';
    formAlertDOM.classList.remove('text-success');
  }, 3000);
});
