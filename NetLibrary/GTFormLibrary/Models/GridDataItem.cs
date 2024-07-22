namespace GTFormLibrary.Models;

public interface IGridDataItem
{
    bool? Selected { get; set; }
    Guid Id { get; set; }
}