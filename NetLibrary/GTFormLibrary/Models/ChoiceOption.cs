using TypeGen.Core.TypeAnnotations;

namespace GTFormLibrary.Models;

[ExportTsInterface]
public class ChoiceOption
{
    public ChoiceOption(Guid value, string description)
    {
        Value = value;
        Description = description;
    }

    public Guid Value { get; set; }
    public string Description { get; set; }
}