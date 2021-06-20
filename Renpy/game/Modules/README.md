Place modules in this folder. One folder per module.

Modules starting with "DISABLED" are ignore. It is stronly recommended not to name modules with a starting underline "_" as those are assumed to be part of the PowerPlay Framework.

The module name is used to ensure that characters, locations and labels/passages never have conflicting names.

ALL labels in a module MUST start with a string that is the same as the module folder's name OR with the special "_M_NAME_" string which will replace be replaced during pre-processing.
    E.g.: label _M_NAME_Meet_Jennifer:

ALL character IDs in a module MUST start with a string that is the same as the module folder's name OR with the special "_M_NAME_" string which will replace be replaced during pre-processing.
    E.g.: { "_M_NAME_THE_MAYOR": {...} }

ALL location IDs in a module MUST start with a string that is the same as the module folder's name OR with the special "_M_NAME_" string which will replace be replaced during pre-processing.
    E.g.: { "_M_NAME_SCHOOL": {...} }


