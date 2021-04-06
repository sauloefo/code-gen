import fileIo from "./fileIo.js";
import stringTools from "./stringTools.js";
import sfdc from "./sfdcMetadata.js";

let settings;

function addDataTypeToFieldSpecs() {
	const createFieldSpecWithDataType = function(fieldSpec) {
		if (fieldSpec.dataType) return fieldSpec;
	
		let dataType;
	
		switch (fieldSpec.fieldType) {
			case sfdc.fieldTypes.Id:
			case sfdc.fieldTypes.LookupRelationship:
			case sfdc.fieldTypes.MasterDetailRelationship:
				dataType = sfdc.apexDataTypes.Id;
				break;
			case sfdc.fieldTypes.Checkbox:
				dataType = sfdc.apexDataTypes.Boolean;
				break;
			case sfdc.fieldTypes.Date:
				dataType = sfdc.apexDataTypes.Date;
				break;
			case sfdc.fieldTypes.DateTime:
				dataType = sfdc.apexDataTypes.DateTime;
				break;
			case sfdc.fieldTypes.Email:
			case sfdc.fieldTypes.LongTextArea:
			case sfdc.fieldTypes.Phone:
			case sfdc.fieldTypes.Picklist:
			case sfdc.fieldTypes.RichTextArea:
			case sfdc.fieldTypes.Text:
			case sfdc.fieldTypes.TextArea:
			case sfdc.fieldTypes.Url:
				dataType = sfdc.apexDataTypes.String;
				break;
			case sfdc.fieldTypes.Currency:
			case sfdc.fieldTypes.Percent:
				dataType = sfdc.apexDataTypes.Decimal;
				break;
			default:
				throw Error(`FieldType "${fieldSpec.fieldType}" is not associated with any DataType.`);
		}
		
		return {
			...fieldSpec,
			dataType: dataType
		};
	}

	getSettings().sObjectSpecs
			.filter(sObjectSpec => sObjectSpec.fieldSpecs.length > 0)
			.forEach(sObjectSpec => sObjectSpec.fieldSpecs = sObjectSpec.fieldSpecs.map(createFieldSpecWithDataType));
}

function getFieldTypesFromFieldSpecs(sObjectApiName) {
	const uniqueFieldTypes = new Set(
			selectSObjectSpec(sObjectApiName).fieldSpecs
					.map(fieldSpec => fieldSpec.fieldType)
	);
	return [...uniqueFieldTypes];
}

function getDomainAccessorsClassName(sObjectApiName) {
	const sObjectSpec = selectSObjectSpec(sObjectApiName);
	return `${stringTools.upperCaseFirstLetter(sObjectSpec.pluralName)}Accessors`;
}

function getDomainInterfaceName(sObjectApiName) {
	const sObjectSpec = selectSObjectSpec(sObjectApiName);
	return `I${stringTools.upperCaseFirstLetter(sObjectSpec.pluralName)}`; 
}

function getFieldName(sObjectApiName,fieldApiName) {
	return `${sObjectApiName}.${fieldApiName}`;
}

function getOutputDirectory() {
	return fileIo.path.resolve(process.cwd(),settings.outputDirectory);
}

function getSettings() {
	if (settings) return settings;

	throw Error("CodeGen settings has not been set.\nCall setSettings(newSettings) or loadFromFile(filePath) before use any other function from codeGenSettings.js");
}

function loadFromFile(filePath) {
	const fileContent = fileIo.fs.readFileSync(filePath, "utf8");
	const loadedSettings = JSON.parse(fileContent);
	setSettings(loadedSettings);
}

function selectFieldSpecByApiName(sObjectApiName, fieldApiName) {
	const fieldSpec = selectSObjectSpec(sObjectApiName)
			.fieldSpecs.find(fieldSpec => fieldSpec.apiName === fieldApiName);
	
	if (fieldSpec) return fieldSpec;

	throw Error(`There is no fieldSpec with apiName equal to "${fieldApiName}" for a SObject with apiName equal to "${sObjectApiName}".`);
}

function selectFieldSpecByFieldType(sObjectApiName, fieldType) {
	return selectSObjectSpec(sObjectApiName)
			.fieldSpecs.filter(fieldSpec => fieldSpec.fieldType === fieldType);
}

function selectSObjectSpec(sObjectApiName) {
	const sObjectSpec = getSettings().sObjectSpecs.find(sObjectSpec => sObjectSpec.apiName === sObjectApiName);
	if (sObjectSpec) return sObjectSpec;

	throw Error(`There is no sObjectSpec for a SObject with apiName equal to "${sObjectApiName}".`);
}

function setSettings(newSettings) {
	settings = {
		...newSettings
	};
	addDataTypeToFieldSpecs();
}

export default {
	getFieldTypesFromFieldSpecs,
	getDomainAccessorsClassName,
	getDomainInterfaceName,
	getFieldName,
	getOutputDirectory,
	loadFromFile,
	selectFieldSpecByApiName,
	selectFieldSpecByFieldType,
	selectSObjectSpec,
	setSettings
}