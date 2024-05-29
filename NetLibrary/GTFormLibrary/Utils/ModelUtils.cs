using GTFormLibrary.Models;

namespace GTFormLibrary.Utils;

public static class ModelUtils
{
    public static ChoiceOption CreateChoiceOption(int? cod, string? nome)
    {
        return new ChoiceOption(cod ?? 0, nome ?? "");
    }
}