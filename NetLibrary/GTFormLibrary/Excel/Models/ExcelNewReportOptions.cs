namespace GTFormLibrary.Excel.Models;

public record ExcelNewReportOptions
{
    public string FileName { get; init; } = null!;
    public string SheetName { get; init; } = "DataBase";
    public string TableName { get; init; } = "Table1";
    public object Data { get; init; } = null!;
    
    public bool IgnoreNotPresentedColumns { get; init; } = true;
    
    public List<ExcelHeader> HeaderReplace { get; init; } = [];
    public List<ExcelModelPivotOptions> PivotOptions { get; init; } = [];
    
}

public record ExcelHeader(string DataColumnName, string HeaderName, string? ColumnFormat = null, double? ColumnSize = 0, bool Hidden = false);
