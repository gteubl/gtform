namespace GTFormLibrary.Models;

public interface IGridDataItem
{
    Guid Id { get; set; }
    bool? Selected { get; set; }
}