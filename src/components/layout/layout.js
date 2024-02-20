import React from "react";
import { useSearchParams } from "react-router-dom";
import Banner from "../banner/banner";
import Bus from "../bus/bus";
import Metro from "../metro/metro";
import "./layout.css";
export default function Layout() {
    const [searchParams, setSearchParams] = useSearchParams({ type: "bus" });
    const type = searchParams.get("type").trim() ?? "";

    return (
        <>
            <Banner type={type} setSearchParams={setSearchParams} />
            {type === "bus" && <Bus />}
            {type === "metro" && <Metro />}
        </>
    );
}
