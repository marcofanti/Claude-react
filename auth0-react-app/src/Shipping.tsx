import { useAuth0 } from '@auth0/auth0-react';
import LoginButton from './LoginButton';
import LogoutButton from './LogoutButton';
import './Shipping.css';

const Shipping = () => {
  const { isAuthenticated, user, isLoading } = useAuth0();

  if (isLoading) {
    return (
      <div className="shipping-container">
        <div className="loading-text">Loading...</div>
      </div>
    );
  }

  return (
    <div className="shipping-container">
      <header className="shipping-header">
        <div className="shipping-logo">
          <div className="logo-shield">SS</div>
          <span className="logo-text">SwiftShip Express</span>
        </div>
        <nav className="shipping-nav">
          <a href="#track">Track</a>
          <a href="#ship">Ship</a>
          <a href="#locations">Locations</a>
          <a href="#support">Support</a>
          {isAuthenticated ? <LogoutButton /> : <LoginButton />}
        </nav>
      </header>

      <main className="shipping-main">
        {isAuthenticated ? (
          <div className="authenticated-section">
            <div className="welcome-banner">
              <h1>Welcome back, {user?.name}!</h1>
              <p>Manage your shipments and track packages</p>
            </div>

            <div className="dashboard-grid">
              <div className="dashboard-card">
                <div className="card-icon">📦</div>
                <h3>Create Shipment</h3>
                <p>Send packages domestically or internationally</p>
                <button className="action-btn">Ship Now</button>
              </div>

              <div className="dashboard-card">
                <div className="card-icon">🔍</div>
                <h3>Track Package</h3>
                <p>Monitor your shipments in real-time</p>
                <button className="action-btn">Track</button>
              </div>

              <div className="dashboard-card">
                <div className="card-icon">📋</div>
                <h3>Shipping History</h3>
                <p>View all your past shipments</p>
                <button className="action-btn">View History</button>
              </div>

              <div className="dashboard-card">
                <div className="card-icon">💳</div>
                <h3>Billing</h3>
                <p>Manage payment methods and invoices</p>
                <button className="action-btn">Manage</button>
              </div>
            </div>

            <div className="recent-shipments">
              <h2>Recent Shipments</h2>
              <div className="shipment-list">
                <div className="shipment-item">
                  <div className="shipment-info">
                    <span className="tracking-number">1Z999AA10123456784</span>
                    <span className="shipment-status delivered">Delivered</span>
                  </div>
                  <div className="shipment-details">
                    <span>From: New York, NY</span>
                    <span>To: Los Angeles, CA</span>
                    <span>Date: Jan 15, 2026</span>
                  </div>
                </div>

                <div className="shipment-item">
                  <div className="shipment-info">
                    <span className="tracking-number">1Z999AA10123456785</span>
                    <span className="shipment-status in-transit">In Transit</span>
                  </div>
                  <div className="shipment-details">
                    <span>From: Chicago, IL</span>
                    <span>To: Miami, FL</span>
                    <span>Expected: Jan 17, 2026</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="hero-section">
            <div className="hero-content">
              <h1>Ship. Track. Deliver.</h1>
              <p className="hero-subtitle">Reliable shipping solutions for your business and personal needs</p>

              <div className="quick-track">
                <input
                  type="text"
                  placeholder="Enter tracking number"
                  className="track-input"
                />
                <button className="track-btn">Track</button>
              </div>

              <div className="login-prompt">
                <p>Sign in to access your shipping dashboard and manage all your shipments</p>
                <LoginButton />
              </div>
            </div>

            <div className="features-grid">
              <div className="feature-card">
                <div className="feature-icon">🌍</div>
                <h3>Global Reach</h3>
                <p>Ship to over 220 countries and territories worldwide</p>
              </div>

              <div className="feature-card">
                <div className="feature-icon">⚡</div>
                <h3>Fast Delivery</h3>
                <p>Express options available for urgent shipments</p>
              </div>

              <div className="feature-card">
                <div className="feature-icon">🔒</div>
                <h3>Secure Handling</h3>
                <p>Your packages are protected every step of the way</p>
              </div>

              <div className="feature-card">
                <div className="feature-icon">📱</div>
                <h3>Real-time Tracking</h3>
                <p>Monitor your shipment from pickup to delivery</p>
              </div>
            </div>
          </div>
        )}
      </main>

      <footer className="shipping-footer">
        <div className="footer-content">
          <div className="footer-section">
            <h4>Our Company</h4>
            <a href="#about">About SwiftShip</a>
            <a href="#careers">Careers</a>
            <a href="#news">Newsroom</a>
          </div>
          <div className="footer-section">
            <h4>Quick Links</h4>
            <a href="#track">Track a Package</a>
            <a href="#rates">Get a Quote</a>
            <a href="#locations">Find Locations</a>
          </div>
          <div className="footer-section">
            <h4>Support</h4>
            <a href="#help">Help Center</a>
            <a href="#contact">Contact Us</a>
            <a href="#claims">File a Claim</a>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2026 SwiftShip Express. Demo site for Auth0 integration.</p>
        </div>
      </footer>
    </div>
  );
};

export default Shipping;
