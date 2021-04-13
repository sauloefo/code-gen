# Conventions

## Structure of Javascript files' content

I am trying a different layout to organise the content of Javascript modules. Instead having the traditional structure:

- `Import` statements;
- Variable declarations;
- Functions & Classes;
- `Export` statement;

I am trying the following structure:

- `Export` statement;
- Exported Functions & Classes;
- `Import` statements;
- Remaining Functions & Classes;

The purpose of this structure is to make easier to any developer understand the _Responsibility_ a particular module in handling. Giving the most visibile region of a source code file to the exported elements of a module helps to quickly understand what that module contributes for in a project. It also gives developers some context in advance to understand everything else (import statements and not exported functions and classes): my understanding is that nothing should not exist is a module unless it is exported or dependent by something that is exported. Thus, in order to understand module members that are not exported it is required to understand the members that are exported by the module.

As I said, this is an experiment: I am trying it and collecting feedback in order to understand if this is something good o not.

## `generate` functions and source code fragments

All functions starting with `generate` word have, as return type, an object of type `Fragment`.
The word "Fragment" is the short form of "source code fragment". It represents a piece of code and has at least two attributes:

- `sourceCode`: contains the source code related to the fragment as String;
- `type`: the type of fragment. It will be one of the values listed in `fragmentTypes` in codeGenSettings.js file;