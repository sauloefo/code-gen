# generate functions and source code fragments

All functions starting with `generate` have, as return type, an object of type `Fragment`.
The word "Fragment" is the short form of "source code fragment". It represents a piece of code and has at least two attributes:

`sourceCode`: contains the source code related to the fragment as String;
`sourceCodeType`: the type of fragment. It will be one of the values listed in `SourceCodeTypes` in codeGenSettings.js file;