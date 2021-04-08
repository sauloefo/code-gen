import { formatFilesInOutputDirectory } from "./lib/tools/formatApexFile.js";
import cgs from "./lib/tools/codeGenSettings.js";
import { createDomainAccessorsClassFile as func } from "./lib/domains/accessors/createDomainAccessorsClassFile.js";

cgs.loadFromFile("./templates/codeGenSettings.json");

func("Case");
formatFilesInOutputDirectory();