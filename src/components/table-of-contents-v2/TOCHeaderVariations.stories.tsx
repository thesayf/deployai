import type { Meta, StoryObj } from '@storybook/nextjs';
import React from 'react';

const meta = {
  title: 'Blog/TOC Header Variations',
  parameters: {
    layout: 'centered',
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

// Design System Colors
const colors = {
  electricOrange: '#FF6B35',
  crimsonRed: '#E63946',
  cyberBlue: '#457B9D',
  deepMagenta: '#D62598',
  white: '#FFFFFF',
  black: '#000000',
  concrete: '#F5F5F5',
  charcoal: '#424242',
};

interface TitleDesignProps {
  title: string;
  variant: number;
  accentColor?: string;
}

const TitleDesign: React.FC<TitleDesignProps> = ({ title, variant, accentColor = colors.electricOrange }) => {
  switch (variant) {
    case 1:
      // Bold Underline
      return (
        <h2 style={{
          fontSize: '16px',
          fontWeight: 900,
          textTransform: 'uppercase',
          color: colors.black,
          letterSpacing: '0.1em',
          marginBottom: '24px',
          paddingBottom: '12px',
          borderBottom: `4px solid ${accentColor}`,
        }}>
          {title}
        </h2>
      );
    
    case 2:
      // Full Background Block
      return (
        <h2 style={{
          fontSize: '16px',
          fontWeight: 900,
          textTransform: 'uppercase',
          color: colors.white,
          letterSpacing: '0.1em',
          marginBottom: '24px',
          padding: '16px 20px',
          background: accentColor,
          border: `3px solid ${colors.black}`,
          boxShadow: `4px 4px 0px ${colors.black}`,
        }}>
          {title}
        </h2>
      );
    
    case 3:
      // Outline Box
      return (
        <h2 style={{
          fontSize: '16px',
          fontWeight: 900,
          textTransform: 'uppercase',
          color: colors.black,
          letterSpacing: '0.1em',
          marginBottom: '24px',
          padding: '16px 20px',
          border: `3px solid ${colors.black}`,
          background: colors.white,
        }}>
          {title}
        </h2>
      );
    
    case 4:
      // Left Border Accent
      return (
        <h2 style={{
          fontSize: '16px',
          fontWeight: 900,
          textTransform: 'uppercase',
          color: colors.black,
          letterSpacing: '0.1em',
          marginBottom: '24px',
          paddingLeft: '20px',
          borderLeft: `6px solid ${accentColor}`,
        }}>
          {title}
        </h2>
      );
    
    case 5:
      // Stacked Shadow
      return (
        <h2 style={{
          fontSize: '16px',
          fontWeight: 900,
          textTransform: 'uppercase',
          color: colors.black,
          letterSpacing: '0.1em',
          marginBottom: '24px',
          padding: '16px 20px',
          background: colors.white,
          border: `3px solid ${colors.black}`,
          boxShadow: `6px 6px 0px ${accentColor}`,
        }}>
          {title}
        </h2>
      );
    
    case 6:
      // Minimal Clean
      return (
        <h2 style={{
          fontSize: '16px',
          fontWeight: 900,
          textTransform: 'uppercase',
          color: colors.black,
          letterSpacing: '0.1em',
          marginBottom: '24px',
        }}>
          {title}
        </h2>
      );
    
    case 7:
      // Two-tone Block
      return (
        <div style={{ marginBottom: '24px' }}>
          <h2 style={{
            fontSize: '16px',
            fontWeight: 900,
            textTransform: 'uppercase',
            color: colors.white,
            letterSpacing: '0.1em',
            margin: 0,
            padding: '12px 20px',
            background: colors.black,
            display: 'inline-block',
          }}>
            TABLE OF
          </h2>
          <h2 style={{
            fontSize: '16px',
            fontWeight: 900,
            textTransform: 'uppercase',
            color: colors.black,
            letterSpacing: '0.1em',
            margin: 0,
            padding: '12px 20px',
            background: accentColor,
            display: 'inline-block',
            marginLeft: '-3px',
            border: `3px solid ${colors.black}`,
            borderLeft: 'none',
          }}>
            CONTENTS
          </h2>
        </div>
      );
    
    case 8:
      // Corner Accent
      return (
        <h2 style={{
          fontSize: '16px',
          fontWeight: 900,
          textTransform: 'uppercase',
          color: colors.black,
          letterSpacing: '0.1em',
          marginBottom: '24px',
          padding: '16px 20px',
          border: `3px solid ${colors.black}`,
          position: 'relative',
          background: colors.white,
        }}>
          {title}
          <span style={{
            position: 'absolute',
            top: '-3px',
            right: '-3px',
            width: '24px',
            height: '24px',
            background: accentColor,
            border: `3px solid ${colors.black}`,
          }} />
        </h2>
      );
    
    case 9:
      // Brutalist Tab
      return (
        <div style={{ marginBottom: '24px' }}>
          <h2 style={{
            fontSize: '16px',
            fontWeight: 900,
            textTransform: 'uppercase',
            color: colors.black,
            letterSpacing: '0.1em',
            margin: 0,
            padding: '16px 24px',
            background: colors.concrete,
            border: `3px solid ${colors.black}`,
            borderBottom: 'none',
            display: 'inline-block',
            position: 'relative',
          }}>
            {title}
            <span style={{
              position: 'absolute',
              bottom: '-3px',
              left: '-3px',
              right: '-3px',
              height: '3px',
              background: colors.white,
            }} />
          </h2>
          <div style={{
            borderTop: `3px solid ${colors.black}`,
            width: '100%',
          }} />
        </div>
      );
    
    case 10:
      // Accent Dot
      return (
        <h2 style={{
          fontSize: '16px',
          fontWeight: 900,
          textTransform: 'uppercase',
          color: colors.black,
          letterSpacing: '0.1em',
          marginBottom: '24px',
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
        }}>
          <span style={{
            width: '12px',
            height: '12px',
            background: accentColor,
            border: `3px solid ${colors.black}`,
            flexShrink: 0,
          }} />
          {title}
        </h2>
      );
    
    default:
      return null;
  }
};

// Background wrapper component
const BackgroundWrapper = ({ 
  children, 
  bg 
}: { 
  children: React.ReactNode; 
  bg: string;
}) => (
  <div style={{
    padding: '48px',
    background: bg,
    border: '3px solid #000000',
    marginBottom: '24px',
    minWidth: '400px',
  }}>
    {children}
  </div>
);

export const AllTitleVariations: Story = {
  render: () => (
    <div style={{ padding: '48px' }}>
      <h1 style={{ 
        fontSize: '32px', 
        fontWeight: 900, 
        marginBottom: '48px',
        textTransform: 'uppercase',
      }}>
        TOC Title Design Variations
      </h1>
      
      {/* Show all variations on white background */}
      <div style={{ marginBottom: '64px' }}>
        <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '32px' }}>
          On White Background
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '24px' }}>
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((variant) => (
            <BackgroundWrapper key={variant} bg={colors.white}>
              <p style={{ fontSize: '12px', color: colors.charcoal, marginBottom: '16px' }}>
                Variant {variant}
              </p>
              <TitleDesign 
                title="TABLE OF CONTENTS" 
                variant={variant} 
                accentColor={colors.electricOrange}
              />
            </BackgroundWrapper>
          ))}
        </div>
      </div>
    </div>
  ),
};

