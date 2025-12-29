import { AddModal } from './components/AddModal';
import { AddOrderForm } from './components/AddOrderForm';
import { AddStockForm } from './components/AddStockForm';
import { AddTaskForm } from './components/AddTaskForm';

import { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { SignInPage } from './components/SignInPage';
import { SignUpPage } from './components/SignUpPage';
import { ForgotPasswordPage } from './components/ForgotPasswordPage';
import { HomePage } from './components/HomePage';
import { OrdersPage } from './components/OrdersPage';
import { InventoryPage } from './components/InventoryPage';
import { AnalyticsPage } from './components/AnalyticsPage';
import { NotificationsPage } from './components/NotificationsPage';
import { ProfilePage } from './components/ProfilePage';
import { BottomNav } from './components/BottomNav';

type AuthPage = 'signin' | 'signup' | 'forgot';
type AppPage = 'home' | 'orders' | 'inventory' | 'analytics' | 'notifications' | 'profile';

function AppContent() {
  const { isLoggedIn, setIsLoggedIn, setCurrentUser } = useApp();
  const [authPage, setAuthPage] = useState<AuthPage>('signin');
  const [currentPage, setCurrentPage] = useState<AppPage>('home');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showAddOrder, setShowAddOrder] = useState(false);
  const [showAddStock, setShowAddStock] = useState(false);
  const [showAddTask, setShowAddTask] = useState(false);

  const handleSignIn = (email: string, password: string) => {
    // Extract first name from email or use default
    const name = email.split('@')[0] || 'Amina';
    const capitalizedName = name.charAt(0).toUpperCase() + name.slice(1);
    
    setCurrentUser({ name: capitalizedName, email });
    setIsLoggedIn(true);
  };

  const handleSignUp = (firstName: string, lastName: string, email: string, password: string) => {
    setCurrentUser({ name: `${firstName} ${lastName}`, email });
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentUser(null);
    setCurrentPage('home');
  };

  const handleAddModalSelect = (type: 'task' | 'order' | 'stock') => {
    if (type === 'order') {
      setShowAddOrder(true);
    } else if (type === 'stock') {
      setShowAddStock(true);
    } else if (type === 'task') {
      setShowAddTask(true);
    }
  };

  const handleNavigate = (page: string) => {
    setCurrentPage(page as AppPage);
  };

  // Authentication Flow
  if (!isLoggedIn) {
    if (authPage === 'signup') {
      return <SignUpPage onSignUp={handleSignUp} onNavigate={setAuthPage} />;
    }
    if (authPage === 'forgot') {
      return <ForgotPasswordPage onNavigate={setAuthPage} />;
    }
    return <SignInPage onSignIn={handleSignIn} onNavigate={setAuthPage} />;
  }

  // Main App
  return (
    <div className="relative min-h-screen bg-gray-50">
      {/* Page Content */}
      {currentPage === 'home' && (
        <HomePage 
          onNavigate={handleNavigate} 
          onShowAddModal={() => setShowAddModal(true)} 
        />
      )}
      {currentPage === 'orders' && (
        <OrdersPage 
          onNavigate={handleNavigate} 
          onShowAddModal={() => setShowAddModal(true)}
          onShowAddOrder={() => setShowAddOrder(true)}
        />
      )}
      {currentPage === 'inventory' && (
        <InventoryPage 
          onNavigate={handleNavigate} 
          onShowAddModal={() => setShowAddModal(true)}
          onShowAddStock={() => setShowAddStock(true)}
        />
      )}
      {currentPage === 'analytics' && (
        <AnalyticsPage 
          onNavigate={handleNavigate} 
          onShowAddModal={() => setShowAddModal(true)} 
        />
      )}
      {currentPage === 'notifications' && (
        <NotificationsPage onNavigate={handleNavigate} />
      )}
      {currentPage === 'profile' && (
        <ProfilePage onNavigate={handleNavigate} onLogout={handleLogout} />
      )}

      {/* Bottom Navigation - Show only on main pages */}
      {!['notifications', 'profile'].includes(currentPage) && (
        <BottomNav currentPage={currentPage} onNavigate={handleNavigate} />
      )}

      {/* Modals */}
      {showAddModal && (
        <AddModal 
          onClose={() => setShowAddModal(false)} 
          onSelect={handleAddModalSelect}
        />
      )}
      {showAddOrder && (
        <AddOrderForm onClose={() => setShowAddOrder(false)} />
      )}
      {showAddStock && (
        <AddStockForm onClose={() => setShowAddStock(false)} />
      )}
      {showAddTask && (
        <AddTaskForm onClose={() => setShowAddTask(false)} />
      )}
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}