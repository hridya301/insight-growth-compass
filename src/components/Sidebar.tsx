
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  BarChart3, 
  TrendingUp, 
  Lightbulb, 
  Target, 
  Users, 
  Settings, 
  ChevronLeft, 
  ChevronRight 
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

type NavItemProps = {
  to: string;
  icon: React.ReactNode;
  label: string;
  isActive?: boolean;
  isCollapsed?: boolean;
};

const NavItem: React.FC<NavItemProps> = ({ 
  to, 
  icon, 
  label, 
  isActive = false,
  isCollapsed = false
}) => {
  return (
    <Link to={to} className="w-full">
      <Button
        variant="ghost"
        className={cn(
          "w-full justify-start gap-3 px-3",
          isActive ? "bg-sidebar-accent text-sidebar-accent-foreground" : "transparent",
          isCollapsed ? "justify-center px-2" : ""
        )}
      >
        {icon}
        {!isCollapsed && <span>{label}</span>}
      </Button>
    </Link>
  );
};

export const Sidebar: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  
  const navItems = [
    { to: "/dashboard", icon: <LayoutDashboard size={20} />, label: "Dashboard" },
    { to: "/analytics", icon: <BarChart3 size={20} />, label: "Analytics" },
    { to: "/competitors", icon: <TrendingUp size={20} />, label: "Competitors" },
    { to: "/insights", icon: <Lightbulb size={20} />, label: "AI Insights" },
    { to: "/goals", icon: <Target size={20} />, label: "Goals" },
    { to: "/team", icon: <Users size={20} />, label: "Team" },
    { to: "/settings", icon: <Settings size={20} />, label: "Settings" },
  ];

  return (
    <div
      className={cn(
        "h-screen border-r bg-sidebar flex flex-col fixed top-16 left-0 z-20",
        collapsed ? "w-16" : "w-64",
        "transition-width duration-300 ease-in-out"
      )}
    >
      <div className="flex-1 py-6 px-2">
        <div className="space-y-1">
          {navItems.map((item) => (
            <NavItem
              key={item.to}
              to={item.to}
              icon={item.icon}
              label={item.label}
              isActive={location.pathname === item.to}
              isCollapsed={collapsed}
            />
          ))}
        </div>
      </div>

      <div className="p-2 border-t">
        <Button
          variant="ghost"
          size="icon"
          className="w-full justify-center"
          onClick={() => setCollapsed(!collapsed)}
        >
          {collapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
        </Button>
      </div>
    </div>
  );
};
