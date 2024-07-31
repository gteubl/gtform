using TypeGen.Core.TypeAnnotations;

namespace GTFormLibrary.Models;

[ExportTsInterface]
public class FileTreeNode
{
    public string Id { get; set; }
    public int Order { get; set; }
    public string Name { get; set; }
    public FileTreeNodeType Type { get; set; }
    public string ParentId { get; set; }
    public string Extension { get; set; }

    [TsType("any")]
    public object Payload { get; set; }
}

public enum FileTreeNodeType
{
    Folder,
    File
}