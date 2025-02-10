"use client";

import { Drawer, Box, Typography, Accordion, AccordionSummary, AccordionDetails, FormHelperText } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import React from 'react';
import { Node, Edge } from 'react-flow-renderer';
import { prefillConfig } from './prefillConfig';
import { findUpstreamNodes } from '@/utils/findUpstreamNodes';


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
   
    const upstreamNodes = findUpstreamNodes(node, nodes, edges);

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

            {Object.entries(prefillConfig).map(([key, config]) => (
                <Accordion key={key}>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                        <Typography>{config.label}</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        {Object.entries(config.fields).map(([fieldKey, fieldLabel]) => (
                            <Box
                                key={`${key}-${fieldKey}`}
                                sx={{
                                    p: 1,
                                    cursor: 'pointer',
                                    '&:hover': { backgroundColor: '#f5f5f5' },
                                }}
                                onClick={() => onSelectPrefill(`${config.label}.${fieldLabel}`)}
                            >
                                <Typography>{fieldLabel}</Typography>
                            </Box>
                        ))}
                    </AccordionDetails>
                </Accordion>
            ))}

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