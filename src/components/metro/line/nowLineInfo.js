import { Flex, Heading, Text, Tooltip } from "@radix-ui/themes";
import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function NowLineInfo({ line, dir, station, now_line }) {
    const [rotate, setRotate] = useState(false);
    const handle_swap_bound = () => {
        setRotate(true);
        setTimeout(() => {
            // The timeout should match the animation duration
            setRotate(false);
        }, 500);
    };

    return (
        <>
            <Flex direction="column" align="center" justify="between">
                <Flex direction="row" align="center" gap="3">
                    <div className={"mtr-line-color " + now_line["Line Code"].toLowerCase()} />
                    <Heading id="now-route-dest">{now_line["Chinese Name"] ?? ""}</Heading>
                </Flex>

                <Flex direction="row" align="center" gap="3">
                    <Flex gap="1" align="baseline">
                        <Text size="2">往</Text>
                        <Text size="6">{now_line[dir][now_line[dir].length - 1]["Chinese Name"] ?? ""}</Text>
                    </Flex>

                    <Tooltip content="切換方向">
                        <Link to={`/check-pt-eta/metro/${line}/${dir === "DT" ? "UT" : "DT"}/`} onClick={handle_swap_bound}>
                            <Text as="div" id="icon-swap_vert" className="material-symbols-outlined" state={rotate ? "loading" : ""}>
                                swap_vert
                            </Text>
                        </Link>
                    </Tooltip>
                </Flex>
            </Flex>
        </>
    );
}
