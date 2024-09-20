namespace GTFormLibrary.Excel.Models;

public record ExcelModelOptions
{
    public string ModelName { get; init; } = null!;
    public string FirstDataCell { get; init; } = null!;
    public string SheetName { get; init; } = null!;
    public string FileName { get; init; } = null!;
    public string? TableName { get; init; }
    public ExcelModelPivotOptions? PivotOptions { get; init; }
    public ExcelStyleOverrideMode ExcelStyleOverrideMode { get; init; }
}

public enum ExcelStyleOverrideMode
{
    None,
    ApplyFirstTableRowStyle,
    OverrideFirstTableRowStyle
}