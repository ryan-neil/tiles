const tileIdDOM = document.querySelector('.tile-edit-id');
const tileNameDOM = document.querySelector('.tile-edit-name');
const tileCompletedDOM = document.querySelector('.tile-edit-completed');
const editFormDOM = document.querySelector('.single-tile-form');
const editBtnDOM = document.querySelector('.tile-edit-btn');
const formAlertDOM = document.querySelector('.form-alert');
const params = window.location.search;
const id = new URLSearchParams(params).get('id');
let tempName;

const showTile = async () => {
  try {
    const {
      data: { tile },
    } = await axios.get(`https://tiles-todo.netlify.app/api/tiles/${id}`);
    const { _id: tileID, completed, name } = tile;

    tileIdDOM.textContent = tileID;
    tileNameDOM.value = name;
    tempName = name;
    if (completed) {
      tileCompletedDOM.checked = true;
    }
  } catch (error) {
    console.log(error);
  }
};

showTile();

editFormDOM.addEventListener('submit', async (e) => {
  editBtnDOM.textContent = 'Loading...';
  e.preventDefault();
  try {
    const tileName = tileNameDOM.value;
    const tileCompleted = tileCompletedDOM.checked;

    const {
      data: { tile },
    } = await axios.patch(`https://tiles-todo.netlify.app/api/tiles/${id}`, {
      name: tileName,
      completed: tileCompleted,
    });

    const { _id: tileID, completed, name } = tile;

    tileIdDOM.textContent = tileID;
    tileNameDOM.value = name;
    tempName = name;
    if (completed) {
      tileCompletedDOM.checked = true;
    }
    formAlertDOM.style.display = 'block';
    formAlertDOM.textContent = `success, edited tile`;
    formAlertDOM.classList.add('text-success');
  } catch (error) {
    console.error(error);
    tileNameDOM.value = tempName;
    formAlertDOM.style.display = 'block';
    formAlertDOM.innerHTML = `error, please try again`;
  }
  editBtnDOM.textContent = 'Edit';
  setTimeout(() => {
    formAlertDOM.style.display = 'none';
    formAlertDOM.classList.remove('text-success');
  }, 3000);
});
