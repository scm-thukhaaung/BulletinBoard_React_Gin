import { useTypewriter } from 'react-simple-typewriter';
import SearchIcon from '@mui/icons-material/Search';
import { Box, AppBar, Tooltip, IconButton, Avatar, Menu, MenuItem, Typography, ThemeProvider } from '@mui/material';
import { useState } from "react";
import LoyaltyIcon from '@mui/icons-material/Loyalty';
import classes from "./Header.module.css";
import { Search, SearchIconWrapper, StyledInputBase, ToolBarStyle, FontTheme } from "../custom_mui/CustomMUI";
import { useNavigate } from "react-router-dom";

const Header = () => {
    const navigate = useNavigate();
    const navigate = useNavigate();

    const [text] = useTypewriter({
        words: ['ရင်ဖွင့်ပါ', 'ရင်ဖွင့်ရာ', 'Bulletin Board ပါ'],
        loop: false
    });

    const [anchorElUser, setAnchorElUser] = useState(null);

    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const handleCreate = () => {
        navigate('/users');
    };

    const handleUserList = () => {
        navigate('/userlist');
    };

    const handleLogout = () => {
        navigate('/login');
    };

    return (
        <Box sx={{ flexGrow: 1 }} >
            <AppBar position="fixed" sx={{ borderBottom: "5px solid #000000; " }}>
                <ToolBarStyle display="large">
                    <h1 className={classes["h1-txt-1"]}>
                        "&nbsp; <LoyaltyIcon fontSize='large' /> &nbsp; {text} "
                    </h1>
                    <div className={classes["search-bar-menu-div"]}>
                        <Search>
                            <SearchIconWrapper>
                                <SearchIcon fontSize='medium' htmlColor='#000' />
                            </SearchIconWrapper>
                            <StyledInputBase
                                placeholder="ရင်ဖွင့်စာများ ရှာပါ..."
                                inputProps={{ 'aria-label': 'search' }}
                            />
                        </Search>

                        <Box sx={{ flexGrow: 0 }}>
                            <ThemeProvider theme={FontTheme}>
                                <Tooltip title="setting ကို ဖွင့်ပါ...">
                                    <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                        <Avatar sx={{ bgcolor: "#000" }} alt="သုခ" src="/static/images/avatar/2.jpg" />
                                    </IconButton>
                                </Tooltip>

                                <Menu
                                    sx={{ mt: '45px' }}
                                    id="menu-appbar"
                                    anchorEl={anchorElUser}
                                    anchorOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                    keepMounted
                                    transformOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                    open={Boolean(anchorElUser)}
                                    onClose={handleCloseUserMenu}
                                >
                                    <MenuItem key="Menu-Item0"
                                        onClick={handleCreate}
                                        sx={{
                                            '&:hover': {
                                                color: '#fff',
                                                backgroundColor: '#f5ba13',
                                            },
                                        }}
                                    >
                                        <Typography textAlign="center"> အသုံးပြုသူဖန်တီးမည် </Typography>
                                    </MenuItem>
                                    <MenuItem key="Menu-Item1"
                                        onClick={handleCloseUserMenu}
                                        sx={{
                                            '&:hover': {
                                                color: '#fff',
                                                backgroundColor: '#f5ba13',
                                            },
                                        }}
                                    >
                                        <Typography textAlign="center"> Profile ထဲ ဝင်မည် </Typography>
                                    </MenuItem>
                                    <MenuItem key="Menu-Item2"
                                        onClick={handleUserList}
                                        sx={{
                                            '&:hover': {
                                                color: '#fff',
                                                backgroundColor: '#f5ba13',
                                            },
                                        }}
                                    >
                                        <Typography textAlign="center"> User List ကြည့်မည် </Typography>
                                    </MenuItem>
                                    <MenuItem key="Menu-Item3"
                                        onClick={handleCloseUserMenu}
                                        sx={{
                                            '&:hover': {
                                                color: '#fff',
                                                backgroundColor: '#f5ba13',
                                            },
                                        }}
                                    >
                                        <Typography textAlign="center" onClick={handleLogout}> Logout ထွက်မည် </Typography>
                                    </MenuItem>
                                </Menu>
                            </ThemeProvider>
                        </Box>
                    </div>
                </ToolBarStyle>

            </AppBar>
        </Box>
    );
};

export default Header;