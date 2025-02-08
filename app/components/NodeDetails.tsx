"use client";

import { Storage } from '@mui/icons-material';
import { Box, Chip, FormHelperText, InputAdornment, Paper, Stack, Switch, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import { Node, Edge } from 'react-flow-renderer';


interface NodeDetailsProps {
    node: Node | null;
}

const NodeDetails: React.FC<NodeDetailsProps> = ({ node }) => {
    const [isPrefillEnabled, setIsPrefillEnabled] = useState(true);
    if (!node) return null;

    const handleDelete = () => {
        console.info('You clicked the delete icon.');
    };

    return (
        <Paper elevation={3} sx={{ p: 2, borderRadius: 2, mx: 40 }}>
            <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
                <Box><Typography variant="h6">Prefill</Typography>
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

                <TextField variant="outlined" value="dynamic_checkbox_group" fullWidth slotProps={{
                    input: {
                        startAdornment: (
                            <InputAdornment position="start">
                                <Storage />
                            </InputAdornment>
                        ),
                    },
                }} />
                <TextField variant="outlined" value="dynamic_object" fullWidth slotProps={{
                    input: {
                        startAdornment: (
                            <InputAdornment position="start">
                                <Storage />
                            </InputAdornment>
                        ),
                    },
                }} />
                <Chip label="Form A.email" onDelete={handleDelete} />

            </Box>
        </Paper>
    );
};

export default NodeDetails;