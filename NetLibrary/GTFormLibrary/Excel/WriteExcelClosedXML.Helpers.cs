using System;
using System.IO;
using System.Linq;
using ClosedXML.Excel;
using GTFormLibrary.Excel.Models;

namespace GTFormLibrary.Excel;

public static class WriteExcelClosedXmlServiceHelpers
{
    public static IXLWorksheet PopulateHeaders(this IXLWorksheet worksheet, string[] headers, int startColumn = 1)
    {
        foreach (var header in headers)
        {
            worksheet.Cell(1, startColumn).Value = header;
            startColumn++;
        }

        return worksheet;
    }
    public static IXLWorksheet PopulateData(this IXLWorksheet worksheet, string[] headers, object[] data,
        int startRow = 2, ExcelStyleOverrideMode applyPreviewRowStyle = ExcelStyleOverrideMode.None)
    {
        var currentRow = startRow;
        if (applyPreviewRowStyle == ExcelStyleOverrideMode.OverrideFirstTableRowStyle)
        {
            currentRow++;
        }

        foreach (var row in data)
        {
            var rowType = row.GetType();
            var rowProperties = rowType.GetProperties();


            foreach (var rowProperty in rowProperties)
            {
                if (!headers.Contains(rowProperty.Name))
                {
                    continue;
                }
                
                var headerIndexOfProperty = Array.IndexOf(headers, rowProperty.Name);

                var cellColumnPositionInRow = headerIndexOfProperty + 1;

                var value = rowProperty.GetValue(row);

                worksheet.Cell(currentRow, cellColumnPositionInRow).Value = GetTypedValue(value);

                if (currentRow == startRow || applyPreviewRowStyle == ExcelStyleOverrideMode.None)
                {
                    continue;
                }

                if (currentRow != startRow && applyPreviewRowStyle == ExcelStyleOverrideMode.ApplyFirstTableRowStyle)
                {
                    worksheet.Cell(currentRow, cellColumnPositionInRow).Style =
                        worksheet.Cell(startRow, cellColumnPositionInRow).Style;
                }
            }

            currentRow++;
        }

        if (applyPreviewRowStyle == ExcelStyleOverrideMode.OverrideFirstTableRowStyle)
        {
            worksheet.Row(startRow).Delete();
        }

        return worksheet;
    }

    public static XLCellValue GetTypedValue(object? value)
    {
        if (value == null)
        {
            return new XLCellValue();
        }

        var type = value.GetType();

        switch (type)
        {
            case Type when value is bool:
                return (bool)value;
            case Type _ when value is double:
                return (double)value;
            case Type _ when value is decimal:
                return decimal.ToDouble((decimal)value);
            case Type _ when value is string:
                return (string)value;
            case Type _ when value is DateTime:
                return (DateTime)value;
            case Type _ when value is TimeSpan:
                return (TimeSpan)value;
            case Type _ when value is int:
                return (int)value;
            default:
                return value.ToString();
        }
    }

    public static string GetFilePath()
    {
        var path = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "files");
        if (!Directory.Exists(path))
        {
            Directory.CreateDirectory(path);
        }

        return path;
    }

    public static string GetModelsPath()
    {
        return Path.Combine(Directory.GetCurrentDirectory(), "Excel", "Templates");
    }
}