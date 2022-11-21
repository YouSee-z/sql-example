import { useEffect, useState } from 'react';
import { Drawer, Button, Typography, Tag, Input, Tree, Popover } from '@arco-design/web-react';

import { TtreeProps, InvokeTreeNode } from "./index.d"
import Item from '@arco-design/web-react/es/Breadcrumb/item';

const getParentKey = (
    key: string | undefined,
    tree: InvokeTreeNode[]
  ): string | number | undefined => {
    let parentKey;
    for (let i = 0; i < tree.length; i++) {
      const node = tree[i];
      if (node.children) {
        if (node.children.some((item) => item.key === key)) {
          parentKey = node.key;
        } else if (getParentKey(key, node.children)) {
          parentKey = getParentKey(key, node.children);
        }
      }
    }
    return parentKey;
  };

// 添加key
const generateList = (data: InvokeTreeNode[], preKey: string,) => {
    for (let i = 0; i < data.length; i++) {
        const node = data[i];
        // 给 tree 每个节点添加唯一的 key
        const key = preKey + "-" + i;

        node.key = key;
        node.parentkey = preKey || "-1"
        if (node.children) {
            generateList(node.children, key);
        }
    }
};

const RenderExtra = (props) => {
    // console.log(props)

    const { title, sql, params, resultSQL } = props
    return (

        <Popover
            trigger='hover'
            style={{ maxWidth: 900, minWidth: 600 }}
            content={
                <div>
                    <p>
                        <b>替换前语句：</b>
                        <Typography.Paragraph copyable>
                            {sql}
                        </Typography.Paragraph>
                    </p>
                    <p>
                        <b>替换参数：</b>
                        <Typography.Paragraph copyable>
                            {/* {`${params}` ?? "无"} */}
                            {JSON.stringify(params) !== "{}" ? JSON.stringify(params) : "无"}

                        </Typography.Paragraph>
                    </p>
                    <p>
                        <b>替换后语句：</b>
                        <Typography.Paragraph copyable>
                            {resultSQL}
                        </Typography.Paragraph>
                    </p>

                </div>
            }
        >
            <div dangerouslySetInnerHTML={{
                __html: title
            }}></div>

            {/* {title} */}
        </Popover >

    )
}

function CusTree(props: TtreeProps) {
    const { visible, onCancel, dataSource } = props
    const [newdataSource, setNewDataSource] = useState([])

    const [expendKeys, setExpendKeys] = useState([])
    // console.log(expendKeys)
    useEffect(() => {
        const copydataSource = JSON.parse(JSON.stringify(dataSource))
        generateList(copydataSource, "")
        setNewDataSource(copydataSource)
    }, [dataSource])
    const findValue = (v: string | undefined) => {
        if (v) {
            // debugger
            let arry = []
            let expendKeys = []
            const finlistlist = (arr: InvokeTreeNode[]) => {
                // if(v.)
                arr.forEach((item) => {
                    if (item.children?.length) {
                        finlistlist(item?.children)
                    }
                    if (item.title.includes(v)) {
                        item.title = item.title.replace(v, `<span style="color:#3370ff">${v}</span>`);
                        arry.push(item.title)
                        const parentKey = getParentKey(item.key,newdataSource)
                        console.log(parentKey)
                        expendKeys.push(parentKey)
                    }

                })

            }
            finlistlist(newdataSource)
            console.log(expendKeys)
            setExpendKeys(expendKeys)
            setNewDataSource(() => newdataSource)
        } else {
            setNewDataSource(JSON.parse(JSON.stringify(dataSource)))
        }
    }
    // console.log(dataSource)
    return (
        <div>
            <Drawer
                width={960}
                title={<span>规则调用树</span>}
                visible={visible}
                onCancel={onCancel}
                footer={null}
            >
                <div>
                    <Input.Search
                        {...props}
                        placeholder='请输入关键字'
                        searchButton={true}
                        onSearch={(e) => findValue(e)}
                    />
                </div>
                <div className=''>
                    <Tree treeData={newdataSource || []} renderTitle={RenderExtra} expandedKeys={expendKeys} onExpand={(v: string[]) => { setExpendKeys(v) }}></Tree>
                </div>


            </Drawer>
        </div>
    );
}

export default CusTree;
