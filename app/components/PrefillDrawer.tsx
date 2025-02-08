"use client";

import { Drawer, Box, Typography, Accordion, AccordionSummary, AccordionDetails, FormHelperText } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import React from 'react';
import { Node, Edge } from 'react-flow-renderer';

interface PrefillDrawerProps {
    isOpen: boolean;
    onClose: () => void;
    field: string | null;
    node: Node;
    nodes: Node[];
    edges: Edge[];
    onSelectPrefill: (value: string) => void;
}

const PrefillDrawer: React.FC<PrefillDrawerProps> = ({
    isOpen,
    onClose,
    field,
    node,
    nodes,
    edges,
    onSelectPrefill,
}) => {
    // Function to find all upstream nodes
    const findUpstreamNodes = (currentNode: Node, nodes: Node[], edges: Edge[]): Node[] => {
        const upstreamNodes: Node[] = [];
        const visited = new Set<string>();

        const traverse = (nodeId: string) => {
            if (visited.has(nodeId)) return;
            visited.add(nodeId);

            // Find edges where the current node is the target
            edges.forEach((edge) => {
                if (edge.target === nodeId) {
                    const upstreamNode = nodes.find((n) => n.id === edge.source);
                    if (upstreamNode && !upstreamNodes.some((n) => n.id === upstreamNode.id)) {
                        upstreamNodes.push(upstreamNode);
                        traverse(upstreamNode.id); // Recursively traverse further upstream
                    }
                }
            });
        };

        traverse(currentNode.id);
        return upstreamNodes;
    };

    const upstreamNodes = findUpstreamNodes(node, nodes, edges);

    // Dummy data for "Action Properties"
    const actionProperties = {
        "action_id": "Action ID",
        "action_name": "Action Name",
        "action_status": "Action Status",
    };
    // Dummy data for "Client Organization Properties"
    const clientOrganizationProperties = {
        "org_id": "Organization ID",
        "org_name": "Organization Name",
        "org_address": "Organization Address",
    };

    return (
        <Drawer
            anchor="left"
            open={isOpen}
            onClose={onClose}
            sx={{
                '& .MuiDrawer-paper': {
                    width: 400,
                    p: 2,
                },
            }}
        >   <Box mb={3}>
                <Typography variant="h6" mb={2}>
                    Select data element to map
                </Typography>
                <FormHelperText>
                    for {node.data.label}'s {field}
                </FormHelperText>
            </Box>
            <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography>Action Properties</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    {Object.entries(actionProperties).map(([key, label]) => (
                        <Box
                            key={`action-property-${key}`}
                            sx={{
                                p: 1,
                                cursor: 'pointer',
                                '&:hover': { backgroundColor: '#f5f5f5' },
                            }}
                            onClick={() => onSelectPrefill(`Action Properties.${label}`)}
                        >
                            <Typography>{label}</Typography>
                        </Box>
                    ))}
                </AccordionDetails>
            </Accordion>

            <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography>Client Organization Properties</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    {Object.entries(clientOrganizationProperties).map(([key, label]) => (
                        <Box
                            key={`client-org-property-${key}`}
                            sx={{
                                p: 1,
                                cursor: 'pointer',
                                '&:hover': { backgroundColor: '#f5f5f5' },
                            }}
                            onClick={() => onSelectPrefill(`Client Organization Properties.${label}`)}
                        >
                            <Typography>{label}</Typography>
                        </Box>
                    ))}
                </AccordionDetails>
            </Accordion>

            {upstreamNodes.length > 0 ? (
                upstreamNodes.map((upstreamNode) => (
                    <Accordion key={`accordion-${upstreamNode.id}`}>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                            <Typography>{upstreamNode.data.label}</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            {Object.keys(upstreamNode.data.fieldSchema?.properties || {}).map((fieldName) => (
                                <Box
                                    key={`field-${upstreamNode.id}-${fieldName}`}
                                    sx={{
                                        p: 1,
                                        cursor: 'pointer',
                                        '&:hover': { backgroundColor: '#f5f5f5' },
                                    }}
                                    onClick={() => onSelectPrefill(`${upstreamNode.data.label}.${fieldName}`)}
                                >
                                    <Typography>{fieldName}</Typography>
                                </Box>
                            ))}
                        </AccordionDetails>
                    </Accordion>
                ))
            ) : (
                <Box p={2}>
                    <Typography>No upstream nodes found.</Typography>
                </Box>
            )}
        </Drawer>
    );
};

export default PrefillDrawer;