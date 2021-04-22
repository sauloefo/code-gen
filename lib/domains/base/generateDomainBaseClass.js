export { generateDomainBaseClass }

function generateDomainBaseClass(sObjectApiName) {
	setInternals(sObjectApiName);

	const name = getClassName();
	const fragmentType = getFragmentType();
	const sourceCode = getSourceCode();

	return {
		name,
		type: fragmentType,
		sourceCode
	}
}

import cgs from "../../tools/codeGenSettings.js";
import fflc from "../../tools/fflcComponentNames.js";
import stringTools from "../../tools/stringTools.js";

let sObjectSpec;

function setInternals(sObjectApiName) {
	sObjectSpec = cgs.selectSObjectSpec(sObjectApiName);
}

function getClassName() {
	return cgs.getDomainBaseClassName(sObjectSpec.apiName);
}

function getFragmentType() {
	return cgs.fragmentTypes.domainBaseClass;
}

function getSourceCode() {
	const className = getClassName();
	const superClassName = getSuperClassName();

	const statements = [
		`public abstract class ${className} extends ${superClassName} {`,

		"}"
	];

	return stringTools.convertToSourceCode(statements);
}

function getSuperClassName() {
	return fflc.domainBaseClassName;
}