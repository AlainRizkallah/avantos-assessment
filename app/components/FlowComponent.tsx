"use client";

import React, { useEffect, useState } from 'react';
import ReactFlow, { Controls, Node, Edge } from 'react-flow-renderer';
import NodeDetails from './NodeDetails';
import { Box, Paper } from '@mui/material';

interface FlowComponentProps {
    onNodeClick: (event: React.MouseEvent, node: Node) => void;
}

const FlowComponent: React.FC<FlowComponentProps> = ({ onNodeClick }) => {
    const [nodes, setNodes] = useState<Node[]>([]);
    const [edges, setEdges] = useState<Edge[]>([]);
    const [selectedNode, setSelectedNode] = useState<Node | null>(null);

    useEffect(() => {
        const fetchGraphData = async () => {
            try {
                const response = await fetch('http://localhost:3001/api/v1/1/actions/blueprints/bp_01jk766tckfwx84xjcxazggzyc/graph');
                const data = await response.json();
                // console.log('Fetched Data:', data);

                // Transform nodes
                const transformedNodes = data.nodes.map((node: any) => ({
                    id: node.id,
                    type: node.type,
                    position: node.position,
                    data: {
                        ...node.data,
                        label: node.data.name,
                        fieldSchema: data.forms.find((form: any) => form.id === node.data.component_id)?.field_schema,
                    },
                    sourcePosition: 'right',
                    targetPosition: 'left'
                }));

                // Transform edges
                const transformedEdges = data.edges.map((edge: any, index: number) => ({
                    ...edge,
                    id: `edge-${index}-${edge.source}-${edge.target}`,
                }));

                // console.log('Transformed Nodes:', transformedNodes);
                // console.log('Transformed Edges:', transformedEdges);
                setNodes(transformedNodes);
                setEdges(transformedEdges);
            } catch (error) {
                console.error('Error fetching graph data:', error);
            }
        };

        fetchGraphData();
    }, []);

    return (
        <Box display="flex" flexDirection="column" height="100vh" p={2} gap={2}>
            <Box flex={selectedNode ? 2 : 1} component={Paper} p={2} overflow="auto">
                <ReactFlow
                    nodes={nodes}
                    edges={edges}
                    onNodeClick={(event, node) => {
                        setSelectedNode(node);
                        onNodeClick(event, node);
                    }}
                >
                    <Controls />
                </ReactFlow>
            </Box>
            {selectedNode && (
                <Box flex={1} component={Paper} p={2} overflow="auto">
                    <NodeDetails
                        node={selectedNode}
                        nodes={nodes}
                        edges={edges}
                    />
                </Box>
            )}
        </Box>
    );
};

export default FlowComponent;