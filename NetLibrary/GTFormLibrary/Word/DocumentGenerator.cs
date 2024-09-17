using DocumentFormat.OpenXml.Packaging;
using DocumentFormat.OpenXml.Wordprocessing;

namespace GTFormLibrary.Word;

public class DocumentGenerator
{
    public void CreateWordDocument(string filePath, string content)
    {
        using (var document = WordprocessingDocument.Create(filePath, DocumentFormat.OpenXml.WordprocessingDocumentType.Document))
        {
            var mainPart = document.AddMainDocumentPart();
            mainPart.Document = new Document();
            var body = mainPart.Document.AppendChild(new Body());
            var para = body.AppendChild(new Paragraph());
            var run = para.AppendChild(new Run());
            run.AppendChild(new Text(content));
        }
    }

  

    public void GenerateDocument(string content)
    {
        var wordFilePath = "path/to/document.docx";

        CreateWordDocument(wordFilePath, content);
    }
}