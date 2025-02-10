import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import PrefillDrawer from '../components/PrefillDrawer';

const mockNode = {
  id: '1',
  data: { label: 'Node 1', fieldSchema: { properties: { field1: { title: 'Field 1' } } } },
};

describe('PrefillDrawer', () => {
  it('renders correctly when open', () => {
    render(
      <PrefillDrawer
        isOpen={true}
        onClose={jest.fn()}
        field="field1"
        node={mockNode}
        nodes={[]}
        edges={[]}
        onSelectPrefill={jest.fn()}
      />
    );

    expect(screen.getByText('Select data element to map')).toBeInTheDocument();
  });

  it('calls onClose when drawer is closed', () => {
    const mockOnClose = jest.fn();

    render(
      <PrefillDrawer
        isOpen={true}
        onClose={mockOnClose}
        field="field1"
        node={mockNode}
        nodes={[]}
        edges={[]}
        onSelectPrefill={jest.fn()}
      />
    );

    // Find the backdrop (Material UI draws an invisible overlay that can be clicked)
    const backdrop = document.querySelector('.MuiBackdrop-root');
    
    if (backdrop) {
      fireEvent.click(backdrop);
    } else {
      throw new Error('Backdrop not found. Check Material UI drawer behavior.');
    }

    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });
});
