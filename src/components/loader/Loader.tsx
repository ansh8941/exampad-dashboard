import { styled } from '@mui/material/styles';
import { LinearProgress, Container } from '@mui/material';

const Loader = () => {
  const ContainerStyle = styled(Container)(({theme}) => ({
    right: '0px',
    left: '0px',
    bottom: '0px',
    zIndex: 9998,
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.palette.background.default,
    height: '100%',
  }));
  return (
    <ContainerStyle maxWidth="sm">
      <LinearProgress color="inherit" sx={{ width: '100%' }} />
    </ContainerStyle>
  );
};

export default Loader;
