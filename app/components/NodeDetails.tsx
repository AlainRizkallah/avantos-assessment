"use client";

import { Box, Chip, FormHelperText, Paper, Stack, Switch, Typography } from '@mui/material';
import React, { useState } from 'react';
import { Edge, Node } from 'react-flow-renderer';
import PrefillDrawer from './PrefillDrawer';

interface NodeDetailsProps {
    node: Node | null;
    nodes: Node[];
    edges: Edge[];
}

interface FieldSchema {
    [key: string]: {
        avantos_type: string;
        title: string;
        type: string;
        format?: string;
        items?: {
            enum: string[];
            type: string;
        };
        uniqueItems?: boolean;
    };
}

const NodeDetails: React.FC<NodeDetailsProps> = ({ node, nodes, edges }) => {
    const [isPrefillEnabled, setIsPrefillEnabled] = useState(true);
    const [selectedField, setSelectedField] = useState<string | null>(null);
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [prefillConfig, setPrefillConfig] = useState<Record<string, Record<string, string | null>>>({});

    if (!node) return null;

    const fieldSchema: FieldSchema = node.data.fieldSchema?.properties || {};
    const nodePrefillConfig = prefillConfig[node.id] || {};

    const handleFieldClick = (fieldName: string) => {
        setSelectedField(fieldName);
        setIsDrawerOpen(true);
    };

    const handleSelectPrefill = (value: string) => {
        if (selectedField) {
            setPrefillConfig((prev) => ({
                ...prev,
                [node.id]: {
                    ...prev[node.id],
                    [selectedField]: value,
                },
            }));
        }
        setIsDrawerOpen(false);
    };

    const handleDeletePrefill = (fieldName: string) => {
        setPrefillConfig((prev) => ({
            ...prev,
            [node.id]: {
                ...prev[node.id],
                [fieldName]: null,
            },
        }));
    };

    return (
        <Paper elevation={3} sx={{ p: 2, borderRadius: 2, mx: 40 }}>
            <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
                <Box>
                    <Typography variant="h6">Prefill</Typography>
                    <FormHelperText id="component-helper-text">
                        Prefill fields for {node.data.label}
                    </FormHelperText>
                </Box>
                <Switch
                    checked={isPrefillEnabled}
                    onChange={(e) => setIsPrefillEnabled(e.target.checked)}
                />
            </Stack>

            <Box sx={{ width: 400, display: "flex", flexDirection: "column", gap: 1 }}>
                {Object.keys(fieldSchema).map((fieldName) => (
                    <React.Fragment key={fieldName}>
                        {nodePrefillConfig[fieldName] ? (
                            <Chip
                                label={`${fieldName}: ${nodePrefillConfig[fieldName]}`}
                                onDelete={() => handleDeletePrefill(fieldName)}
                                sx={{ mt: 1 }}
                            />
                        ) : (
                            <Paper
                                elevation={1}
                                sx={{
                                    p: 1,
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 1,
                                    cursor: 'pointer',
                                    '&:hover': { backgroundColor: '#f5f5f5' },
                                }}
                                onClick={() => handleFieldClick(fieldName)}
                            >
                                <Typography variant="body1">{fieldName}</Typography>
                            </Paper>
                        )}
                    </React.Fragment>
                ))}
            </Box>

            <PrefillDrawer
                isOpen={isDrawerOpen}
                onClose={() => setIsDrawerOpen(false)}
                field={selectedField}
                node={node}
                nodes={nodes}
                edges={edges}
                onSelectPrefill={handleSelectPrefill}
            />
        </Paper>
    );
};

export default NodeDetails;