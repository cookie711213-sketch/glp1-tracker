import { Home, Syringe, LineChart, Layers, AlertTriangle, type LucideIcon } from "lucide-react";

export interface NavItem {
  href: string;
  label: string;
  icon: LucideIcon;
}

export const NAV_ITEMS: NavItem[] = [
  { href: "/", label: "홈", icon: Home },
  { href: "/injections", label: "주사 일정", icon: Syringe },
  { href: "/weight", label: "체중 기록", icon: LineChart },
  { href: "/dose", label: "용량 단계", icon: Layers },
  { href: "/sides", label: "부작용 기록", icon: AlertTriangle },
];
