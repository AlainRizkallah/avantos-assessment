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
      <Box  p={2} overflow="auto" bgcolor={"grey"}>
        <FlowComponent onNodeClick={handleNodeClick} />
      </Box>
  );
};

export default HomePage;