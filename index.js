import { formatFilesInOutputDirectory } from "./lib/tools/formatApexFile.js";
import cgs from "./lib/tools/codeGenSettings.js";

import { createTraceableRecordClassFile } from "./lib/domains/traceable-record/createTraceableRecordClassFile.js";
import { createTraceableRecordInterfaceFile } from "./lib/domains/traceable-record-interface/createTraceableRecordInterfaceFile.js";

const formatFiles = true;
const sObjectApiName = "Case";
const fileCreators = [
	createTraceableRecordClassFile,
	createTraceableRecordInterfaceFile
]

cgs.loadFromFile("./templates/codeGenSettings.json");

fileCreators.forEach(fileCreator => fileCreator(sObjectApiName));

if (formatFiles) formatFilesInOutputDirectory();