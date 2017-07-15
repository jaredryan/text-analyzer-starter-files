function handleAnalyzeIt() {
	$('.js-form').submit(function(event) {
		// Keeps words in textbox
		event.preventDefault();

		// Get text and put it in a format we can work with
		var userTextElement = $(event.currentTarget).find('#user-text');
		var words = getWords(userTextElement.val());

		// Get needed data from words array.
		var uniqueWords;
		var avgLength;
		var numWords = words.length;

		// In the case of just one word.
		if (words.length === 1) {
			avgLength = words[0].length;
			uniqueWords = 1;
		} else {
			// For multiple words.

			// Reduce into just unique words to obtain its number.
			var uniqueArray = words.reduce(function(a,b){
				if (a.indexOf(b) < 0 ) {
					a.push(b);
			 	}
			 	return a;
			},[]);
			uniqueWords = uniqueArray.length

			// Count the total number of characters and divide.
			var numCharacters = 0;
			words.forEach(function(element) {
				numCharacters += element.length;
			});
			avgLength = numCharacters / numWords;
		}
		// Round avgLength to two decimals.
		avgLength = Math.round(avgLength * 100) / 100 + " characters";



		// Empty previous results
		$('.js-numWords').empty();
		$('.js-uniqueWords').empty();
		$('.js-avgLength').empty();

		// Fill with current results
		$('.js-numWords').text(numWords);
		$('.js-uniqueWords').text(uniqueWords);
		$('.js-avgLength').text(avgLength);

		// Reveals results
		$('.hidden').removeClass("hidden");
	});
}

// Processes the rawString into an array of sorted alphabetical words.
function getWords(rawString) {
  return rawString.toLowerCase().split(/[ ,!.";:-]+/).filter(Boolean).sort();
}

// Run
$(function () {
	handleAnalyzeIt();
});