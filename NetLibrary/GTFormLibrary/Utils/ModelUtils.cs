using GTFormLibrary.Models;

namespace GTFormLibrary.Utils;

public static class ModelUtils
{
    public static ChoiceOption CreateChoiceOption(Guid? cod, string? nome)
    {
        return new ChoiceOption(cod.ToString() ?? Guid.Empty.ToString(), nome ?? "");
    }

    public static ChoiceOption CreateChoiceOption(string? cod, string? nome)
    {
        return new ChoiceOption(cod ?? Guid.Empty.ToString(), nome ?? "");
    }
}