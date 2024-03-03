import React from "react";
import { Container, Text, Separator, Flex, Heading, Tooltip } from "@radix-ui/themes";
import "./banner.css";

export default function Banner({ type, setSearchParams }) {
    return (
        <>
            <Container size="2" id="banner" mt="1" mb="8">
                <nav>
                    <Flex align="center" width="auto" justify="between" mb="2">
                        <Tooltip content="About this project">
                            <a href="https://github.com/chapmankoo28/check-eta">
                                <Heading id="nav-title">幾時到</Heading>
                            </a>
                        </Tooltip>
                        <button onClick={() => setSearchParams({ type: "bus" })}>
                            <Text className={type === "bus" ? "active" : ""} id="nav-bus">
                                🚍巴士
                            </Text>
                        </button>
                        <button onClick={() => setSearchParams({ type: "metro" })}>
                            <Text className={type === "metro" ? "active" : ""} id="nav-metro">
                                🚇鐡路
                            </Text>
                        </button>
                    </Flex>
                    <Separator size="4" />
                </nav>
            </Container>
        </>
    );
}
