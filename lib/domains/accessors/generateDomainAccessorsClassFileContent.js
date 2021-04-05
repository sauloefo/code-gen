import sfdc from "../../tools/sfdcMetadata.js";
import sflc from "../../tools/sflcComponentNames.js";
import md from "../../tools/metadataSpec.js";
import generateIdFieldGetterForDomain from "./getters/generateIdFieldGetterForDomain.js";
import upperCaseFirstLetter from "../../tools/upperCaseFirstLetter.js";

function generateIdFieldsAccessors(sObjectApiName) {
	const idFieldSpecs = md.selectFieldSpecByFieldType(sObjectApiName, sfdc.fieldTypes.Id);

	return idFieldSpecs
			.map(idFieldSpec => {
					const getter = generateIdFieldGetterForDomain(sObjectApiName, idFieldSpec);
					const setter = "";

					return `${getter} ${setter}`;
			})
			.join(" ");
}

function generateDomainAccessorsClass (sObjectApiName) {
	const className = md.getDomainAccessorsClassName(sObjectApiName);
	const superClassName = sflc.baseDomainClass;

	const idFieldAccessors = generateIdFieldsAccessors(sObjectApiName);

	return `public abstract class ${className} extends ${superClassName} {${idFieldAccessors}}`;
}

export default generateDomainAccessorsClass;