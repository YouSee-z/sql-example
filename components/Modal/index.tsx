import { useState } from 'react';
import { Drawer, Button, Typography, Tag } from '@arco-design/web-react';

import { RRulesProps } from "./index.d"
import { IconTool } from '@arco-design/web-react/icon';

function Rule(props: RRulesProps) {
    const { visible, onCancel } = props
    return (
        <div>
            <Drawer
                width={960}
                title={<span>JSON使用说明</span>}
                visible={visible}
                onCancel={onCancel}
                footer={null}
            >
                <Typography.Title heading={4}>
                    JSON使用说明
                </Typography.Title>
                <Typography.Title heading={6}>
                    <Tag color='orangered' icon={<IconTool />}>
                        对象键:
                    </Tag>定义 SQL 生成规则名称，main 表示入口 SQL，从该 SQL 语句开始生成。
                </Typography.Title>
                <Typography.Title heading={6}>
                    <Tag color='orangered' icon={<IconTool />}>
                        对象值:
                    </Tag>定义具体生成规则。可以是 SQL 字符串或者对象。
                </Typography.Title>
                <Typography.Title heading={6}>
                    <Tag color='orangered' icon={<IconTool />}>
                        sql:
                    </Tag>
                    定义模板 SQL 语句，可以是任意字符串，比如一组字段、一段查询条件、一段计算逻辑、完整 SQL 等。
                </Typography.Title>
                <Typography.Title heading={6}>
                    <Tag color='orangered' icon={<IconTool />}>
                        params:
                    </Tag>静态参数，解析器会优先将该变量替换到当前语句的 #{'{变量名}'} 中
                </Typography.Title>
                <Typography.Title heading={6}>
                    <Tag color='orangered' icon={<IconTool />}>
                        #{'{xxx}'}:
                    </Tag>定义可被替换的变量，优先用当前层级 params 替换，否则由外层传递。
                </Typography.Title>
                <Typography.Title heading={6}>
                    <Tag color='orangered' icon={<IconTool />}>
                        #{'@xxx(yy = 1 ||| zz = #{变量})'}:
                    </Tag>引用其他 SQL，可传参，参数可再用变量来表示，使用 |||（三个竖线）来分隔参数。
                </Typography.Title>
                <Typography.Title heading={6}>
                    复杂示例
                </Typography.Title>
                {/* <div className={styles.}></div> */}
            </Drawer>
        </div>
    );
}

export default Rule;
