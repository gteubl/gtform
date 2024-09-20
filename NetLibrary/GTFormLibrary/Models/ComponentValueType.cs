using TypeGen.Core.TypeAnnotations;

namespace GTFormLibrary.Models;

[ExportTsEnum]
public enum ComponentValueType
{
    String,
    Integer,
    Date,
    Boolean,
    ChoiceOptions,
    ArrayChoiceOptions
}