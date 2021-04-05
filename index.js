import { formatFilesInOutputDirectory } from "./lib/tools/formatApexFile.js";
import cgs from "./lib/tools/codeGenSettings.js";
import func from "./lib/domains/accessors/generateDomainAccessorsClassFile.js";

cgs.loadFromFile("./templates/codeGenSettings.json");

func("Case");
formatFilesInOutputDirectory();