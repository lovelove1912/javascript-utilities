const MAXIMUM_RANGE = 999999999999999;

/**
 * parse number to words, maximum is trillions
 * @param amount
 * @returns
 */
function parseMoneyFromNumberToWords(amount) {
	var complements = [ "", " thousand", " million", " billion", " trillion" ];
	var parsedResult = "";
	var amountNumber = parseFloat(amount);
	if (amountNumber <= MAXIMUM_RANGE) {
		var numberWithComma = amountNumber.toLocaleString("US");
		var splittedNumbers = numberWithComma.split(",");
		var groupOfThree;
		var splittedNumbersLastIndex = splittedNumbers.length - 1;
		for (var i = splittedNumbersLastIndex; i >= 0; i--) {
			groupOfThree = parseInt(splittedNumbers[i]);
			var threeNumbInWords = parseThreeNumberToWords(groupOfThree);
			var complement = complements.shift();
			if (groupOfThree > 0) {
				threeNumbInWords += complement;
			}
			if (threeNumbInWords.trim() != "") {
				threeNumbInWords += " ";
			}
			
			parsedResult = threeNumbInWords + parsedResult;
		}
	}
	else {
		parsedResult = "out of range!"
	}
	
	return parsedResult;
};

/**
 * parse number to words (maximum 3 numbers)
 * @param number
 * @returns number in words
 */
function parseThreeNumberToWords(number) {
	var resultWords = "";
	var units = [ "zero", "one", "two", "three", "four", "five", "six",
			"seven", "eight", "nine", "ten" ];
	var teens = [ "ten", "eleven", "twelve", "thirteen", "fourteen", "fifteen",
			"sixteen", "seventeen", "eighteen", "nineteen" ];
	var tens = [ "nope", "ten", "twenty", "thirty", "forty", "fifty", "sixty",
			"seventy", "eighty", "ninety" ];
	try {
		var remain = number;
		if (remain >= 100) {
			var hundred = Math.floor(remain / 100);
			remain = remain % 100;
			resultWords += units[hundred] + " hundred";
		}
		if (remain >= 20) {
			var ten = Math.floor(remain / 10);
			remain = remain % 10;
			if (hasWordHundredAtLast(resultWords, " ")) {
				resultWords += " and ";
			}
			resultWords += tens[ten];

		}
		if (remain > 10) {
			if (hasWordHundredAtLast(resultWords, " ")) {
				resultWords += " and ";
			}
			resultWords += teens[remain % 10];
			remain = 0;
		} else if (remain > 0) {
			if (hasWordHundredAtLast(resultWords, " ")) {
				resultWords += " and ";
			} else if (resultWords.length > 0) {
				resultWords += " ";
			}
			resultWords += units[remain];
			remain = 0;
		}
	} catch (err) {
		resultWords = err.message;
	}
	return resultWords;
}

/**
 * Check if the text has "hundred" word at last. 
 * This method is internally used in parseThreeNumberToWords function to handle "and" word addition.
 * @param text
 * @param separator
 * @returns true if the hundred is the last in string.
 */
function hasWordHundredAtLast(text, separator) {
	var result = false;
	if (text != null && text.trim() != "") {
		var lastWord = text.split(separator).pop();
		if (lastWord != null && "hundred" === lastWord.toLowerCase()) {
			result = true;
		}
	}
	return result;
}