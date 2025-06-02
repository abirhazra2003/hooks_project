import React from 'react';
import { Box, Typography } from '@mui/material';
import SentimentDissatisfiedIcon from '@mui/icons-material/SentimentDissatisfied';

export default function NoData() {
    return (
        <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            height="50vh"
            color="text.secondary"
        >
            <SentimentDissatisfiedIcon sx={{ fontSize: 60, mb: 2 }} />
            <Typography variant="h6" fontWeight={500}>
                No data found
            </Typography>
        </Box>
    );
}