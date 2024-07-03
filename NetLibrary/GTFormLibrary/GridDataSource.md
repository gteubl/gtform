
```csharp
public async Task<GridDataSource<ParteResponseDto>> GetAllParteAsync(GridDataRequest filter)
{
var query = _dataContext.Partes.AsQueryable();

        // Apply Filters
        query = query.ApplyFilters(filter, (column, magicFilter) => column.ToLower() switch
        {
            "nome" => x => x.Nome.Contains(magicFilter),
            "alias" => x => x.Alias.Contains(magicFilter),
            "cpfcnpj" => x => x.Cpfcnpj.Contains(magicFilter),
            _ => null
        });

        // Apply Sorting
        query = query.ApplySorting(filter);

        // Select
        var data = query.Select(x => new ParteResponseDto
        {
            Alias = x.Alias,
            Cpfcnpj = x.Cpfcnpj,
            Id = x.Id,
            Nome = x.Nome,
            TipoPessoa = x.TipoPessoa.HasValue ? (TipoPessoa)x.TipoPessoa : TipoPessoa.Fisica,
            qtdOutrosProcessos = x.ProcessosPartes.Count(c => !c.RepresentamosEstaParte)
        }).AsNoTracking();

        return await data.ToGridDataSourceAsync(filter);
    }
```
