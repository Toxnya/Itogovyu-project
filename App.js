import React from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import TabBar from "./TabBar/TabBar";
import HomePage from "./HomePage/HomePage";
import HeroesPage from "./HeroesPage/HeroesPage";
import LorePage from "./LorePage/LorePage";
import LastPage from "./LastPage/LastPage";
import UserProfile from "./UserProfile/UserProfile";
import ScrollHandler from "./ScrollHandler/ScrollHandler";
import ForgotPasswordResetPassword from './UserProfile/ForgotPasswordResetPassword'
import Waves from "./Waves/Waves";
import VideosPage from "./VideosPage/VideosPage";
import { AnimatePresence, motion } from "framer-motion";
import './Waves/Waves.css';
import './App.css';
import './Transitions.css';
import './i18'
import TopBar from "./TopBar/TopBar";

const mainRoutes = [
    {
        path: "/",
        component: HomePage,
    },
    {
        path: "/heroes",
        component: HeroesPage,
    },
    {
        path: "/lore",
        component: LorePage,
    },
    {
        path: "/videos",
        component: VideosPage,
    },
    {
        path: "/last",
        component: LastPage,
    },
];

function MainRouter() {
    const location = useLocation();

    return (
        <AnimatePresence mode='wait'>
            <Routes location={location} key={location.pathname}>
                {mainRoutes.map((route, index) => (
                    <Route
                        key={index}
                        path={route.path}
                        element={
                            <motion.div
                                initial={{ opacity: 0, x: -100 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -100 }}
                                transition={{ duration: 0.5, ease: "easeInOut" }}
                            >
                                <route.component />
                            </motion.div>
                        }
                    />
                ))}
            </Routes>
        </AnimatePresence>
    );
}

function App() {
    return (
        <div className="app">
            <TopBar />
            <ScrollHandler />
            <Waves />
            <MainRouter />
            <Routes>
                <Route path="/profile" element={<UserProfile />} />
                <Route path="/forgot-reset-password" element={<ForgotPasswordResetPassword />} />
            </Routes>
            <TabBar />
        </div>
    );
}

export default App;
