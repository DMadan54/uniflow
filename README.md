# UniFlow - All-in-One Productivity Platform

UniFlow is a comprehensive productivity application designed for students and professionals to manage their academic and personal productivity workflows in one seamless platform.

## 🚀 Current Status

**Phase 1: Authentication System** ✅ **COMPLETED & READY FOR GITHUB**

The application currently has a fully functional authentication system with the following features:

### ✅ Implemented Features

#### Authentication & User Management
- **Secure Registration**: User registration with email verification
- **Login System**: Secure login with JWT token authentication
- **Password Management**: 
  - Password strength validation
  - Password reset functionality
  - Secure password hashing with bcrypt
- **Email Verification**: Complete email verification flow
- **Session Management**: JWT-based session management
- **User Preferences**: Theme, notifications, and timezone settings

#### Security Features
- **Password Hashing**: Industry-standard bcrypt with 12 salt rounds
- **JWT Tokens**: Secure token-based authentication
- **Input Validation**: Comprehensive form validation with Zod
- **Error Handling**: Secure error messages without information leakage
- **Local Storage**: Encrypted local database with Dexie

#### User Interface
- **Modern Design**: Clean, responsive UI using UniFlow design system
- **Form Validation**: Real-time validation with helpful error messages
- **Password Strength**: Visual password strength indicator
- **Loading States**: Proper loading indicators for all async operations
- **Toast Notifications**: User-friendly success/error notifications

### 🔧 Technical Stack

- **Frontend**: React 18 + TypeScript + Vite
- **UI Framework**: Tailwind CSS + shadcn/ui components
- **Database**: Dexie (IndexedDB wrapper) for local storage
- **Authentication**: JWT + bcrypt for password hashing
- **Form Handling**: React Hook Form + Zod validation
- **State Management**: React Context API
- **Routing**: React Router DOM

## 🎯 Demo Account

For testing purposes, a demo account is automatically created:

- **Email**: `demo@uniflow.com`
- **Password**: `demo123`

## 🚧 Upcoming Features

### Phase 2: Calendar & Task Management (Planned)
- [ ] Full-featured calendar component
- [ ] Event creation, editing, and deletion
- [ ] Recurring events
- [ ] Task management with priorities
- [ ] Calendar views (monthly, weekly, daily)
- [ ] Event notifications and reminders

### Phase 3: Note-Taking System (Planned)
- [ ] Rich text editor with markdown support
- [ ] Syntax highlighting for programming languages
- [ ] Folder/notebook organization
- [ ] Search functionality
- [ ] Tagging and categorization
- [ ] Export options (PDF, markdown)

### Phase 4: External Integrations (Planned)
- [ ] Spotify integration
- [ ] MyFitnessPal integration
- [ ] Strava integration
- [ ] Flexible API integration system
- [ ] Data synchronization

### Phase 5: Advanced Features (Planned)
- [ ] Two-factor authentication
- [ ] Offline functionality
- [ ] Data export and backup
- [ ] Advanced analytics
- [ ] Cross-platform compatibility

## 🛠️ Getting Started

> **Note**: This repository contains **Phase 1 only** - a complete authentication system. Phase 2 (Calendar & Tasks) has been temporarily removed for this GitHub upload and will be re-added in a future update.

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd uniflow-new
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173`

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 📁 Project Structure

```
src/
├── components/
│   └── ui/                 # shadcn/ui components
├── contexts/
│   └── AuthContext.tsx     # Authentication context
├── hooks/
│   └── use-toast.ts        # Toast notification hook
├── lib/
│   ├── auth.ts            # Authentication service
│   ├── database.ts        # Database configuration
│   └── demo-setup.ts      # Demo data setup
├── pages/
│   ├── auth/              # Authentication pages
│   │   ├── Login.tsx
│   │   ├── Register.tsx
│   │   ├── VerifyEmail.tsx
│   │   ├── ForgotPassword.tsx
│   │   └── ResetPassword.tsx
│   ├── Dashboard.tsx      # Main dashboard
│   ├── Index.tsx          # Landing page
│   └── NotFound.tsx       # 404 page
└── App.tsx                # Main app component
```

## 🔐 Security Features

### Authentication Security
- **Password Hashing**: bcrypt with 12 salt rounds
- **JWT Tokens**: Secure token-based authentication
- **Email Verification**: Required for account activation
- **Password Reset**: Secure token-based password reset
- **Session Management**: Automatic token validation

### Data Security
- **Local Storage**: All data stored locally using IndexedDB
- **Encryption**: Sensitive data encrypted at rest
- **Input Validation**: Comprehensive validation with Zod
- **Error Handling**: Secure error messages

## 🎨 Design System

UniFlow uses a custom design system with:

- **Color Palette**: UniFlow red (#ef4444) and Flow blue (#3b82f6)
- **Typography**: Inter font family
- **Components**: shadcn/ui component library
- **Animations**: Smooth transitions and hover effects
- **Responsive Design**: Mobile-first approach

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

If you encounter any issues or have questions:

1. Check the [Issues](https://github.com/your-repo/issues) page
2. Create a new issue with detailed information
3. Contact the development team

---

**UniFlow** - Unify your digital life in one seamless flow ✨
