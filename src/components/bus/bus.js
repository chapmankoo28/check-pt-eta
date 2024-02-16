import React, { useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { Flex, Container, Heading, Dialog, Button } from "@radix-ui/themes";
import SearchBar from "./dataTable/searchBar/searchBar";
import DataTable from "./dataTable/dataTable";
import Route from "./route/route";
import "./bus.css";

export default function Bus() {
    const [searchParams, setSearchParams] = useSearchParams({ route: "" });
    const q = searchParams.get("route")?.trim() ?? "";

    const [error, setError] = useState(false);

    const { co, route, bound, service, stop } = useParams();

    const is_selected_route = co ? true : false;

    const get_bus_company_info = (co, route) => {
        const COMPANY_NAMES = {
            CTB: "城巴",
            KMB: "九巴",
            LWB: "龍運",
        };
        const LWB_PATTERN = /^(A|E|NA|R|S|X)/;
        const NOT_LWB_ROUTES = ["X6C", "X42C", "X42P", "X89D", "X90", "R33", "R42"];
        const isLWBRoute = (route) => LWB_PATTERN.test(route) && !NOT_LWB_ROUTES.includes(route);
        if (co === "CTB") {
            return { name_tc: COMPANY_NAMES.CTB, code: "CTB" };
        }
        if (co === "KMB" && isLWBRoute(route)) {
            return { name_tc: COMPANY_NAMES.LWB, code: "LWB" };
        }
        return { name_tc: COMPANY_NAMES.KMB, code: "KMB" };
    };

    return (
        <Container size="2" id="bus-container" align="center">
            <Dialog.Root open={error}>
                <Dialog.Content>
                    <Dialog.Title>錯誤</Dialog.Title>
                    <Dialog.Description>請再試一次。</Dialog.Description>
                    <Flex gap="1" justify="end">
                        <Dialog.Close>
                            <Button variant="soft" onClick={() => setError(false)} color="gray">
                                Close
                            </Button>
                        </Dialog.Close>
                    </Flex>
                </Dialog.Content>
            </Dialog.Root>
            {is_selected_route ? (
                <Route co={co} route={route} bound={bound} service={service} stop={stop} setError={setError} get_bus_company_info={get_bus_company_info} />
            ) : (
                <Flex direction="column" gap="3">
                    <Heading size="8" weight="light" align="center" m="1">
                        巴士幾時到
                    </Heading>
                    <SearchBar q={q} setSearchParams={setSearchParams} />
                    <DataTable q={q} get_bus_company_info={get_bus_company_info} />
                </Flex>
            )}
        </Container>
    );
}
