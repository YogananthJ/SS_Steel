import React from 'react';
import { MapPin, Phone, Mail, Clock, ArrowRight, HardHat, Truck } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const Contact = () => {
  // Google Maps embed URL (replace with your actual location)
  const mapEmbedUrl = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3886.008476108327!2d77.8292143153465!3d12.972390990822915!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae0c9e6373097d%3A0x8a3e8a1b9e3e3e3e!2sSS%20Steel%20India%20Corporation!5e0!3m2!1sen!2sin!4v1620000000000!5m2!1sen!2sin";

  const contactMethods = [
    {
      icon: <MapPin className="h-6 w-6 text-steelblue-600" />,
      title: "Address",
      content: "756/6-B, Opp Anand Electronics, Krishnagiri Main Road, Hosur, Tamil Nadu - 635109",
      subcontent: "(40 KM from Bengaluru)"
    },
    {
      icon: <Phone className="h-6 w-6 text-steelblue-600" />,
      title: "Phone",
      content: "+91 63820 85337",
      subcontent: "+91 87540 10925"
    },
    {
      icon: <Mail className="h-6 w-6 text-steelblue-600" />,
      title: "Email",
      content: "sales@sssteelindia.com",
      isLink: true
    },
    {
      icon: <Clock className="h-6 w-6 text-steelblue-600" />,
      title: "Business Hours",
      content: "Monday to Saturday",
      subcontent: "9:00 AM – 7:00 PM"
    }
  ];

  const teamMembers = [
    {
      name: "Sales Team",
      role: "Product Inquiries & Orders",
      icon: <HardHat className="h-5 w-5" />
    },
    {
      name: "Logistics",
      role: "Delivery & Shipping",
      icon: <Truck className="h-5 w-5" />
    }
  ];

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-steelblue-800 to-steelblue-600 py-20">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1581092918056-0c4c3acd3789')] bg-cover bg-center opacity-10"></div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">Contact Our Steel Experts</h1>
          <p className="text-xl text-steelgray-200 max-w-3xl mx-auto">
            Get personalized assistance for your steel requirements from our experienced team
          </p>
        </div>
      </section>
      
      {/* Contact Information */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Contact Details */}
            <div className="lg:col-span-1">
              <div className="bg-steelblue-50 p-8 rounded-xl shadow-sm">
                <h2 className="text-2xl font-bold mb-6 text-steelblue-900">Contact Information</h2>
                
                <div className="space-y-6">
                  {contactMethods.map((method, index) => (
                    <div key={index} className="flex items-start">
                      <div className="bg-white p-2 rounded-lg shadow-sm mr-4">
                        {method.icon}
                      </div>
                      <div>
                        <h3 className="font-semibold text-steelblue-800 mb-1">{method.title}</h3>
                        {method.isLink ? (
                          <a 
                            href={`mailto:${method.content}`} 
                            className="text-steelblue-600 hover:underline"
                          >
                            {method.content}
                          </a>
                        ) : (
                          <>
                            <p className="text-steelgray-700">{method.content}</p>
                            {method.subcontent && (
                              <p className="text-steelgray-700">{method.subcontent}</p>
                            )}
                          </>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="mt-8 pt-6 border-t border-steelgray-200">
                  <h3 className="font-semibold text-steelblue-800 mb-3">Website</h3>
                  <a 
                    href="http://www.sssteelindia.com" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-steelblue-600 hover:underline"
                  >
                    www.sssteelindia.com
                  </a>
                </div>
                
                <div className="mt-8">
                  <h3 className="font-semibold text-steelblue-800 mb-3">Contact Teams</h3>
                  <div className="space-y-3">
                    {teamMembers.map((member, index) => (
                      <div key={index} className="flex items-center bg-steelblue-100/50 p-3 rounded-lg">
                        <div className="bg-steelblue-100 p-2 rounded-full mr-3">
                          {member.icon}
                        </div>
                        <div>
                          <h4 className="font-medium text-steelblue-900">{member.name}</h4>
                          <p className="text-sm text-steelgray-600">{member.role}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="mt-8">
                  <Link to="/enquiry">
                    <Button className="w-full bg-steelblue-600 hover:bg-steelblue-700">
                      <span>Send Enquiry</span>
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
            
            {/* Google Map Embed */}
            <div className="lg:col-span-2">
              <div className="h-full rounded-xl overflow-hidden shadow-lg border border-steelgray-200">
                <iframe
                  src={mapEmbedUrl}
                  width="100%"
                  height="100%"
                  style={{ minHeight: '500px' }}
                  loading="lazy"
                  allowFullScreen
                  title="SS Steel India Corporation Location"
                  className="border-0"
                ></iframe>
                <div className="bg-white p-4 border-t border-steelgray-200">
                  <p className="text-steelgray-700 text-sm">
                    <strong>Directions:</strong> Our facility is conveniently located on Krishnagiri Main Road, 
                    opposite to Anand Electronics, with ample parking space available.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Call to Action */}
      <section className="py-16 bg-gradient-to-r from-steelblue-50 to-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4 text-steelblue-900">How Can We Help You?</h2>
          <p className="text-steelgray-700 mb-8 max-w-2xl mx-auto">
            Whether you need product specifications, pricing, or delivery information, our team is ready to assist.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/products">
              <Button className="bg-steelblue-600 hover:bg-steelblue-700 px-8 py-4 text-lg">
                Browse Product Catalog
              </Button>
            </Link>
            <a href="tel:+916382085337">
              <Button variant="outline" className="border-steelblue-600 text-steelblue-600 hover:bg-steelblue-50 px-8 py-4 text-lg">
                Call Now: +91 63820 85337
              </Button>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;