import { Box, Typography } from "@mui/material";

export const Detail: React.FC<{ title: string, content: React.ReactNode }> = ({ title, content }) => (
  <Box>
    <Typography variant="overline">{title}:</Typography>
    <Typography>{content}</Typography>
  </Box>
);
