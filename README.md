# My Business Assistant - HCI-Based Mobile App

A comprehensive mobile business management application designed for small business owners, specifically tailored for bakery businesses (like Amina's use case). Built with React, TypeScript, and Tailwind CSS following HCI principles and WCAG accessibility guidelines.

## Features

### Authentication
- **Sign In Page** - Email validation, password visibility toggle
- **Sign Up Page** - Multi-field registration with validation
- **Forgot Password Page** - Email-based password recovery

### Main Application Screens

#### 1. Home Dashboard
- Personalized welcome message
- Task cards with color-coded priorities
- Quick stats overview
- Floating action button for quick add

#### 2. Orders Management
- Expandable order cards showing:
  - Client name and contact
  - Product description
  - Price and due date
  - Status badges (pending/completed)
  - Payment status (paid/unpaid)
  - Location and notes
- Add new order form with all necessary fields
- Search functionality

#### 3. Inventory/Stock Management
- Stock items with quantity tracking
- Low stock alerts (visual indicators)
- Add stock items with:
  - Item name
  - Quantity and unit
  - Low stock threshold
- Last purchase date tracking

#### 4. Analytics Dashboard
- Total revenue (paid orders)
- Pending revenue
- Completed vs pending orders count
- Low stock items count
- Visual cards with color coding

#### 5. Notifications
- Real-time notification feed
- Categories: orders, stock, tasks, system
- Unread indicators
- Mark all as read functionality
- Time-based display (e.g., "5m ago")

#### 6. Profile & Settings
- User profile display
- Language selection (English, Français, العربية)
- Font size adjustment (Normal/Large)
- Account information
- Logout functionality

### Modal Actions
- **Add Modal** - Choose between adding task, order, or stock
- **Add Task Form** - Task description, due date, priority levels
- **Add Order Form** - Comprehensive order details
- **Add Stock Form** - Inventory item management

## Design Principles

### HCI Heuristics Applied
1. **Visibility of system status** - Clear status indicators, badges, loading states
2. **Match between system and real world** - Bakery-themed placeholders, familiar terminology
3. **User control and freedom** - Easy navigation, cancel options, confirmations
4. **Consistency and standards** - Unified design language, predictable interactions
5. **Error prevention** - Email validation, required fields, clear labels
6. **Recognition rather than recall** - Icons with labels, visual cues
7. **Flexibility and efficiency** - Quick actions, search, shortcuts
8. **Aesthetic and minimalist design** - Clean layout, focused content
9. **Help users recognize and recover from errors** - Clear error messages
10. **Help and documentation** - Clear labels, placeholders, tooltips

### Accessibility Features
- **High Contrast Colors** - #16524a (primary teal) with white backgrounds
- **Touch-Friendly Targets** - Minimum 44px touch areas
- **Clear Visual Hierarchy** - Proper heading structure, spacing
- **Font Size Options** - User-adjustable text sizes
- **ARIA Labels** - Screen reader support
- **Keyboard Navigation** - Full keyboard accessibility
- **Color + Icons** - Never relying on color alone
- **RTL Support** - Ready for Arabic language

## Color Palette
- **Primary**: #16524a (Dark Teal) - Buttons, active states
- **Secondary**: #b8d4a8 (Light Green) - Success states
- **Alert**: #ffb3b3 (Salmon Red) - Urgent notifications
- **Warning**: #fbbf24 (Amber) - Low stock alerts
- **Background**: #f5f5f5 (Light Gray) - Page backgrounds
- **White**: #ffffff - Cards, inputs

## iPhone Compatibility
- Status bar with signal, battery, time (9:41)
- Home indicator bar
- Safe area support
- Optimized for iPhone 14/15 (430px width)
- Bottom navigation with padding for home indicator
- Smooth animations and transitions
- Touch-optimized interactions

## User Personas Supported

### Amina (Novice User)
- Home-based baker
- Simple, clear interface
- Large buttons and text
- Quick order management

### Sofiane (Expert User)
- Tech-savvy reseller
- Analytics and insights
- Efficient workflows
- Data export capabilities

### Ami Ahmed (Traditional Artisan)
- Moderate tech skills
- RTL language support
- Large fonts option
- Minimal complexity

## Technologies Used
- React 18
- TypeScript
- Tailwind CSS 4
- Lucide React Icons
- Vite

## Usage

The app starts with authentication screens. After signing in:
1. Navigate using the bottom tab bar (Home, Orders, Inventory, Analytics)
2. Use the floating (+) button to quickly add items
3. Access notifications via the bell icon
4. Access profile and settings via the user icon
5. Tap on cards to expand and see more details

## Mock Data Included
- 3 sample orders with full details
- 5 inventory items with stock levels
- 3 tasks with priorities
- 3 notifications (mixed types)

All data is stored in React state and persists during the session.
