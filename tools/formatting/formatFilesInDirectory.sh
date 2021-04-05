# 1. Before execute
#     1.1. ASSURE WEBSTORM IS NOT RUNNING!!
# 2. How to execute?
#     2.1 From project root folder (code-gen) execute on terminal: tools/formatting/formatFilesInDirectory.sh ./output

WEB_STORM_BIN=/Users/solive37/Library/Application\ Support/JetBrains/Toolbox/apps/WebStorm/ch-0/203.7717.59/WebStorm.app/Contents/bin

if [[ ! -d "$WEB_STORM_BIN" ]]; then
	echo "WebStorm Bin directory was not found."
	echo "Expected Bin directory: $WEB_STORM_BIN"
	exit 1
fi;

if [ -z "$1"]; then
	echo "First argument has to be a directory containing apex files to be formatted.";
	exit 2
fi;

if [[ ! -d "$1" ]]; then
	echo "Directory containing apex files to be formatted does not exist."
	echo "Directory expected to exist: $1"
	exit 3
fi;

DIRECTORY_WITH_APEX_CLASSES=$1
APEX_CODE_STYLE_FILE=./tools/formatting/ApexStyleGuide.xml

"$WEB_STORM_BIN"/format.sh -r "$DIRECTORY_WITH_APEX_CLASSES" -s "$APEX_CODE_STYLE_FILE"