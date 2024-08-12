using TypeGen.Core.TypeAnnotations;

namespace GTFormLibrary.Models;

[ExportTsInterface]
public class CustomField
{
    public Guid? Id { get; set; }
    
    public required string FieldName { get; set; }

    [TsOptional]
    public string? FormControlName { get; set; }

    public ComponentValueType ComponentValueType { get; set; }

    public ComponentType ComponentType { get; set; }

    [TsOptional]
    public string? FieldValueAsString { get; set; } 

    public required string FieldLabel { get; set; }
    
    [TsOptional]
    public string? Style { get; set; }

    public bool IsRequired { get; set; }

    public int Order { get; set; }

    public List<ChoiceOption> ChoiceOptions { get; set; } = [];
}