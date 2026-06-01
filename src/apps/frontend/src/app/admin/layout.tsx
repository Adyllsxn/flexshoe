'use client';

import { useState } from 'react';
import { Sidebar } from './_layouts/Sidebar';
import { TopBar } from './_layouts/TopBar';
import './admin.css';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
    localStorage.setItem('flexshoe-sidebar-collapsed', JSON.stringify(!sidebarCollapsed));
  };

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50">
      <Sidebar 
        mobileOpen={mobileMenuOpen} 
        setMobileOpen={setMobileMenuOpen}
        collapsed={sidebarCollapsed}
      />
      
      <div className="flex flex-1 flex-col overflow-hidden">
        <TopBar 
          onMenuClick={() => setMobileMenuOpen(!mobileMenuOpen)} 
          onSidebarToggle={toggleSidebar} 
        />
        <main className="main flex-1 overflow-y-auto p-6">
          {children}
        </main>
      </div>
    </div>
  );
}