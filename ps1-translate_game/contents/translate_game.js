const dicts = {
    "English": {
        "Spanish": {
            "nuera": "daughter-in-law",
            "ese": "that",
            "fosa": "moat",
            "camino": ["street", "way"],
            "palabra": "word",
            "banana": "banana"
        }
    }
};

$(function() {
    var lang_to = "English";
    var lang_from = "Spanish";
    var current_dict = dicts[lang_to][lang_from]; // keys: words in @lang_to, values: corresponding words in @lang_from

    const tableBody = $('#translation-table');

    Object.keys(current_dict).forEach((spanish, index) => {
        const row = $('<tr>');

        const spanishCell = $('<td>').addClass('spanish-word').text(spanish);
        const englishCell = $('<td>');

        const input = $('<input>').attr('type', 'text').attr('id', 'input-' + index);
        englishCell.append(input);

        const answerCell = $('<td>');
        const button = $('<button>').text('See Answer').on('click', () => checkAnswer(index, current_dict[spanish]));
        answerCell.append(button);

        row.append(spanishCell).append(englishCell).append(answerCell);
        tableBody.append(row);
    });

    function checkAnswer(index, correctAnswer) {
        const input = $('#input-' + index);
        if (!input) return;

        const inputValue = input.val().trim().toLowerCase();
        let isCorrect = false;
        if (Array.isArray(correctAnswer)) {
            isCorrect = correctAnswer.map(ans => ans.toLowerCase()).includes(inputValue);
        } else {
            isCorrect = inputValue === correctAnswer.toLowerCase();
        }

        if (isCorrect) {
            input.addClass('correct').prop('disabled', true);
            $('<span>').addClass('check-mark').text('✓').appendTo(input.parent());
        } else {
            input.addClass('incorrect strikethrough').prop('disabled', true);
            const correctText = Array.isArray(correctAnswer) ? correctAnswer.join(', ') : correctAnswer;
            $('<span>').addClass('correct-answer').text(correctText).appendTo(input.parent());
        }
    }
});