export const RecommendedCombinations: Story = {
  name: 'Recommended Brand Combinations',
  render: () => (
    <div style={{ padding: '48px' }}>
      <h1 style={{ 
        fontSize: '32px', 
        fontWeight: 900, 
        marginBottom: '48px',
        textTransform: 'uppercase',
      }}>
        Recommended Title Styles
      </h1>
      
      <div style={{ display: 'grid', gap: '48px' }}>
        {/* Recommendation 1 */}
        <div>
          <h3 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '16px' }}>
            1. Bold Underline (Clean & Modern)
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px' }}>
            <BackgroundWrapper bg={colors.white}>
              <TitleDesign title="TABLE OF CONTENTS" variant={1} accentColor={colors.electricOrange} />
            </BackgroundWrapper>
            <BackgroundWrapper bg={colors.concrete}>
              <TitleDesign title="TABLE OF CONTENTS" variant={1} accentColor={colors.cyberBlue} />
            </BackgroundWrapper>
          </div>
        </div>

        {/* Recommendation 2 */}
        <div>
          <h3 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '16px' }}>
            2. Left Border Accent (Editorial)
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px' }}>
            <BackgroundWrapper bg={colors.white}>
              <TitleDesign title="TABLE OF CONTENTS" variant={4} accentColor={colors.crimsonRed} />
            </BackgroundWrapper>
            <BackgroundWrapper bg='#FFF5F0'>
              <TitleDesign title="TABLE OF CONTENTS" variant={4} accentColor={colors.deepMagenta} />
            </BackgroundWrapper>
          </div>
        </div>

        {/* Recommendation 3 */}
        <div>
          <h3 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '16px' }}>
            3. Minimal Clean (Sophisticated)
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px' }}>
            <BackgroundWrapper bg={colors.white}>
              <TitleDesign title="TABLE OF CONTENTS" variant={6} />
            </BackgroundWrapper>
            <BackgroundWrapper bg={colors.concrete}>
              <TitleDesign title="TABLE OF CONTENTS" variant={6} />
            </BackgroundWrapper>
          </div>
        </div>

        {/* Recommendation 4 */}
        <div>
          <h3 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '16px' }}>
            4. Stacked Shadow (Playful Brutalist)
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px' }}>
            <BackgroundWrapper bg={colors.concrete}>
              <TitleDesign title="TABLE OF CONTENTS" variant={5} accentColor={colors.electricOrange} />
            </BackgroundWrapper>
            <BackgroundWrapper bg='#F0F5FF'>
              <TitleDesign title="TABLE OF CONTENTS" variant={5} accentColor={colors.cyberBlue} />
            </BackgroundWrapper>
          </div>
        </div>
      </div>
    </div>
  ),
};

