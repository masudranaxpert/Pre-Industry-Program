import { useNavigate } from 'react-router-dom';
import { Container, Typography, Button, Box, Card, CardContent, Grid, Stack } from '@mui/material';
import {
    Restaurant,
    AccountBalance,
    TrendingUp,
    People,
    Login as LoginIcon,
    PersonAdd,
} from '@mui/icons-material';
import { authService } from '../services/authService';
import { useEffect } from 'react';

export default function Home() {
    const navigate = useNavigate();

    useEffect(() => {
        if (authService.isAuthenticated()) {
            navigate('/dashboard');
        }
    }, [navigate]);

    const features = [
        {
            icon: <Restaurant sx={{ fontSize: 48, color: '#2563eb' }} />,
            title: 'Meal Tracking',
            description: 'Track daily breakfast, lunch, and dinner for all members',
            color: '#2563eb',
        },
        {
            icon: <AccountBalance sx={{ fontSize: 48, color: '#16a34a' }} />,
            title: 'Deposit Management',
            description: 'Manage deposits and view balance in real-time',
            color: '#16a34a',
        },
        {
            icon: <TrendingUp sx={{ fontSize: 48, color: '#9333ea' }} />,
            title: 'Meal Rate Calculator',
            description: 'Automatic calculation of meal rates and costs',
            color: '#9333ea',
        },
        {
            icon: <People sx={{ fontSize: 48, color: '#ea580c' }} />,
            title: 'Member Management',
            description: 'Add, manage, and track all mess members',
            color: '#ea580c',
        },
    ];

    return (
        <Box sx={{ minHeight: '100vh', background: 'linear-gradient(135deg, #dbeafe 0%, #e0e7ff 50%, #f3e8ff 100%)' }}>
            {/* Header */}
            <Box sx={{ borderBottom: 1, borderColor: 'divider', bgcolor: 'rgba(255, 255, 255, 0.8)', backdropFilter: 'blur(10px)' }}>
                <Container maxWidth="lg">
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', py: 2 }}>
                        <Stack direction="row" spacing={1} alignItems="center">
                            <Restaurant sx={{ fontSize: 32, color: '#2563eb' }} />
                            <Typography
                                variant="h5"
                                sx={{
                                    fontWeight: 700,
                                    background: 'linear-gradient(135deg, #2563eb 0%, #6366f1 100%)',
                                    backgroundClip: 'text',
                                    WebkitBackgroundClip: 'text',
                                    WebkitTextFillColor: 'transparent',
                                }}
                            >
                                Mess Manager
                            </Typography>
                        </Stack>
                        <Stack direction="row" spacing={2}>
                            <Button
                                variant="outlined"
                                startIcon={<LoginIcon />}
                                onClick={() => navigate('/login')}
                                sx={{ borderRadius: 2, textTransform: 'none', fontWeight: 600 }}
                            >
                                Login
                            </Button>
                            <Button
                                variant="contained"
                                startIcon={<PersonAdd />}
                                onClick={() => navigate('/register')}
                                sx={{
                                    borderRadius: 2,
                                    textTransform: 'none',
                                    fontWeight: 600,
                                    background: 'linear-gradient(135deg, #2563eb 0%, #6366f1 100%)',
                                    '&:hover': {
                                        background: 'linear-gradient(135deg, #1d4ed8 0%, #4f46e5 100%)',
                                    },
                                }}
                            >
                                Sign Up
                            </Button>
                        </Stack>
                    </Box>
                </Container>
            </Box>

            {/* Hero Section */}
            <Container maxWidth="lg">
                <Box sx={{ textAlign: 'center', py: { xs: 8, md: 12 } }}>
                    <Typography
                        variant="h2"
                        sx={{
                            fontWeight: 800,
                            mb: 3,
                            fontSize: { xs: '2.5rem', md: '3.75rem' },
                            background: 'linear-gradient(135deg, #2563eb 0%, #6366f1 50%, #9333ea 100%)',
                            backgroundClip: 'text',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                        }}
                    >
                        Manage Your Mess
                        <br />
                        Effortlessly
                    </Typography>
                    <Typography variant="h6" color="text.secondary" sx={{ mb: 4, maxWidth: 600, mx: 'auto' }}>
                        Complete solution for mess meal management, deposit tracking, and member coordination. Simple, efficient, and transparent.
                    </Typography>
                    <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} justifyContent="center">
                        <Button
                            variant="contained"
                            size="large"
                            onClick={() => navigate('/register')}
                            sx={{
                                px: 4,
                                py: 1.5,
                                borderRadius: 2,
                                textTransform: 'none',
                                fontSize: '1.1rem',
                                fontWeight: 600,
                                background: 'linear-gradient(135deg, #2563eb 0%, #6366f1 100%)',
                                '&:hover': {
                                    background: 'linear-gradient(135deg, #1d4ed8 0%, #4f46e5 100%)',
                                },
                            }}
                        >
                            Get Started Free
                        </Button>
                        <Button
                            variant="outlined"
                            size="large"
                            onClick={() => navigate('/login')}
                            sx={{
                                px: 4,
                                py: 1.5,
                                borderRadius: 2,
                                textTransform: 'none',
                                fontSize: '1.1rem',
                                fontWeight: 600,
                                borderWidth: 2,
                                '&:hover': {
                                    borderWidth: 2,
                                },
                            }}
                        >
                            Sign In
                        </Button>
                    </Stack>
                </Box>
            </Container>

            {/* Features Section */}
            <Container maxWidth="lg" sx={{ py: { xs: 6, md: 10 } }}>
                <Typography
                    variant="h3"
                    sx={{
                        textAlign: 'center',
                        fontWeight: 700,
                        mb: 2,
                        fontSize: { xs: '2rem', md: '2.5rem' },
                        background: 'linear-gradient(135deg, #2563eb 0%, #6366f1 100%)',
                        backgroundClip: 'text',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                    }}
                >
                    Everything You Need
                </Typography>
                <Typography variant="body1" color="text.secondary" sx={{ textAlign: 'center', mb: 6, maxWidth: 600, mx: 'auto' }}>
                    Powerful features to manage your mess efficiently and transparently
                </Typography>

                <Grid container spacing={3}>
                    {features.map((feature, index) => (
                        <Grid key={index} size={{ xs: 12, sm: 6, md: 3 }}>
                            <Card
                                sx={{
                                    height: '100%',
                                    borderRadius: 3,
                                    transition: 'all 0.3s',
                                    borderTop: 4,
                                    borderColor: feature.color,
                                    '&:hover': {
                                        transform: 'translateY(-8px)',
                                        boxShadow: 6,
                                    },
                                }}
                            >
                                <CardContent sx={{ textAlign: 'center', p: 3 }}>
                                    <Box sx={{ mb: 2 }}>{feature.icon}</Box>
                                    <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                                        {feature.title}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        {feature.description}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Container>

            {/* CTA Section */}
            <Box
                sx={{
                    background: 'linear-gradient(135deg, #2563eb 0%, #6366f1 100%)',
                    py: { xs: 8, md: 10 },
                }}
            >
                <Container maxWidth="md">
                    <Box sx={{ textAlign: 'center', color: 'white' }}>
                        <Typography variant="h3" sx={{ fontWeight: 700, mb: 2, fontSize: { xs: '2rem', md: '2.5rem' } }}>
                            Ready to Get Started?
                        </Typography>
                        <Typography variant="h6" sx={{ mb: 4, opacity: 0.9 }}>
                            Join thousands of mess managers who trust our platform
                        </Typography>
                        <Button
                            variant="contained"
                            size="large"
                            onClick={() => navigate('/register')}
                            sx={{
                                px: 4,
                                py: 1.5,
                                borderRadius: 2,
                                textTransform: 'none',
                                fontSize: '1.1rem',
                                fontWeight: 600,
                                bgcolor: 'white',
                                color: '#2563eb',
                                '&:hover': {
                                    bgcolor: '#f3f4f6',
                                },
                            }}
                        >
                            Create Free Account
                        </Button>
                    </Box>
                </Container>
            </Box>

            {/* Footer */}
            <Box sx={{ bgcolor: '#111827', color: 'white', py: 4 }}>
                <Container maxWidth="lg">
                    <Stack spacing={2} alignItems="center">
                        <Stack direction="row" spacing={1} alignItems="center">
                            <Restaurant sx={{ fontSize: 28 }} />
                            <Typography variant="h6" sx={{ fontWeight: 600 }}>
                                Mess Manager
                            </Typography>
                        </Stack>
                        <Typography variant="body2" sx={{ color: '#9ca3af' }}>
                            © 2026 Mess Manager. All rights reserved.
                        </Typography>
                    </Stack>
                </Container>
            </Box>
        </Box>
    );
}
