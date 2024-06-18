import React from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import TabBar from "./TabBar";
import HomePage from "./HomePage";
import HeroesPage from "./HeroesPage";
import LorePage from "./LorePage";
import LastPage from "./LastPage"
import ScrollHandler from "./ScrollHandler";
import Waves from "./Waves";
import { AnimatePresence, motion } from "framer-motion";
import './Waves.css';
import './App.css';
import './Transitions.css';
import './i18'

function App() {
    const location = useLocation();

    return (
        <div className="app">
            <ScrollHandler />
            <Waves />
            <AnimatePresence mode='wait'>
                <Routes location={location} key={location.pathname}>
                    <Route
                        path="/"
                        element={
                            <motion.div
                                initial={{ opacity: 0, x: -100 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -100 }}
                                transition={{ duration: 0.5, ease: "easeInOut" }}
                            >
                                <HomePage />
                            </motion.div>
                        }
                    />
                    <Route
                        path="/heroes"
                        element={
                            <motion.div
                                initial={{ opacity: 0, x: -100 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -100 }}
                                transition={{ duration: 0.5, ease: "easeInOut" }}
                            >
                                <HeroesPage />
                            </motion.div>
                        }
                    />
                    <Route
                        path="/lore"
                        element={
                            <motion.div
                                initial={{ opacity: 0, x: -100 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -100 }}
                                transition={{ duration: 0.5, ease: "easeInOut" }}
                            >
                                <LorePage />
                            </motion.div>
                        }
                    />
                    <Route
                        path="/last"
                        element={
                            <motion.div
                                initial={{ opacity: 0, x: -100 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -100 }}
                                transition={{ duration: 0.5, ease: "easeInOut" }}
                            >
                                <LastPage />
                            </motion.div>
                        }
                    />
                </Routes>
            </AnimatePresence>
            <TabBar />
        </div>
    );
}

export default App;
