import { useTypewriter } from 'react-simple-typewriter';
import "../../css/style.css";
import SearchIcon from '@mui/icons-material/Search';
import { Box, AppBar, Toolbar, Tooltip, IconButton, Avatar, Menu, MenuItem, Typography } from '@mui/material';
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import { useState } from "react";

const settings = ['Profile ထဲ ဝင်မည်', 'Logout ထွက်မည်'];

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    // backgroundColor: alpha(theme.palette.common.white, 0.15),
    backgroundColor: alpha(theme.palette.common.white, 0.7),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.8),
    },
    marginLeft: 0,
    marginRight: 50,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(1),
        width: 'auto',
    },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: '#000',
    fontFamily: "UMoe",
    fontSize: "1.2em",
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: '12ch',
            '&:focus': {
                width: '20ch',
            },
        },
    },
}));

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
            <AppBar position="static">
                <Toolbar display>
                    <h1 className="h1-txt-1">
                        " {text} "
                    </h1>
                    <div className="search-bar-menu-div">
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
                            <Tooltip title="setting ကို ဖွင့်ပါ..." >
                                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                    <Avatar alt="သုခ" src="/static/images/avatar/2.jpg" />
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
                                    <MenuItem key={setting} onClick={handleCloseUserMenu} sx={{ hover: "#f5ba13" }}>
                                        <Typography textAlign="center" sx={{ fontFamily: "UMoe" }}>{setting}</Typography>
                                    </MenuItem>
                                ))}
                            </Menu>
                        </Box>
                    </div>
                </Toolbar>
            </AppBar>
        </Box>
    );
};

export default Header;