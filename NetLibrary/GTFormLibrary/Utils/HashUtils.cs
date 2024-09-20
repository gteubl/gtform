using System.Security.Cryptography;
using System.Text;

namespace GTFormLibrary.Utils;

public class HashUtils
{
    public const string EmptyHash = "0000000000000000000000000000000000000000000000000000000000000000";

    public static string ComputeFileHash(string filePath)
    {
        try
        {
            using (var sha256 = SHA256.Create())
            {
                using (var fileStream = File.OpenRead(filePath))
                {
                    var hashValue = sha256.ComputeHash(fileStream);
                    return BitConverter.ToString(hashValue).Replace("-", string.Empty);
                }
            }
        }
        catch (Exception ex)
        {
            // Log or handle exceptions as needed
            Console.WriteLine($"Error computing hash: {ex.Message}");
            throw; // Optionally rethrow or handle the exception
        }
    }

    public static string ComputeHash(Stream stream)
    {
        using var sha256 = SHA256.Create();
        var hashValue = sha256.ComputeHash(stream);
        return BitConverter.ToString(hashValue).Replace("-", string.Empty);
    }

    public static bool VerifyFileHash(string filePath, string originalHash)
    {
        try
        {
            var currentHash = ComputeFileHash(filePath);
            return string.Equals(currentHash, originalHash, StringComparison.OrdinalIgnoreCase);
        }
        catch (Exception ex)
        {
            // Log or handle exceptions as needed
            Console.WriteLine($"Error verifying hash: {ex.Message}");
            return false; // Decide on appropriate error handling or reporting
        }
    }

    public static string ComputeStringHash(string input)
    {
        try
        {
            using (var sha256 = SHA256.Create())
            {
                var hashValue = sha256.ComputeHash(Encoding.UTF8.GetBytes(input));
                return BitConverter.ToString(hashValue).Replace("-", string.Empty);
            }
        }
        catch (Exception ex)
        {
            // Log or handle exceptions as needed
            Console.WriteLine($"Error computing hash: {ex.Message}");
            throw; // Optionally rethrow or handle the exception
        }
    }

    public static bool VerifyStringHash(string input, string originalHash)
    {
        try
        {
            var currentHash = ComputeStringHash(input);
            return string.Equals(currentHash, originalHash, StringComparison.OrdinalIgnoreCase);
        }
        catch (Exception ex)
        {
            // Log or handle exceptions as needed
            Console.WriteLine($"Error verifying hash: {ex.Message}");
            return false; // Decide on appropriate error handling or reporting
        }
    }
}