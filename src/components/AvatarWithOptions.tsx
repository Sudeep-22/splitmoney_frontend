import React, { useState } from 'react'
import Avatar from '@mui/material/Avatar';
import {Menu, MenuItem, IconButton} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from '../app/store';
import { deleteUserThunk, logoutThunk } from '../features/auth/authThunks';
import { useNavigate } from 'react-router-dom';

interface setAlertProps {
  setAlert: (type: 'error' | 'info' | 'success' | 'warning', message: string) => void;
}

const AvatarWithOptions:React.FC<setAlertProps> = ({setAlert}) => {
    const Navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();
    const { user } = useSelector((state: RootState) => state.auth);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    function stringAvatar(name: string) {
        const words = name.split(' ');
        const initials = words.length === 1 
            ? name[0].toUpperCase() 
            : `${words[0][0]}${words[1][0]}`.toUpperCase();
        return { children: initials };
    }
    
    const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = () => {
        dispatch(logoutThunk());
        setAlert('success', 'Logged out Successfully!')
        Navigate("/login");
    };
    const handleDeleteUser = () => {
        dispatch(deleteUserThunk());
        setAlert('warning', 'User Deleted Successfully!');
        Navigate("/login");
    };

    return (
        <>
            {/* <Avatar {...stringAvatar(user.name)} />
            <Button variant="contained" color="secondary" onClick={handleLogout}>
                Sign Out
            </Button> */}
            <IconButton onClick={handleMenuOpen} size="small">
                <Avatar {...stringAvatar(user?.name || "User")} sx={{backgroundColor:"orange"}}/>
            </IconButton>
            <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            >
                <MenuItem onClick={handleDeleteUser}>Delete Profile</MenuItem>
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </Menu>
        </>
  )
}

export default AvatarWithOptions
