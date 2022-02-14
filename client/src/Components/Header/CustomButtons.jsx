import React, { useState, useContext } from 'react';
import { makeStyles, Box, Typography, Badge, Button ,Dialog} from '@material-ui/core';
import { Link } from 'react-router-dom';
import { ShoppingCart } from '@material-ui/icons';
import LoginDialog from '../Login/LoginDialog';
import {LoginContext} from '../../context/ContextProvider';
import { useSelector } from 'react-redux';
import Profile from './Profile';

const useStyle = makeStyles(theme => ({
    container: {
        display: 'flex',
        [theme.breakpoints.down('sm')]: {
            display: 'block'
        }
    },
    wrapper: {
        margin: '0 5% 0 auto', 
        display: 'flex',    
        '& > *': {
            marginRight: 50,
            textDecoration: 'none',
            color: '#FFFFFF',
            fontSize: 12,
            alignItems: 'center',
            [theme.breakpoints.down('sm')]: {
                color: '#FF8C00',
                alignItems: 'center',
                display: 'flex',
                flexDirection: 'column',
                marginTop: 10                
            }      
        },
        [theme.breakpoints.down('sm')]: {
            display: 'block'
        }   
    },
    login: {
        color: '#FF8C00',
        background: '#FFFFFF',
        textTransform: 'none',
        fontWeight: 600,
        borderRadius: 2,
        padding: '5px 40px',
        height: 32,
        boxShadow: 'none',
        [theme.breakpoints.down('sm')]: {
            background: '#FF8C00',
            color: '#FFFFFF'
        }   
    }
}));


const CustomButtons = () => {
    const classes = useStyle();
    const [ open, setOpen ] = useState(false);
    const { account, setAccount } = useContext(LoginContext);
    const { cartItems } = useSelector(state => state.cart);

    const openDialog = () => {
        setOpen(true);
    }

    return (
        <Box className={classes.wrapper}>
            {
                account ? <Profile account={account} setAccount={setAccount}/>: 
                <Link to='/'>
                    <Button className={classes.login} variant="contained" onClick={() => openDialog() }>Login</Button>
                </Link>
            }
            
                <Typography style={{ marginTop: 5,color: "#FFD700" }}>More</Typography>
            
            <Link to='/cart' className={classes.container}>
            <span style={{color:"#FFD700"}}><Badge badgeContent={cartItems.length} color="primary"><ShoppingCart />
                </Badge></span>
                <Typography style={{ marginLeft: 10,color: "#FFD700" }}>Cart</Typography>
            </Link>
            <LoginDialog open={open} setOpen={setOpen} setAccount={setAccount} />
        </Box>
    )
}

export default CustomButtons;