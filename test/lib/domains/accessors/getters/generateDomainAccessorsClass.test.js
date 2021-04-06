import { describe } from "mocha";
// const expect = require('chai').expect;
import chai from "chai";
const should = chai.should();

import { generateFieldGetterForDomain } from "../../../../../lib/domains/accessors/generateFieldGetterForDomain.js";
import { generateFieldSetterForDomain } from "../../../../../lib/domains/accessors/generateFieldSetterForDomain.js";
import gcs from "../../../../../lib/tools/codeGenSettings.js";

describe("DomainAccessor class test", () => {
	describe("Id-field based members", () => {
		before(() => gcs.setSettings({
			"outputDirectory": "output",
			"sObjectSpecs": [
				{
					"apiName": "Case",
					"pluralName": "cases",	
					"fieldSpecs": [
						{
							"apiName": "Id", 
							"fieldType": "Id",
							"pluralName": "ids"
						},
						{
							"apiName": "ContactId",
							"fieldType": "MasterDetailRelationship",
							"singularName": "contactId"
						}
					]
				}
			]
		}));

		it("It should generate Id getter as expected", () => {
			const sourceCode = generateFieldGetterForDomain("Case", "Id").sourceCode;
			const expectedSourceCode = "public Set<Id> getIds(){return getFieldValuesAsSetOfId(Case.Id);}";
			
			sourceCode.should.equal(expectedSourceCode, "Id getter for domain accessor class is not as expected.");
		});

		it("It should generate Id setter as expected", () => {
			const sourceCode = generateFieldSetterForDomain("Case", "ContactId").sourceCode;
			const expectedSourceCode = "public ICases setContactId(Id newContactId){setField(Case.ContactId,newContactId);return this;}";
			
			sourceCode.should.equal(expectedSourceCode, "Id setter for domain accessor class is not as expected.");
		});
	});
});