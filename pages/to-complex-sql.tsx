import ConversionPanel from "@components/ConversionPanel";
import { useCallback } from "react";
import * as React from "react";
import gs from "generate-schema";
import { doGenerateSQL } from "@utils/to-complex-sql";


export default function JsonToMysql() {
  const transformer = useCallback(({ value }) => {
    if (!value || !value) {
      return "请输入json"
    }
    const inputJSON = JSON.parse(value);
    const generateResult = doGenerateSQL(inputJSON);
    return generateResult 
    // console.log(generateResult)
    // const invokeTree = 
    // if (generateResult?.resultSQL) return generateResult?.resultSQL
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


