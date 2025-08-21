import { UniFlowLogo } from "@/components/ui/uniflow-logo";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="min-h-screen bg-background selection-primary">
      {/* Navigation */}
      <nav className="glass-nav">
        <div className="container-center py-4 flex justify-between items-center">
          <UniFlowLogo size="md" animated />
          <div className="flex gap-4">
            <Link to="/auth/login" className="btn-ghost">Sign In</Link>
            <Link to="/auth/register" className="btn-primary">Get Started</Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="pt-32 pb-20">
        <div className="container-narrow text-center">
          <div className="animate-fade-in-up">
            <UniFlowLogo size="2xl" className="mb-8" animated />
          </div>
          
          <div className="animate-fade-in-up delay-200">
            <h2 className="text-2xl md:text-4xl font-semibold text-foreground mb-6 leading-tight">
              Unify your digital life in one seamless flow
            </h2>
          </div>
          
          <div className="animate-fade-in-up delay-300">
            <p className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto leading-relaxed">
              The productivity platform designed for modern professionals. Everything you need, nothing you don't.
            </p>
          </div>
          
          <div className="animate-fade-in-up delay-400">
            <Link to="/auth/register" className="btn-primary text-lg px-10 py-5 mb-4 hover-glow inline-block">
              Get Started Free
            </Link>
            <p className="text-sm text-muted-foreground">No credit card required</p>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-20 bg-background-soft">
        <div className="container-center">
          <div className="text-center mb-16 animate-fade-in-up delay-500">
            <h3 className="text-4xl font-bold text-foreground mb-4">
              Built for <span className="text-gradient-flow">productivity</span>
            </h3>
            <p className="text-xl text-muted-foreground">
              Coming features designed to transform how you work
            </p>
          </div>
          
          {/* Bento Grid */}
          <div className="bento-grid">
            {/* Large card - Notes */}
            <div className="bento-large card-bento animate-fade-in-up delay-200 hover-lift">
              <div>
                <h4 className="text-3xl font-bold text-foreground mb-4">Smart Notes</h4>
                <p className="text-lg text-muted-foreground">
                  Rich text editing with markdown support, tags, and powerful search. Your thoughts, organized.
                </p>
              </div>
              <div className="status-coming-soon">Coming in Phase 3</div>
            </div>
            
            {/* Tall card - Calendar */}
            <div className="bento-small bg-gradient-to-br from-flow-blue to-flow-blue-light rounded-2xl p-8 min-h-80 text-white flex flex-col justify-between animate-fade-in-up delay-300 hover-lift">
              <div>
                <h4 className="text-2xl font-bold mb-4">Calendar & Tasks</h4>
                <p className="text-flow-blue-light/90">
                  Daily planning with smart scheduling and priority management.
                </p>
              </div>
              <div className="text-sm text-flow-blue-light/80 font-medium">Coming in Phase 2</div>
            </div>
            
            {/* Wide card - Integrations */}
            <div className="bento-wide card-bento animate-fade-in-up delay-400 hover-lift">
              <div>
                <h4 className="text-2xl font-bold text-foreground mb-4">App Integrations</h4>
                <p className="text-muted-foreground">
                  Connect MyFitnessPal, Strava, and more. All your data in one place.
                </p>
              </div>
              <div className="status-coming-soon">Coming in Phase 4</div>
            </div>
            
            {/* Small card - Authentication (current) */}
            <div className="bento-tall bg-gradient-to-br from-uni-red to-red-600 rounded-2xl p-8 text-white flex flex-col justify-between animate-fade-in-up delay-500 hover-lift">
              <div>
                <h4 className="text-2xl font-bold mb-4">Secure Access</h4>
                <p className="text-red-100">
                  Your account, protected. Sign up and start your journey.
                </p>
              </div>
              <div className="text-sm text-red-200 font-medium">Available Now ✓</div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-20">
        <div className="container-narrow text-center">
          <div className="animate-fade-in-up delay-600">
            <h3 className="text-3xl font-bold text-foreground mb-6">
              Ready to start your <span className="text-gradient-uni">productivity</span> journey?
            </h3>
            <Link to="/auth/register" className="btn-primary text-lg px-8 py-4 hover-glow inline-block">
              Join UniFlow Today
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
