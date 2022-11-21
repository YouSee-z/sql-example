import React from "react";
import Editor from "@monaco-editor/react";
import { Spin } from "@arco-design/web-react"
// import { Pane, Spinner } from "evergreen-ui";

import styles from "./index.module.css"
import { divide } from "lodash";

export function processSize(size) {
  return !/^\d+$/.test(size) ? size : `${size}px`;
}
interface MonacoProps {
  theme?: string;
  language?: string;
  value?: string;
  width?: number | string;
  height?: number | string;
  options?: any;
  defaultValue?: string;
  onChange: (value: string) => void;
}

export const Monaco: React.FC<MonacoProps> = ({
  language,
  value,
  defaultValue,
  height,
  width,
  options,
  onChange
}) => {

  return (


    <Editor
      defaultLanguage={language}
      defaultValue={defaultValue}
      value={value}
      height={height}
      width={width}
      options={options}
      onChange={onChange}
      theme="vs-dark"
      loading={
        <div className={styles.pane}

        >
          <Spin dot />
        </div>
      }
    />

  )


};

export default Monaco;
