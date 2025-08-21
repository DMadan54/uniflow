import React, { useState, useEffect } from 'react';
import { db } from '@/lib/database';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Trash2, Eye, RefreshCw, CheckCircle, Mail } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface User {
  id?: number;
  email: string;
  firstName: string;
  lastName: string;
  isEmailVerified: boolean;
  createdAt: Date;
  lastLoginAt?: Date;
}

const DevTools = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  const loadUsers = async () => {
    setIsLoading(true);
    try {
      const allUsers = await db.users.toArray();
      setUsers(allUsers);
    } catch (error) {
      console.error('Failed to load users:', error);
      toast({
        title: 'Error',
        description: 'Failed to load users from database',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const deleteUser = async (userId: number) => {
    try {
      await db.users.delete(userId);
      toast({
        title: 'Success',
        description: 'User deleted successfully',
      });
      loadUsers(); // Reload the list
    } catch (error) {
      console.error('Failed to delete user:', error);
      toast({
        title: 'Error',
        description: 'Failed to delete user',
        variant: 'destructive',
      });
    }
  };

  const clearAllUsers = async () => {
    if (window.confirm('Are you sure you want to delete ALL users? This cannot be undone.')) {
      try {
        await db.users.clear();
        toast({
          title: 'Success',
          description: 'All users deleted successfully',
        });
        loadUsers();
      } catch (error) {
        console.error('Failed to clear users:', error);
        toast({
          title: 'Error',
          description: 'Failed to clear users',
          variant: 'destructive',
        });
      }
    }
  };

  const verifyUserEmail = async (userId: number) => {
    try {
      await db.users.update(userId, {
        isEmailVerified: true,
        emailVerificationToken: undefined
      });
      toast({
        title: 'Success',
        description: 'Email verified successfully',
      });
      loadUsers(); // Reload the list
    } catch (error) {
      console.error('Failed to verify email:', error);
      toast({
        title: 'Error',
        description: 'Failed to verify email',
        variant: 'destructive',
      });
    }
  };

  const unverifyUserEmail = async (userId: number) => {
    try {
      await db.users.update(userId, {
        isEmailVerified: false,
        emailVerificationToken: 'dev-unverified-token'
      });
      toast({
        title: 'Success',
        description: 'Email unverified successfully',
      });
      loadUsers(); // Reload the list
    } catch (error) {
      console.error('Failed to unverify email:', error);
      toast({
        title: 'Error',
        description: 'Failed to unverify email',
        variant: 'destructive',
      });
    }
  };

  const verifyAllEmails = async () => {
    try {
      const unverifiedUsers = users.filter(user => !user.isEmailVerified);
      if (unverifiedUsers.length === 0) {
        toast({
          title: 'Info',
          description: 'All users are already verified',
        });
        return;
      }

      for (const user of unverifiedUsers) {
        await db.users.update(user.id!, {
          isEmailVerified: true,
          emailVerificationToken: undefined
        });
      }

      toast({
        title: 'Success',
        description: `Verified ${unverifiedUsers.length} email(s)`,
      });
      loadUsers(); // Reload the list
    } catch (error) {
      console.error('Failed to verify all emails:', error);
      toast({
        title: 'Error',
        description: 'Failed to verify all emails',
        variant: 'destructive',
      });
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Development Tools</h1>
          <p className="text-muted-foreground">
            Database management tools for development purposes
          </p>
        </div>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Users Database</CardTitle>
                             <div className="flex gap-2">
                 <Button
                   onClick={loadUsers}
                   variant="outline"
                   size="sm"
                   disabled={isLoading}
                 >
                   <RefreshCw className={`w-4 h-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
                   Refresh
                 </Button>
                 <Button
                   onClick={verifyAllEmails}
                   variant="outline"
                   size="sm"
                 >
                   <CheckCircle className="w-4 h-4 mr-2" />
                   Verify All
                 </Button>
                 <Button
                   onClick={clearAllUsers}
                   variant="destructive"
                   size="sm"
                 >
                   <Trash2 className="w-4 h-4 mr-2" />
                   Clear All
                 </Button>
               </div>
            </div>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="text-center py-8">
                <RefreshCw className="w-8 h-8 animate-spin mx-auto mb-4 text-muted-foreground" />
                <p className="text-muted-foreground">Loading users...</p>
              </div>
            ) : users.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-muted-foreground">No users found in database</p>
              </div>
            ) : (
              <div className="space-y-4">
                {users.map((user) => (
                  <div
                    key={user.id}
                    className="flex items-center justify-between p-4 border rounded-lg"
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-medium">
                          {user.firstName} {user.lastName}
                        </h3>
                        <Badge variant={user.isEmailVerified ? "default" : "secondary"}>
                          {user.isEmailVerified ? "Verified" : "Unverified"}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{user.email}</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        Created: {user.createdAt.toLocaleString()}
                        {user.lastLoginAt && (
                          <span className="ml-4">
                            Last login: {user.lastLoginAt.toLocaleString()}
                          </span>
                        )}
                      </p>
                    </div>
                                         <div className="flex gap-2">
                       {user.isEmailVerified ? (
                         <Button
                           onClick={() => unverifyUserEmail(user.id!)}
                           variant="outline"
                           size="sm"
                           title="Unverify email"
                         >
                           <Mail className="w-4 h-4" />
                         </Button>
                       ) : (
                         <Button
                           onClick={() => verifyUserEmail(user.id!)}
                           variant="outline"
                           size="sm"
                           title="Verify email"
                         >
                           <CheckCircle className="w-4 h-4" />
                         </Button>
                       )}
                       <Button
                         onClick={() => deleteUser(user.id!)}
                         variant="destructive"
                         size="sm"
                         title="Delete user"
                       >
                         <Trash2 className="w-4 h-4" />
                       </Button>
                     </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        <div className="mt-8 text-center">
          <p className="text-sm text-muted-foreground">
            This page is only available in development mode
          </p>
        </div>
      </div>
    </div>
  );
};

export default DevTools;
