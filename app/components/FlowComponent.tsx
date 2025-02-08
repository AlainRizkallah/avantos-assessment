"use client";

import React, { useEffect, useState } from 'react';
import ReactFlow, { Controls, Node, Edge } from 'react-flow-renderer';

interface FlowComponentProps {
    onNodeClick: (event: React.MouseEvent, node: Node) => void;
}

const FlowComponent: React.FC<FlowComponentProps> = ({ onNodeClick }) => {
    const [nodes, setNodes] = useState<Node[]>([]);
    const [edges, setEdges] = useState<Edge[]>([]);

    useEffect(() => {
        const fetchGraphData = async () => {
            try {
                const response = await fetch('/api/action-blueprint-graph-get'); // Fetch the DAG data from the mock server
                const data = await response.json();
                setNodes(data.nodes);
                setEdges(data.edges);
            } catch (error) {
                console.error('Error fetching graph data:', error);
            }
        };

        fetchGraphData();
    }, []);

    return (
        <div style={{ height: '100vh', width: '100vw' }}>
            <ReactFlow
                nodes={nodes}
                edges={edges}
                onNodeClick={onNodeClick}
            >
                <Controls />
            </ReactFlow>
        </div>
    );
};

export default FlowComponent;