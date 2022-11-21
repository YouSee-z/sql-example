interface InvokeTreeNode {
    title: string;
    sql: string;
    key?: string;
    params?: Record<string, string>;
    resultSQL?: string;
    children?: InvokeTreeNode[];
    parentkey?: string
  }
export interface RRulesProps {
    visible: boolean,
    // onOk: () => void,
    onCancel: () => void
}


export interface TtreeProps extends RRulesProps {
    dataSource: Children[]
}