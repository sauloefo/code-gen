import { describe } from "mocha";
// const expect = require('chai').expect;
import chai from "chai";
const should = chai.should();
import sinon from "sinon";

import generateIdFieldGetterForDomain from "../../../../../lib/domains/accessors/getters/generateIdFieldGetterForDomain.js";
import stringTools from "../../../../../lib/tools/stringTools.js";

describe("DomainAccessor class test", () => {
	after(() => sinon.restore());

	describe("Id-field based members", () => {
		it("It should generate Id getter as expected", () => {
			const sObjectApiName = "Case";
			const fieldSpec = { 
				apiName: "Id",
				fieldPluralName: "ids"
			};
	
			const upperCaseFirstLetterStub = sinon.stub();
			upperCaseFirstLetterStub.returns("Ids");
	
			sinon.stub(stringTools, "upperCaseFirstLetter").callsFake(upperCaseFirstLetterStub);
	
			const sourceCode = generateIdFieldGetterForDomain(sObjectApiName, fieldSpec);
			const expectedSourceCode = `public Set<Id> getIds(){return getIdFieldValues(Case.Id);}`;
			
			sourceCode.should.equal(expectedSourceCode, "Id getter for domain accessor class is not as expected.");
		});
	});
});