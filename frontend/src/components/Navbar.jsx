import { AppBar, Toolbar, Typography, Box } from '@mui/material';
import logo from '../assets/header_logo.png';

const Navbar = () => {
  return (
    <AppBar position="static" sx={{ backgroundColor: '#000', height:'80px', justifyContent: 'center' }}>
      
      <Toolbar className="w-full justify-between relative">
        <Typography variant="h6" component="div" className="absolute left-1/2 transform -translate-x-1/2">
          Monitoramento de Logs
        </Typography>

        <Box className="mr-4">
          <img src={logo} alt="Logo" className="h-3 w-auto object-contain"/>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
