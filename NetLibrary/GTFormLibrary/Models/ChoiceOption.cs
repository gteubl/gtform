using TypeGen.Core.TypeAnnotations;

namespace GTFormLibrary.Models;

[ExportTsInterface]
public class ChoiceOption
{
    public ChoiceOption(string value, string description)
    {
        Value = value;
        Description = description;
    }

    public string Value { get; set; }
    public string Description { get; set; }
}