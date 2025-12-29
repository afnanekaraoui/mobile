import React, { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'ar' | 'fr' | 'en';
type FontSize = 'normal' | 'large';

export interface Order {
  id: string;
  clientName: string;
  product: string;
  price: number;
  dueDate: string;
  location: string;
  status: 'pending' | 'completed' | 'cancelled';
  paymentStatus: 'paid' | 'unpaid';
  phone: string;
  notes?: string;
}

export interface InventoryItem {
  id: string;
  name: string;
  quantity: number;
  unit: string;
  lowStockThreshold: number;
  lastPurchased?: string;
}

export interface Task {
  id: string;
  title: string;
  completed: boolean;
  dueDate?: string;
  priority: 'high' | 'medium' | 'low';
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  date: string;
  read: boolean;
  type: 'order' | 'stock' | 'task' | 'system';
}

interface AppContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  fontSize: FontSize;
  setFontSize: (size: FontSize) => void;
  isLoggedIn: boolean;
  setIsLoggedIn: (val: boolean) => void;
  currentUser: { name: string; email: string } | null;
  setCurrentUser: (user: { name: string; email: string } | null) => void;
  orders: Order[];
  setOrders: (orders: Order[]) => void;
  inventory: InventoryItem[];
  setInventory: (items: InventoryItem[]) => void;
  tasks: Task[];
  setTasks: (tasks: Task[]) => void;
  notifications: Notification[];
  setNotifications: (notifications: Notification[]) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('en');
  const [fontSize, setFontSize] = useState<FontSize>('normal');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState<{ name: string; email: string } | null>(null);
  
  const [orders, setOrders] = useState<Order[]>([
    {
      id: '1',
      clientName: 'Sarah Benali',
      product: 'Gâteau Chocolat - 2 étages',
      price: 4500,
      dueDate: '2025-12-30',
      location: 'Hydra, Alger',
      status: 'pending',
      paymentStatus: 'unpaid',
      phone: '0555123456',
      notes: 'Décoration avec des roses en sucre'
    },
    {
      id: '2',
      clientName: 'Karim Mansouri',
      product: 'Tarte aux Pommes x3',
      price: 2400,
      dueDate: '2025-12-28',
      location: 'Bab Ezzouar',
      status: 'completed',
      paymentStatus: 'paid',
      phone: '0770234567'
    },
    {
      id: '3',
      clientName: 'Fatima Zerhouni',
      product: 'Cupcakes Vanille x24',
      price: 3600,
      dueDate: '2025-12-29',
      location: 'Kouba',
      status: 'pending',
      paymentStatus: 'paid',
      phone: '0661345678',
      notes: 'Pour anniversaire enfant'
    }
  ]);

  const [inventory, setInventory] = useState<InventoryItem[]>([
    { id: '1', name: 'Farine', quantity: 15, unit: 'kg', lowStockThreshold: 10, lastPurchased: '2025-12-20' },
    { id: '2', name: 'Sucre', quantity: 8, unit: 'kg', lowStockThreshold: 10, lastPurchased: '2025-12-22' },
    { id: '3', name: 'Oeufs', quantity: 5, unit: 'douzaines', lowStockThreshold: 8, lastPurchased: '2025-12-25' },
    { id: '4', name: 'Beurre', quantity: 12, unit: 'kg', lowStockThreshold: 5, lastPurchased: '2025-12-23' },
    { id: '5', name: 'Chocolat', quantity: 3, unit: 'kg', lowStockThreshold: 5, lastPurchased: '2025-12-24' },
  ]);

  const [tasks, setTasks] = useState<Task[]>([
    { id: '1', title: 'Tarte pomme NA340! my tdday list', completed: false, dueDate: '2025-12-29', priority: 'high' },
    { id: '2', title: 'Préparer commande Sarah', completed: false, dueDate: '2025-12-30', priority: 'high' },
    { id: '3', title: 'Acheter ingrédients', completed: false, priority: 'medium' },
  ]);

  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      title: 'Nouvelle commande',
      message: 'Fatima Zerhouni a passé une commande',
      date: '2025-12-29T10:30:00',
      read: false,
      type: 'order'
    },
    {
      id: '2',
      title: 'Stock faible',
      message: 'Oeufs - Quantité: 5 douzaines',
      date: '2025-12-29T09:15:00',
      read: false,
      type: 'stock'
    },
    {
      id: '3',
      title: 'Tâche urgente',
      message: 'Tarte pomme à préparer aujourd\'hui',
      date: '2025-12-29T08:00:00',
      read: true,
      type: 'task'
    },
  ]);

  return (
    <AppContext.Provider value={{
      language,
      setLanguage,
      fontSize,
      setFontSize,
      isLoggedIn,
      setIsLoggedIn,
      currentUser,
      setCurrentUser,
      orders,
      setOrders,
      inventory,
      setInventory,
      tasks,
      setTasks,
      notifications,
      setNotifications
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
}
