import React from 'react';
import { motion } from 'framer-motion';

// Design System Colors
const colors = {
  // Foundation
  white: '#FFFFFF',
  black: '#000000',
  
  // Primary Brand
  electricOrange: '#FF6B35',
  crimsonRed: '#E63946',
  cyberBlue: '#457B9D',
  deepMagenta: '#D62598',
  
  // Neutrals
  concrete: '#F5F5F5',
  steel: '#E0E0E0',
  graphite: '#757575',
  charcoal: '#424242',
  obsidian: '#212121',
  
  // Semantic
  emerald: '#00C851',
  amber: '#FFB300',
  sapphire: '#2196F3'
};

// Design System Typography
const typography = {
  displayL: 'text-5xl sm:text-6xl font-black leading-none tracking-tight',
  displayM: 'text-4xl sm:text-5xl font-extrabold leading-tight tracking-tight',
  displayS: 'text-3xl sm:text-4xl font-extrabold leading-tight tracking-tight',
  headingL: 'text-2xl font-bold leading-snug',
  headingM: 'text-xl font-semibold leading-snug',
  headingS: 'text-lg font-semibold leading-snug',
  bodyL: 'text-lg font-normal leading-relaxed',
  bodyM: 'text-base font-normal leading-relaxed',
  bodyS: 'text-sm font-normal leading-normal',
  caption: 'text-xs font-medium leading-tight tracking-wide'
};

// Social Icons
const TwitterIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"/>
  </svg>
);

const LinkedInIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
    <rect x="2" y="9" width="4" height="12"/>
    <circle cx="4" cy="4" r="2"/>
  </svg>
);

const GitHubIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/>
  </svg>
);

const WebsiteIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="10"/>
    <line x1="2" y1="12" x2="22" y2="12"/>
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
  </svg>
);

const EmailIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
    <polyline points="22,6 12,13 2,6"/>
  </svg>
);

interface SocialLink {
  platform: 'twitter' | 'linkedin' | 'github' | 'website' | 'email';
  url: string;
}

interface AuthorBioProps {
  name: string;
  role: string;
  bio: string;
  avatar?: string;
  avatarAlt?: string;
  socialLinks?: SocialLink[];
  expertise?: string[];
  variant?: 'default' | 'compact' | 'detailed' | 'sidebar';
  accentColor?: 'orange' | 'blue' | 'magenta' | 'red';
  showStats?: boolean;
  articlesCount?: number;
  followersCount?: string;
  className?: string;
}

