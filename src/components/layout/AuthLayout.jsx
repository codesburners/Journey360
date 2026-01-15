import Navbar from "./Navbar";
import heroImage from "../../assets/images/hero-image.png";

export default function AuthLayout({ children }) {
  return (
    <div className="min-h-screen flex flex-col">

      <main className="flex flex-1">
        {/* Left Image Section */}
        <div className="hidden lg:flex w-1/2 relative">
          <img
            src={heroImage}
            alt="Travel"
            className="absolute inset-0 h-full w-full object-cover "
          />
          <div className="absolute inset-0 bg-black/30" />

          <div className="relative z-10 p-14 text-white flex flex-col justify-end">
            <h1 className="text-4xl font-bold leading-tight">
              Your journey, perfected <br /> by AI.
            </h1>
            <p className="mt-4 max-w-md text-sm text-white/90">
              Join thousands of travelers using Journey360 to navigate the world
              with real-time safety insights and personalized AI itineraries.
            </p>
          </div>
        </div>

        {/* Right Form Section */}
        <div className="w-full lg:w-1/2 flex items-center justify-center bg-gray-50">
          {children}
        </div>
      </main>

      {/* Footer */}
      <footer className="text-xs text-gray-500 py-4 px-10 flex justify-between">
        <span>© 2024 Journey360 AI. All rights reserved.</span>
        <div className="flex gap-6">
          <a href="#">Privacy Policy</a>
          <a href="#">Terms of Service</a>
          <a href="#">Contact Support</a>
        </div>
      </footer>
    </div>
  );
}
