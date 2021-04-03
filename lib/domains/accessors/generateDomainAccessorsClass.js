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
	const sObjectSpec = md.selectSObjectSpec(sObjectApiName);
	const className = upperCaseFirstLetter(sObjectSpec.sObjectPluralName);
	const superClassName = sflc.baseDomainClass;

	const idFieldAccessors = generateIdFieldsAccessors(sObjectApiName);

	return `public abstract class ${className}Accessors extends ${superClassName} {${idFieldAccessors}}`;
}

export default generateDomainAccessorsClass;