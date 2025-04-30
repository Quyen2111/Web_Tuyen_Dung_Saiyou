import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import JobsPage from './pages/JobsPage';
import ResumePage from './pages/ResumePage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import AuthForm from './components/AuthForm';
import EmployerPage from './pages/EmployerPage';
import JobDetailPage from './pages/JobDetailPage';
import EmployerService from './pages/EmployerService';
import PostJob from './pages/PostJob';
import EmployerJob from './pages/EmployerJob';
import EmployerContact from './pages/EmployerContact';


function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Header />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/jobs" element={<JobsPage />} />
            <Route path="/jobs/industry/:industry" element={<JobsPage />} />
            <Route path="/jobs/location/:location" element={<JobsPage />} />
            <Route path="/job/:jobId" element={<JobDetailPage />} />
            <Route path="/resume" element={<ResumePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/jobseeker/login" element={<AuthForm />} />
            <Route path="/jobseeker/register" element={<AuthForm />} />
            <Route path="/employer/login" element={<AuthForm />} />
            <Route path="/employer/register" element={<AuthForm />} />
            <Route path="/employer/services" element={<EmployerService />} />
            <Route path="/employer/post-job" element={<PostJob />} />
            <Route path="/employer/jobs" element={<EmployerJob />} />
            <Route path="/employer/contact" element={<EmployerContact />} />
            <Route path="/employer/*" element={<EmployerPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;