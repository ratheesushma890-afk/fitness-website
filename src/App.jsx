import React from "react";

import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";

/* =========================================================
   MAIN WEBSITE COMPONENTS
========================================================= */

import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import ScrollToTop from "./components/ScrollToTop.jsx";

/* =========================================================
   MAIN WEBSITE PAGES
========================================================= */

import Home from "./Pages/Home.jsx";

import Login from "./pages/Login.jsx";
import Join from "./pages/Join.jsx";
import About from "./pages/About.jsx";
import Classes from "./pages/Classes.jsx";
import Trainers from "./pages/Trainers.jsx";
import TrainerDetail from "./pages/TrainerDetail.jsx";
import Membership from "./pages/Membership.jsx";
import Contact from "./pages/Contact.jsx";
import PrivacyPolicy from "./pages/PrivacyPolicy.jsx";
import TermsConditions from "./pages/TermsConditions.jsx";
import ClassDetail from "./pages/ClassDetail.jsx";
import Payment from "./pages/Payment.jsx";
import MembershipSuccess from "./pages/MembershipSuccess.jsx";

/* =========================================================
   ADMIN PAGES
========================================================= */

import AdminLogin from "./admin/AdminLogin.jsx";
import AdminDashboard from "./admin/AdminDashboard.jsx";
import AdminMembers from "./admin/AdminMembers.jsx";
import AdminMemberships from "./admin/AdminMemberships.jsx";
import AdminClasses from "./admin/AdminClasses.jsx";
import AdminTrainers from "./admin/AdminTrainers.jsx";
import AdminPayments from "./admin/AdminPayments.jsx";
import AdminGallery from "./admin/AdminGallery.jsx";
import AdminMessages from "./admin/AdminMessages.jsx";
import AdminSettings from "./admin/AdminSettings.jsx";

import ManagerDashboard from "./admin/ManagerDashboard.jsx";
import ManagerMembers from "./admin/ManagerMembers.jsx";
import ManagerMemberships from "./admin/ManagerMemberships.jsx";
import ManagerClasses from "./admin/ManagerClasses.jsx";
import ManagerTrainers from "./admin/ManagerTrainers.jsx";
import ManagerMessages from "./admin/ManagerMessages.jsx";
import UserDashboard from "./user/UserDashboard.jsx";
import UserProfile from "./user/UserProfile.jsx";
import MyMembership from "./user/MyMembership.jsx";
import MyClasses from "./user/MyClasses.jsx";

/* =========================================================
   CSS
========================================================= */

import "./App.css";


/* =========================================================
   APP CONTENT
========================================================= */

const AppContent = () => {
  const location = useLocation();

  /* =======================================================
     HIDE WEBSITE NAVBAR + FOOTER

  ======================================================= */

  const hideLayout =
    location.pathname === "/login" ||
    location.pathname === "/join" ||
    location.pathname.startsWith("/admin");


  return (
    <div className="app">

      {/* ===================================================
          SCROLL TO TOP
      =================================================== */}

      <ScrollToTop />


      {/* ===================================================
          WEBSITE NAVBAR

          Admin pages par navbar nahi dikhega
      =================================================== */}

      {!hideLayout && <Navbar />}


      {/* ===================================================
          MAIN CONTENT
      =================================================== */}

      <main className="app-main">

        <Routes>

          {/* =================================================
              HOME
          ================================================= */}

          <Route
            path="/"
            element={<Home />}
          />


          {/* =================================================
              USER AUTH
          ================================================= */}

          <Route
            path="/login"
            element={<Login />}
          />

          <Route
            path="/join"
            element={<Join />}
          />


          {/* =================================================
              ABOUT
          ================================================= */}

          <Route
            path="/about"
            element={<About />}
          />


          {/* =================================================
              CLASSES
          ================================================= */}

          <Route
            path="/classes"
            element={<Classes />}
          />

          <Route
            path="/classes/:id"
            element={<ClassDetail />}
          />


          {/* =================================================
              TRAINERS
          ================================================= */}

          <Route
            path="/trainers"
            element={<Trainers />}
          />

          <Route
            path="/trainer/:id"
            element={<TrainerDetail />}
          />


          {/* =================================================
              MEMBERSHIP
          ================================================= */}

          <Route
            path="/membership"
            element={<Membership />}
          />

          <Route
            path="/payment"
            element={<Payment />}
          />

          <Route
            path="/membership-success"
            element={<MembershipSuccess />}
          />


          {/* =================================================
              CONTACT
          ================================================= */}

          <Route
            path="/contact"
            element={<Contact />}
          />


          {/* =================================================
              LEGAL PAGES
          ================================================= */}

          <Route
            path="/privacy-policy"
            element={<PrivacyPolicy />}
          />

          <Route
            path="/terms-conditions"
            element={<TermsConditions />}
          />


          {/* =================================================
              SUPER ADMIN LOGIN

              URL:
              /admin
          ================================================= */}

          <Route
            path="/admin"
            element={<AdminLogin />}
          />


          <Route
            path="/admin/dashboard"
            element={<AdminDashboard />}
          />
           <Route
  path="/admin/members"
  element={<AdminMembers />}
/>
<Route
  path="/admin/classes"
  element={<AdminClasses />}
/>

<Route
  path="/admin/trainers"
  element={<AdminTrainers />}
/>

<Route
  path="/admin/memberships"
  element={<AdminMemberships />}
/>
<Route
  path="/admin/payments"
  element={<AdminPayments />}
/>

<Route
  path="/admin/gallery"
  element={<AdminGallery />}
/>
<Route
  path="/admin/messages"
  element={<AdminMessages />}
/>

<Route
  path="/admin/settings"
  element={<AdminSettings />}
/>
<Route
  path="/admin/manager-dashboard"
  element={<ManagerDashboard />}
/>
<Route
  path="/admin/manager/members"
  element={<ManagerMembers />}
/>

<Route
  path="/admin/manager/memberships"
  element={<ManagerMemberships />}
/>

<Route
  path="/admin/manager/classes"
  element={<ManagerClasses />}
/>

<Route
  path="/admin/manager/trainers"
  element={<ManagerTrainers />}
/>

<Route
  path="/admin/manager/messages"
  element={<ManagerMessages />}
/>
<Route
  path="/user/dashboard"
  element={<UserDashboard />}
/>

<Route
  path="/user/profile"
  element={<UserProfile />}
/>

<Route
  path="/user/membership"
  element={<MyMembership />}
/>

<Route
  path="/user/classes"
  element={<MyClasses />}
/>
        </Routes>

      </main>


      {/* ===================================================
          WEBSITE FOOTER

          Admin pages par footer nahi dikhega
      =================================================== */}

      {!hideLayout && <Footer />}

    </div>
  );
};


/* =========================================================
   MAIN APP
========================================================= */

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;