import { Alert, Spin } from "@arco-design/web-react"
import styles from "./index.module.css"
import EditorPanel from "@components/EditorPanel";
import { ConversionPanelProps } from "./index.d"
// import * as React from "react";
import React, { useCallback, useEffect, useState } from "react";
import Rule from "@components/Modal"
import CusTree from "@components/Modal/tree"
import { Language, useData } from "@hooks/useData";
import { useRouter } from "next/router";
import { activeRouteData, } from "@utils/routes";
import PrettierWorker from "@workers/prettier.worker";
import { getWorker } from "@utils/workerWrapper";
import { format } from "sql-formatter"
import { useVisable } from "@hooks/useVisible";
import { complexJSON } from "@constants/data"

let prettierWorker;

function getEditorLanguage(lang: Language) {
  const mapping = {
    flow: "typescript",
    toSql: "json",
  };

  return mapping[lang] || lang;
}

const ConversionPanel: React.FunctionComponent<ConversionPanelProps> = function ({
  splitEditorProps,
  editorProps,
  resultEditorProps,
  transformer,
  splitLanguage,
  splitTitle,
  editorLanguage,
  editorTitle,
  resultLanguage,
  resultTitle,
  editorSettingsElement,
  settings,
  editorDefaultValue,
  splitEditorDefaultValue,
  resultSettingsElement,
  showrules,
  showdiagram = false
}) {
  const [value, setValue] = useData(editorDefaultValue || editorLanguage);
  const [splitValue, setSplitValue] = useData(
    splitEditorDefaultValue || splitLanguage
  );
  const [result, setResult] = useState("");
  const [message, setMessage] = useState("");
  const [showUpdateSpinner, toggleUpdateSpinner] = useState(false);
  // 
  const router = useRouter();
  const route = activeRouteData(router.pathname);
  const [state, setStateValue] = useVisable({
    rulesVisible: false,
    treeVisible: false
  }); // 规则
  const [treeData, setTreeData] = useState([])
  let packageDetails;

  if (route) {
    const { packageUrl, packageName } = route;

    packageDetails =
      packageName && packageUrl
        ? {
          name: packageName,
          url: packageUrl
        }
        : undefined;
  }

  useEffect(() => {
    async function transform() {
      try {
        toggleUpdateSpinner(true);
        // debugger

        if (editorLanguage !== "toSql") {

          prettierWorker = prettierWorker || getWorker(PrettierWorker);
          const result = await transformer({
            value,
            splitEditorValue: splitTitle ? splitValue : undefined
          });
          // console.log(result)
          let prettyResult = await prettierWorker.send({
            value: result,
            language: resultLanguage
          });
          // console.log(prettyResult)

          // Fix for #319
          if (prettyResult.startsWith(";<")) {
            prettyResult = prettyResult.slice(1);
          }
          setResult(prettyResult);
          setMessage("");
        } else {
          const result = await transformer({
            value,
          });
          const sqlResule = format(typeof result === "string" ? result : result?.resultSQL)
          setTreeData(typeof result === "string" ? [] : [result?.invokeTree])
          setResult(sqlResule);
          setMessage("");
        }


      } catch (e: any) {
        console.error(e);
        setMessage(e.message);
      }
      toggleUpdateSpinner(false);
    }

    transform();
  }, [splitValue, value, splitTitle, settings]);

  const showExamplesSQL = useCallback(() => {
    // const data = complexJSON
    const results = transformer({
      value: complexJSON,
    });
    setValue(complexJSON)
    const sqlResule = format(typeof results === "string" ? results : results?.resultSQL)
    setTreeData(typeof result === "string" ? [] : [result?.invokeTree])
    setResult(sqlResule);
    setMessage("");
  }, [complexJSON])








  return (
    <>
      <div className={styles.pane}>
        <div className={styles.editorpane}
        >
          <EditorPanel
            language={getEditorLanguage(editorLanguage)}
            onChange={setValue}
            hasLoad
            defaultValue={value}
            id={1}
            hasCopy={false}
            title={editorTitle}
            settingElement={editorSettingsElement}
            hasClear
            showrules={showrules}
            {...editorProps}
            onCancel={() => setStateValue(["rulesVisible"])}
            showExamples={showExamplesSQL}
            checkTree={() => setStateValue(["treeVisible"])}

          />

          {splitTitle && (
            <div className={styles.splittitle}>
              <EditorPanel
                title={splitTitle}
                defaultValue={splitValue}
                language={getEditorLanguage(splitLanguage)}
                id={2}
                hasCopy={false}
                onChange={setSplitValue}
                hasLoad
                hasClear
                {...splitEditorProps}
              />
            </div>
          )}
        </div>
        {

          !showdiagram ? <div className={styles.loading}>
            {showUpdateSpinner && (
              <div className={styles.updataspan}
              >
                <Spin />
              </div>
            )}
            <EditorPanel
              title={resultTitle}
              defaultValue={result}
              language={getEditorLanguage(resultLanguage)}
              id={3}
              editable={false}
              hasPrettier={false}
              settingElement={resultSettingsElement}
              packageDetails={packageDetails}
              {...resultEditorProps}
            />
          </div> :
            <div className={styles.loading}></div>

        }

      </div>

      {message && (
        <Alert
          className={styles.sqlalert}
          type='warning'
          title={message}
        />
      )}
      <Rule visible={state.rulesVisible} onCancel={() => setStateValue(['rulesVisible'])} />
      <CusTree visible={state.treeVisible} onCancel={() => setStateValue(['treeVisible'])} dataSource={treeData} />
    </>
  );
};


export default React.memo(ConversionPanel);
