export { 
	generateHasChangedMethodHeader,
	getNameOfHasChangedMethod
}

function generateHasChangedMethodHeader(sObjectApiName) {
	setInternals(sObjectApiName);
	
	const name = getMethodName();
	const sourceCode = getMethodHeader();

	return {
		name,
		type: cgs.fragmentTypes.traceableRecordHasChangedMethodHeader,
		sourceCode
	}
}

function getNameOfHasChangedMethod(sObjectApiName) {
	setInternals(sObjectApiName);

	return getMethodName();
}	

import cgs from "../../tools/codeGenSettings.js";
import sfdc from "../../tools/sfdcMetadata.js";

let sObjectSpec;

function setInternals(sObjectApiName) {
	sObjectSpec = cgs.selectSObjectSpec(sObjectApiName);
}

function getMethodName() {
	return `hasChanged`;
}

function getMethodHeader() {
	const returnType = getReturnType();
	const methodName = getMethodName();
	
	return `${returnType} ${methodName}()`;
}

function getReturnType() {
	return sfdc.apexDataTypes.Boolean;
}