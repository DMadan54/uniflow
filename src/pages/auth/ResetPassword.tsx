import React, { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useAuth } from '@/contexts/AuthContext';
import { UniFlowLogo } from '@/components/ui/uniflow-logo';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Eye, EyeOff, Lock, ArrowLeft, Check, X } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const resetPasswordSchema = z.object({
  password: z.string().min(8, 'Password must be at least 8 characters'),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>;

const ResetPassword = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { resetPassword } = useAuth();
  const { toast } = useToast();
  
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const token = searchParams.get('token');

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    setError,
  } = useForm<ResetPasswordFormData>({
    resolver: zodResolver(resetPasswordSchema),
  });

  const password = watch('password', '');
  const confirmPassword = watch('confirmPassword', '');

  // Password strength checker
  const getPasswordStrength = (password: string) => {
    let score = 0;
    const checks = {
      length: password.length >= 8,
      lowercase: /[a-z]/.test(password),
      uppercase: /[A-Z]/.test(password),
      number: /\d/.test(password),
      special: /[!@#$%^&*(),.?":{}|<>]/.test(password),
    };

    score += checks.length ? 1 : 0;
    score += checks.lowercase ? 1 : 0;
    score += checks.uppercase ? 1 : 0;
    score += checks.number ? 1 : 0;
    score += checks.special ? 1 : 0;

    return { score, checks };
  };

  const passwordStrength = getPasswordStrength(password);

  const onSubmit = async (data: ResetPasswordFormData) => {
    if (!token) {
      setError('root', { message: 'Invalid reset link. Please request a new password reset.' });
      return;
    }

    setIsLoading(true);
    try {
      const result = await resetPassword(token, data.password);
      
      if (result.success) {
        setIsSuccess(true);
        toast({
          title: 'Password reset successfully!',
          description: 'Your password has been updated. You can now sign in with your new password.',
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

  if (isSuccess) {
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
                <Check className="w-8 h-8 text-success" />
              </div>
              
              <div className="space-y-2">
                <h1 className="text-2xl font-bold text-foreground">Password reset successfully!</h1>
                <p className="text-muted-foreground">
                  Your password has been updated. You can now sign in with your new password.
                </p>
              </div>

              <Button onClick={() => navigate('/auth/login')} className="btn-primary">
                Sign in to your account
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!token) {
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

        {/* Error Content */}
        <div className="flex-1 flex items-center justify-center py-12">
          <div className="container-form">
            <div className="text-center space-y-6">
              <div className="w-16 h-16 mx-auto bg-destructive/10 rounded-full flex items-center justify-center">
                <X className="w-8 h-8 text-destructive" />
              </div>
              
              <div className="space-y-2">
                <h1 className="text-2xl font-bold text-foreground">Invalid reset link</h1>
                <p className="text-muted-foreground">
                  This password reset link is invalid or has expired. Please request a new one.
                </p>
              </div>

              <div className="space-y-3">
                <Button onClick={() => navigate('/auth/forgot-password')} className="btn-primary">
                  Request new reset link
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
            <h1 className="text-3xl font-bold text-foreground mb-2">Reset your password</h1>
            <p className="text-muted-foreground">
              Enter your new password below
            </p>
          </div>

          <div className="card p-8">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Password Field */}
              <div className="space-y-2">
                <Label htmlFor="password" className="form-label">
                  New password
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Enter your new password"
                    className="pl-10 pr-10 form-input"
                    {...register('password')}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-sm text-destructive">{errors.password.message}</p>
                )}

                {/* Password Strength Indicator */}
                {password && (
                  <div className="mt-2 space-y-2">
                    <div className="flex gap-1">
                      {[1, 2, 3, 4, 5].map((level) => (
                        <div
                          key={level}
                          className={`h-1 flex-1 rounded-full transition-colors ${
                            level <= passwordStrength.score
                              ? passwordStrength.score <= 2
                                ? 'bg-destructive'
                                : passwordStrength.score <= 3
                                ? 'bg-warning'
                                : 'bg-success'
                              : 'bg-muted'
                          }`}
                        />
                      ))}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {passwordStrength.score <= 2 && 'Weak'}
                      {passwordStrength.score === 3 && 'Fair'}
                      {passwordStrength.score === 4 && 'Good'}
                      {passwordStrength.score === 5 && 'Strong'}
                    </div>
                  </div>
                )}

                {/* Password Requirements */}
                {password && (
                  <div className="space-y-1 text-xs">
                    <div className={`flex items-center gap-1 ${password.length >= 8 ? 'text-success' : 'text-muted-foreground'}`}>
                      {password.length >= 8 ? <Check className="w-3 h-3" /> : <X className="w-3 h-3" />}
                      At least 8 characters
                    </div>
                    <div className={`flex items-center gap-1 ${/[a-z]/.test(password) ? 'text-success' : 'text-muted-foreground'}`}>
                      {/[a-z]/.test(password) ? <Check className="w-3 h-3" /> : <X className="w-3 h-3" />}
                      Lowercase letter
                    </div>
                    <div className={`flex items-center gap-1 ${/[A-Z]/.test(password) ? 'text-success' : 'text-muted-foreground'}`}>
                      {/[A-Z]/.test(password) ? <Check className="w-3 h-3" /> : <X className="w-3 h-3" />}
                      Uppercase letter
                    </div>
                    <div className={`flex items-center gap-1 ${/\d/.test(password) ? 'text-success' : 'text-muted-foreground'}`}>
                      {/\d/.test(password) ? <Check className="w-3 h-3" /> : <X className="w-3 h-3" />}
                      Number
                    </div>
                    <div className={`flex items-center gap-1 ${/[!@#$%^&*(),.?":{}|<>]/.test(password) ? 'text-success' : 'text-muted-foreground'}`}>
                      {/[!@#$%^&*(),.?":{}|<>]/.test(password) ? <Check className="w-3 h-3" /> : <X className="w-3 h-3" />}
                      Special character
                    </div>
                  </div>
                )}
              </div>

              {/* Confirm Password Field */}
              <div className="space-y-2">
                <Label htmlFor="confirmPassword" className="form-label">
                  Confirm new password
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="confirmPassword"
                    type={showConfirmPassword ? 'text' : 'password'}
                    placeholder="Confirm your new password"
                    className="pl-10 pr-10 form-input"
                    {...register('confirmPassword')}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                {errors.confirmPassword && (
                  <p className="text-sm text-destructive">{errors.confirmPassword.message}</p>
                )}
                {confirmPassword && password !== confirmPassword && (
                  <p className="text-sm text-destructive">Passwords don't match</p>
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
                {isLoading ? 'Resetting password...' : 'Reset password'}
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
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
