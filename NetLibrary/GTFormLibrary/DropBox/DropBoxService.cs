using System.Text;
using Dropbox.Api;
using Dropbox.Api.Files;
using Microsoft.Extensions.Configuration;

namespace GTFormLibrary.DropBox;

public interface IDropBoxService
{
    Task<bool> TestApi();
    Task<FileMetadata> DownloadFile(string folder, string file);
    Task<FileMetadata> UploadFile(string folder, string file, string content);
    Task<FileMetadata> UploadFile(string folder, string file, byte[] content);
    Task<FileMetadata> UploadFile(string folder, string file, MemoryStream mem);
}

public class DropBoxService : IDropBoxService
{
    /*
     * Console:
     * https://www.dropbox.com/developers/apps/info/yq4zo8et0yc6o4d#settings
     *
     * Forum:
     * https://www.dropboxforum.com/t5/Dropbox-API-Support-Feedback/Issue-in-generating-access-token/m-p/592921/highlight/true#M27586
     *
     * Steps to generate token
     * 1) Browser:
     * https://www.dropbox.com/oauth2/authorize?token_access_type=offline&response_type=code&client_id=yq4zo8et0yc6o4d
     *
     * 2) Bash Terminal (Linux):
     * curl https://api.dropbox.com/oauth2/token -d code=<received code> -d grant_type=authorization_code -u <App key>:<App secret>
     *
     * 3) C#:
     * Save token in appsettings.json
     *
     *
     * Refresh token:
     * curl https://api.dropbox.com/oauth2/token -d grant_type=refresh_token -d refresh_token=<refresh_token> -u <App key>:<App secret>
     */

    private readonly IConfiguration _configuration;
    private readonly bool _serviceDisabled;

    private readonly HttpClient _httpClient = new()
    {
        // Specify request level timeout which decides maximum time that can be spent on
        // download/upload files.
        Timeout = TimeSpan.FromMinutes(20)
    };

    public DropBoxService(IConfiguration configuration)
    {
        _configuration = configuration;
        _serviceDisabled = configuration.GetSection("DropBox:ServiceDisabled").Value == "true";
    }

    private DropboxClient GetClient()
    {
        var config = new DropboxClientConfig("SimpleOAuthApp")
        {
            HttpClient = _httpClient
        };

        var token = _configuration.GetSection("DropBox:AccessToken").Value;
        var refresh = _configuration.GetSection("DropBox:RefreshToken").Value;
        var appKey = _configuration.GetSection("DropBox:AppKey").Value;
        var appSecret = _configuration.GetSection("DropBox:AppSecret").Value;

        return new DropboxClient(token, refresh, appKey, appSecret, config);
    }

    public async Task<bool> TestApi()
    {
        using var dbx = GetClient();
        var full = await dbx.Users.GetCurrentAccountAsync();
        return true;
    }

    public async Task<FileMetadata> DownloadFile(string folder, string file)
    {
        if (_serviceDisabled)
        {
            return new FileMetadata();
        }
        
        using var dbx = GetClient();
        using var response = await dbx.Files.DownloadAsync($"/{folder}/{file}");
        return response.Response;
    }

    public async Task<FileMetadata> UploadFile(string folder, string file, string content)
    {
        if (_serviceDisabled)
        {
            return new FileMetadata();
        }
        
        using var mem = new MemoryStream(Encoding.UTF8.GetBytes(content));
        using var dbx = GetClient();
        var updated = await dbx.Files.UploadAsync(
            $"/{folder}/{file}",
            WriteMode.Overwrite.Instance,
            body: mem);

        return updated;
    }

    public async Task<FileMetadata> UploadFile(string folder, string file, byte[] content)
    {
        if (_serviceDisabled)
        {
            return new FileMetadata();
        }
        
        using var mem = new MemoryStream(content);
        using var dbx = GetClient();
        var updated = await dbx.Files.UploadAsync(
            $"/{folder}/{file}",
            WriteMode.Overwrite.Instance,
            body: mem);

        return updated;
    }
    
    public async Task<FileMetadata> UploadFile(string folder, string file, MemoryStream mem)
    {
        if (_serviceDisabled)
        {
            return new FileMetadata();
        }
        
        using var dbx = GetClient();
        var updated = await dbx.Files.UploadAsync(
            $"/{folder}/{file}",
            WriteMode.Overwrite.Instance,
            body: mem);

        return updated;
    }
}