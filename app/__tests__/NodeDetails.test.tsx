import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import NodeDetails from '../components/NodeDetails';

const mockNode = {
  id: '1',
  data: { label: 'Node 1', fieldSchema: { properties: { field1: { title: 'Field 1' } } } },
};

describe('NodeDetails', () => {
  it('renders without crashing', () => {
    render(<NodeDetails node={mockNode} nodes={[]} edges={[]} />);
    expect(screen.getByText('Prefill')).toBeInTheDocument();
  });

  it('displays field schema properties', () => {
    render(<NodeDetails node={mockNode} nodes={[]} edges={[]} />);
    expect(screen.getByText('field1')).toBeInTheDocument();
  });

  it('opens prefill drawer when a field is clicked', () => {
    render(<NodeDetails node={mockNode} nodes={[]} edges={[]} />);
    
    // Simulate clicking on a field
    fireEvent.click(screen.getByText('field1'));

    // Check if the drawer opened (would be mocked)
    expect(screen.getByText('Select data element to map')).toBeInTheDocument();
  });
});
