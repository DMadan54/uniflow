import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { UniFlowLogo } from '@/components/ui/uniflow-logo';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import { 
  FileText, 
  Settings, 
  LogOut, 
  User,
  Bell,
  Search,
  Plus
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const Dashboard = () => {
  const { user, logout } = useAuth();
  const { toast } = useToast();

  const handleLogout = () => {
    logout();
    toast({
      title: 'Logged out successfully',
      description: 'You have been signed out of your account.',
    });
  };

  if (!user) {
    return null; // This should be handled by a protected route wrapper
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="glass-nav border-b">
        <div className="container-center py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <UniFlowLogo size="md" animated />
              <div className="hidden md:flex items-center gap-2">
                <Search className="w-4 h-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search notes, tasks, events..."
                  className="bg-transparent border-none outline-none text-sm w-64"
                />
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm">
                <Bell className="w-4 h-4" />
              </Button>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-uni-red rounded-full flex items-center justify-center text-white text-sm font-medium">
                  {user.firstName.charAt(0)}{user.lastName.charAt(0)}
                </div>
                <div className="hidden md:block">
                  <p className="text-sm font-medium">{user.firstName} {user.lastName}</p>
                  <p className="text-xs text-muted-foreground">{user.email}</p>
                </div>
              </div>
              <Button variant="ghost" size="sm" onClick={handleLogout}>
                <LogOut className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container-center py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Welcome back, {user.firstName}! 👋
          </h1>
          <p className="text-muted-foreground">
            Here's what's happening with your productivity today.
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Notes</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">12</div>
              <p className="text-xs text-muted-foreground">
                +2 from last week
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Account Status</CardTitle>
              <User className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">Active</div>
              <p className="text-xs text-muted-foreground">
                Email verified
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Security</CardTitle>
              <Settings className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">Secure</div>
              <p className="text-xs text-muted-foreground">
                JWT protected
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Productivity Score</CardTitle>
              <div className="h-4 w-4 rounded-full bg-success" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">87%</div>
              <p className="text-xs text-muted-foreground">
                +5% from yesterday
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Notes */}
          <Card className="hover-lift cursor-pointer">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <FileText className="w-5 h-5 text-flow-blue" />
                  Smart Notes
                </CardTitle>
                <Badge variant="secondary">Coming Soon</Badge>
              </div>
              <CardDescription>
                Rich text editing with markdown support, tags, and powerful search
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span>Recent notes</span>
                  <span className="text-muted-foreground">3</span>
                </div>
                <div className="space-y-1">
                  <div className="text-sm text-muted-foreground">• Welcome to UniFlow!</div>
                  <div className="text-sm text-muted-foreground">• Project Ideas</div>
                  <div className="text-sm text-muted-foreground">• Meeting Notes</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Calendar & Tasks */}
          <Card className="hover-lift cursor-pointer">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Settings className="w-5 h-5 text-uni-red" />
                  Calendar & Tasks
                </CardTitle>
                <Badge variant="secondary">Coming Soon</Badge>
              </div>
              <CardDescription>
                Daily planning with smart scheduling and priority management
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span>Features</span>
                  <span className="text-muted-foreground">Phase 2</span>
                </div>
                <div className="space-y-1">
                  <div className="text-sm text-muted-foreground">• Event creation & management</div>
                  <div className="text-sm text-muted-foreground">• Task tracking with priorities</div>
                  <div className="text-sm text-muted-foreground">• Calendar views (month/week/day)</div>
                </div>
              </div>
            </CardContent>
            </Card>

          {/* Integrations */}
          <Card className="hover-lift cursor-pointer">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Settings className="w-5 h-5 text-success" />
                  App Integrations
                </CardTitle>
                <Badge variant="secondary">Coming Soon</Badge>
              </div>
              <CardDescription>
                Connect MyFitnessPal, Strava, and more. All your data in one place
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span>Connected apps</span>
                  <span className="text-muted-foreground">0</span>
                </div>
                <div className="space-y-1">
                  <div className="text-sm text-muted-foreground">• Spotify</div>
                  <div className="text-sm text-muted-foreground">• MyFitnessPal</div>
                  <div className="text-sm text-muted-foreground">• Strava</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="mt-8">
          <h2 className="text-xl font-semibold text-foreground mb-4">Quick Actions</h2>
          <div className="flex flex-wrap gap-3">
            <Button variant="outline" className="flex items-center gap-2">
              <Plus className="w-4 h-4" />
              New Note
            </Button>
            <Button variant="outline" className="flex items-center gap-2">
              <Settings className="w-4 h-4" />
              Account Settings
            </Button>
            <Button variant="outline" className="flex items-center gap-2">
              <User className="w-4 h-4" />
              Profile
            </Button>
            <Button variant="outline" className="flex items-center gap-2">
              <Settings className="w-4 h-4" />
              Connect App
            </Button>
          </div>
        </div>

        {/* Development Notice */}
        <div className="mt-12 p-6 bg-background-soft rounded-2xl">
          <div className="text-center">
            <h3 className="text-lg font-semibold text-foreground mb-2">
              🚧 Under Development
            </h3>
            <p className="text-muted-foreground mb-4">
              This is a demo version of UniFlow. The full application with all features is currently being developed.
            </p>
            <div className="flex flex-wrap justify-center gap-2">
              <Badge variant="outline">Phase 1: Authentication ✓</Badge>
              <Badge variant="outline">Phase 2: Calendar & Tasks</Badge>
              <Badge variant="outline">Phase 3: Notes System</Badge>
              <Badge variant="outline">Phase 4: Integrations</Badge>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
