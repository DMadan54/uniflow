import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useAuth } from '@/contexts/AuthContext';
import { UniFlowLogo } from '@/components/ui/uniflow-logo';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Mail, ArrowLeft, CheckCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const forgotPasswordSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
});

type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>;

const ForgotPassword = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { requestPasswordReset } = useAuth();
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    watch,
  } = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const email = watch('email');

  const onSubmit = async (data: ForgotPasswordFormData) => {
    setIsLoading(true);
    try {
      const result = await requestPasswordReset(data.email);
      
      if (result.success) {
        setIsSubmitted(true);
        toast({
          title: 'Reset email sent',
          description: 'If an account exists with that email, you will receive a password reset link.',
        });
      } else {
        setError('root', { message: result.error });
      }
    } catch (error) {
      setError('root', { message: 'An unexpected error occurred. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        {/* Navigation */}
        <nav className="glass-nav">
          <div className="container-center py-4 flex justify-between items-center">
            <Link to="/" className="flex items-center gap-2 text-foreground hover:text-uni-red transition-colors">
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Home</span>
            </Link>
            <UniFlowLogo size="md" animated />
          </div>
        </nav>

        {/* Success Content */}
        <div className="flex-1 flex items-center justify-center py-12">
          <div className="container-form">
            <div className="text-center space-y-6">
              <div className="w-16 h-16 mx-auto bg-success/10 rounded-full flex items-center justify-center">
                <CheckCircle className="w-8 h-8 text-success" />
              </div>
              
              <div className="space-y-2">
                <h1 className="text-2xl font-bold text-foreground">Check your email</h1>
                <p className="text-muted-foreground">
                  We've sent a password reset link to your email address.
                </p>
                {email && (
                  <p className="text-sm text-muted-foreground">
                    Sent to: <span className="font-medium">{email}</span>
                  </p>
                )}
              </div>

              <div className="card p-6 bg-background-soft">
                <h3 className="font-medium text-foreground mb-2">What's next?</h3>
                <ul className="text-sm text-muted-foreground space-y-1 text-left">
                  <li>• Check your email for the reset link</li>
                  <li>• Click the link to reset your password</li>
                  <li>• Create a new secure password</li>
                  <li>• Sign in with your new password</li>
                </ul>
              </div>

              <div className="space-y-3">
                <Button onClick={() => setIsSubmitted(false)} className="btn-secondary">
                  Send another email
                </Button>
                <div>
                  <Link to="/auth/login" className="text-flow-blue hover:text-flow-blue-dark text-sm">
                    Back to sign in
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Navigation */}
      <nav className="glass-nav">
        <div className="container-center py-4 flex justify-between items-center">
          <Link to="/" className="flex items-center gap-2 text-foreground hover:text-uni-red transition-colors">
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Home</span>
          </Link>
          <UniFlowLogo size="md" animated />
        </div>
      </nav>

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center py-12">
        <div className="container-form">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">Forgot your password?</h1>
            <p className="text-muted-foreground">
              Enter your email address and we'll send you a link to reset your password.
            </p>
          </div>

          <div className="card p-8">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Email Field */}
              <div className="space-y-2">
                <Label htmlFor="email" className="form-label">
                  Email address
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    className="pl-10 form-input"
                    {...register('email')}
                  />
                </div>
                {errors.email && (
                  <p className="text-sm text-destructive">{errors.email.message}</p>
                )}
              </div>

              {/* Error Alert */}
              {errors.root && (
                <Alert variant="destructive">
                  <AlertDescription>{errors.root.message}</AlertDescription>
                </Alert>
              )}

              {/* Submit Button */}
              <Button
                type="submit"
                className="w-full btn-primary"
                disabled={isLoading}
              >
                {isLoading ? 'Sending...' : 'Send reset link'}
              </Button>

              {/* Back to Login */}
              <div className="text-center">
                <Link
                  to="/auth/login"
                  className="text-flow-blue hover:text-flow-blue-dark transition-colors text-sm"
                >
                  Back to sign in
                </Link>
              </div>
            </form>
          </div>

          {/* Help Text */}
          <div className="mt-8 text-center">
            <div className="card p-4 bg-background-soft">
              <p className="text-sm text-muted-foreground">
                <strong>Need help?</strong> If you're having trouble accessing your account, 
                contact our support team.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
