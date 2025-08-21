import React, { useEffect, useState } from 'react';
import { Link, useSearchParams, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { UniFlowLogo } from '@/components/ui/uniflow-logo';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { ArrowLeft, Mail, CheckCircle, XCircle, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const VerifyEmail = () => {
  const [searchParams] = useSearchParams();
  const [isVerifying, setIsVerifying] = useState(false);
  const [verificationStatus, setVerificationStatus] = useState<'verifying' | 'success' | 'error' | null>(null);
  const [errorMessage, setErrorMessage] = useState('');
  const { verifyEmail } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const token = searchParams.get('token');

  useEffect(() => {
    if (token) {
      verifyEmailToken();
    }
  }, [token]);

  const verifyEmailToken = async () => {
    if (!token) return;

    setIsVerifying(true);
    setVerificationStatus('verifying');

    try {
      const result = await verifyEmail(token);
      
      if (result.success) {
        setVerificationStatus('success');
        toast({
          title: 'Email verified successfully!',
          description: 'You can now log in to your account.',
        });
      } else {
        setVerificationStatus('error');
        setErrorMessage(result.error || 'Verification failed');
      }
    } catch (error) {
      setVerificationStatus('error');
      setErrorMessage('An unexpected error occurred');
    } finally {
      setIsVerifying(false);
    }
  };

  const resendVerification = async () => {
    // This would typically require the user to enter their email again
    // For now, we'll just show a message
    toast({
      title: 'Resend functionality',
      description: 'This feature will be implemented in the next update.',
    });
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Navigation */}
      <nav className="glass-nav">
        <div className="container-center py-4 flex justify-between items-center">
          <Link to="/auth/login" className="flex items-center gap-2 text-foreground hover:text-uni-red transition-colors">
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Login</span>
          </Link>
          <UniFlowLogo size="md" animated />
        </div>
      </nav>

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center py-12">
        <div className="container-form">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">Verify your email</h1>
            <p className="text-muted-foreground">
              {token ? 'Verifying your email address...' : 'Check your email for a verification link'}
            </p>
          </div>

          <div className="card p-8">
            {!token ? (
              // No token provided - show instructions
              <div className="text-center space-y-6">
                <div className="mx-auto w-16 h-16 bg-flow-blue/10 rounded-full flex items-center justify-center">
                  <Mail className="w-8 h-8 text-flow-blue" />
                </div>
                
                <div>
                  <h2 className="text-xl font-semibold text-foreground mb-2">
                    Check your email
                  </h2>
                  <p className="text-muted-foreground">
                    We've sent a verification link to your email address. Click the link to verify your account.
                  </p>
                </div>

                <div className="space-y-4">
                  <Button
                    onClick={() => navigate('/auth/login')}
                    className="w-full btn-primary"
                  >
                    Back to Login
                  </Button>
                  
                  <Button
                    onClick={resendVerification}
                    variant="outline"
                    className="w-full"
                  >
                    Resend verification email
                  </Button>
                </div>
              </div>
            ) : (
              // Token provided - show verification status
              <div className="text-center space-y-6">
                {verificationStatus === 'verifying' && (
                  <>
                    <div className="mx-auto w-16 h-16 bg-flow-blue/10 rounded-full flex items-center justify-center">
                      <Loader2 className="w-8 h-8 text-flow-blue animate-spin" />
                    </div>
                    <div>
                      <h2 className="text-xl font-semibold text-foreground mb-2">
                        Verifying your email...
                      </h2>
                      <p className="text-muted-foreground">
                        Please wait while we verify your email address.
                      </p>
                    </div>
                  </>
                )}

                {verificationStatus === 'success' && (
                  <>
                    <div className="mx-auto w-16 h-16 bg-success/10 rounded-full flex items-center justify-center">
                      <CheckCircle className="w-8 h-8 text-success" />
                    </div>
                    <div>
                      <h2 className="text-xl font-semibold text-foreground mb-2">
                        Email verified successfully!
                      </h2>
                      <p className="text-muted-foreground">
                        Your email address has been verified. You can now log in to your account.
                      </p>
                    </div>
                    <Button
                      onClick={() => navigate('/auth/login')}
                      className="w-full btn-primary"
                    >
                      Continue to Login
                    </Button>
                  </>
                )}

                {verificationStatus === 'error' && (
                  <>
                    <div className="mx-auto w-16 h-16 bg-destructive/10 rounded-full flex items-center justify-center">
                      <XCircle className="w-8 h-8 text-destructive" />
                    </div>
                    <div>
                      <h2 className="text-xl font-semibold text-foreground mb-2">
                        Verification failed
                      </h2>
                      <p className="text-muted-foreground mb-4">
                        {errorMessage}
                      </p>
                    </div>
                    
                    <Alert variant="destructive">
                      <AlertDescription>
                        The verification link may be invalid or expired. Please try logging in or request a new verification email.
                      </AlertDescription>
                    </Alert>

                    <div className="space-y-4">
                      <Button
                        onClick={() => navigate('/auth/login')}
                        className="w-full btn-primary"
                      >
                        Back to Login
                      </Button>
                      
                      <Button
                        onClick={resendVerification}
                        variant="outline"
                        className="w-full"
                      >
                        Request new verification email
                      </Button>
                    </div>
                  </>
                )}
              </div>
            )}
          </div>

          {/* Development Info */}
          {token && process.env.NODE_ENV === 'development' && (
            <div className="mt-4 p-4 bg-muted rounded-lg">
              <p className="text-xs text-muted-foreground">
                <strong>Development Info:</strong> Verification token: {token}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default VerifyEmail;
