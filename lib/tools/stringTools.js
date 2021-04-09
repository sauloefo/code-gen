function lowerCaseFirstLetter (stringValue) {
	return stringValue.charAt(0).toLowerCase() + stringValue.slice(1);
}

function upperCaseFirstLetter (stringValue) {
	return stringValue.charAt(0).toUpperCase() + stringValue.slice(1);
}

function convertToSourceCode(statements) {
	return statements
			.map(statement => statement.trim())
			.join("\n");
}

export default {
	convertToSourceCode,
	lowerCaseFirstLetter,
	upperCaseFirstLetter
}