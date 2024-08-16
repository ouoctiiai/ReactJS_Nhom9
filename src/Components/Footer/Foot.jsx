import React from "react";
import { FaFacebook, FaGithub, FaInstagram, FaTwitter, FaTwitch } from 'react-icons/fa';
import './Footer.css'; // Nhập tệp CSS mới

const sections = [
  {
    title: 'Solutions',
    items: ['Marketing', 'Analytics', 'Commerce', 'Data', 'Cloud']
  },
  {
    title: 'Support',
    items: ['Pricing', 'Documentation', 'Guides', 'API', 'Status']
  },
  {
    title: 'Company',
    items: ['About', 'Blog', 'Jobs', 'Press', 'Partners']
  },
  {
    title: 'Legal',
    items: ['Claims', 'Privacy', 'Terms', 'Policies', 'Conditions']
  },
];

const items = [
  {
    name: 'Facebook',
    icon: FaFacebook,
    link: 'https://facebook.com/'
  },
  {
    name: 'Instagram',
    icon: FaInstagram,
    link: 'https://instagram.com/'
  },
  {
    name: 'Twitter',
    icon: FaTwitter,
    link: 'https://twitter.com/'
  },
  {
    name: 'Twitch',
    icon: FaTwitch,
    link: 'https://twitch.com/'
  },
  {
    name: 'Github',
    icon: FaGithub,
    link: 'https://github.com/'
  },
];

const Footer = () => {
  return (
    <div className="footer-container">
      <div className="footer-content">
        {
          sections.map((section, index) => (
            <div key={index} className="footer-section">
              <h6 className="footer-section-title">
                {section.title}
              </h6>
              <ul>
                {section.items.map((item, i) => (
                  <li key={i} className="footer-section-item">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))
        }
      </div>
      <div className="footer-bottom">
        
        <div className="social-icons">
          {
            items.map((x, index) => {
              const Icon = x.icon;
              return (
                <a href={x.link} target="_blank" rel="noopener noreferrer" key={index}>
                  <Icon />
                </a>
              );
            })
          }
        </div>
      </div>
      <div className="newsletter">
        <p className="newsletter-title">
          Subscribe to our newsletter
        </p>
        <p className="newsletter-description">
          The latest updates, articles, and resources, sent to your inbox weekly
        </p>
        <form className="newsletter-form">
          <input type="email" placeholder="Enter email address" />
          <button type="submit">
            Subscribe
          </button>
        </form>
      </div>
     
    </div>
  );
};

export default Footer;
