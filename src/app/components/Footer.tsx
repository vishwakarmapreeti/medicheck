import "@/styles/footer.css";
import { Mail, Phone, MapPin, Facebook, Twitter, Linkedin } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          <div className="footer-section">
            <div className="footer-logo-wrapper">
              <h3 className="footer-logo">HealthCheckPro</h3>
              <p className="footer-description">
                Streamlined insurance verification and document management for healthcare providers.
              </p>
            </div>
          </div>

          <div className="footer-section">
            <h4 className="footer-section-title">Quick Links</h4>
            <ul className="footer-links">
              <li><a href="/">Home</a></li>
              <li><a href="/uploadDoc">Upload Document</a></li>
              <li><a href="/result">Results</a></li>
            </ul>
          </div>

          <div className="footer-section">
            <h4 className="footer-section-title">Contact</h4>
            <div className="footer-contact">
              <div className="contact-item">
                <Mail size={16} />
                <a href="mailto:info@healthcheckpro.com">info@healthcheckpro.com</a>
              </div>
              <div className="contact-item">
                <Phone size={16} />
                <a href="tel:+1234567890">+1 (234) 567-890</a>
              </div>
              <div className="contact-item">
                <MapPin size={16} />
                <span>Healthcare Center, USA</span>
              </div>
            </div>
          </div>

          <div className="footer-section">
            <h4 className="footer-section-title">Follow Us</h4>
            <div className="footer-socials">
              <a href="#" aria-label="Facebook" className="social-link">
                <Facebook size={20} />
              </a>
              <a href="#" aria-label="Twitter" className="social-link">
                <Twitter size={20} />
              </a>
              <a href="#" aria-label="LinkedIn" className="social-link">
                <Linkedin size={20} />
              </a>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="footer-divider"></div>
          <div className="footer-bottom-content">
            <p className="footer-copyright">
              © {currentYear} Niyati Healthcare. All rights reserved.
            </p>
            <div className="footer-legal">
              <a href="#privacy">Privacy Policy</a>
              <a href="#terms">Terms of Service</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
