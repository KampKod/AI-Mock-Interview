import React from 'react';
// import kodekamp from 'public/kampkode_transparent_footer.png';
// import mascot from 'public/assets/FooterBG.png'; // Replace with actual mascot image path
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faGithub,
  faXTwitter,
  faLinkedin,
  faInstagram,
  faYoutube,
} from '@fortawesome/free-brands-svg-icons';

// import kodekamp from '/kampkode_transparent_footer.png'

const FooterSection = ({ title, items }) => (
  <div className="flex flex-col text-start gap-3 my-4">
    <h4 className="font-light text-[#D6BBFB] text-lg">{title}</h4>
    {items.map((item) => (
      <p
        key={item.label}
        className="font-normal text-[16px] text-[#E9D7FE] hover:translate-y-0.5 transition-all duration-200"
      >
        <a
          href={item.link}
          target={item.link.includes('https') ? '_blank' : '_self'}
          rel={item.link.includes('https') ? 'noopener noreferrer' : ''}
          className="flex items-center gap-1"
        >
          {item.label}
          {item.tag && (
            <span
              style={{
                display: 'inline-block',
                padding: '0.1rem 0.6rem',
                fontSize: '0.75rem',
                fontWeight: 'bold',
                color: '#53389E',
                backgroundColor: 'white',
                border: '1px solid white',
                borderRadius: '9999px',
                marginLeft: '0.5rem',
              }}
            >
              {item.tag}
            </span>
          )}
        </a>
      </p>
    ))}
  </div>
);

const FooterPage = () => {
  const footerItems = {
    services: [
      { label: 'CRT', link: 'https://kampkode.tech/crt', tag: 'Popular' },
      { label: 'Internships', link: 'https://kampkode.tech/internships' },
      { label: 'Projects', link: 'https://kampkode.tech/projects' },
      { label: 'Resume Maker', link: 'https://resume.kampkode.tech/', tag: 'New' },
      { label: 'Roadmap', link: 'https://kampkode.tech/roadmap', tag: 'Soon' },
    ],
    company: [
      { label: 'About us', link: 'https://kampkode.tech/about-us' },
      { label: 'Features', link: 'https://kampkode.tech/#features' },
      { label: 'Pricing', link: 'https://kampkode.tech/crt#pricing' },
      { label: 'Contact Us', link: 'https://kampkode.tech/contact-us' },
      { label: 'Privacy Policy', link: 'https://kampkode.tech/privacy-policy' },
    ],
    'For Students': [
      { label: 'Quiz\'s', link: 'https://kampkode.tech/quizzes' },
      { label: 'Reading Material', link: 'https://kampkode.tech/reading-materials' },
      { label: 'Live Classes', link: 'https://kampkode.tech/live-classes' },
      { label: 'Flash Cards', link: 'https://kampkode.tech/flashcards' },
      { label: 'Skill Assessment', link: 'https://kampkode.tech/skill-assignments' },
    ],
    Social: [
      { label: 'LinkedIn', link: 'https://linkedin.com' },
      { label: 'Instagram', link: 'https://instagram.com' },
      { label: 'YouTube', link: 'https://youtube.com' },
      { label: 'X(Twitter)', link: 'https://twitter.com' },
      { label: 'GitHub', link: 'https://github.com' },
    ],
  };

  return (
    <div className="bg-[#53389E] text-white py-10 relative overflow-hidden w-full">
      <div className="container mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-10">
          {/* Logo and Description */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <div className="bg-white rounded-lg p-4 mb-4">
              <Image src={'/kampkode_footer_img.png'} alt="logo" width={160} height={160} />
            </div>
            <p className="max-w-xs font-light text-center md:text-left">
              Empowering students with the skills and knowledge to excel in their careers.
            </p>
          </div>

          {/* Footer Links */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center md:text-left">
            <FooterSection title="Product" items={footerItems.services} />
            <FooterSection title="Company" items={footerItems.company} />
            <FooterSection title="Resources" items={footerItems['For Students']} />
            <FooterSection title="Social" items={footerItems.Social} />
          </div>
        </div>

        {/* Footer Bottom */}
        <hr className="my-8 border-gray-300" />
        <div className="flex flex-col md:flex-row justify-between items-center text-center gap-4">
          <p className="text-sm">&copy; 2024 Kampkode Technologies LLP. All Rights Reserved.</p>
          <div className="flex space-x-4">
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon icon={faLinkedin} className="text-white text-2xl hover:text-gray-300" />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon icon={faInstagram} className="text-white text-2xl hover:text-gray-300" />
            </a>
            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon icon={faYoutube} className="text-white text-2xl hover:text-gray-300" />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon icon={faXTwitter} className="text-white text-2xl hover:text-gray-300" />
            </a>
            <a href="https://github.com" target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon icon={faGithub} className="text-white text-2xl hover:text-gray-300" />
            </a>
          </div>
        </div>
      </div>

      {/* Mascot Image */}
      <div className="absolute bottom-0 right-0">
        <Image src={'/FooterBG.png'} alt="Mascot" width={150} height={150} className="w-48 h-48 md:w-64 md:h-64" />
      </div>
    </div>
  );
};

export default FooterPage;
