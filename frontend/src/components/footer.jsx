import React from "react";
import { assets } from '../assets/assets';

const Footer = () => {
  return (
    <footer style={styles.footer}>
      {/* Top Section */}
      <div style={styles.topSection}>
        <h1 style={styles.title}>GET IN TOUCH</h1>
      </div>

      {/* Bottom Section */}
      <div style={styles.bottomSection}>
        {/* Shipping */}
        <div style={styles.infoBox}>
          <h3 style={styles.infoTitle}>Shipping</h3>
          <p style={styles.infoText}>
            In-stock items shipped via White Glove or oversize will typically
            ship within 2-3 weeks of purchase, unless otherwise noted. Transit
            can take up to 14 business days.
          </p>
        </div>

        {/* Delivery */}
        <div style={styles.infoBox}>
          <h3 style={styles.infoTitle}>Delivery</h3>
          <p style={styles.infoText}>
            Delivery requires an appointment and signature. A two-person team
            will bring the item inside, place it in your chosen room, assemble
            it, and remove packaging debris.
          </p>
        </div>

        {/* Returns */}
        <div style={styles.infoBox}>
          <h3 style={styles.infoTitle}>Returns</h3>
          <p style={styles.infoText}>
            Please verify that this item aligns with your specific requirements
            before completing the purchase, as it does not qualify for free
            returns and incurs a 15% restocking fee.
          </p>
        </div>
      </div>

      {/* Footer Links */}
      <div style={styles.linksSection}>
        {/* Social Media */}
        <div style={styles.linkBox}>
          <h4 style={styles.linkTitle}>Social Media</h4>
          <ul style={styles.linkList}>
            <li>Facebook</li>
            <li>Pinterest</li>
            <li>Instagram</li>
            <li>Tiktok</li>
          </ul>
        </div>

        {/* Customer Support */}
        <div style={styles.linkBox}>
          <h4 style={styles.linkTitle}>Customer Support</h4>
          <ul style={styles.linkList}>
            <li>Top Questions</li>
            <li>Start a Return</li>
            <li>Rug Guide</li>
            <li>Gift Card</li>
          </ul>
        </div>

        {/* The Company */}
        <div style={styles.linkBox}>
          <h4 style={styles.linkTitle}>The Company</h4>
          <ul style={styles.linkList}>
            <li>Careers</li>
            <li>About Us</li>
            <li>Customer Reviews</li>
            <li>Accessibility Statement</li>
          </ul>
        </div>

        {/* Subscribe Section */}
        <div style={styles.subscribeBox}>
          <h4 style={styles.linkTitle}>Subscribe To Us!</h4>
          <p>Sign up for our email list and receive 10% off your first order.</p>
          <input
            type="email"
            placeholder="Your Email Address"
            style={styles.input}
          />
        </div>
      </div>
    </footer>
  );
};

const styles = {
  footer: {
    backgroundColor: "#333",
    color: "#fff",
    padding: "20px",
    fontFamily: "Arial, sans-serif",
  },
  topSection: {
    textAlign: "center",
    marginBottom: "20px",
  },
  title: {
    fontSize: "2rem",
    margin: "0",
  },
  bottomSection: {
    display: "flex",
    justifyContent: "space-around",
    padding: "20px 0",
    borderBottom: "1px solid #555",
  },
  infoBox: {
    width: "30%",
  },
  infoTitle: {
    fontSize: "1.2rem",
    marginBottom: "10px",
  },
  infoText: {
    fontSize: "0.9rem",
    lineHeight: "1.5",
  },
  linksSection: {
    display: "flex",
    justifyContent: "space-around",
    marginTop: "20px",
  },
  linkBox: {
    width: "20%",
  },
  linkTitle: {
    fontSize: "1rem",
    marginBottom: "10px",
  },
  linkList: {
    listStyle: "none",
    padding: "0",
  },
  linkListItem: {
    marginBottom: "5px",
  },
  subscribeBox: {
    width: "25%",
  },
  input: {
    width: "100%",
    padding: "8px",
    marginTop: "10px",
    borderRadius: "4px",
    border: "1px solid #ccc",
    color: "black", 
    backgroundColor: "#fff",
  },
};

export default Footer;
