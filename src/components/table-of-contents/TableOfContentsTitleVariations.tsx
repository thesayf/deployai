import React from 'react';

// Design System Colors
const colors = {
  white: '#FFFFFF',
  black: '#000000',
  electricOrange: '#FF6B35',
  crimsonRed: '#E63946',
  cyberBlue: '#457B9D',
  deepMagenta: '#D62598',
  concrete: '#F5F5F5',
  steel: '#E0E0E0',
  graphite: '#757575',
  charcoal: '#424242',
  obsidian: '#212121',
};

export const TableOfContentsTitleVariations: React.FC = () => {
  return (
    <div style={{ padding: '48px', background: colors.concrete }}>
      <h1 style={{ marginBottom: '48px', fontSize: '32px', fontWeight: 'bold' }}>
        Table of Contents Title Variations
      </h1>

      {/* Variation 1: Classic Bold with Border */}
      <div style={{ marginBottom: '48px' }}>
        <h3 style={{ marginBottom: '16px', color: colors.graphite }}>
          1. Classic Bold with Border
        </h3>
        <div style={{
          background: colors.white,
          border: `3px solid ${colors.black}`,
          boxShadow: `6px 6px 0px ${colors.black}`,
          padding: '24px',
          width: '300px',
        }}>
          <h3 style={{
            fontSize: '18px',
            fontWeight: 'bold',
            textTransform: 'uppercase',
            paddingBottom: '16px',
            borderBottom: `3px solid ${colors.black}`,
            marginBottom: '24px',
          }}>
            Table of Contents
          </h3>
          <div style={{ color: colors.graphite }}>
            • Introduction<br/>
            • Main Topic<br/>
            • Conclusion
          </div>
        </div>
      </div>

      {/* Variation 2: Accent Background Block */}
      <div style={{ marginBottom: '48px' }}>
        <h3 style={{ marginBottom: '16px', color: colors.graphite }}>
          2. Accent Background Block
        </h3>
        <div style={{
          background: colors.white,
          border: `3px solid ${colors.black}`,
          boxShadow: `6px 6px 0px ${colors.black}`,
          padding: '24px',
          width: '300px',
        }}>
          <div style={{
            background: colors.electricOrange,
            color: colors.white,
            padding: '12px 16px',
            marginBottom: '24px',
            marginLeft: '-24px',
            marginRight: '-24px',
            marginTop: '-24px',
            borderBottom: `3px solid ${colors.black}`,
          }}>
            <h3 style={{
              fontSize: '16px',
              fontWeight: 'bold',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
            }}>
              Table of Contents
            </h3>
          </div>
          <div style={{ color: colors.graphite }}>
            • Introduction<br/>
            • Main Topic<br/>
            • Conclusion
          </div>
        </div>
      </div>

      {/* Variation 3: Side Accent Bar */}
      <div style={{ marginBottom: '48px' }}>
        <h3 style={{ marginBottom: '16px', color: colors.graphite }}>
          3. Side Accent Bar
        </h3>
        <div style={{
          background: colors.white,
          border: `3px solid ${colors.black}`,
          boxShadow: `6px 6px 0px ${colors.black}`,
          padding: '24px',
          width: '300px',
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            marginBottom: '24px',
          }}>
            <div style={{
              width: '4px',
              height: '24px',
              background: colors.electricOrange,
              marginRight: '12px',
            }}></div>
            <h3 style={{
              fontSize: '18px',
              fontWeight: 'bold',
              textTransform: 'uppercase',
            }}>
              Table of Contents
            </h3>
          </div>
          <div style={{ color: colors.graphite }}>
            • Introduction<br/>
            • Main Topic<br/>
            • Conclusion
          </div>
        </div>
      </div>

      {/* Variation 4: Outlined Text */}
      <div style={{ marginBottom: '48px' }}>
        <h3 style={{ marginBottom: '16px', color: colors.graphite }}>
          4. Outlined Text
        </h3>
        <div style={{
          background: colors.white,
          border: `3px solid ${colors.black}`,
          boxShadow: `6px 6px 0px ${colors.black}`,
          padding: '24px',
          width: '300px',
        }}>
          <h3 style={{
            fontSize: '18px',
            fontWeight: 'bold',
            textTransform: 'uppercase',
            marginBottom: '24px',
            color: colors.white,
            WebkitTextStroke: `2px ${colors.black}`,
            letterSpacing: '0.05em',
          }}>
            Table of Contents
          </h3>
          <div style={{ color: colors.graphite }}>
            • Introduction<br/>
            • Main Topic<br/>
            • Conclusion
          </div>
        </div>
      </div>

      {/* Variation 5: Badge Style */}
      <div style={{ marginBottom: '48px' }}>
        <h3 style={{ marginBottom: '16px', color: colors.graphite }}>
          5. Badge Style
        </h3>
        <div style={{
          background: colors.white,
          border: `3px solid ${colors.black}`,
          boxShadow: `6px 6px 0px ${colors.black}`,
          padding: '24px',
          width: '300px',
        }}>
          <div style={{
            display: 'inline-block',
            background: colors.white,
            border: `2px solid ${colors.black}`,
            boxShadow: `3px 3px 0px ${colors.electricOrange}`,
            padding: '8px 16px',
            marginBottom: '24px',
          }}>
            <h3 style={{
              fontSize: '14px',
              fontWeight: 'bold',
              textTransform: 'uppercase',
              margin: 0,
            }}>
              Table of Contents
            </h3>
          </div>
          <div style={{ color: colors.graphite }}>
            • Introduction<br/>
            • Main Topic<br/>
            • Conclusion
          </div>
        </div>
      </div>

      {/* Variation 6: Minimal with Dots */}
      <div style={{ marginBottom: '48px' }}>
        <h3 style={{ marginBottom: '16px', color: colors.graphite }}>
          6. Minimal with Dots
        </h3>
        <div style={{
          background: colors.white,
          border: `3px solid ${colors.black}`,
          boxShadow: `6px 6px 0px ${colors.black}`,
          padding: '24px',
          width: '300px',
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            marginBottom: '24px',
            gap: '8px',
          }}>
            <div style={{ display: 'flex', gap: '4px' }}>
              <div style={{
                width: '8px',
                height: '8px',
                background: colors.electricOrange,
                border: `2px solid ${colors.black}`,
              }}></div>
              <div style={{
                width: '8px',
                height: '8px',
                background: colors.cyberBlue,
                border: `2px solid ${colors.black}`,
              }}></div>
              <div style={{
                width: '8px',
                height: '8px',
                background: colors.deepMagenta,
                border: `2px solid ${colors.black}`,
              }}></div>
            </div>
            <h3 style={{
              fontSize: '16px',
              fontWeight: 'bold',
              textTransform: 'uppercase',
              margin: 0,
            }}>
              Contents
            </h3>
          </div>
          <div style={{ color: colors.graphite }}>
            • Introduction<br/>
            • Main Topic<br/>
            • Conclusion
          </div>
        </div>
      </div>

      {/* Variation 7: Icon with Title */}
      <div style={{ marginBottom: '48px' }}>
        <h3 style={{ marginBottom: '16px', color: colors.graphite }}>
          7. Icon with Title
        </h3>
        <div style={{
          background: colors.white,
          border: `3px solid ${colors.black}`,
          boxShadow: `6px 6px 0px ${colors.black}`,
          padding: '24px',
          width: '300px',
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            marginBottom: '24px',
          }}>
            <svg 
              width="24" 
              height="24" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke={colors.electricOrange} 
              strokeWidth="3"
              strokeLinecap="square"
            >
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="18" x2="21" y2="18" />
              <line x1="3" y1="6" x2="3" y2="18" />
            </svg>
            <h3 style={{
              fontSize: '16px',
              fontWeight: 'bold',
              textTransform: 'uppercase',
              margin: 0,
            }}>
              Navigation
            </h3>
          </div>
          <div style={{ color: colors.graphite }}>
            • Introduction<br/>
            • Main Topic<br/>
            • Conclusion
          </div>
        </div>
      </div>

      {/* Variation 8: Stacked Bold */}
      <div style={{ marginBottom: '48px' }}>
        <h3 style={{ marginBottom: '16px', color: colors.graphite }}>
          8. Stacked Bold
        </h3>
        <div style={{
          background: colors.white,
          border: `3px solid ${colors.black}`,
          boxShadow: `6px 6px 0px ${colors.black}`,
          padding: '24px',
          width: '300px',
        }}>
          <div style={{ marginBottom: '24px' }}>
            <div style={{
              fontSize: '14px',
              fontWeight: 'bold',
              color: colors.electricOrange,
              letterSpacing: '0.1em',
              marginBottom: '4px',
            }}>
              TABLE OF
            </div>
            <div style={{
              fontSize: '24px',
              fontWeight: '900',
              color: colors.black,
              letterSpacing: '-0.02em',
              lineHeight: '1',
            }}>
              CONTENTS
            </div>
          </div>
          <div style={{ color: colors.graphite }}>
            • Introduction<br/>
            • Main Topic<br/>
            • Conclusion
          </div>
        </div>
      </div>

      {/* Recommended Option */}
      <div style={{ 
        marginTop: '64px', 
        padding: '32px',
        background: colors.white,
        border: `3px solid ${colors.black}`,
        boxShadow: `6px 6px 0px ${colors.electricOrange}`,
      }}>
        <h2 style={{ marginBottom: '16px', fontSize: '24px', fontWeight: 'bold' }}>
          💡 Recommendation
        </h2>
        <p style={{ color: colors.charcoal, marginBottom: '16px' }}>
          For your neubrutalist brand, I recommend <strong>Variation 2 (Accent Background Block)</strong> or 
          <strong> Variation 3 (Side Accent Bar)</strong>. These options:
        </p>
        <ul style={{ color: colors.charcoal, paddingLeft: '24px' }}>
          <li>Maintain clean, bold typography without text effects</li>
          <li>Use your brand colors effectively</li>
          <li>Create clear visual hierarchy</li>
          <li>Work well at different sizes</li>
          <li>Stay true to neubrutalist principles</li>
        </ul>
      </div>
    </div>
  );
};