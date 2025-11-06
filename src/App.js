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
            <Route path="/truckers/:id" element={<TruckerProfile />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;
