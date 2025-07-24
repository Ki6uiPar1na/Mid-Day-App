import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import { MemberApproval } from "./components/admin/MemberApproval";
import { PromoteExecutive } from "./components/admin/PromoteExecutive";
import { RemoveMembership } from "./components/admin/RemoveMembership";
import { HostContest } from "./components/admin/HostContest";
import { AboutSection } from "./components/admin/AboutSection";
import { ProudMentions } from "./components/admin/ProudMentions";
import { SeniorExecutives } from "./components/admin/SeniorExecutives";
import { Executives } from "./components/admin/Executives";
import { MemberInfo } from "./components/admin/MemberInfo";
import { Achievements } from "./components/admin/Achievements";
import { Gallery } from "./components/admin/Gallery";
import { NoticeBoard } from "./components/admin/NoticeBoard";
import { AdminDashboard } from "../src/components/AdminDashboard";
import { AuthForm } from "./components/AuthForm"; // 👈 Add this

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* default to login */}
          <Route path="/" element={<AuthForm onLoginSuccess={(email) => console.log(`Logged in as: ${email}`)} />} />
          <Route path="/admin" element={<Index />} />
          <Route path="/admin/login" element={<AuthForm onLoginSuccess={(email) => console.log(`Logged in as: ${email}`)} />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/member-approval" element={<MemberApproval />} />
          <Route path="/admin/promote-executive" element={<PromoteExecutive />} />
          <Route path="/admin/remove-membership" element={<RemoveMembership />} />
          <Route path="/admin/host-contest" element={<HostContest />} />
          <Route path="/admin/about-section" element={<AboutSection />} />
          <Route path="/admin/proud-mentions" element={<ProudMentions />} />
          <Route path="/admin/senior-executives" element={<SeniorExecutives />} />
          <Route path="/admin/executives" element={<Executives />} />
          <Route path="/admin/member-info" element={<MemberInfo />} />
          <Route path="/admin/achievements" element={<Achievements />} />
          <Route path="/admin/gallery" element={<Gallery />} />
          <Route path="/admin/notice-board" element={<NoticeBoard />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
