import ConversionPanel from "@components/ConversionPanel";
import { useCallback } from "react";
import * as React from "react";

import { doGenerateSQL } from "@utils/to-complex-sql";


export default function JsonToMysql() {
  const transformer = useCallback(({ value }) => {
    return "111"
  }, []);

  return (
    <ConversionPanel
      transformer={transformer}
      editorTitle="结构化Sql"
      editorLanguage="toSql"
      resultTitle="Complex Sql"
      resultLanguage={"sql"}
      showrules
    />
  );
}


