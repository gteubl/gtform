using Azure.Storage.Blobs;
using Azure.Storage.Blobs.Models;
using GTFormLibrary.Utils;
using Microsoft.Extensions.Configuration;

namespace GTFormLibrary.AzureStorage;

public interface IAzureStorageService
{
    Task UploadFile(AzureStorageContainerType containerType, string containerName, string fileName, Stream stream);
    Task<Stream> DownloadFile(AzureStorageContainerType containerType, string containerName, string fileName);
    Task DeleteFile(AzureStorageContainerType containerType, string containerName, string fileName);
    Task<(long Length, string Hash)> CopyBlobAsync(AzureStorageBlob sourceBlob, AzureStorageBlob destinationBlob);
}

public class AzureStorageService : IAzureStorageService
{
    private readonly IConfiguration _configuration;
    private const string CoolConnectionString = "AzureStorage:CoolStorageConnectionString";
    private const string HotConnectionString = "AzureStorage:HotStorageConnectionString";
    private const string OldConnectionString = "AzureStorage:OldStorageConnectionString";

    public AzureStorageService(IConfiguration configuration)
    {
        _configuration = configuration;
    }

    public async Task UploadFile(AzureStorageContainerType containerType, string containerName, string fileName,
        Stream stream)
    {
        var connectionString = GetConnectionString(containerType);
        var container = new BlobContainerClient(connectionString, containerName);
        await container.CreateIfNotExistsAsync();
        var blob = container.GetBlobClient(fileName);
        await blob.UploadAsync(stream);
    }

    public async Task<Stream> DownloadFile(AzureStorageContainerType containerType, string containerName,
        string fileName)
    {
        var connectionString = GetConnectionString(containerType);
        var container = new BlobContainerClient(connectionString, containerName);
        var blob = container.GetBlobClient(fileName);
        var response = await blob.DownloadAsync();
        return response.Value.Content;
    }

    public async Task DeleteFile(AzureStorageContainerType containerType, string containerName, string fileName)
    {
        var connectionString = GetConnectionString(containerType);
        var container = new BlobContainerClient(connectionString, containerName);
        var blob = container.GetBlobClient(fileName);
        await blob.DeleteIfExistsAsync();
    }
    
    public async Task<List<BlobItem>> ListBlobsAsync(AzureStorageContainerType containerType, string containerName, string? prefix = null)
    {
        var connectionString = GetConnectionString(containerType);
        var container = new BlobContainerClient(connectionString, containerName);
        
        var blobs = new List<BlobItem>();
        await foreach (var blobItem in container.GetBlobsAsync(prefix: prefix, states: BlobStates.None))
        {
            blobs.Add(blobItem);
        }

        return blobs;
    }
    
    public async Task<(long Length, string Hash)> CopyBlobAsync(AzureStorageBlob sourceBlob,
        AzureStorageBlob destinationBlob)
    {
        try
        {
            
            var sourceBlobServiceClient = new BlobServiceClient(GetConnectionString(sourceBlob.Type));
            var sourceBlobContainerClient = sourceBlobServiceClient.GetBlobContainerClient(sourceBlob.Container);
            
            var destinationBlobServiceClient = new BlobServiceClient(GetConnectionString(destinationBlob.Type));
            var destinationBlobContainerClient = destinationBlobServiceClient.GetBlobContainerClient(destinationBlob.Container);

            var sourceBlobClient = sourceBlobContainerClient.GetBlobClient(sourceBlob.Blob);
            var destinationBlobClient = destinationBlobContainerClient.GetBlobClient(destinationBlob.Blob);

            if (await sourceBlobClient.ExistsAsync())
            {
                await destinationBlobContainerClient.CreateIfNotExistsAsync();
                
                using var memoryStream = new MemoryStream();
                await sourceBlobClient.DownloadToAsync(memoryStream);
                
                memoryStream.Position = 0;
                var hash = HashUtils.ComputeHash(memoryStream);
                
                await destinationBlobClient.UploadAsync(memoryStream, overwrite: true);
                // Return the size of the blob (memoryStream length in bytes)
                return  (memoryStream.Length, hash);
            }
            else
            {
                Console.WriteLine($"Source blob {sourceBlob.Blob} not found in {destinationBlob.Blob} container.");
                return (-1, HashUtils.EmptyHash);
            }
        }
        catch (Exception ex)
        {
            Console.WriteLine($"An error occurred during blob copy: {ex.Message}");
            return (-1, HashUtils.EmptyHash);
        }
    }

    private string GetConnectionString(AzureStorageContainerType containerType)
    {
        return (containerType switch
        {
            AzureStorageContainerType.Old => _configuration.GetSection(OldConnectionString).Value,
            AzureStorageContainerType.Hot => _configuration.GetSection(HotConnectionString).Value,
            AzureStorageContainerType.Cool => _configuration.GetSection(CoolConnectionString).Value,
            _ => string.Empty
        })!;
    }

   
}

/*public static class AzureStorageUtils{
    public static string GetBlobName(ProcessoFile processoFile)
    {
        return  $"processo-{processoFile.ProcessoId}/{processoFile.FileGuid}.{processoFile.FileExtension}";
    }
    
    public static string GetBlobName(int processoId, string fileGuid, string fileExtension)
    {
        return  $"processo-{processoId}/{fileGuid}.{fileExtension}";
    }
    
    public static string GetBlobFolder(ProcessoFile processoFile)
    {
        return $"processo-{processoFile.ProcessoId}";
    }
}*/

public class AzureStorageContainer
{
    public string Container { get; set; }
    public AzureStorageContainerType Type { get; set; }
}

public class AzureStorageBlob : AzureStorageContainer
{
    public AzureStorageBlob(AzureStorageContainerType type, string container, string blob)
    {
        Type = type;
        Container = container;
        Blob = blob;
    }
    
    public string Blob { get; set; }
}

public enum AzureStorageContainerType
{
    Old,
    Hot,
    Cool
}