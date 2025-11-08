import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/navbar/Navbar';
import { AuthProvider } from './context/AuthContext';
import Footer from './components/Footer';
import Home from './pages/Home';
import Pricing from './pages/Pricing';
import Dashboard from './pages/Dashboard';
import Admin from './pages/Admin';
import GetQuote from './pages/GetQuote';
import ChooseMovers from './pages/ChooseMovers';
import QuoteSuccess from './pages/QuoteSuccess';
import QuotesDashboard from './pages/QuotesDashboard';
import RegisterMover from './pages/RegisterMover';
import SignInMover from './pages/SignInMover';
import RegistrationSuccess from './pages/RegistrationSuccess';
import UserDashboard from './pages/UserDashboard';
import TruckerProfile from './pages/TruckerProfile';
import MoverDetails from './pages/MoverDetails';
import MovingTips from './pages/MovingTips';
import PricingPlans from './pages/PricingPlans';
import SuccessStories from './pages/SuccessStories';
import Resources from './pages/Resources';
import About from './pages/About';
import Contact from './pages/Contact';
import Privacy from './pages/Privacy';
import Terms from './pages/Terms';
import SignInUser from './pages/SignInUser';

function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="min-h-screen flex flex-col">
          <Navbar />
          <main className="flex-grow">
            <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/quote" element={<GetQuote />} />
            <Route path="/choose-movers" element={<ChooseMovers />} />
            <Route path="/quote-success" element={<QuoteSuccess />} />
            <Route path="/quotes" element={<QuotesDashboard />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/register" element={<RegisterMover />} />
            <Route path="/signin-mover" element={<SignInMover />} />
            <Route path="/registration-success" element={<RegistrationSuccess />} />
            <Route path="/user" element={<UserDashboard />} />
            <Route path="/movers/:slug" element={<MoverDetails />} />
            <Route path="/truckers/:id" element={<TruckerProfile />} />
            <Route path="/moving-tips" element={<MovingTips />} />
            <Route path="/pricing-plans" element={<PricingPlans />} />
            <Route path="/success-stories" element={<SuccessStories />} />
            <Route path="/resources" element={<Resources />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/signin-user" element={<SignInUser />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;
