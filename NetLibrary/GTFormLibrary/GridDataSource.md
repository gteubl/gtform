

```csharp
// Request classes must inherit from GridDataRequest
public class TenantGridFilter : GridDataRequest
{
    public string Name { get; set; }
    public string Description { get; set; }
}

// Response classes must inherit from IGridDataItem
public class TenantGridResponse : IGridDataItem
{
    public Guid Id { get; set; }
    public bool? Selected { get; set; }
    public string Name { get; set; }
    public string Description { get; set; }
    public string ImageBase64 { get; set; }
    public int ListPriorityOrder { get; set; } 
    public DateTime CreatedAt { get; set; }
    public bool Del { get; set; }
}
    
```
```csharp
public async Task<GridDataSource<ParteResponseDto>> GetAllParteAsync(GridDataRequest filter)
{
var query = _dataContext.Partes.AsQueryable();

         var query = _context.Tenants.AsQueryable();

        // Apply Filters
        query = query.ApplyFilters(filter, (column, magicFilter) => column.ToLower() switch
        {
            "name" => x => x.Name.Contains(magicFilter),
            "description" => x => x.Description.Contains(magicFilter),
            _ => null
        });

        // Apply Sorting
        query = query.ApplySorting(filter);

        // Select
        var data = query.Select(x => new TenantGridResponse
        {
            Id = x.Id,
            Name = x.Name,
            Description = x.Description,
            ImageBase64 = x.ImageBase64,
            ListPriorityOrder = x.ListPriorityOrder,
            CreatedAt = x.CreatedAt,
            Del = x.Del
         
        }).AsNoTracking();

        return await data.ToGridDataSourceAsync(filter);
```
