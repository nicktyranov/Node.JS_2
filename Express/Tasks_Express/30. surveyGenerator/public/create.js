console.log('script conneccted');
document.querySelector('.add-answer').addEventListener('click', (e) => {
	e.preventDefault();
	const parent = document.querySelector('.survey-answers');

	const newInput = document.createElement('div');
	newInput.className = 'answer-option';

	const currentAnswersCount = parent.querySelectorAll('.answer-option').length + 1;

	newInput.innerHTML = `
	<label>
		<span class="answer-text">Answer ${currentAnswersCount}</span>
		<input text="radio" name="answer-${currentAnswersCount}" value="" />
	</label>
	`;

	parent.appendChild(newInput);
});

document.querySelector('.delete-answer').addEventListener('click', (e) => {
	e.preventDefault();

	const parent = document.querySelector('.survey-answers');
	const currentAnswersCount = parent.querySelectorAll('.answer-option').length;
	if (currentAnswersCount < 1) {
		return;
	}
	const lastInput = parent.querySelector('.answer-option:last-child');

	parent.removeChild(lastInput);
});

document.querySelector('#add-question').addEventListener('click', (e) => {
	e.preventDefault();

	const survey = document.querySelector('.survey');
	const questionCount = survey.querySelectorAll('.question').length;

	const newQuestion = document.createElement('div');
	newQuestion.className = 'question';
	newQuestion.setAttribute('data-question-index', questionCount);

	newQuestion.innerHTML = `
    <label>Question ${questionCount + 1}</label>
    <input type='text' name='questions[${questionCount}][text]' class='question-input' required />

    <h4>Answers</h4>
    <div class='survey-answers' data-question-index="${questionCount}">
      <div class='answer-option'>
        <label>
          <span class='answer-text'>Answer 1</span>
          <input type='text' name='questions[${questionCount}][answers][0][text]' required />
        </label>
      </div>

      <div class='answer-option'>
        <label>
          <span class='answer-text'>Answer 2</span>
          <input type='text' name='questions[${questionCount}][answers][1][text]' required />
        </label>
      </div>
    </div>

    <div class='controls-buttons'>
      <span class='add-answer' style='color: brown; cursor:pointer;'>+ Add answer</span>
      <span class='delete-answer' style='color: brown; cursor:pointer;'>- Delete answer</span>
    </div>
  `;

	survey.appendChild(newQuestion);
});

document.querySelector('#delete-question').addEventListener('click', (e) => {
	e.preventDefault();

	const survey = document.querySelector('.survey');
	const questions = survey.querySelectorAll('.question');

	if (questions.length > 1) {
		survey.removeChild(questions[questions.length - 1]);
	}
});
