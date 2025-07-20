import type { Preview } from '@storybook/nextjs'
import '../src/styles/globals.css' // Import Tailwind CSS
import React from 'react'

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
       color: /(background|color)$/i,
       date: /Date$/i,
      },
    },
    viewport: {
      viewports: {
        mobile1: {
          name: 'Small mobile',
          styles: { width: '320px', height: '568px' },
        },
        mobile2: {
          name: 'Large mobile',
          styles: { width: '414px', height: '896px' },
        },
        tablet: {
          name: 'Tablet',
          styles: { width: '768px', height: '1024px' },
        },
      },
    },
    layout: 'fullscreen',
  },
  decorators: [
    (Story) => React.createElement('div', { className: 'antialiased' }, React.createElement(Story)),
  ],
};

export default preview;