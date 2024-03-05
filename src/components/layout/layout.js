import React from "react";
import { useSearchParams } from "react-router-dom";
import Banner from "../banner/banner";
import Bus from "../bus/bus";
import Metro from "../metro/metro";
import "./layout.css";
import NotFound from "../notFound/notFound";
export default function Layout() {
    const [searchParams, setSearchParams] = useSearchParams({ type: "bus" });
    const type = searchParams.get("type").trim() ?? "";

    if (type === "bus") {
        return (
            <>
                <Banner type={type} setSearchParams={setSearchParams} />
                <Bus />
            </>
        );
    } else if (type === "metro") {
        return (
            <>
                <Banner type={type} setSearchParams={setSearchParams} />
                <Metro />
            </>
        );
    } else {
        return (
            <>
                <Banner type={type} setSearchParams={setSearchParams} />
                <NotFound />
            </>
        );
    }
}
