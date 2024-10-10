using System;
using System.Collections.Generic;
using ClosedXML.Excel;

namespace GTFormLibrary.Excel.Models;

public record ExcelModelPivotOptions
{
    public string? PivotTableName { get; init; }
    public string? WorksheetTarget { get; init; }

    public string[] RowsLabels { get; init; } = Array.Empty<string>();
    public string? RowHeaderCaption { get; set; }

    public string[] ColumnsLabels { get; init; } = Array.Empty<string>();
    
    public double[] SheetsColumnsSizes { get; init; } = Array.Empty<double>();

    public List<ExcelModelPivotValue> PivotValues { get; init; } = new();
    public List<ExcelModelPivotRowSort>? PivotRowSorts { get; init; }
    public List<ExcelModelPivotRowSort>? PivotColumnSorts { get; init; }
    public List<ExcelModelPivotFilter>? PivotFilters { get; init; }
    
}

public record ExcelModelPivotRowSort(string ColumnName, XLPivotSortType SortType);

public record ExcelModelPivotFilter
{
    public ExcelModelPivotFilter(string filterColumn, List<int> filterValues, bool shouldCreate = false)
    {
        FilterColumn = filterColumn;
        ShouldCreate = shouldCreate;
        SetFilterValues(filterValues);
    }

    public ExcelModelPivotFilter(string filterColumn, List<string> filterValues, bool shouldCreate = false)
    {
        FilterColumn = filterColumn;
        ShouldCreate = shouldCreate;
        SetFilterValues(filterValues);
    }
    
    public ExcelModelPivotFilter(string filterColumn, List<DateTime> filterValues, bool shouldCreate = false)
    {
        FilterColumn = filterColumn;
        ShouldCreate = shouldCreate;
        SetFilterValues(filterValues);
    }

    public bool ShouldCreate { get; init; }
    public string FilterColumn { get; init; } = null!;
    public List<XLCellValue> FilterValues { get; private set; } = new();

    private void SetFilterValues(IEnumerable<int> values)
    {
        FilterValues = new List<XLCellValue>();
        foreach (var value in values)
        {
            FilterValues.Add(value);
        }
    }

    private void SetFilterValues(IEnumerable<string> values)
    {
        FilterValues = new List<XLCellValue>();
        foreach (var value in values)
        {
            FilterValues.Add(value);
        }
    }
    
    private void SetFilterValues(IEnumerable<DateTime> values)
    {
        FilterValues = new List<XLCellValue>();
        foreach (var value in values)
        {
            FilterValues.Add(value);
        }
    }
}

public record ExcelModelPivotValue
{
    public string ColumnSourceName { get; init; } = null!;
    public string Name { get; init; } = null!;

    public string ColumnFormat { get; init; } = "";
    public XLPivotSummary? SummaryFormula { get; init; } = null;
    
    public ShowValueAs ShowValueAs { get; init; } = ShowValueAs.Default;
}

public static class ColumnFormat
{
    public static string Currency { get; } = "R$ #,##0.00";
    public static string PercentageDouble { get; } = "#, ##0.00%";
    public static string PercentageSingle { get; } = "#, ##0.0%";
    public static string Percentage { get; } = "#, ##0%";
    public static string Double { get; } = "#0.00";
    public static string Integer { get; } = "#0";
    public static string Date { get; } = "dd/MM/yyyy";
    public static string DateTime { get; } = "dd/MM/yyyy HH:mm";
    public static string Year { get; } = "yyyy";
}

public enum ShowValueAs
{
    Default,
    PercentageOfTotal,
}