export const ColorAccentShowcase: Story = {
  name: 'With Different Color Accents',
  render: () => (
    <div style={{ padding: '48px' }}>
      <h1 style={{ 
        fontSize: '32px', 
        fontWeight: 900, 
        marginBottom: '48px',
        textTransform: 'uppercase',
      }}>
        Color Accent Variations
      </h1>
      
      {/* Best designs with all color accents */}
      {[1, 4, 5].map((variant) => (
        <div key={variant} style={{ marginBottom: '48px' }}>
          <h3 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '16px' }}>
            Variant {variant}
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px' }}>
            <BackgroundWrapper bg={colors.white}>
              <p style={{ fontSize: '10px', color: colors.charcoal, marginBottom: '8px' }}>Orange</p>
              <TitleDesign title="TABLE OF CONTENTS" variant={variant} accentColor={colors.electricOrange} />
            </BackgroundWrapper>
            <BackgroundWrapper bg={colors.white}>
              <p style={{ fontSize: '10px', color: colors.charcoal, marginBottom: '8px' }}>Blue</p>
              <TitleDesign title="TABLE OF CONTENTS" variant={variant} accentColor={colors.cyberBlue} />
            </BackgroundWrapper>
            <BackgroundWrapper bg={colors.white}>
              <p style={{ fontSize: '10px', color: colors.charcoal, marginBottom: '8px' }}>Magenta</p>
              <TitleDesign title="TABLE OF CONTENTS" variant={variant} accentColor={colors.deepMagenta} />
            </BackgroundWrapper>
            <BackgroundWrapper bg={colors.white}>
              <p style={{ fontSize: '10px', color: colors.charcoal, marginBottom: '8px' }}>Red</p>
              <TitleDesign title="TABLE OF CONTENTS" variant={variant} accentColor={colors.crimsonRed} />
            </BackgroundWrapper>
          </div>
        </div>
      ))}
    </div>
  ),
};

export const DarkBackgroundVariations: Story = {
  name: 'On Dark Backgrounds',
  render: () => (
    <div style={{ padding: '48px', background: '#f5f5f5' }}>
      <h1 style={{ 
        fontSize: '32px', 
        fontWeight: 900, 
        marginBottom: '48px',
        textTransform: 'uppercase',
      }}>
        Dark Background Variations
      </h1>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '24px' }}>
        {/* White text variations for dark backgrounds */}
        <div style={{
          padding: '48px',
          background: colors.black,
          border: '3px solid #000000',
        }}>
          <h2 style={{
            fontSize: '16px',
            fontWeight: 900,
            textTransform: 'uppercase',
            color: colors.white,
            letterSpacing: '0.1em',
            marginBottom: '24px',
            paddingBottom: '12px',
            borderBottom: `4px solid ${colors.electricOrange}`,
          }}>
            TABLE OF CONTENTS
          </h2>
        </div>

        <div style={{
          padding: '48px',
          background: colors.charcoal,
          border: '3px solid #000000',
        }}>
          <h2 style={{
            fontSize: '16px',
            fontWeight: 900,
            textTransform: 'uppercase',
            color: colors.white,
            letterSpacing: '0.1em',
            marginBottom: '24px',
            paddingLeft: '20px',
            borderLeft: `6px solid ${colors.electricOrange}`,
          }}>
            TABLE OF CONTENTS
          </h2>
        </div>

        <div style={{
          padding: '48px',
          background: colors.crimsonRed,
          border: '3px solid #000000',
        }}>
          <h2 style={{
            fontSize: '16px',
            fontWeight: 900,
            textTransform: 'uppercase',
            color: colors.white,
            letterSpacing: '0.1em',
            marginBottom: '24px',
          }}>
            TABLE OF CONTENTS
          </h2>
        </div>

        <div style={{
          padding: '48px',
          background: colors.cyberBlue,
          border: '3px solid #000000',
        }}>
          <h2 style={{
            fontSize: '16px',
            fontWeight: 900,
            textTransform: 'uppercase',
            color: colors.white,
            letterSpacing: '0.1em',
            marginBottom: '24px',
            padding: '16px 20px',
            background: 'rgba(0,0,0,0.2)',
          }}>
            TABLE OF CONTENTS
          </h2>
        </div>
      </div>
    </div>
  ),
};