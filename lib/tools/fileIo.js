import fs from "fs";
import path from "path";

function joinAndNormalize() {
	return path.normalize(path.join(...arguments));
}

function createOrOverwriteFile(filePath, fileContent) {
	if (!fs.existsSync(filePath)) {
		const fileDirectory = path.dirname(filePath);

		if (!fs.existsSync(fileDirectory)) fs.mkdirSync(fileDirectory,{recursive: true});
	}
	fs.writeFileSync(filePath, fileContent);
}

export default {
	fs: {
		...fs,
		createOrOverwriteFile
	},
	path: {
		...path,
		joinAndNormalize
	},
}