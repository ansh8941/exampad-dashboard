import { Box } from '@mui/material';

// ----------------------------------------------------------------------

export interface SvgIconStyleTypes {
  src: string;
  sx?: {};
}

export default function SvgIconStyle({ src, sx }: SvgIconStyleTypes) {
  return (
    <Box
      component="span"
      sx={{
        width: 24,
        height: 24,
        display: 'inline-block',
        bgcolor: 'currentColor',
        mask: `url(${src}) no-repeat center / contain`,
        WebkitMask: `url(${src}) no-repeat center / contain`,
        ...sx,
      }}
    />
  );
}
