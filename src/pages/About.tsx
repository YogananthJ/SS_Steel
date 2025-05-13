import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle, HardHat, Truck, Shield, Users, Award, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';

const About = () => {
  // Why Choose Us items data
  const benefits = [
    {
      icon: <HardHat className="w-6 h-6" />,
      title: "Extensive Product Range",
      description: "Comprehensive selection of iron and steel products for diverse industrial needs"
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Experienced Team",
      description: "20+ years of industry expertise to guide your purchasing decisions"
    },
    {
      icon: <Award className="w-6 h-6" />,
      title: "Competitive Pricing",
      description: "Best market rates without compromising on quality"
    },
    {
      icon: <Truck className="w-6 h-6" />,
      title: "Timely Delivery",
      description: "Reliable logistics to keep your projects on schedule"
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Quality Assurance",
      description: "Rigorous testing for all materials to meet industry standards"
    },
    {
      icon: <MapPin className="w-6 h-6" />,
      title: "Strategic Location",
      description: "Conveniently located in Hosur to serve Bengaluru and surrounding regions"
    }
  ];

  return (
    <div className="flex flex-col">
      {/* Hero Section with Background Image */}
      <section className="relative bg-steelblue-900 hero-gradient py-24 md:py-32">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1581092918056-0c4c3acd3789')] bg-cover bg-center opacity-20"></div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">Our Steel Story</h1>
          <p className="text-xl md:text-2xl text-steelgray-200 max-w-3xl mx-auto">
            Building trust through quality steel products and exceptional service since 2015
          </p>
        </div>
      </section>
      
      {/* Company History */}
      <section className="py-20 bg-white">
  <div className="container mx-auto px-4">
    <div className="flex flex-col lg:flex-row items-center gap-16">
      {/* Left Side - Company Info */}
      <div className="lg:w-1/2 space-y-6">
        <h2 className="text-4xl font-extrabold text-steelblue-900 leading-tight">
          Building Strength <br /> Through Steel
        </h2>
        <p className="text-steelgray-700 leading-relaxed">
          Founded in 2015, <strong>SS STEEL INDIA CORPORATION</strong> set out to redefine steel distribution in Southern India. 
          Located in Hosur, just 40 KM from Bengaluru, we have become a trusted name for construction firms, industrial clients, and exporters.
        </p>
        <p className="text-steelgray-700 leading-relaxed">
          Our experienced team blends decades of industry knowledge with a modern, customer-centric approach. 
          We've built a product portfolio tailored to the evolving demands of construction and manufacturing while upholding values of trust and integrity.
        </p>
        <div className="bg-steelblue-50 border-l-4 border-steelblue-600 p-4 rounded-md">
          <p className="text-steelblue-800 italic font-medium">
            "Our mission goes beyond supplying steel — we forge lasting partnerships that fortify both our clients' projects and our community's future."
          </p>
        </div>
        <Link to="/team">
          <Button className="flex items-center gap-2 bg-steelblue-600 hover:bg-steelblue-700">
            Meet Our Team <CheckCircle className="h-4 w-4" />
          </Button>
        </Link>
      </div>

      {/* Right Side - Timeline */}
      <div className="lg:w-1/2">
        <div className="bg-steelgray-50 rounded-xl p-8 shadow-lg">
          <h2 className="text-3xl font-bold text-steelblue-900 mb-8">Our Journey</h2>
          <div className="space-y-8">
            {/* Timeline Item */}
            {[
              {
                year: "2015",
                title: "Company Foundation",
                description:
                  "Established in Hosur with a vision to revolutionize steel distribution.",
              },
              {
                year: "2017",
                title: "First Expansion",
                description:
                  "Doubled our warehouse capacity to meet growing regional demand.",
              },
              {
                year: "2020",
                title: "Quality Certification",
                description:
                  "Achieved ISO certification for excellence in quality management systems.",
              },
              {
                year: "2023",
                title: "Digital Transformation",
                description:
                  "Launched an online ordering system for seamless customer convenience.",
              },
            ].map((item, index) => (
              <div key={index} className="flex items-start">
                <div className="bg-steelblue-100 text-steelblue-800 font-bold rounded-full w-10 h-10 flex items-center justify-center mr-5 text-lg">
                  {item.year}
                </div>
                <div>
                  <h3 className="font-semibold text-xl text-steelblue-800 mb-1">{item.title}</h3>
                  <p className="text-steelgray-700">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  </div>
</section>


      {/* Mission & Values */}
      <section className="py-16 bg-steelgray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-bold mb-6 text-steelblue-900">Our Mission</h2>
              <p className="text-steelgray-700 mb-6 leading-relaxed">
                To be the most reliable steel supplier in Southern India by combining quality products, 
                competitive pricing, and exceptional service that helps our customers build with confidence.
              </p>
              <div className="bg-white p-6 rounded-lg shadow-sm border border-steelgray-200">
                <h3 className="text-xl font-semibold mb-4 text-steelblue-800">Vision for 2030</h3>
                <p className="text-steelgray-700">
                  Expand our distribution network to cover all major cities in South India while maintaining 
                  our commitment to sustainable practices and community development.
                </p>
              </div>
            </div>
            <div>
              <h2 className="text-3xl font-bold mb-6 text-steelblue-900">Core Values</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white p-4 rounded-lg shadow-sm border border-steelgray-200">
                  <div className="flex items-center mb-2">
                    <CheckCircle className="h-5 w-5 text-steelblue-600 mr-2" />
                    <h3 className="font-semibold text-steelblue-800">Integrity</h3>
                  </div>
                  <p className="text-steelgray-700 text-sm">Honest dealings and transparent pricing</p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-sm border border-steelgray-200">
                  <div className="flex items-center mb-2">
                    <CheckCircle className="h-5 w-5 text-steelblue-600 mr-2" />
                    <h3 className="font-semibold text-steelblue-800">Quality</h3>
                  </div>
                  <p className="text-steelgray-700 text-sm">Rigorous standards for all materials</p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-sm border border-steelgray-200">
                  <div className="flex items-center mb-2">
                    <CheckCircle className="h-5 w-5 text-steelblue-600 mr-2" />
                    <h3 className="font-semibold text-steelblue-800">Innovation</h3>
                  </div>
                  <p className="text-steelgray-700 text-sm">Continuous improvement in service</p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-sm border border-steelgray-200">
                  <div className="flex items-center mb-2">
                    <CheckCircle className="h-5 w-5 text-steelblue-600 mr-2" />
                    <h3 className="font-semibold text-steelblue-800">Community</h3>
                  </div>
                  <p className="text-steelgray-700 text-sm">Supporting local development</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Why Choose Us */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-steelblue-900 mb-3">Why Partner With Us</h2>
            <p className="text-steelgray-600 max-w-2xl mx-auto">
              We go beyond supplying steel to become your trusted construction partner
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((benefit, index) => (
              <div key={index} className="group bg-steelgray-50 hover:bg-white p-6 rounded-lg border border-steelgray-200 transition-all duration-300 hover:shadow-md hover:border-steelblue-300">
                <div className="w-12 h-12 bg-steelblue-100 group-hover:bg-steelblue-600 rounded-full flex items-center justify-center mb-4 transition-all duration-300">
                  <div className="text-steelblue-600 group-hover:text-white transition-all duration-300">
                    {benefit.icon}
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-3 text-steelblue-900">{benefit.title}</h3>
                <p className="text-steelgray-700">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Call to Action */}
      <section className="py-16 bg-gradient-to-r from-steelblue-800 to-steelblue-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Build With Quality Steel?</h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto leading-relaxed">
            Our team is ready to discuss your project requirements and recommend the perfect steel solutions.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/contact">
              <Button className="bg-steelred-500 hover:bg-steelred-600 text-white px-8 py-3 text-lg font-medium rounded-lg shadow-lg">
                Get a Custom Quote
              </Button>
            </Link>
            <a href="tel:+916382085337">
              <Button variant="outline" className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-steelblue-800 px-8 py-3 text-lg font-medium rounded-lg">
                Call Our Experts
              </Button>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;