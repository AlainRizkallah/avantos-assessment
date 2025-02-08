"use client";

import React, { useState } from 'react';
import FlowComponent from './components/FlowComponent';
import NodeDetails from './components/NodeDetails';
import { Box, Paper } from '@mui/material';

const HomePage = () => {
  const [selectedNode, setSelectedNode] = useState(null);

  const handleNodeClick = (event: React.MouseEvent, node: any) => {
    setSelectedNode(node);
  };

  return (
    <Box display="flex" flexDirection="column" height="100vh" p={2} gap={2}>
      <Box flex={selectedNode ? 2 : 1} component={Paper} p={2} overflow="auto">
        <FlowComponent onNodeClick={handleNodeClick} />
      </Box>

      {selectedNode && (
        <Box flex={1} component={Paper} p={2} overflow="auto">
          <NodeDetails node={selectedNode} />
        </Box>
      )}
    </Box>
  );
};

export default HomePage;