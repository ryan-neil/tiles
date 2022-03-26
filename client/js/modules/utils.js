// Dark mode
const toggleDarkMode = () => {
	const darkModeToggle = document.querySelector('#darkModeToggle');

	// users' last choice will be remembered
	let darkMode = localStorage.getItem('darkMode');

	// check if dark mode is enabled
	// if it's enabled, turn it off
	// if it's disabled, turn it on

	const enableDarkMode = () => {
		document.body.classList.add('darkmode');
		// update darkMode in the localStorage
		localStorage.setItem('darkMode', 'enabled');
		return;
	};

	const disableDarkMode = () => {
		document.body.classList.remove('darkmode');
		// update darkMode in the localStorage
		localStorage.setItem('darkMode', null);
		return;
	};

	// check if dark mode is active
	if (darkMode === 'enabled') {
		enableDarkMode();
	}

	darkModeToggle.addEventListener('click', () => {
		// update local storage each click event
		darkMode = localStorage.getItem('darkMode');

		if (darkMode !== 'enabled') {
			enableDarkMode();
		}
		else {
			disableDarkMode();
		}
		return;
	});
};
toggleDarkMode();
