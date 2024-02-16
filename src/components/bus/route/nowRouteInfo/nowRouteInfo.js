import React, { useState } from "react";
import { Flex, Text, Heading, Tooltip } from "@radix-ui/themes";
import { Link } from "react-router-dom";
import "./nowRouteInfo.css";

export default function NowRouteInfo({ co, route, bound, service, nowRoute }) {

    const [rotate, setRotate] = useState(false);

    const handle_swap_bound = () => {
        setRotate(true);
        setTimeout(() => {
            // The timeout should match the animation duration
            setRotate(false);
        }, 500);
    };

    // useEffect(() => {
    //     if (stopData.length === 0) {
    //         setTimeout(() => {
    //             n(`/bus/${co}/${route}/${bound === "O" ? "I" : "O"}/${service}/`);
    //         }, 2000);
    //     }
    // }, [stopData]);

    return (
        <>
            {Object.keys(nowRoute).length !== 0 ? (
                <>
                    <Flex direction="row" align="center" justify="center" gap="5">
                        <Heading id="now-route-num">{nowRoute.route ?? ""}</Heading>
                        <Heading id="now-route-dest">{nowRoute.dest_tc ?? ""}</Heading>

                        <Tooltip content="切換方向">
                            <Link to={`/bus/${co}/${route}/${bound === "O" ? "I" : "O"}/${service}/`} onClick={handle_swap_bound}>
                                <Text as="div" id="icon-swap_vert" className="material-symbols-outlined" state={rotate ? "loading" : ""}>
                                    swap_vert
                                </Text>
                            </Link>
                        </Tooltip>
                    </Flex>
                    {co === "KMB" ? (
                        <Link to={"https://search.kmb.hk/KMBWebSite/?action=routesearch&route=" + route}>按此查詢巴士公司網站之資料</Link>
                    ) : (
                        <Link to={"https://mobile.citybus.com.hk/nwp3/?f=1&dsmode=1&l=0&ds=" + route}>按此查詢巴士公司網站之資料</Link>
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
