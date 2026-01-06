import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Activity, Shield, Zap, BarChart3, ArrowRight, CheckCircle2 } from 'lucide-react';

const Index = () => {
  const features = [
    {
      icon: Zap,
      title: 'Instant Analysis',
      description: 'Get pneumonia detection results in seconds with our advanced AI model',
    },
    {
      icon: Shield,
      title: 'Secure & Private',
      description: 'Your medical data is encrypted and never shared with third parties',
    },
    {
      icon: BarChart3,
      title: 'High Accuracy',
      description: 'Trained on thousands of X-ray images for reliable predictions',
    },
  ];

  const benefits = [
    'AI-powered pneumonia detection',
    'Real-time confidence scores',
    'Complete prediction history',
    'Secure image storage',
    'Professional reports',
    '24/7 availability',
  ];

  return (
    <div className="min-h-screen gradient-hero">
      {/* Navigation */}
      <nav className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl gradient-primary flex items-center justify-center shadow-glow">
              <Activity className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold text-foreground">XRayIQ</span>
          </div>
          <div className="flex items-center gap-3">
            <Link to="/login">
              <Button variant="ghost" size="sm">
                Sign In
              </Button>
            </Link>
            <Link to="/register">
              <Button variant="gradient" size="sm">
                Get Started
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 lg:py-24">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="animate-fade-in-up">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-6">
              <Zap className="h-3.5 w-3.5" />
              Fast and Accurate Chest X-Ray Insights
            </div>
            <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold text-foreground leading-tight mb-6">
              Detect Pneumonia{' '}
              <span className="text-gradient">Instantly</span>{' '}
              with AI
            </h1>
            <p className="text-lg text-muted-foreground mb-8 max-w-lg">
              Upload chest X-ray images and get accurate pneumonia detection results
              powered by state-of-the-art deep learning technology.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/register">
                <Button variant="gradient" size="xl" className="w-full sm:w-auto">
                  Start Free Analysis
                  <ArrowRight className="h-5 w-5" />
                </Button>
              </Link>
              <Link to="/login">
                <Button variant="outline" size="xl" className="w-full sm:w-auto">
                  Sign In
                </Button>
              </Link>
            </div>

            <div className="mt-10 pt-8 border-t border-border">
              <p className="text-sm text-muted-foreground mb-4">Trusted by healthcare professionals</p>
              <div className="flex items-center gap-6">
                <div className="text-center">
                  <p className="text-2xl font-bold text-foreground">98%</p>
                  <p className="text-xs text-muted-foreground">Accuracy Rate</p>
                </div>
                <div className="h-10 w-px bg-border" />
                <div className="text-center">
                  <p className="text-2xl font-bold text-foreground">50K+</p>
                  <p className="text-xs text-muted-foreground">Scans Analyzed</p>
                </div>
                <div className="h-10 w-px bg-border" />
                <div className="text-center">
                  <p className="text-2xl font-bold text-foreground">&lt;2s</p>
                  <p className="text-xs text-muted-foreground">Analysis Time</p>
                </div>
              </div>
            </div>
          </div>

          <div className="relative animate-fade-in delay-200">
            <div className="absolute inset-0 gradient-primary rounded-3xl blur-3xl opacity-20" />
            <div className="relative card-elevated p-8 rounded-3xl">
              <div className="flex items-center gap-3 mb-6">
                <div className="h-12 w-12 rounded-xl gradient-primary flex items-center justify-center">
                  <Activity className="h-6 w-6 text-primary-foreground" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">Analysis Result</h3>
                  <p className="text-sm text-muted-foreground">Sample prediction</p>
                </div>
              </div>

              <div className="aspect-video rounded-xl bg-muted/50 border border-border mb-6 flex items-center justify-center">
                <div className="text-center">
                  <div className="h-16 w-16 rounded-2xl bg-muted flex items-center justify-center mx-auto mb-3">
                    <Activity className="h-8 w-8 text-muted-foreground" />
                  </div>
                  <p className="text-sm text-muted-foreground">X-ray Preview</p>
                </div>
              </div>

              <div className="flex items-center justify-between p-4 rounded-xl bg-success/10 border border-success/20">
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="h-6 w-6 text-success" />
                  <div>
                    <p className="font-semibold text-success">Normal</p>
                    <p className="text-xs text-muted-foreground">No pneumonia detected</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-xl font-bold text-success">94.2%</p>
                  <p className="text-xs text-muted-foreground">Confidence</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-3xl font-bold text-foreground mb-4">
            Why Choose PneumoScan?
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Our AI-powered platform provides fast, accurate, and secure pneumonia
            detection to support healthcare professionals.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="card-elevated p-6 text-center animate-fade-in-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="h-14 w-14 rounded-2xl gradient-primary flex items-center justify-center mx-auto mb-4 shadow-glow">
                <feature.icon className="h-7 w-7 text-primary-foreground" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">
                {feature.title}
              </h3>
              <p className="text-muted-foreground text-sm">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Benefits Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="card-elevated p-8 lg:p-12 rounded-3xl gradient-card">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div className="animate-fade-in">
              <h2 className="text-3xl font-bold text-foreground mb-4">
                Everything you need for medical imaging analysis
              </h2>
              <p className="text-muted-foreground mb-8">
                XRayIQ provides a comprehensive suite of tools to help healthcare
                professionals make informed decisions quickly and accurately.
              </p>
              <div className="grid grid-cols-2 gap-3">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-success flex-shrink-0" />
                    <span className="text-sm text-foreground">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-center animate-fade-in delay-200">
              <Link to="/register">
                <Button variant="gradient" size="xl">
                  Get Started Free
                  <ArrowRight className="h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="container mx-auto px-4 py-8 border-t border-border">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg gradient-primary flex items-center justify-center">
              <Activity className="h-4 w-4 text-primary-foreground" />
            </div>
            <span className="font-semibold text-foreground">XRayIQ</span>
          </div>
          <p className="text-sm text-muted-foreground">
            © 2026 XRayIQ. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
