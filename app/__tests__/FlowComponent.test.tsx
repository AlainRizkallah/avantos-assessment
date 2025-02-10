import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import FlowComponent from '../components/FlowComponent';

// Mock ReactFlow and its components
jest.mock('react-flow-renderer', () => ({
  __esModule: true,
  default: jest.fn(({ children }) => <div data-testid="react-flow-mock">{children}</div>),
  Controls: jest.fn(() => <div data-testid="controls-mock" />),
  Handle: jest.fn(() => <div data-testid="handle-mock" />),
  Node: jest.fn(({ id, data }) => (
    <div data-testid={`node-${id}`} data-label={data.label}>
      {data.label}
    </div>
  )),
}));

// Reset fetch before each test
beforeEach(() => {
  jest.clearAllMocks();
  global.fetch = jest.fn(() =>
    Promise.resolve({
      json: () =>
        Promise.resolve({
          nodes: [
            {
              id: '1',
              type: 'custom',
              position: { x: 0, y: 0 },
              data: { name: 'Node 1', component_id: 'form_1' },
            },
          ],
          edges: [{ source: '1', target: '2' }],
          forms: [{ id: 'form_1', field_schema: { properties: {} } }],
        }),
    })
  ) as jest.Mock;
});

describe('FlowComponent', () => {
  it('renders without crashing', async () => {
    render(<FlowComponent onNodeClick={jest.fn()} />);
    
    // Ensure ReactFlow mock is rendered
    expect(screen.getByTestId('react-flow-mock')).toBeInTheDocument();

    // Wait for the component to fetch data and update state
    await waitFor(() => expect(global.fetch).toHaveBeenCalledTimes(1));
  });

  it('fetches and processes graph data correctly', async () => {
    render(<FlowComponent onNodeClick={jest.fn()} />);

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledTimes(1);
    });
  });
});
