import * as React from 'react';
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  Container,
  Avatar,
  Button,
  Tooltip,
  MenuItem,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import AdbIcon from '@mui/icons-material/Adb';
import { Link, useNavigate } from 'react-router-dom';
import { useTokenStore } from '../../store/authStore';
import { toast } from 'react-toastify';
import { profile_pic } from '../../api/axios/axios';

const pages = ['List', 'Create'];
const settings = ['ProfileDetails', 'Logout'];

function ResponsiveAppBar() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const navigate = useNavigate();
  const name = localStorage.getItem('name');
  const dp = localStorage.getItem('dp');
  const setToken = useTokenStore((state) => state.setToken);
  const token = useTokenStore((state) => state.token);

  const handleOpenNavMenu = (event) => setAnchorElNav(event.currentTarget);
  const handleOpenUserMenu = (event) => setAnchorElUser(event.currentTarget);
  const handleCloseNavMenu = () => setAnchorElNav(null);
  const handleCloseUserMenu = () => setAnchorElUser(null);

  const handleLogOut = () => {
    localStorage.removeItem('token');
    setToken();
    navigate('/');
    toast.success('Logout Successful');
  };

  const handleUserMenuClick = (setting) => {
    if (setting === 'Logout') {
      handleLogOut();
    } else if (setting === 'ProfileDetails') {
      navigate('/auth/profileDetails');
    }
    handleCloseUserMenu();
  };

  React.useEffect(() => {
    setToken();
  }, []);

  return (
    <AppBar position="static" sx={{ backgroundColor: '#2d3748', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{ justifyContent: 'space-between' }}>
          {/* Logo - Desktop */}
          <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center' }}>
            <AdbIcon sx={{ color: '#FF8C00', mr: 1 }} />
            <Typography
              variant="h6"
              component={Link}
              to="/"
              sx={{
                color: '#fff',
                fontWeight: 700,
                textDecoration: 'none',
                letterSpacing: '.1rem',
                '&:hover': { color: '#FF8C00' },
              }}
            >
              LOGO
            </Typography>
          </Box>

          {/* Mobile Menu Icon */}
          <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
            <IconButton onClick={handleOpenNavMenu} color="inherit">
              <MenuIcon />
            </IconButton>
            <Menu
              anchorEl={anchorElNav}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
              transformOrigin={{ vertical: 'top', horizontal: 'left' }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography
                    component={Link}
                    to={`/cms/${page.toLowerCase()}`}
                    sx={{ color: 'inherit', textDecoration: 'none', fontWeight: 600 }}
                  >
                    {page}
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          {/* Logo - Mobile */}
          <Box sx={{ display: { xs: 'flex', md: 'none' }, alignItems: 'center' }}>
            <AdbIcon sx={{ color: '#FF8C00', mr: 1 }} />
            <Typography
              variant="h6"
              component={Link}
              to="/"
              sx={{
                color: '#fff',
                fontWeight: 700,
                textDecoration: 'none',
                letterSpacing: '.1rem',
              }}
            >
              LOGO
            </Typography>
          </Box>

          {/* Nav Links + User Info */}
          <Box sx={{ display: 'flex', alignItems: 'center', ml: 'auto', gap: 2 }}>
            {token && (
              <>
                {pages.map((page) => (
                  <Button
                    key={page}
                    component={Link}
                    to={`/cms/${page.toLowerCase()}`}
                    sx={{
                      color: '#fff',
                      fontWeight: 700,
                      textTransform: 'capitalize',
                      fontSize: '0.95rem',
                      borderBottom: '2px solid transparent',
                      '&:hover': {
                        color: '#FF8C00',
                        backgroundColor: 'transparent',
                        borderBottom: '2px solid #FF8C00',
                      },
                    }}
                  >
                    {page}
                  </Button>
                ))}
                <Typography
                  variant="subtitle1"
                  sx={{
                    color: '#fff',
                    fontWeight: 700,
                    fontSize: '1rem',
                    px: 1,
                  }}
                >
                  {name}
                </Typography>
                <Tooltip title="Open settings">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar
                      alt={name}
                      src={profile_pic(dp)}
                      sx={{ border: '2px solid #FF8C00', width: 40, height: 40 }}
                    />
                  </IconButton>
                </Tooltip>
                <Menu
                  anchorEl={anchorElUser}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                  anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                  transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                  sx={{ mt: 1.5 }}
                >
                  {settings.map((setting) => (
                    <MenuItem
                      key={setting}
                      onClick={() => handleUserMenuClick(setting)}
                      sx={{
                        fontWeight: 600,
                        '&:hover': {
                          backgroundColor: '#f5f5f5',
                          color: '#FF8C00',
                        },
                      }}
                    >
                      <Typography textAlign="center">{setting}</Typography>
                    </MenuItem>
                  ))}
                </Menu>
              </>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default ResponsiveAppBar;
