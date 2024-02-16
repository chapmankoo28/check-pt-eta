import React from "react";
import { Card, Flex, Text } from "@radix-ui/themes";
import mtr_lines_and_stations from "../../../data/mtr_lines_and_stations.json";
import { Link } from "react-router-dom";
import "./dataTable.css";

const lines = mtr_lines_and_stations.data;

export default function DataTable() {
    return (
        <>
            <Flex direction="column" gap="3" align="center">
                {lines.map((i, index) => {
                    return (
                        <Card key={"Line" + i["Station ID"] + index} asChild className="metro-data-card">
                            <Link to={`/metro/${i["Line Code"]}/DT/`}>
                                <Flex gap="1" justify="between" align="center">
                                    <div className={"mtr-line-color " + i["Line Code"].toLowerCase()} />
                                    <Text size="6">{i["Chinese Name"]}</Text>
                                    <Text
                                        trim="both"
                                        id="icon-navigate-next"
                                        className="material-symbols-outlined"
                                        style={{
                                            color: i["color"],
                                        }}
                                    >
                                        navigate_next
                                    </Text>
                                </Flex>
                            </Link>
                        </Card>
                    );
                })}
            </Flex>
        </>
    );
}
