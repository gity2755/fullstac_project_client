
import { Link } from 'react-router-dom';
import logo from "./theKidsShop.jpg"
import "./navBar.css"
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { userOut } from './features/user/userSlice';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import * as React from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Badge from '@mui/material/Badge';
import { styled } from '@mui/material/styles';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { pink } from '@mui/material/colors';
import AddIcon from '@mui/icons-material/Add';
import CheckroomIcon from '@mui/icons-material/Checkroom';
import { Checkroom } from '@mui/icons-material';
const StyledBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
        right: -3,
        top: 13,
        border: `2px solid ${theme.palette.background.paper}`,
        padding: '0 4px',
    },
}));
const myTheme = createTheme(
    {
        palette: {
            primary: {
                main: '#11111',
            },
            secondary: pink,
        },
    },
);
const NavBar = () => {
    let user = useSelector(st => st.user.currentUser)
    let countOfProducts = parseInt(useSelector(st => st.myBasket.countOfProducts), 10)
    const dispatch = useDispatch();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const logOut = () => {
        dispatch(userOut(user))
    }
  
    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };
    console.log('cnt prod ' + countOfProducts);
    return (<div >
        <Box id="nav" sx={{ flexGrow: 1 }}>
            <ThemeProvider theme={myTheme}>
                <AppBar position="static" color="primary" width="100%" >
                    <Toolbar padding='0px'>
                        <Typography id="startShopping" variant="h6" component="div" sx={{ flexGrow: 1 }}>
                            <IconButton>
                                <Link className='link' to={'/list'} >
                                    <StyledBadge color="secondary">
                                        <Checkroom />
                                    </StyledBadge>
                                </Link>
                            </IconButton >
                        </Typography>
                        <Typography id="linkBasket" variant="h6" component="div" sx={{ flexGrow: 1 }}>

                            {user && user.role === 'user' && <IconButton aria-label="cart">
                                <Link to="/basket" className='link'>
                                    <StyledBadge badgeContent={countOfProducts} color="secondary">
                                        <ShoppingCartIcon />
                                    </StyledBadge>
                                </Link>
                            </IconButton>}

                        </Typography>
                        <Typography id="addItemButton" variant="h6" component="div" sx={{ flexGrow: 1 }}>
                            {user && user.role === "admin" &&
                            <IconButton aria-label="cart">
                                <Link className='link' to={'/addItemForm'} ><AddIcon /></Link>  </IconButton>
                            }


                    </Typography>
                    <Typography id="linkLogo" variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        <Link to="/homePage" className='link' >  <img id="logo" src={logo} /> </Link>
                    </Typography>

                    {user && <Typography id="hello-to" >HELLO TO  {user.userName.toUpperCase()}</Typography>}
                    <div>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleMenu}
                        >
                            <AccountCircle />
                        </IconButton >
                        <Menu id="menu-appbar"
                            anchorEl={anchorEl}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={Boolean(anchorEl)}
                            onClose={handleClose}
                        >
                            <MenuItem >
                                <Link to="/login" id="linkLogin" className='link'>LOGIN</Link>
                            </MenuItem>
                            <MenuItem >
                                <Link to="/signin" id="linkSignIn" className='link'>SIGNIN</Link>
                            </MenuItem>
                            <MenuItem onClick={() => { logOut() }}> LOG OUT</MenuItem>
                        </Menu>
                    </div>

                </Toolbar>

            </AppBar>
        </ThemeProvider>
    </Box></div >
    );
}












// <nav >
//     <ul id="nav">
//         {user && <li>hello to {user.userName}</li>}
//         <li >
//             <Link to="/list" className='link' id="linkLogo">  <img id="logo" src={logo} /> </Link>
//         </li>
//         {<li>
//             <Link to="/basket" id="linkBasket" className='link'><ShoppingCart id='basketLogo' /></Link>
//         </li>}
//         <li>
//             <Link to="/login" id="linkLogin" className='link'>LOGIN</Link>
//         </li>
//         <li>
//             <Link to="/signin" id="linkSignIn" className='link'>SIGNIN</Link>
//         </li>
//         {user && <li >
//             <Button type="submit" variant="contained" color="primary" fullWidth onClick={() => { logOut() }}>
//                 LogOut
//             </Button>
//         </li>}
//         {user && user.role === "admin" &&
//             <Link id="addItemButton" to={'/addItemForm'}>add item</Link>
//         }
//     </ul>
// </nav>

export default NavBar;