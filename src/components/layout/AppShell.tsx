import Sidebar from "./Sidebar";
import BottomTabs from "./BottomTabs";
import MobileHeader from "./MobileHeader";
import ProfileGate from "@/components/shared/ProfileGate";

export default function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <MobileHeader />
        <main className="flex-1 px-4 md:px-8 py-5 md:py-8 pb-24 md:pb-8 max-w-[1200px] w-full mx-auto">
          {children}
        </main>
      </div>
      <BottomTabs />
      <ProfileGate />
    </div>
  );
}
