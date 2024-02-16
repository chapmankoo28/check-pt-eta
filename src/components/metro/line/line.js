import React, { useEffect } from "react";
import ETA from "./eta/eta";
import * as Accordion from "@radix-ui/react-accordion";
import * as Avatar from "@radix-ui/react-avatar";
import * as ScrollArea from "@radix-ui/react-scroll-area";
import mtr_lines_and_stations from "../../../data/mtr_lines_and_stations.json";
import { Link } from "react-router-dom";
import { Card, Flex, Heading, Text } from "@radix-ui/themes";
import NowLineInfo from "./nowLineInfo";
import "./line.css";

export default function Line({ line, dir, station }) {
    const now_line =
        mtr_lines_and_stations.data.find((i) => {
            return i["Line Code"] === line;
        }) ?? {};

    useEffect(() => {
        console.log("now_line", now_line);
    }, []);

    return (
        <>
            <Flex direction="column" align="center" justify="between" gap="3">
                <NowLineInfo line={line} dir={dir} station={station} now_line={now_line} />
                <ScrollArea.Root className="ScrollAreaRoot">
                    <ScrollArea.Viewport className="ScrollAreaViewport">
                        <Accordion.Root type="single" className="AccordionRoot" defaultValue={station}>
                            <Flex mt="5" direction="column" gap="3" justify="center">
                                {now_line[dir].map((i, count) => (
                                    <Card asChild>
                                        <Link to={`/check-pt-eta/metro/${i["Line Code"]}/${dir}/${i["Station Code"]}`}>
                                            <Accordion.Item id={i["Station Code"]} className="AccordionItem" value={i["Station Code"]} key={"stop" + i["Station Code"] + count}>
                                                <Accordion.Header className="AccordionHeader">
                                                    <Accordion.Trigger className="AccordionTrigger">
                                                        <Flex direction="row" gap="3" className="AccordionTriggerContent" align="center" justify="between">
                                                            <Avatar.Root className={"AvatarRoot stop-seq " + now_line["Line Code"].toLowerCase()}>
                                                                <Avatar.Fallback className="AvatarFallback">
                                                                    <Text size="6">{i["Sequence"]}</Text>
                                                                </Avatar.Fallback>
                                                            </Avatar.Root>

                                                            <Text size="5" align="left" mr="auto">
                                                                {i["Chinese Name"]}
                                                            </Text>

                                                            <Text as="div" trim="both" id="icon-expand_more" className="material-symbols-outlined">
                                                                expand_more
                                                            </Text>
                                                        </Flex>
                                                    </Accordion.Trigger>
                                                </Accordion.Header>
                                                <Accordion.Content className="AccordionContent">
                                                    {line === "DRL" ? (
                                                        <Heading size="5" weight="light" mt="5" mb="5" m="auto" align="center">
                                                            迪士尼線暫無ETA
                                                        </Heading>
                                                    ) : (
                                                        <ETA line={line} dir={dir} station={i["Station Code"]} now_line={now_line} />
                                                    )}
                                                </Accordion.Content>
                                            </Accordion.Item>
                                        </Link>
                                    </Card>
                                ))}
                            </Flex>
                        </Accordion.Root>
                    </ScrollArea.Viewport>
                    <ScrollArea.Scrollbar className="ScrollAreaScrollbar" orientation="vertical">
                        <ScrollArea.Thumb className="ScrollAreaThumb" />
                    </ScrollArea.Scrollbar>
                    <ScrollArea.Corner className="ScrollAreaCorner" />
                </ScrollArea.Root>
            </Flex>
        </>
    );
}
