import React, { useState } from 'react';
import { useMidnight } from './hooks/useMidnight';
import { Sidebar } from './layouts/Sidebar';
import { TopNav } from './layouts/TopNav';
import { DashboardPage } from './pages/DashboardPage';
import { RequestsPage } from './pages/RequestsPage';
import { RequestDetailPage } from './pages/RequestDetailPage';
import { OrganizationsPage } from './pages/OrganizationsPage';
import { ReportsPage } from './pages/ReportsPage';
import { NotificationsPage } from './pages/NotificationsPage';
import { SettingsPage } from './pages/SettingsPage';
import { CreateRequestModal } from './components/CreateRequestModal';
import { Toast } from './components/Toast';
import { ActiveTab, ReliefRequest, NotificationItem } from './types';
import { mockRequests, mockNotifications } from './data/mockData';

export const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<ActiveTab>('dashboard');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [requestsList, setRequestsList] = useState<ReliefRequest[]>(mockRequests);
  const [selectedRequest, setSelectedRequest] = useState<ReliefRequest | null>(null);
  const [notificationsList, setNotificationsList] = useState<NotificationItem[]>(mockNotifications);
  
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Midnight Lace Wallet & ZK Circuit Hook
  const {
    isConnected,
    walletAddress,
    network,
    isConnecting,
    error,
    connectWallet,
    disconnectWallet,
    executeCircuit,
    isExecutingCircuit,
    lastTxHash,
    counterState,
  } = useMidnight();

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  const handleCreateRequest = (newReq: Partial<ReliefRequest>) => {
    const created = newReq as ReliefRequest;
    setRequestsList([created, ...requestsList]);
    showToast(`Request ${created.id} successfully created.`);
  };

  const handleMarkAllNotificationsRead = () => {
    setNotificationsList(notificationsList.map(n => ({ ...n, read: true })));
    showToast('All notifications marked as read.');
  };

  const unreadNotificationsCount = notificationsList.filter(n => !n.read).length;

  return (
    <div className="min-h-screen bg-surface-bg text-slate-900 font-sans selection:bg-blue-500 selection:text-white">
      {/* Sidebar Layout */}
      <Sidebar
        activeTab={activeTab}
        setActiveTab={(tab) => {
          setActiveTab(tab);
          if (tab !== 'request-detail') setSelectedRequest(null);
        }}
        collapsed={sidebarCollapsed}
        setCollapsed={setSidebarCollapsed}
        unreadCount={unreadNotificationsCount}
      />

      {/* Top Navigation Bar */}
      <TopNav
        activeTab={activeTab}
        sidebarCollapsed={sidebarCollapsed}
        isConnected={isConnected}
        walletAddress={walletAddress}
        network={network}
        isConnecting={isConnecting}
        onConnect={connectWallet}
        onDisconnect={disconnectWallet}
        onOpenNotifications={() => setActiveTab('notifications')}
        unreadCount={unreadNotificationsCount}
      />

      {/* Main SaaS Dashboard Container */}
      <main
        className={`pt-20 pb-12 px-6 transition-all duration-300 ${
          sidebarCollapsed ? 'pl-24' : 'pl-72'
        }`}
      >
        <div className="max-w-7xl mx-auto">
          {activeTab === 'dashboard' && (
            <DashboardPage
              onCreateRequest={() => setIsCreateModalOpen(true)}
              onViewRequests={() => setActiveTab('requests')}
              isConnected={isConnected}
              counterState={counterState}
              isExecutingCircuit={isExecutingCircuit}
              lastTxHash={lastTxHash}
              onExecuteCircuit={executeCircuit}
            />
          )}

          {activeTab === 'requests' && (
            <RequestsPage
              requests={requestsList}
              onCreateRequest={() => setIsCreateModalOpen(true)}
              onSelectRequest={(req) => {
                setSelectedRequest(req);
                setActiveTab('request-detail');
              }}
            />
          )}

          {activeTab === 'request-detail' && selectedRequest && (
            <RequestDetailPage
              request={selectedRequest}
              onBack={() => setActiveTab('requests')}
              onShowToast={showToast}
            />
          )}

          {activeTab === 'organizations' && (
            <OrganizationsPage />
          )}

          {activeTab === 'reports' && (
            <ReportsPage onShowToast={showToast} />
          )}

          {activeTab === 'notifications' && (
            <NotificationsPage
              notifications={notificationsList}
              onMarkAllAsRead={handleMarkAllNotificationsRead}
            />
          )}

          {activeTab === 'settings' && (
            <SettingsPage onShowToast={showToast} />
          )}
        </div>
      </main>

      {/* Reusable Modals & Toasts */}
      <CreateRequestModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSubmit={handleCreateRequest}
      />

      <Toast
        message={toastMessage}
        onClose={() => setToastMessage(null)}
      />
    </div>
  );
};

export default App;
