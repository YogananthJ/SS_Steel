import React, { useState } from 'react';
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
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import { Phone, Mail, MapPin, Clock, Loader2 } from 'lucide-react';

// Enhanced validation schema
const formSchema = z.object({
  name: z.string()
    .min(2, { message: 'Name must be at least 2 characters' })
    .max(50, { message: 'Name cannot exceed 50 characters' })
    .regex(/^[a-zA-Z\s]+$/, { message: 'Name can only contain letters and spaces' }),
  address: z.string()
    .min(10, { message: 'Address must be at least 10 characters' })
    .max(200, { message: 'Address cannot exceed 200 characters' }),
  mobile: z.string()
    .regex(/^[6-9]\d{9}$/, { message: 'Enter a valid 10-digit Indian mobile number' }),
  email: z.string()
    .email({ message: 'Enter a valid email address' })
    .max(100, { message: 'Email cannot exceed 100 characters' }),
  subject: z.string()
    .min(5, { message: 'Subject must be at least 5 characters' })
    .max(100, { message: 'Subject cannot exceed 100 characters' }),
  enquiry: z.string()
    .min(20, { message: 'Enquiry must be at least 20 characters' })
    .max(1000, { message: 'Enquiry cannot exceed 1000 characters' }),
});

type FormValues = z.infer<typeof formSchema>;

const Enquiry = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      address: '',
      mobile: '',
      email: '',
      subject: '',
      enquiry: '',
    },
    mode: 'onChange', // Validate on change for better UX
  });

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);
    
    try {
      // Simulate API call with a delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      console.log('Form submitted:', data);
      
      toast.success('Enquiry submitted successfully!', {
        description: 'Our sales team will contact you within 24 hours.',
        action: {
          label: 'Close',
          onClick: () => {},
        },
      });
      
      form.reset();
    } catch (error) {
      console.error('Submission error:', error);
      toast.error('Failed to submit enquiry', {
        description: 'Please try again or contact us directly.',
        action: {
          label: 'Retry',
          onClick: () => onSubmit(data),
        },
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-steelblue-800 to-steelblue-600 py-20">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1581092918056-0c4c3acd3789')] bg-cover bg-center opacity-10"></div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">Product Enquiry</h1>
          <p className="text-xl text-steelgray-200 max-w-3xl mx-auto">
            Get pricing, specifications, and availability for our steel products
          </p>
        </div>
      </section>
      
      {/* Enquiry Form Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Form Column */}
            <div className="lg:w-2/3">
              <div className="bg-white p-8 rounded-xl shadow-lg border border-steelgray-200">
                <h2 className="text-2xl font-bold mb-6 text-steelblue-900">Enquiry Form</h2>
                
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="font-medium">Full Name*</FormLabel>
                            <FormControl>
                              <Input 
                                placeholder="John Doe" 
                                {...field} 
                                className="form-input focus:ring-2 focus:ring-steelblue-500"
                              />
                            </FormControl>
                            <FormMessage className="text-steelred-500 text-sm" />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="font-medium">Email*</FormLabel>
                            <FormControl>
                              <Input 
                                placeholder="john@example.com" 
                                {...field} 
                                className="form-input focus:ring-2 focus:ring-steelblue-500"
                              />
                            </FormControl>
                            <FormMessage className="text-steelred-500 text-sm" />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="mobile"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="font-medium">Mobile Number*</FormLabel>
                            <FormControl>
                              <Input 
                                placeholder="9876543210" 
                                {...field} 
                                className="form-input focus:ring-2 focus:ring-steelblue-500"
                              />
                            </FormControl>
                            <FormMessage className="text-steelred-500 text-sm" />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="subject"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="font-medium">Subject*</FormLabel>
                            <FormControl>
                              <Input 
                                placeholder="Product inquiry about..." 
                                {...field} 
                                className="form-input focus:ring-2 focus:ring-steelblue-500"
                              />
                            </FormControl>
                            <FormMessage className="text-steelred-500 text-sm" />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <FormField
                      control={form.control}
                      name="address"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="font-medium">Complete Address*</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="Street, City, State, Pincode" 
                              {...field} 
                              className="form-input focus:ring-2 focus:ring-steelblue-500"
                            />
                          </FormControl>
                          <FormMessage className="text-steelred-500 text-sm" />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="enquiry"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="font-medium">Enquiry Details*</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Please include product names, quantities, and any specific requirements..."
                              className="form-input min-h-[150px] focus:ring-2 focus:ring-steelblue-500"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage className="text-steelred-500 text-sm" />
                        </FormItem>
                      )}
                    />
                    
                    <Button 
                      type="submit" 
                      className="w-full bg-steelblue-600 hover:bg-steelblue-700 text-lg py-6 px-8 rounded-lg transition-all duration-300"
                      disabled={isSubmitting || !form.formState.isValid}
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                          Submitting...
                        </>
                      ) : (
                        'Submit Enquiry'
                      )}
                    </Button>
                  </form>
                </Form>
              </div>
            </div>
            
            {/* Contact Info Column */}
            <div className="lg:w-1/3">
              <div className="bg-steelblue-50 p-8 rounded-xl h-full">
                <h3 className="text-xl font-bold mb-6 text-steelblue-900">Contact Information</h3>
                
                <div className="space-y-6">
                  <div className="flex items-start">
                    <div className="bg-steelblue-100 p-2 rounded-full mr-4">
                      <MapPin className="h-5 w-5 text-steelblue-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-steelblue-800">Our Address</h4>
                      <p className="text-steelgray-700 mt-1">
                        756/6-B, Opp Anand Electronics,<br />
                        Krishnagiri Main Road,<br />
                        Hosur, Tamil Nadu - 635109
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-steelblue-100 p-2 rounded-full mr-4">
                      <Phone className="h-5 w-5 text-steelblue-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-steelblue-800">Phone Numbers</h4>
                      <p className="text-steelgray-700 mt-1">
                        +91 63820 85337<br />
                        +91 87540 10925
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-steelblue-100 p-2 rounded-full mr-4">
                      <Mail className="h-5 w-5 text-steelblue-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-steelblue-800">Email</h4>
                      <p className="text-steelgray-700 mt-1">
                        <a href="mailto:sales@sssteelindia.com" className="text-steelblue-600 hover:underline">
                          sales@sssteelindia.com
                        </a>
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-steelblue-100 p-2 rounded-full mr-4">
                      <Clock className="h-5 w-5 text-steelblue-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-steelblue-800">Business Hours</h4>
                      <p className="text-steelgray-700 mt-1">
                        Monday - Saturday: 9:00 AM - 7:00 PM<br />
                        Sunday: Closed
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Enquiry;