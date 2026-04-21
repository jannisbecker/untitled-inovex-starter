import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router";
import { BookingsPage } from "@/pages/bookings";
import { CalendarPage } from "@/pages/calendar";
import { HomeScreen } from "@/pages/home-screen";
import { NotFound } from "@/pages/not-found";
import { PricingFigmaPage } from "@/pages/pricing-figma";
import { MessagesPage } from "@/pages/messages";
import { YourCardsPage } from "@/pages/your-cards";
import { RouteProvider } from "@/providers/router-provider";
import { ThemeProvider } from "@/providers/theme-provider";
import "@/styles/globals.css";

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <ThemeProvider defaultTheme="light">
            <BrowserRouter>
                <RouteProvider>
                    <Routes>
                        <Route path="/" element={<HomeScreen />} />
                        <Route path="/bookings" element={<BookingsPage />} />
                        <Route path="/calendar" element={<CalendarPage />} />
                        <Route path="/pricing-figma" element={<PricingFigmaPage />} />
                        <Route path="/messages" element={<MessagesPage />} />
                        <Route path="/your-cards" element={<YourCardsPage />} />
                        <Route path="*" element={<NotFound />} />
                    </Routes>
                </RouteProvider>
            </BrowserRouter>
        </ThemeProvider>
    </StrictMode>,
);
