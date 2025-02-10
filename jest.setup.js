global.ResizeObserver = class {
  observe() {}
  unobserve() {}
  disconnect() {}
};

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({
      nodes: [],
      edges: [],
      forms: [],
    }),
  })
);


jest.mock('react-flow-renderer', () => ({
  __esModule: true,
  default: () => <div data-testid="react-flow-mock" />,
  Controls: () => <div data-testid="controls-mock" />,
}));


jest.mock('@mui/material', () => {
  const actualMUI = jest.requireActual('@mui/material');
  return {
    ...actualMUI,
    useMediaQuery: jest.fn(() => false),
  };
});
