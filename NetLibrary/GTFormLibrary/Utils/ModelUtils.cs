using GTFormLibrary.Models;

namespace GTFormLibrary.Utils;

public static class ModelUtils
{
    public static ChoiceOption CreateChoiceOption(Guid? cod, string? nome)
    {
        return new ChoiceOption(cod ?? Guid.Empty, nome ?? "");
    }
}