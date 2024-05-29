using TypeGen.Core.TypeAnnotations;

namespace GTFormLibrary.Models;

[ExportTsInterface]
public class ChoiceOption
{
    public ChoiceOption(int value, string description)
    {
        Value = value;
        Description = description;
    }

    public int Value { get; set; }
    public string Description { get; set; }
}