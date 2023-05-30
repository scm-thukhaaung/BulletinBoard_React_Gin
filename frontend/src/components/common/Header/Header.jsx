import { useTypewriter } from 'react-simple-typewriter';
import SearchIcon from '@mui/icons-material/Search';
import { Box, AppBar, Tooltip, IconButton, Avatar, Menu, MenuItem, Typography, ThemeProvider } from '@mui/material';
import { useState } from "react";
import DraftsIcon from '@mui/icons-material/Drafts';
import classes from "./Header.module.css";
import { Search, SearchIconWrapper, StyledInputBase, ToolBarStyle, FontTheme } from "../custom_mui/CustomMUI";

const settings = ['Profile ထဲ ဝင်မည်', 'User List ကြည့်မည်', 'Logout ထွက်မည်'];

const Header = () => {

    const [text] = useTypewriter({
        words: ['ရင်ဖွင့်ပါ', 'ရင်ဖွင့်ရာ', 'ဘူလတင် ဘုတ်ပါ'],
        loop: false
    });

    const [anchorElUser, setAnchorElUser] = useState(null);

    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    return (
        <Box sx={{ flexGrow: 1 }} >
            <AppBar position="fixed" sx={{ borderBottom: "5px solid #000000; " }}>
                <ToolBarStyle display="large">
                    <h1 className={classes["h1-txt-1"]}>
                        "&nbsp; <DraftsIcon fontSize='large' /> &nbsp; {text} "
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
                                    {settings.map((setting) => (
                                        <MenuItem key={setting}
                                            onClick={handleCloseUserMenu}
                                            sx={{
                                                '&:hover': {
                                                    color: '#fff',
                                                    backgroundColor: '#f5ba13',
                                                },
                                            }}
                                        >
                                            <Typography textAlign="center">{setting}</Typography>
                                        </MenuItem>
                                    ))}
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