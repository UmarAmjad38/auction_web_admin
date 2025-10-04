import React, { Suspense, useState } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { Box } from '@mui/material';
import TempComponent from './TempComponent';
import AppProvider from '../components/layout/AppProvider';
import Auction from '../components/auction/Auction';
import Lots from '../components/auction/Lots';
import LotDetailPage from '../components/auction/detail-pages/LotDetailPage';
import AuctionDetailPage from '../components/auction/detail-pages/AuctionDetailPage';
import CreatePage from '../components/auction/create-edit-pages/CreatePage';
import LiveStreamingDetailPage from '../components/auction/detail-pages/LiveStreamingDetailPage';
import { ToastContainer } from 'react-toastify';
import AddLot from '../components/auction/create-edit-pages/AddLot';
import Inventory from '../components/inventory/Inventory';

// import AuctionRoutes from '../components/auction/routes/AuctionRoutes';

// Page Components
const Login = React.lazy(() => import('../components/authentication/Login'));
const Dashboard = React.lazy(() => import('../components/dashboard/Dashboard'));
// const Auction = React.lazy(() => import('../components/auction/Auction'));
const LiveStreaming = React.lazy(() => import('../components/live-streaming/LiveStreaming'));
const PaymentTracking = React.lazy(() => import('../components/payment-tracking/PaymentTracking'));
// ProtectedRoute Component
const ProtectedRoute = ({ isAuthenticated, children }: any) => {
    if (!isAuthenticated) {
        return <Navigate to="/login" />;
    }
    return <AppProvider>{children}</AppProvider>;
};

const Routing = ({ isAuthenticated, setIsAuthenticated, socket }: any) => {
    return (
        <Box style={{ display: 'flex' }}>
            {/* Main Content Area */}
            <Box style={{ flex: 1 }}>
                <Suspense fallback={<div>Loading...</div>}>
                    <Routes>
                        {/* Login Route */}
                        <Route
                            path="/login"
                            element={isAuthenticated ? <Navigate to="/dashboard" /> : <Login setIsAuthenticated={setIsAuthenticated} />}
                        />

                        <Route path="/forgot-password" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
                        <Route path="/reset-password" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
                        <Route path="/new-password" element={<Login setIsAuthenticated={setIsAuthenticated} />} />

                        {/* Protected Routes */}
                        <Route
                            path="/"
                            element={isAuthenticated ? <Navigate to="/dashboard" /> : <Navigate to="/login" />}
                        />
                        <Route
                            path="/dashboard"
                            element={
                                <ProtectedRoute isAuthenticated={isAuthenticated}>
                                    <Dashboard />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/auction"
                            element={
                                <ProtectedRoute isAuthenticated={isAuthenticated}>
                                    <Auction />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/auction/create"
                            element={
                                <ProtectedRoute isAuthenticated={isAuthenticated}>
                                    <CreatePage type={"auction"} />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="auction/lots/create"
                            element={
                                <ProtectedRoute isAuthenticated={isAuthenticated}>
                                    <AddLot socket={socket} />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/auction/edit"
                            element={
                                <ProtectedRoute isAuthenticated={isAuthenticated}>
                                    <CreatePage type={"auction"} />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/auction/lots/edit"
                            element={
                                <ProtectedRoute isAuthenticated={isAuthenticated}>
                                    <AddLot />
                                </ProtectedRoute>
                            }
                        />
                        {['/auction/lots', '/live/lots'].map((path) => (
                            <Route
                                key={path}
                                path={path}
                                element={
                                    <ProtectedRoute isAuthenticated={isAuthenticated}>
                                        <Lots />
                                    </ProtectedRoute>
                                }
                            />
                        ))}
                        {['/auction/lots/details', '/inventory/lots/details'].map((path) => (
                            <Route
                                key={path}
                                path={path}
                                element={
                                    <ProtectedRoute isAuthenticated={isAuthenticated}>
                                        <LotDetailPage />
                                    </ProtectedRoute>
                                }
                            />
                        ))}
                        <Route
                            path="/auction/details"
                            element={
                                <ProtectedRoute isAuthenticated={isAuthenticated}>
                                    <AuctionDetailPage />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/live-streaming/details"
                            element={
                                <ProtectedRoute isAuthenticated={isAuthenticated}>
                                    <LiveStreamingDetailPage socket={socket} />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/live"
                            element={
                                <ProtectedRoute isAuthenticated={isAuthenticated}>
                                    <LiveStreaming />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/payment"
                            element={
                                <ProtectedRoute isAuthenticated={isAuthenticated}>
                                    <PaymentTracking />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/inventory"
                            element={
                                <ProtectedRoute isAuthenticated={isAuthenticated}>
                                    <Inventory />
                                </ProtectedRoute>
                            }
                        />
                        <Route path="/logout" element={<TempComponent setIsAuthenticated={setIsAuthenticated} />} />
                    </Routes>
                </Suspense>
                <ToastContainer />
            </Box>
        </Box>
    );
};

export default Routing;
