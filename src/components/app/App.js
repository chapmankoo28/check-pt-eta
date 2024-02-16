import React, { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Container, Theme } from "@radix-ui/themes";
import Banner from "../banner/banner";
import Bus from "../bus/bus";
import Metro from "../metro/metro";
import NotFound from "../notFound/notFound";
import "@radix-ui/themes/styles.css";
import "./theme-config.css";
import "./App.css";

export default function App() {
    // const [nowTheme, setNowTheme] = useState("dark");

    return (
        <>
            <Theme appearance="dark" accentColor="indigo" radius="large" panelBackground="translucent" scaling="100%">
                <Container size="2" id="main-container">
                    <BrowserRouter>
                        <Banner />
                        <Routes>
                            <Route index element={<Navigate to="/bus" />} />
                            <Route path="/bus" element={<Bus />}>
                                <Route index element={<Bus />} />
                                <Route path=":co/:route/:bound/:service" element={<Bus />} />
                                <Route path=":co/:route/:bound/:service/:stop" element={<Bus />} />
                            </Route>
                            <Route path="/metro" element={<Metro />}>
                                <Route index element={<Metro />} />
                                <Route path=":line/:dir" element={<Metro />} />
                                <Route path=":line/:dir/:station" element={<Metro />} />
                            </Route>
                            <Route path="*" element={<NotFound />} />
                        </Routes>
                    </BrowserRouter>
                </Container>
            </Theme>
        </>
    );
}