export const AuthorBio: React.FC<AuthorBioProps> = ({
  name,
  role,
  bio,
  avatar,
  avatarAlt,
  socialLinks = [],
  expertise = [],
  variant = 'default',
  accentColor = 'orange',
  showStats = false,
  articlesCount,
  followersCount,
  className = ''
}) => {
  const accentColors = {
    orange: colors.electricOrange,
    blue: colors.cyberBlue,
    magenta: colors.deepMagenta,
    red: colors.crimsonRed
  };

  const currentAccent = accentColors[accentColor];

  const getSocialIcon = (platform: string) => {
    switch (platform) {
      case 'twitter':
        return <TwitterIcon className="w-5 h-5" />;
      case 'linkedin':
        return <LinkedInIcon className="w-5 h-5" />;
      case 'github':
        return <GitHubIcon className="w-5 h-5" />;
      case 'website':
        return <WebsiteIcon className="w-5 h-5" />;
      case 'email':
        return <EmailIcon className="w-5 h-5" />;
      default:
        return null;
    }
  };

  // Compact variant for article headers
  if (variant === 'compact') {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className={`w-full ${className}`}
      >
        <div
          className="flex items-center gap-4"
          style={{
            background: colors.white,
            border: `3px solid ${colors.black}`,
            boxShadow: `4px 4px 0px ${colors.black}`,
            padding: '16px'
          }}
        >
          {/* Avatar */}
          {avatar && (
            <div
              style={{
                width: '48px',
                height: '48px',
                border: `3px solid ${colors.black}`,
                boxShadow: `2px 2px 0px ${currentAccent}`,
                overflow: 'hidden',
                flexShrink: 0
              }}
            >
              <img 
                src={avatar} 
                alt={avatarAlt || name}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover'
                }}
              />
            </div>
          )}

          {/* Info */}
          <div className="flex-1">
            <h4 
              className={`${typography.bodyM} font-bold`}
              style={{ color: colors.black }}
            >
              {name}
            </h4>
            <p 
              className={typography.bodyS}
              style={{ color: colors.charcoal }}
            >
              {role}
            </p>
          </div>

          {/* Social Links */}
          {socialLinks.length > 0 && (
            <div className="flex gap-2">
              {socialLinks.slice(0, 3).map((link, index) => (
                <a
                  key={index}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    width: '32px',
                    height: '32px',
                    background: colors.concrete,
                    border: `2px solid ${colors.black}`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: colors.black,
                    transition: 'all 0.2s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = currentAccent;
                    e.currentTarget.style.color = colors.white;
                    e.currentTarget.style.transform = 'translate(-1px, -1px)';
                    e.currentTarget.style.boxShadow = `3px 3px 0px ${colors.black}`;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = colors.concrete;
                    e.currentTarget.style.color = colors.black;
                    e.currentTarget.style.transform = 'translate(0, 0)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  {getSocialIcon(link.platform)}
                </a>
              ))}
            </div>
          )}
        </div>
      </motion.div>
    );
  }

  // Sidebar variant
  if (variant === 'sidebar') {
    return (
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className={`w-full ${className}`}
      >
        <div
          style={{
            background: colors.white,
            border: `3px solid ${colors.black}`,
            boxShadow: `6px 6px 0px ${colors.black}`,
            position: 'relative',
            overflow: 'hidden'
          }}
        >
          {/* Accent Bar */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: '4px',
              background: `linear-gradient(90deg, ${currentAccent}, ${colors.crimsonRed})`
            }}
          />

          <div className="p-6 text-center">
            {/* Avatar */}
            {avatar && (
              <div
                style={{
                  width: '120px',
                  height: '120px',
                  border: `4px solid ${colors.black}`,
                  boxShadow: `4px 4px 0px ${currentAccent}`,
                  margin: '0 auto 16px',
                  transform: 'rotate(-3deg)',
                  overflow: 'hidden'
                }}
              >
                <img 
                  src={avatar} 
                  alt={avatarAlt || name}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    transform: 'rotate(3deg) scale(1.1)'
                  }}
                />
              </div>
            )}

            {/* Name & Role */}
            <h3 
              className={`${typography.headingM} uppercase mb-1`}
              style={{ color: colors.black }}
            >
              {name}
            </h3>
            <p 
              className={`${typography.bodyS} font-semibold mb-4`}
              style={{ color: currentAccent }}
            >
              {role}
            </p>

            {/* Bio */}
            <p 
              className={`${typography.bodyS} mb-4`}
              style={{ color: colors.charcoal }}
            >
              {bio}
            </p>

            {/* Stats */}
            {showStats && (articlesCount || followersCount) && (
              <div className="flex justify-center gap-4 mb-4">
                {articlesCount !== undefined && (
                  <div>
                    <p 
                      className={`${typography.headingM} font-bold`}
                      style={{ color: colors.black }}
                    >
                      {articlesCount}
                    </p>
                    <p 
                      className={typography.caption}
                      style={{ color: colors.graphite }}
                    >
                      Articles
                    </p>
                  </div>
                )}
                {followersCount && (
                  <div>
                    <p 
                      className={`${typography.headingM} font-bold`}
                      style={{ color: colors.black }}
                    >
                      {followersCount}
                    </p>
                    <p 
                      className={typography.caption}
                      style={{ color: colors.graphite }}
                    >
                      Followers
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* Social Links */}
            {socialLinks.length > 0 && (
              <div className="flex justify-center gap-3">
                {socialLinks.map((link, index) => (
                  <a
                    key={index}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      width: '40px',
                      height: '40px',
                      background: colors.white,
                      border: `2px solid ${colors.black}`,
                      boxShadow: `2px 2px 0px ${colors.black}`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: colors.black,
                      transition: 'all 0.2s ease'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = currentAccent;
                      e.currentTarget.style.color = colors.white;
                      e.currentTarget.style.transform = 'translate(-2px, -2px)';
                      e.currentTarget.style.boxShadow = `4px 4px 0px ${colors.black}`;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = colors.white;
                      e.currentTarget.style.color = colors.black;
                      e.currentTarget.style.transform = 'translate(0, 0)';
                      e.currentTarget.style.boxShadow = `2px 2px 0px ${colors.black}`;
                    }}
                  >
                    {getSocialIcon(link.platform)}
                  </a>
                ))}
              </div>
            )}
          </div>
        </div>
      </motion.div>
    );
  }

  // Default and Detailed variants
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`w-full ${className}`}
    >
      <div
        style={{
          background: colors.white,
          border: `4px solid ${colors.black}`,
          boxShadow: `8px 8px 0px ${colors.black}`,
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        {/* Accent Bar */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '6px',
            background: `linear-gradient(90deg, ${currentAccent}, ${colors.crimsonRed})`
          }}
        />

        <div className="p-6 sm:p-8">
          <div className="flex flex-col sm:flex-row gap-6">
            {/* Avatar */}
            {avatar && (
              <div
                style={{
                  width: '120px',
                  height: '120px',
                  border: `4px solid ${colors.black}`,
                  boxShadow: `4px 4px 0px ${currentAccent}`,
                  flexShrink: 0,
                  transform: 'rotate(-3deg)',
                  overflow: 'hidden'
                }}
              >
                <img 
                  src={avatar} 
                  alt={avatarAlt || name}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    transform: 'rotate(3deg) scale(1.1)'
                  }}
                />
              </div>
            )}

            {/* Content */}
            <div className="flex-1">
              {/* Header */}
              <div className="mb-4">
                <h3 
                  className={`${typography.headingL} uppercase mb-1`}
                  style={{ color: colors.black }}
                >
                  {name}
                </h3>
                <p 
                  className={`${typography.bodyM} font-semibold`}
                  style={{ color: currentAccent }}
                >
                  {role}
                </p>
              </div>

              {/* Bio */}
              <p 
                className={`${typography.bodyM} mb-4`}
                style={{ color: colors.charcoal }}
              >
                {bio}
              </p>

              {/* Expertise Tags */}
              {variant === 'detailed' && expertise.length > 0 && (
                <div className="mb-4">
                  <p 
                    className={`${typography.caption} uppercase mb-2`}
                    style={{ 
                      color: colors.graphite,
                      letterSpacing: '1px'
                    }}
                  >
                    Expertise
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {expertise.map((skill, index) => (
                      <span
                        key={index}
                        className={`${typography.caption} uppercase px-3 py-1`}
                        style={{
                          background: colors.concrete,
                          border: `2px solid ${colors.black}`,
                          boxShadow: `2px 2px 0px ${colors.black}`,
                          fontWeight: 600
                        }}
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Stats & Social */}
              <div className="flex flex-wrap items-center gap-6">
                {/* Stats */}
                {showStats && (articlesCount || followersCount) && (
                  <div className="flex gap-6">
                    {articlesCount !== undefined && (
                      <div>
                        <p 
                          className={`${typography.headingM} font-bold`}
                          style={{ color: colors.black }}
                        >
                          {articlesCount}
                        </p>
                        <p 
                          className={`${typography.caption} uppercase`}
                          style={{ color: colors.graphite }}
                        >
                          Articles
                        </p>
                      </div>
                    )}
                    {followersCount && (
                      <div>
                        <p 
                          className={`${typography.headingM} font-bold`}
                          style={{ color: colors.black }}
                        >
                          {followersCount}
                        </p>
                        <p 
                          className={`${typography.caption} uppercase`}
                          style={{ color: colors.graphite }}
                        >
                          Followers
                        </p>
                      </div>
                    )}
                  </div>
                )}

                {/* Social Links */}
                {socialLinks.length > 0 && (
                  <div className="flex gap-3">
                    {socialLinks.map((link, index) => (
                      <a
                        key={index}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          width: '44px',
                          height: '44px',
                          background: colors.white,
                          border: `3px solid ${colors.black}`,
                          boxShadow: `3px 3px 0px ${colors.black}`,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: colors.black,
                          transition: 'all 0.2s ease'
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.background = currentAccent;
                          e.currentTarget.style.color = colors.white;
                          e.currentTarget.style.transform = 'translate(-2px, -2px)';
                          e.currentTarget.style.boxShadow = `5px 5px 0px ${colors.black}`;
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background = colors.white;
                          e.currentTarget.style.color = colors.black;
                          e.currentTarget.style.transform = 'translate(0, 0)';
                          e.currentTarget.style.boxShadow = `3px 3px 0px ${colors.black}`;
                        }}
                      >
                        {getSocialIcon(link.platform)}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};