export { 
	generateDomainClass
}

function generateDomainClass(sObjectApiName) {
	setInternals(sObjectApiName);

	const name = getName();
	const sourceCode = getSourceCode();
	const fragmentType = getFragmentType();

	return {
		name,
		type: fragmentType,
		sourceCode
	}
}

import cgs from "../tools/codeGenSettings.js";
import stringTools from "../tools/stringTools.js";
import fflib from "../tools/fflibComponentNames.js";

let sObjectSpec;

function setInternals(sObjectApiName) {
	sObjectSpec = cgs.selectSObjectSpec(sObjectApiName);
}

function getName() {
	return cgs.getDomainClassName(sObjectSpec.apiName);
}

function getSourceCode() {

	const domainClassName = getDomainClassName();
	const domainSuperClassName = getDomainSuperClassName();
	const domainInterfaceName = getDomainInterfaceName();
	const constructorMethodArgumentType = getConstructorMethodArgumentType();
	const constructorClassStatements = getConstructorClassStatements();

	const statements = [
		`public class ${domainClassName} extends ${domainSuperClassName} implements ${domainInterfaceName}{`,
		`  public ${domainClassName}(${constructorMethodArgumentType} records){`,
		"    super(records);",
		"  }",
		...constructorClassStatements,
		"}"
	];

	return stringTools.convertToSourceCode(statements);
}

function getConstructorClassStatements() {
	const constructorClassInterfaceName = getConstructorClassInterfaceName();
	const constructorReturnType = getConstructorReturnType();
	const domainClassName = getDomainClassName();

	return [ 
		`public class Constructor extends ${constructorClassInterfaceName}{`,
		`  public ${constructorReturnType} Construct(List<SObject> records){`,
		`    return new ${domainClassName}(records);`,
		"  }",
		`  public ${constructorReturnType} Construct(List<SObject> records,SObjectType sObjectType){`,
		`    return new ${domainClassName}(records);`,
		"  }",
		"}"
	];
}

function getConstructorClassInterfaceName() {
	return fflib.SObjectDomainConstructorInterfaceName;
}

function getConstructorReturnType() {
	return fflib.SObjectDomainClassName;
}

function getDomainClassName() {
	return cgs.getDomainClassName(sObjectSpec.apiName);
}

function getDomainSuperClassName() {
	return cgs.getDomainAccessorsClassName(sObjectSpec.apiName);
}

function getDomainInterfaceName() {
	return cgs.getDomainInterfaceName(sObjectSpec.apiName);
}

function getConstructorMethodArgumentType() {
	return `List<${sObjectSpec.apiName}>`;		
}

function getFragmentType() {
	return cgs.fragmentTypes.domainClass;
}