import ConversionPanel from "@components/ConversionPanel";
import { useCallback } from "react";
import * as React from "react";
import { jsonToGo } from "@utils/json-to-go";
import gofmt from "gofmt.js";

export default function JsonToGo() {

    const transformer = useCallback(({ value }) => {
        return "111"
    }, []);

    return (
        <ConversionPanel
            transformer={transformer}
            editorTitle="Diagram"
            editorLanguage="json"
            resultTitle="Go"
            resultLanguage={"go"}
            showdiagram
        />
    );
}
