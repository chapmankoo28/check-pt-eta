import React, { useState } from "react";
import { Flex, Text, Heading, Tooltip } from "@radix-ui/themes";
import "./nowRouteInfo.css";

export default function NowRouteInfo({ co, route, bound, service, nowRoute, setSearchParams }) {
    const [rotate, setRotate] = useState(false);

    const handle_swap_bound = () => {
        setSearchParams(
            (prev) => {
                prev.set("bound", prev.get("bound") === "O" ? "I" : "O");
                return prev;
            },
            { replace: true }
        );
        setRotate(true);
        setTimeout(() => {
            // The timeout should match the animation duration
            setRotate(false);
        }, 500);
    };

    return (
        <>
            {Object.keys(nowRoute).length !== 0 ? (
                <>
                    <Flex direction="row" align="center" justify="center" gap="5">
                        <Heading id="now-route-num">{nowRoute.route ?? ""}</Heading>
                        <Heading id="now-route-dest">{nowRoute.dest_tc ?? ""}</Heading>

                        <Tooltip content="切換方向">
                            <button onClick={handle_swap_bound}>
                                <Text trim="both" as="div" id="icon-swap_vert" className="material-symbols-outlined" state={rotate ? "loading" : ""}>
                                    swap_vert
                                </Text>
                            </button>
                        </Tooltip>
                    </Flex>
                    {co === "KMB" ? (
                        <a href={"https://search.kmb.hk/KMBWebSite/?action=routesearch&route=" + route}>按此查詢巴士公司網站之資料</a>
                    ) : (
                        <a href={"https://mobile.citybus.com.hk/nwp3/?f=1&dsmode=1&l=0&ds=" + route}>按此查詢巴士公司網站之資料</a>
                    )}
                </>
            ) : (
                <>
                    <Heading id="now-route-dest">搵唔到呢條線……</Heading>
                </>
            )}
        </>
    );
}
