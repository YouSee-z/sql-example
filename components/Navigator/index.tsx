import React, { Fragment } from "react";
import { Heading, Pane, } from "evergreen-ui";
import { categorizedRoutes, Route } from "@utils/routes";
import Link from "next/link";
import { useRouter } from "next/router";
import styles from "./index.module.css"
import { Typography, } from "@arco-design/web-react"


export default function Navigator() {
    const router = useRouter();

    return (
        <div className={styles.pane}>
            <div className={styles.paneBody}         >
                {categorizedRoutes.map(route => {
                    return (
                        <Fragment key={route.category}>
                            <div className={styles.paneClassify}>
                                <Typography.Title heading={5} >
                                    {route.category}
                                </Typography.Title>
                            </div>
                            {(route.content as Route[])
                                .sort((a, b) => a.label.localeCompare(b.label))
                                .map((a: Route) => {
                                    const isActive = router.pathname === a.path;
                                    return (
                                        <Link key={a.label} href={a.path} prefetch={false}>
                                            <a
                                                style={{
                                                    textDecoration: "none"
                                                }}
                                            >
                                                <div className={styles.paneRouterName}
                                                    style={{
                                                        backgroundColor: isActive ? "rgba(51,112,255,.08)" : "", color: isActive ? "rgb(51, 112, 255)" : "", borderRight: isActive
                                                            ? "3px solid #3370ff"
                                                            : ""
                                                    }}
                                                >
                                                    <span >{a.label}</span>
                                                </div>
                                            </a>
                                        </Link>
                                    );
                                })}
                        </Fragment>
                    );
                })}
            </div>
        </div>
    );
}
