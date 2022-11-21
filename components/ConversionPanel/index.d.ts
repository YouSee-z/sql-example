import { EditorPanelProps } from "@components/EditorPanel/index.d"

export type Transformer = (args: {
    value: string;
    splitEditorValue?: string;
}) => Promise<string> | string | Record<string, string>;

export interface ConversionPanelProps {
    splitTitle?: string;
    splitLanguage?: Language;
    editorTitle: string;
    editorLanguage: Language;
    editorDefaultValue?: string;
    resultTitle: React.ReactNode;
    resultLanguage: Language;
    splitEditorProps?: Partial<EditorPanelProps>;
    splitEditorDefaultValue?: string;
    editorProps?: Partial<EditorPanelProps>;
    resultEditorProps?: Partial<EditorPanelProps>;
    transformer: Transformer;
    defaultSplitValue?: string;
    editorSettingsElement?: EditorPanelProps["settingElement"];
    resultSettingsElement?: EditorPanelProps["settingElement"];
    settings?: any;
    showrules?: boolean;
    showdiagram?: boolean
}
