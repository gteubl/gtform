using TypeGen.Core.TypeAnnotations;

namespace GTFormLibrary.Models;

[ExportTsEnum]
public enum ComponentType
{
    AutoComplete,
    CheckBox,
    Chips,
    InputDate,
    InputText,
    InputNumber,
    InputCurrency,
    Select,
    Switch,
    TextArea
}