import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { UserProvider } from "./contexts/UserContext";
import WhatsAppScreen from "./pages/WhatsAppScreen";
import LanguageSelection from "./pages/LanguageSelection";
import PermissionsScreen from "./pages/PermissionsScreen";
import PolicyIntroScreen from "./pages/PolicyIntroScreen";
import PolicyDetailsScreen from "./pages/PolicyDetailsScreen";
import PersonalDetailsScreen from "./pages/PersonalDetailsScreen";
import ConfirmationScreen from "./pages/ConfirmationScreen";
import ConsentScreen from "./pages/ConsentScreen";
import ThankYouScreen from "./pages/ThankYouScreen";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <UserProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Navigate to="/whatsapp" replace />} />
            <Route path="/whatsapp" element={<WhatsAppScreen />} />
            <Route path="/language-selection" element={<LanguageSelection />} />
            <Route path="/permissions" element={<PermissionsScreen />} />
            <Route path="/policy-intro" element={<PolicyIntroScreen />} />
            <Route path="/policy-details" element={<PolicyDetailsScreen />} />
            <Route path="/personal-details" element={<PersonalDetailsScreen />} />
            <Route path="/confirmation" element={<ConfirmationScreen />} />
            <Route path="/consent" element={<ConsentScreen />} />
            <Route path="/thank-you" element={<ThankYouScreen />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </UserProvider>
  </QueryClientProvider>
);

export default App;
