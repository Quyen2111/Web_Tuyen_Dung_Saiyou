import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import JobsPage from './pages/JobsPage';
import ResumePage from './pages/ResumePage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import AuthForm from './components/AuthForm';
import JobDetailPage from './pages/JobDetailPage';
import EmployerService from './pages/EmployerService';
import PostJob from './pages/PostJob';
import EmployerJob from './pages/EmployerJob';
import EmployerContact from './pages/EmployerContact';
import ManagerPostJob from './pages/ManagerPostJob';
import CandidateDetailPage from './pages/CandidateDetailPage';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gray-50 flex flex-col">
          <Header />
          <main className="flex-1">
            <Routes>
              {/* Route công khai */}
              <Route path="/" element={<HomePage />} />
              <Route path="/jobs" element={<JobsPage />} />
              <Route path="/jobs/industry/:industry" element={<JobsPage />} />
              <Route path="/jobs/location/:location" element={<JobsPage />} />
              <Route path="/job/:jobId" element={<JobDetailPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/jobseeker/login" element={<AuthForm />} />
              <Route path="/jobseeker/register" element={<AuthForm />} />
              
              <Route path="/employer/login" element={<AuthForm />} />
              <Route path="/employer/register" element={<AuthForm />} />
              <Route path="/employer/contact" element={<EmployerContact />} />
              <Route path="/employer/*" element={<EmployerService />} />

              {/* Route bảo vệ cho jobseeker */}
              <Route element={<ProtectedRoute allowedUserType="jobseeker" />}>
                <Route path="/resume" element={<ResumePage />} />
              </Route>

              {/* Route bảo vệ cho employer */}
              <Route element={<ProtectedRoute allowedUserType="employer" />}>
                <Route path="/employer/post-job" element={<PostJob />} />
                <Route path="/employer/jobs" element={<EmployerJob />} />
                <Route path="/employer/jobs/:candidateId" element={<CandidateDetailPage />} />
                <Route path="/employer/services" element={<ManagerPostJob />} />                
              </Route>

              {/* Route 404 */}
              <Route path="*" element={<div className="text-center py-10 text-xl text-gray-600">404 - Trang không tìm thấy</div>} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;