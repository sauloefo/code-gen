import { formatFilesInOutputDirectory } from "./lib/tools/formatApexFile.js";
import { logInfo } from "./lib/tools/logger.js";
import cgs from "./lib/tools/codeGenSettings.js";

import { createDomainAccessorsClassFile } from "./lib/domains/accessors/createDomainAccessorsClassFile.js";
import { createDomainInterfaceFile } from "./lib/domains/interface/createDomainInterfaceFile.js";

import { createTraceableRecordClassFile } from "./lib/domains/traceable-record/createTraceableRecordClassFile.js";
import { createTraceableRecordInterfaceFile } from "./lib/domains/traceable-record-interface/createTraceableRecordInterfaceFile.js";

const formatFiles = true;
const sObjectApiName = "Case";
const fileCreators = [
	createDomainAccessorsClassFile,
	createDomainInterfaceFile,
	createTraceableRecordClassFile,
	createTraceableRecordInterfaceFile
]

cgs.loadFromFile("./templates/codeGenSettings.json");

logInfo("Starting to create files ...");
fileCreators.forEach(fileCreator => fileCreator(sObjectApiName));
logInfo("Files created.");

if (formatFiles) formatFilesInOutputDirectory();