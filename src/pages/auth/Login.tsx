import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/hooks/useAuth';
import { Loader2, Eye, EyeOff, Lock, Mail } from 'lucide-react';
import { toast } from 'sonner';

// Enhanced password validation schema
const passwordSchema = z.string()
  .min(8, { message: 'Password must be at least 8 characters' })
  .regex(/[A-Z]/, { message: 'Must contain at least one uppercase letter' })
  .regex(/[a-z]/, { message: 'Must contain at least one lowercase letter' })
  .regex(/[0-9]/, { message: 'Must contain at least one number' })
  .regex(/[^A-Za-z0-9]/, { message: 'Must contain at least one special character' });

const formSchema = z.object({
  email: z.string()
    .email({ message: 'Please enter a valid email address' })
    .max(100, { message: 'Email cannot exceed 100 characters' }),
  password: passwordSchema,
});

type FormValues = z.infer<typeof formSchema>;

const Login = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loginAttempts, setLoginAttempts] = useState(0);
  const { loginAndRedirect } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  
  // Get redirect path from query params if available
  const searchParams = new URLSearchParams(location.search);
  const redirectPath = searchParams.get('redirect') || '/';

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
    mode: 'onChange',
  });

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);
    try {
      await loginAndRedirect(data.email, data.password, redirectPath);
      setLoginAttempts(0); // Reset attempts on successful login
    } catch (error) {
      setLoginAttempts(prev => prev + 1);
      if (loginAttempts >= 2) {
        toast.error('Account Locked', {
          description: 'Too many failed attempts. Please try again later or reset your password.',
          duration: 5000,
        });
      } else {
        toast.error('Login Failed', {
          description: 'Invalid email or password. Please try again.',
          action: {
            label: 'Forgot Password?',
            onClick: () => navigate('/forgot-password'),
          },
        });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  // Demo account convenience function with security warning
  const loginAsDemo = async (type: 'admin' | 'customer') => {
    setIsSubmitting(true);
    try {
      toast.warning('Demo Account Active', {
        description: 'You are using a demo account with limited access.',
        duration: 3000,
      });
      
      if (type === 'admin') {
        await loginAndRedirect('admin@sssteelindia.com', 'Demo@1234', '/admin/dashboard');
      } else {
        await loginAndRedirect('customer@example.com', 'Demo@1234', redirectPath);
      }
    } catch (error) {
      toast.error('Demo Login Failed');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-steelblue-50 to-steelgray-100 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow-lg rounded-lg sm:px-10 border border-steelgray-200">
          <div className="text-center mb-8">
            <div className="mx-auto h-12 w-12 bg-steelblue-100 rounded-full flex items-center justify-center mb-4">
              <Lock className="h-6 w-6 text-steelblue-600" />
            </div>
            <h2 className="text-3xl font-bold text-steelblue-900">Sign in to your account</h2>
            <p className="mt-2 text-sm text-steelgray-600">
              Or{' '}
              <Link 
                to="/register" 
                className="font-medium text-steelblue-600 hover:text-steelblue-500"
              >
                register for a new account
              </Link>
            </p>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="block text-sm font-medium text-steelgray-700">
                      Email address
                    </FormLabel>
                    <div className="mt-1 relative rounded-md shadow-sm">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Mail className="h-5 w-5 text-steelgray-400" />
                      </div>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="you@example.com"
                          className="block w-full pl-10 form-input focus:ring-steelblue-500 focus:border-steelblue-500"
                          {...field}
                        />
                      </FormControl>
                    </div>
                    <FormMessage className="text-steelred-500 text-sm" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex justify-between items-center">
                      <FormLabel className="block text-sm font-medium text-steelgray-700">
                        Password
                      </FormLabel>
                      <Link
                        to="/forgot-password"
                        className="text-sm text-steelblue-600 hover:text-steelblue-500"
                      >
                        Forgot password?
                      </Link>
                    </div>
                    <div className="mt-1 relative rounded-md shadow-sm">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Lock className="h-5 w-5 text-steelgray-400" />
                      </div>
                      <FormControl>
                        <Input
                          type={showPassword ? 'text' : 'password'}
                          placeholder="••••••••"
                          className="block w-full pl-10 form-input focus:ring-steelblue-500 focus:border-steelblue-500"
                          {...field}
                        />
                      </FormControl>
                      <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                        <button
                          type="button"
                          className="text-steelgray-400 hover:text-steelgray-500"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? (
                            <EyeOff className="h-5 w-5" />
                          ) : (
                            <Eye className="h-5 w-5" />
                          )}
                        </button>
                      </div>
                    </div>
                    <FormMessage className="text-steelred-500 text-sm" />
                  </FormItem>
                )}
              />

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 text-steelblue-600 focus:ring-steelblue-500 border-steelgray-300 rounded"
                  />
                  <label htmlFor="remember-me" className="ml-2 block text-sm text-steelgray-700">
                    Remember me
                  </label>
                </div>
              </div>

              <div>
                <Button
                  type="submit"
                  className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-steelblue-600 hover:bg-steelblue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-steelblue-500"
                  disabled={isSubmitting || loginAttempts >= 3}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Signing in...
                    </>
                  ) : (
                    'Sign in'
                  )}
                </Button>
              </div>
            </form>
          </Form>

          {/* Demo accounts section - for development/testing only */}
          {process.env.NODE_ENV === 'development' && (
            <div className="mt-8 pt-6 border-t border-steelgray-200">
              <p className="text-center text-sm text-steelgray-500 mb-3">
                Development demo accounts
              </p>
              <div className="grid grid-cols-2 gap-3">
                <Button
                  variant="outline"
                  onClick={() => loginAsDemo('customer')}
                  disabled={isSubmitting}
                  className="text-xs"
                >
                  Customer Demo
                </Button>
                <Button
                  variant="outline"
                  onClick={() => loginAsDemo('admin')}
                  disabled={isSubmitting}
                  className="text-xs"
                >
                  Admin Demo
                </Button>
              </div>
              <p className="text-center text-xs text-steelgray-400 mt-2">
                These accounts are disabled in production
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;