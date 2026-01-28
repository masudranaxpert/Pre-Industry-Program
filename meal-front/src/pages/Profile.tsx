import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Container,
    Paper,
    Typography,
    Box,
    Grid,
    Avatar,
    Button,
    AppBar,
    Toolbar,
    IconButton,
    CircularProgress,
    Card,
    CardContent,
    Chip,
} from '@mui/material';
import {
    ArrowBack,
    Email,
    Restaurant,
    Logout,
    VerifiedUser,
} from '@mui/icons-material';
import { authService, type UserData } from '../services/authService';
import { messService } from '../services/messService';

export default function Profile() {
    const navigate = useNavigate();
    const [userData, setUserData] = useState<UserData | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const data = await authService.getUser();
            setUserData(data);
        } catch (error) {
            console.error('Failed to fetch user data:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = () => {
        authService.logout();
    };

    if (loading) {
        return (
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh' }}>
                <CircularProgress />
            </Box>
        );
    }

    if (!userData) {
        return (
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh' }}>
                <Typography>Failed to load profile</Typography>
            </Box>
        );
    }

    const messName = typeof userData.mess_name === 'string' ? userData.mess_name : userData.mess_name?.name || 'N/A';
    const isManager = userData.manager;

    return (
        <Box sx={{ minHeight: '100vh', bgcolor: '#f1f5f9' }}>
            <AppBar position="static" elevation={0} sx={{ background: 'linear-gradient(135deg, #2563eb 0%, #6366f1 100%)' }}>
                <Toolbar>
                    <IconButton edge="start" color="inherit" onClick={() => navigate('/dashboard')}>
                        <ArrowBack />
                    </IconButton>
                    <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: 600, ml: 1 }}>
                        My Profile
                    </Typography>
                </Toolbar>
            </AppBar>

            <Container maxWidth="md" sx={{ py: 4 }}>
                <Grid container spacing={4}>
                    {/* ID Card Style Profile Header */}
                    <Grid size={{ xs: 12 }}>
                        <Paper
                            elevation={0}
                            sx={{
                                p: 4,
                                borderRadius: 4,
                                background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
                                border: '1px solid #e2e8f0',
                                display: 'flex',
                                flexDirection: { xs: 'column', md: 'row' },
                                alignItems: 'center',
                                gap: 4
                            }}
                        >
                            <Box sx={{ position: 'relative' }}>
                                <Avatar
                                    sx={{
                                        width: 120,
                                        height: 120,
                                        bgcolor: '#2563eb',
                                        fontSize: 48,
                                        fontWeight: 700,
                                        border: '4px solid white',
                                        boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                                    }}
                                >
                                    {userData.user.username.charAt(0).toUpperCase()}
                                </Avatar>
                                {isManager && (
                                    <Chip
                                        icon={<VerifiedUser sx={{ fontSize: '16px !important' }} />}
                                        label="Manager"
                                        size="small"
                                        color="primary"
                                        sx={{
                                            position: 'absolute',
                                            bottom: -10,
                                            left: '50%',
                                            transform: 'translateX(-50%)',
                                            fontWeight: 600,
                                            boxShadow: 2
                                        }}
                                    />
                                )}
                            </Box>

                            <Box sx={{ flexGrow: 1, textAlign: { xs: 'center', md: 'left' } }}>
                                <Typography variant="h4" sx={{ fontWeight: 700, color: '#1e293b', mb: 0.5 }}>
                                    {userData.user.first_name || userData.user.username} {userData.user.last_name || ''}
                                </Typography>
                                <Typography variant="h6" color="text.secondary" sx={{ fontWeight: 500, mb: 2 }}>
                                    @{userData.user.username}
                                </Typography>

                                <Box sx={{ display: 'flex', gap: 2, justifyContent: { xs: 'center', md: 'flex-start' }, flexWrap: 'wrap' }}>
                                    <Chip icon={<Email />} label={userData.user.email} variant="outlined" />
                                    <Chip icon={<Restaurant />} label={messName !== 'N/A' ? messName : 'No Mess'} color={messName !== 'N/A' ? 'success' : 'default'} variant="outlined" />
                                </Box>
                            </Box>

                            <Button
                                variant="outlined"
                                color="error"
                                startIcon={<Logout />}
                                onClick={handleLogout}
                            >
                                Logout
                            </Button>
                        </Paper>
                    </Grid>

                    {/* Stats Grid */}
                    <Grid size={{ xs: 12 }}>
                        {isManager && (
                            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
                                <Button
                                    variant="contained"
                                    color="secondary"
                                    sx={{ fontWeight: 600 }}
                                    onClick={async () => {
                                        if (window.confirm("Are you sure you want to reset all data for this month? This action cannot be undone.")) {
                                            try {
                                                await messService.resetMonth();
                                                alert("Month reset successfully!");
                                                fetchData();
                                            } catch (error) {
                                                console.error('Failed to reset month:', error);
                                                alert('Failed to reset month');
                                            }
                                        }
                                    }}
                                >
                                    Reset Month
                                </Button>
                            </Box>
                        )}
                        <Typography variant="h6" sx={{ mb: 2, fontWeight: 600, color: '#334155' }}>
                            Financial Overview
                        </Typography>
                        <Grid container spacing={3}>
                            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                                <Card sx={{ borderRadius: 3, borderLeft: '4px solid #2563eb' }}>
                                    <CardContent>
                                        <Typography variant="body2" color="text.secondary">Current Balance</Typography>
                                        <Typography variant="h5" sx={{ fontWeight: 700, color: '#2563eb', mt: 1 }}>
                                            ৳{userData.balance || 0}
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                                <Card sx={{ borderRadius: 3, borderLeft: '4px solid #16a34a' }}>
                                    <CardContent>
                                        <Typography variant="body2" color="text.secondary">Total Deposit</Typography>
                                        <Typography variant="h5" sx={{ fontWeight: 700, color: '#16a34a', mt: 1 }}>
                                            ৳{userData.deposit || 0}
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                                <Card sx={{ borderRadius: 3, borderLeft: '4px solid #ea580c' }}>
                                    <CardContent>
                                        <Typography variant="body2" color="text.secondary">Total Meals</Typography>
                                        <Typography variant="h5" sx={{ fontWeight: 700, color: '#ea580c', mt: 1 }}>
                                            {userData.mess_meal || 0}
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                                <Card sx={{ borderRadius: 3, borderLeft: '4px solid #9333ea' }}>
                                    <CardContent>
                                        <Typography variant="body2" color="text.secondary">Meal Cost</Typography>
                                        <Typography variant="h5" sx={{ fontWeight: 700, color: '#9333ea', mt: 1 }}>
                                            ৳{userData.mess_meal_cost?.toFixed(2) || 0}
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                        </Grid>
                    </Grid>

                    {/* Additional Info or Edit Profile could go here */}
                </Grid>
            </Container>
        </Box>
    );
}
