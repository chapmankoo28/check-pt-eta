import React from "react";
import { NavLink } from "react-router-dom";
import { Container, Text, Separator, Flex, Heading } from "@radix-ui/themes";
import "./banner.css";

export default function Banner() {
    // const switchTheme = useCallback(() => {
    //     setNowTheme((prevTheme) => (prevTheme === "dark" ? "light" : "dark"));
    // }, [setNowTheme]);

    return (
        <>
            <Container size="2" id="banner" mt="1" mb="8">
                <nav>
                    <Flex align="center" width="auto" justify="center" gap="9" mb="2">
                        <Heading id="nav-title">幾時到</Heading>
                        <NavLink to="/bus">
                            <Text id="nav-bus">🚍巴士</Text>
                        </NavLink>
                        <NavLink to="/metro">
                            <Text id="nav-metro">🚇鐡路</Text>
                        </NavLink>
                        {/* <Tooltip content="切換主題">
                            <IconButton
                                id="switchThemeBut"
                                variant="ghost"
                                onClick={() => switchTheme()}
                                size="1"
                                color="gray"
                            >
                                <Text trim="both" as="span" className="material-symbols-outlined" id="icon-theme">
                                    {nowTheme === "dark" ? "light_mode" : "dark_mode"}
                                </Text>
                            </IconButton>
                        </Tooltip> */}
                    </Flex>
                    <Separator size="4" />
                </nav>
            </Container> 
        </>
    );
}
