import { formatFilesInOutputDirectory } from "./lib/tools/formatApexFile.js";
import func from "./lib/domains/accessors/generateDomainAccessorsClassFile.js";

func("Case");
formatFilesInOutputDirectory();