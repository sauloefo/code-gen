import { describe } from "mocha";
// const expect = require('chai').expect;
import chai from "chai";
const should = chai.should();

import generateIdFieldGetterForDomain from "../../../../../lib/domains/accessors/getters/generateIdFieldGetterForDomain.js";
import generateIdFieldSetterForDomain from "../../../../../lib/domains/accessors/setters/generateIdFieldSetterForDomain.js";
import gcs from "../../../../../lib/tools/codeGenSettings.js";

describe("DomainAccessor class test", () => {
	describe("Id-field based members", () => {
		before(() => gcs.setSettings({
			"outputDirectory": "output",
			"sObjectSpecs": [
				{
					"apiName": "Case",
					"sObjectPluralName": "cases",	
					"fieldSpecs": [
						{
							"apiName": "Id", 
							"fieldType": "Id",
							"fieldPluralName": "ids"
						},
						{
							"apiName": "ContactId",
							"singularName": "contactId"
						}
					]
				}
			]
		}));
		after(() => sinon.restore());

		it("It should generate Id getter as expected", () => {
			const sourceCode = generateIdFieldGetterForDomain("Case", "Id");
			const expectedSourceCode = "public Set<Id> getIds(){return getIdFieldValues(Case.Id);}";
			
			sourceCode.should.equal(expectedSourceCode, "Id getter for domain accessor class is not as expected.");
		});

		it("It should generate Id setter as expected", () => {
			const sourceCode = generateIdFieldSetterForDomain("Case", "ContactId");
			const expectedSourceCode = "public ICases setContactId(Id newContactId){setIdField(Case.ContactId,newContactId);return this;}";
			
			sourceCode.should.equal(expectedSourceCode, "Id setter for domain accessor class is not as expected.");
		});
	});
});