import React from 'react';
import {
    Box,
    Typography,
    IconButton,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText,
    Avatar,
    useTheme
} from '@mui/material';
import {
    Check as CheckIcon
} from '@mui/icons-material';

const notifications = [
    {
        id: 1,
        icon: `${process.env.PUBLIC_URL}/assets/svgs/congratulation.svg`,
        text: 'New Comment',
        desc: 'Someone commented on your post.',
        isRead: false,
    },
    {
        id: 2,
        icon: `${process.env.PUBLIC_URL}/assets/svgs/congratulation.svg`,
        text: 'New Follower',
        desc: 'You have a new follower.',
        isRead: true,
    },
    {
        id: 3,
        icon: `${process.env.PUBLIC_URL}/assets/svgs/congratulation.svg`,
        text: 'System Update',
        desc: 'A new system update is available.',
        isRead: false,
    },
];

const CustomNotifications = () => {
    const theme: any = useTheme()
    const handleMarkAsRead = (id: any) => {
        console.log(`Mark notification ${id} as read`);
    };

    return (
        <Box
            sx={{
                maxHeight: '300px',
                overflowY: 'auto',
                padding: '8px',
                border: `1px solid ${theme.palette.primary.main6}`,
                borderRadius: '8px',
            }}
        >
            <List>
                {notifications.map((notification) => (
                    <ListItem
                        key={notification.id}
                        sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            padding: '8px',
                            borderRadius: '4px',
                            transition: 'background-color 0.3s',
                            '&:hover': {
                                backgroundColor: theme.palette.primary.main4,
                            },
                        }}
                    >
                        <Box display="flex" alignItems="center">
                            <ListItemAvatar>
                                <Avatar src={notification.icon} alt="icon" />
                            </ListItemAvatar>
                            <ListItemText
                                primary={
                                    <Typography
                                        variant="body1"
                                        sx={{
                                            fontWeight: notification.isRead ? 'normal' : 'bold',
                                        }}
                                    >
                                        {notification.text}
                                    </Typography>
                                }
                                secondary={
                                    <Typography variant="body2" color="textSecondary">
                                        {notification.desc}
                                    </Typography>
                                }
                            />
                        </Box>
                        <IconButton
                            onClick={() => handleMarkAsRead(notification.id)}
                            size="small"
                        >
                            <CheckIcon fontSize="small" />
                        </IconButton>
                    </ListItem>
                ))}
            </List>
        </Box>
    );
};

export default CustomNotifications;
