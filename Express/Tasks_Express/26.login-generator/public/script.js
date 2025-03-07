document.addEventListener('DOMContentLoaded', () => {
	const rangeInput = document.getElementById('rangeSym');
	const rangeValue = document.getElementById('rangeValue');

	const textInput = document.getElementById('letters');
	const textValue = document.getElementById('lettersValue');

	rangeValue.textContent = rangeInput.value;

	rangeInput.addEventListener('input', (event) => {
		rangeValue.textContent = event.target.value;
	});

	textInput.addEventListener('input', (event) => {
		textValue.textContent = event.target.value;
	});
});
