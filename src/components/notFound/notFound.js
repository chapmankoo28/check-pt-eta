import React from "react";
import { Button, Container, Flex, Heading, Text } from "@radix-ui/themes";
import { Link } from "react-router-dom";

export default function NotFound() {
    return (
        <Container size="2" mt="9">
            <Flex direction="column" gap="6" align="center">
                <Heading size="9" weight="light">
                    404
                </Heading>
                <Heading size="8">Page Not Found</Heading>
                <Button asChild>
                    <Link to="/">
                        <Text as="span" className="material-symbols-outlined" id="icon-home">
                            home
                        </Text>
                        Back to Home
                    </Link>
                </Button>
            </Flex>
        </Container>
    );
}
