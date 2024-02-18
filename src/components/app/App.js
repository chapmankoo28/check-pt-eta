import React from "react";
import { BrowserRouter, Routes, Route, HashRouter } from "react-router-dom";
import { Container, Theme } from "@radix-ui/themes";
import Home from "../home/home";
import Banner from "../banner/banner";
import Bus from "../bus/bus";
import Metro from "../metro/metro";
import NotFound from "../notFound/notFound";
import "@radix-ui/themes/styles.css";
import "./theme-config.css";
import "./App.css";

export default function App() {
    return (
        <>
            <Theme appearance="dark" accentColor="indigo" radius="large" panelBackground="translucent" scaling="100%">
                <Container size="2" id="main-container">
                    <HashRouter>
                        <Banner />
                        <Routes>
                            <Route path="/check-pt-eta">
                                <Route index element={<Home />} />
                                <Route path="bus" element={<Bus />}>
                                    <Route index element={<Bus />} />
                                    <Route path=":co/:route/:bound/:service" element={<Bus />} />
                                    <Route path=":co/:route/:bound/:service/:stop" element={<Bus />} />
                                </Route>
                                <Route path="metro" element={<Metro />}>
                                    <Route index element={<Metro />} />
                                    <Route path=":line/:dir" element={<Metro />} />
                                    <Route path=":line/:dir/:station" element={<Metro />} />
                                </Route>
                            </Route>
                            <Route path="*" element={<NotFound />} />
                        </Routes>
                    </HashRouter>
                </Container>
            </Theme>
        </>
    );
}
