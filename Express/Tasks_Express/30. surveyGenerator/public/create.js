document.querySelector('.survey-answers').addEventListener('click', (e) => {
	const label = e.target.closest('label');
	if (!label) {
		return;
	}

	e.preventDefault();
	const answerOption = label.closest('.answer-option');
	const input = answerOption.querySelector('input[type="radio"]');

	const editInput = document.createElement('input');
	editInput.type = 'text';
	editInput.value = label.textContent;
	editInput.className = 'edit-input';

	answerOption.replaceChild(editInput, label);
	editInput.focus();

	editInput.addEventListener('blur', () => {
		const newText = editInput.value.trim() || 'New Answer';

		label.textContent = newText;
		input.value = newText;

		answerOption.replaceChild(label, editInput);
	});

	editInput.addEventListener('keydown', (event) => {
		if (event.key === 'Enter') {
			editInput.blur();
		}
	});
});
