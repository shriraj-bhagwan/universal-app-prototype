import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { UserProvider } from "./contexts/UserContext";
import Index from "./pages/Index";
import LanguageSelection from "./pages/LanguageSelection";
import PermissionsScreen from "./pages/PermissionsScreen";
import PolicyIntroScreen from "./pages/PolicyIntroScreen";
import PolicyDetailsScreen from "./pages/PolicyDetailsScreen";
import PersonalDetailsScreen from "./pages/PersonalDetailsScreen";
import ConfirmationScreen from "./pages/ConfirmationScreen";
import ConsentScreen from "./pages/ConsentScreen";
import ThankYouScreen from "./pages/ThankYouScreen";
import OfflineVerificationScreen from "./pages/OfflineVerificationScreen";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        {/* Updated flow: Index → Language → Permissions → Policy flow */}
        <Route path="/" element={<Index />} />
        <Route path="/language-selection" element={<LanguageSelection />} />
        <Route path="/permissions" element={<PermissionsScreen />} />
        <Route path="/offline-verification" element={<OfflineVerificationScreen />} />
        <Route path="/policy-intro" element={<PolicyIntroScreen />} />
        <Route path="/policy-details" element={<PolicyDetailsScreen />} />
        <Route path="/personal-details" element={<PersonalDetailsScreen />} />
        <Route path="/confirmation" element={<ConfirmationScreen />} />
        <Route path="/consent" element={<ConsentScreen />} />
        <Route path="/thank-you" element={<ThankYouScreen />} />
        {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </AnimatePresence>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <UserProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AnimatedRoutes />
        </BrowserRouter>
      </TooltipProvider>
    </UserProvider>
  </QueryClientProvider>
);

export default App;
