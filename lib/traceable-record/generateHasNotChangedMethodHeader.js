export { 
	generateHasNotChangedMethodHeader,
	getNameOfHasNotChangedMethod
}

function generateHasNotChangedMethodHeader(sObjectApiName) {
	setInternals(sObjectApiName);
	
	const name = getMethodName();
	const sourceCode = getMethodHeader();

	return {
		name,
		type: cgs.fragmentTypes.traceableRecordHasNotChangedMethodHeader,
		sourceCode
	}
}

function getNameOfHasNotChangedMethod(sObjectApiName) {
	setInternals(sObjectApiName);

	return getMethodName();
}

import cgs from "../tools/codeGenSettings.js";
import sfdc from "../tools/sfdcMetadata.js";

let sObjectSpec;

function setInternals(sObjectApiName) {
	sObjectSpec = cgs.selectSObjectSpec(sObjectApiName);
}

function getMethodName() {
	return `hasNotChanged`;
}

function getMethodHeader() {
	const returnType = getReturnType();
	const methodName = getMethodName();
	
	return `${returnType} ${methodName}()`;
}

function getReturnType() {
	return sfdc.apexDataTypes.Boolean;
}