using System;
using System.Collections.Generic;
using System.Globalization;
using System.IO;
using System.Linq;
using System.Threading;
using ClosedXML.Excel;
using GTFormLibrary.Excel.Models;

namespace GTFormLibrary.Excel;

public static class WriteExcelClosedXml
{
    //https://github.com/ClosedXML/ClosedXML/blob/develop/ClosedXML.Examples/Columns/InsertColumns.cs
    //https://github.com/ClosedXML/ClosedXML/wiki

    /// <summary>
    ///     Create a new Excel file.
    /// </summary>
    /// <param name="options">ExcelNewReportOptions</param>
    /// <returns>Local file path</returns>
    public static string CreateNewExcelReport(ExcelNewReportOptions options)
    {
        // Make sure tests run on a deterministic culture
        Thread.CurrentThread.CurrentCulture = new CultureInfo("pt-BR");
        var array = GetDataArray(options.Data);
        
        if (array.Length == 0)
        {
            return string.Empty;
        }
        
        var headers = array[0].GetType().GetProperties().Select(p => p.Name).ToArray();

        if (options.IgnoreNotPresentedColumns)
        {
            headers = options.HeaderReplace.Select(hr => hr.DataColumnName).ToArray();   
        }

        var workbook = new XLWorkbook();
        var worksheet = workbook.Worksheets.Add(options.SheetName);

        worksheet.PopulateHeaders(headers);
        worksheet.PopulateData(headers, array);

        var range = worksheet.Range(worksheet.FirstCellUsed(), worksheet.LastCellUsed());
        var table = range.CreateTable(options.TableName);
        table.Theme = XLTableTheme.TableStyleMedium2;

        //Format columns
        foreach (var header in options.HeaderReplace)
        {
            var cell = table.HeadersRow().CellsUsed(c => c.Value.ToString() == header.DataColumnName).FirstOrDefault();
            if (cell == null) continue;

            cell.Value = header.HeaderName;
            cell.Style.Alignment.Horizontal = XLAlignmentHorizontalValues.Center;
            cell.Style.Alignment.Vertical = XLAlignmentVerticalValues.Center;
            cell.Style.Font.Bold = true;

            var firtsCell =
                table.FirstCellUsed(
                    e => e.Address.ColumnNumber == cell.Address.ColumnNumber && e.Address.RowNumber != 1)?.Address ??
                null;
            var dataCell = table.Cell(firtsCell?.RowNumber ?? 2, cell.Address.ColumnNumber);
            //var dataCell = table.Cell(2, cell.Address.ColumnNumber);

            if (!string.IsNullOrEmpty(header.ColumnFormat))
            {
                var column = cell.WorksheetColumn();
                switch (dataCell.DataType)
                {
                    case XLDataType.DateTime:
                        column.Style.DateFormat.Format = header.ColumnFormat;
                        break;
                    case XLDataType.Number:
                        column.Style.NumberFormat.Format = header.ColumnFormat;
                        break;
                    case XLDataType.Text:
                        column.Style.NumberFormat.Format = header.ColumnFormat;
                        break;
                    case XLDataType.Blank:
                        break;
                    case XLDataType.Boolean:
                        break;
                    case XLDataType.Error:
                        break;
                    case XLDataType.TimeSpan:
                        break;
                }
            }

            if (header.ColumnSize is > 0)
            {
                cell.WorksheetColumn().Width = header.ColumnSize.Value;
            }
            else
            {
                cell.WorksheetColumn().AdjustToContents();
            }

            if (header.Hidden)
            {
                cell.WorksheetColumn().Hide();
            }
        }

        //Pivo table
        foreach (var pivotOption in options.PivotOptions)
        {
            var worksheetTarget = workbook.Worksheets.Add(pivotOption.WorksheetTarget);
            var pt = worksheetTarget.PivotTables.Add(pivotOption.PivotTableName, worksheetTarget.Cell(1, 1), table);
            pt.Theme = XLPivotTableTheme.PivotStyleMedium2;
            pt.AutofitColumns = true;

            foreach (var rowLabel in pivotOption.RowsLabels) pt.RowLabels.Add(rowLabel);

            foreach (var sort in pivotOption?.PivotRowSorts ?? new List<ExcelModelPivotRowSort>())
                pt?.RowLabels.Get(sort.ColumnName).SetSort(sort.SortType);

            foreach (var columnLabel in pivotOption.ColumnsLabels) pt?.ColumnLabels.Add(columnLabel);

            foreach (var sort in pivotOption?.PivotColumnSorts ?? new List<ExcelModelPivotRowSort>())
                pt?.ColumnLabels.Get(sort.ColumnName).SetSort(sort.SortType);

            foreach (var pivotValue in pivotOption.PivotValues)
            {
                var pvValue = pt.Values.Add(pivotValue.ColumnSourceName, pivotValue.Name);
                if (pivotValue.SummaryFormula.HasValue) pvValue.SetSummaryFormula(pivotValue.SummaryFormula.Value);
                pvValue.NumberFormat.Format = pivotValue.ColumnFormat;

                if (pivotValue.ShowValueAs == ShowValueAs.PercentageOfTotal) pvValue.ShowAsPercentageOfTotal();
            }

            foreach (var filter in pivotOption?.PivotFilters ?? new List<ExcelModelPivotFilter>())
                pt?.ReportFilters.Add(filter.FilterColumn).AddSelectedValues(filter.FilterValues);

            var sizeColumn = 1;
            foreach (var size in pivotOption?.SheetsColumnsSizes ?? Array.Empty<double>())
                worksheetTarget.Column(sizeColumn++).Width = size;

            if (pivotOption?.SheetsColumnsSizes.Length == 0) worksheetTarget.Columns().AdjustToContents();

            if (!string.IsNullOrEmpty(pivotOption?.RowHeaderCaption))
                pt!.RowHeaderCaption = pivotOption.RowHeaderCaption;

            //  worksheetTarget.Style.Alignment.SetHorizontal(XLAlignmentHorizontalValues.Center);
            // worksheetTarget.Style.Alignment.SetVertical(XLAlignmentVerticalValues.Center);

            worksheetTarget.Rows().Style.Alignment.SetHorizontal(XLAlignmentHorizontalValues.Center);
            worksheetTarget.Rows().Style.Alignment.SetVertical(XLAlignmentVerticalValues.Center);
            worksheetTarget.Columns().Style.Alignment.SetHorizontal(XLAlignmentHorizontalValues.Center);
            worksheetTarget.Columns().Style.Alignment.SetVertical(XLAlignmentVerticalValues.Center);


            worksheetTarget.SetTabActive();
            pt.PivotCache.Refresh();
        }


        var filePath = Path.Combine(WriteExcelClosedXmlServiceHelpers.GetFilePath(), $"{options.FileName}.xlsx");
        workbook.SaveAs(filePath);
        workbook.Dispose();
        return filePath;
    }

    private static object[] GetDataArray(object data)
    {
        var type = data.GetType();

        if (!type.IsArray)
        {
            return Array.Empty<object>();
        }

        return (object[])data;
    }
}