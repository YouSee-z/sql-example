
import React, { useCallback, useEffect, useRef, useState } from "react";

import { Button, Message, Typography, Tooltip, Popover, Input } from "@arco-design/web-react";
import dynamic from "next/dynamic";
import copy from "clipboard-copy";
import Npm from "@assets/svgs/Npm";
import { useDropzone } from "react-dropzone";
import { EditorPanelProps } from "./index.d"
import styles from "./index.module.css"


import {
  IconDelete,
  IconSettings
} from '@arco-design/web-react/icon';

const Monaco = dynamic(() => import("../Monaco"), {
  ssr: false
});

export default function EditorPanel({
  editable = true,
  title,
  settingElement,
  hasLoad,
  acceptFiles,
  hasClear,
  hasCopy = true,
  topNotifications,
  language,
  defaultValue,
  onChange,
  id,
  packageDetails,
  showrules,
  onCancel,
  showExamples,

}: EditorPanelProps) {
  const [showSettingsDialogue, setSettingsDialog] = useState(false);
  const [value, setValue] = useState(defaultValue);
  const [fetchingUrl, setFetchingUrl] = useState("");
  const [treeData, serTreeData] = useState([])


  const options = {
    fontSize: 14,
    readOnly: !editable,
    codeLens: false,
    fontFamily: "Menlo, Consolas, monospace, sans-serif",
    minimap: {
      enabled: false
    },
    quickSuggestions: false,
    lineNumbers: "on",
    renderValidationDecorations: "off"
  };

  const _toggleSettingsDialog = useCallback(
    () => setSettingsDialog(!showSettingsDialogue),
    [showSettingsDialogue]
  );

  useEffect(() => {
    // @ts-ignore
    window.__webpack_public_path__ = "/_next/static/";
  }, []);

  const getSettings = useCallback(
    () => (
      <>
        <Button
          type="primary"
          icon={<IconSettings />}
          size="large"
          style={{ marginRight: 10 }}
          onClick={() => Message.warning("暂未开放")}

        >
          Settings
        </Button>

        {settingElement({
          toggle: _toggleSettingsDialog,
          open: showSettingsDialogue
        })}
      </>
    ),
    [showSettingsDialogue]
  );

  const onFilePicked = useCallback((files, close = () => { }) => {
    if (!(files && files.length)) return;
    const file = files[0];
    const reader = new FileReader();
    reader.readAsText(file, "utf-8");
    reader.onload = () => {
      setValue(reader.result as string);
      onChange(reader.result as string);
      close();
    };
  }, []);

  const { getRootProps } = useDropzone({
    onDrop: files => onFilePicked(files),
    disabled: !editable,
    accept: acceptFiles,
    onDropRejected: () => { Message.warning("不支持此文件的格式"); }
  });

  const copyValue = useCallback(() => {
    copy(value);
    Message.success("复制成功");
  }, [value]);

  const fetchFile = useCallback(
    close => {
      (async () => {
        if (!fetchingUrl) return;
        const res = await fetch(fetchingUrl);
        const value = await res.text();
        setValue(value);
        setFetchingUrl("");
        close();
        onChange(value);
      })();
    },
    [fetchingUrl, onChange]
  );


  // whenever defaultValue changes, change the value of the editor.
  useEffect(() => {
    setValue(defaultValue);
  }, [defaultValue]);
  return (
    <div className={styles.pane}>
      <div className={styles.paneTitle}>
        <div className={styles.paneName}>
          <Typography.Title heading={6}>
            <span>{title}</span>

          </Typography.Title>
        </div>

        {settingElement && getSettings()}

        {/* {hasLoad && (
          <Popover
            content={({ close }) => (
              <Pane
                paddingY={20}
                paddingX={20}
                display="flex"
                flex={1}
                alignItems="center"
                justifyContent="center"
                flexDirection="column"
              >
                <FilePicker
                  width={"100%"}
                  name="filepicker"
                  onChange={files => onFilePicked(files, close)}
                  accept={acceptFiles}
                />

                <Heading paddingY={10} size={200}>
                  OR
                </Heading>

                <Pane display="flex" flexDirection="row">
                  <Input
                    borderBottomRightRadius={0}
                    borderTopRightRadius={0}
                    placeholder="Enter URL"
                    onChange={(e: any) =>
                      setFetchingUrl(e.target.value)
                    }
                  />
                  <Button
                    borderLeftWidth={0}
                    borderBottomLeftRadius={0}
                    borderTopLeftRadius={0}
                    onClick={() => fetchFile(close)}
                  >
                    Fetch URL
                  </Button>
                </Pane>
              </Pane>
            )}
            shouldCloseOnExternalClick
          >
            <Tooltip content="Load File">
              <Button height={28} marginRight={10} icon="upload" />
            </Tooltip>
          </Popover>
        )} */}
        {
          showrules && <Button className={styles.button} type="outline" onClick={() => {
            if (onCancel) { onCancel() }
          }}>查看规则</Button>
        }
        {
          showrules && <Button className={styles.button} type="outline" onClick={() => {
            if (onCancel) { onCancel() }
          }}>查看调用树</Button>
        }
        {
          showrules && <Button className={styles.button} type="outline" onClick={() => {
            if (showExamples) { showExamples() }
          }}>复杂案例</Button>
        }
        {hasClear && (
          <Tooltip content="清除">
            <Button type='primary' icon={<IconDelete />} onClick={() => setValue("")}>
            </Button>

          </Tooltip>
        )}

        {hasCopy && (
          <Button
            type="primary"
            style={{ marginRight: 10 }}
            // icon={<IconAttachment />}
            size='large'
            onClick={copyValue}
          >
            复制
          </Button>
        )}

      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          flex: 1,
          overflow: "hidden"
        }}
        {...getRootProps()}
      >
        {topNotifications &&
          topNotifications({
            isSettingsOpen: showSettingsDialogue,
            toggleSettings: _toggleSettingsDialog
          })}

        <Monaco
          language={language}
          value={value}
          options={options}
          onChange={value => {
            setValue(value);
            onChange(value);
          }}
          theme="vs-dark"
        />
      </div>
    </div>
  );
}
