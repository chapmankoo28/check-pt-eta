import React from "react";
import { useParams } from "react-router-dom";
import { Flex, Container, Heading } from "@radix-ui/themes";
import * as ScrollArea from "@radix-ui/react-scroll-area";
import DataTable from "./dataTable/dataTable";
import Line from "./line/line";
import "./metro.css";

export default function Metro() {
    const { line, dir, station } = useParams();

    const is_selected_line = line ? true : false;

    return (
        <>
            <Container size="1" id="metro-container">
                {is_selected_line ? (
                    <Line line={line} dir={dir} station={station} />
                ) : (
                    <Flex direction="column" gap="3">
                        <Heading size="8" weight="light" align="center" mb="9" m="1">
                            地鐵幾時到
                        </Heading>

                        <ScrollArea.Root className="ScrollAreaRoot">
                            <ScrollArea.Viewport className="ScrollAreaViewport">
                                <DataTable />
                            </ScrollArea.Viewport>
                            <ScrollArea.Scrollbar className="ScrollAreaScrollbar" orientation="vertical">
                                <ScrollArea.Thumb className="ScrollAreaThumb" />
                            </ScrollArea.Scrollbar>
                            <ScrollArea.Corner className="ScrollAreaCorner" />
                        </ScrollArea.Root>
                    </Flex>
                )}
            </Container>
        </>
    );
}
