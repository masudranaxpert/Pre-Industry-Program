import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Container,
    Grid,
    Paper,
    Typography,
    Box,
    Card,
    CardContent,
    AppBar,
    Toolbar,
    IconButton,
    Menu,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Button,
    MenuItem,
    Avatar,
    Chip,
    CircularProgress,
    Stack,
} from '@mui/material';
import {
    AccountBalance,
    Restaurant,
    TrendingUp,
    Logout,
    AccountCircle,
    AttachMoney,
    LocalDining,
    People,
    Add,
} from '@mui/icons-material';
import { authService, type UserData } from '../services/authService';
import { messService, type MemberActivity } from '../services/messService';

export default function Dashboard() {
    const navigate = useNavigate();
    const [userData, setUserData] = useState<UserData | null>(null);
    const [memberActivity, setMemberActivity] = useState<MemberActivity | null>(null);
    const [loading, setLoading] = useState(true);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [openCreateMessDialog, setOpenCreateMessDialog] = useState(false);
    const [newMessName, setNewMessName] = useState('');
    const [actionLoading, setActionLoading] = useState(false);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const user = await authService.getUser();
            setUserData(user);

            if (user.mess_name && user.mess !== 'No Mess Member') {
                try {
                    const activity = await messService.getMemberActivity();
                    setMemberActivity(activity);
                } catch (err) {
                    console.error('Failed to fetch member activity:', err);
                }
            } else {
                setMemberActivity(null);
            }
        } catch (error) {
            console.error('Failed to fetch user data:', error);
            navigate('/login');
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = () => {
        authService.logout();
    };

    const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleCreateMess = async () => {
        if (!newMessName.trim()) return;
        setActionLoading(true);
        try {
            await messService.createMess({ name: newMessName });
            setOpenCreateMessDialog(false);
            setNewMessName('');
            await fetchData();
        } catch (error) {
            console.error('Failed to create mess:', error);
            alert('Failed to create mess');
        } finally {
            setActionLoading(false);
        }
    };

    const handleLeaveMess = async () => {
        if (!window.confirm("Are you sure you want to leave the current mess?")) return;
        setActionLoading(true);
        try {
            const members = await messService.getMemberList();
            const myMemberRecord = members.find(m => m.user.username === userData?.user.username);

            if (myMemberRecord) {
                await messService.deleteMember(myMemberRecord.id);
                setAnchorEl(null);
                await fetchData();
            } else {
                alert("Could not find your membership information.");
            }
        } catch (error) {
            console.error('Failed to leave mess:', error);
            alert('Failed to leave mess');
        } finally {
            setActionLoading(false);
        }
    };

    if (loading) {
        return (
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh' }}>
                <CircularProgress size={60} />
            </Box>
        );
    }

    const messName = typeof userData?.mess_name === 'string' ? userData.mess_name : userData?.mess_name?.name || 'N/A';
    const hasMess = messName !== 'N/A' && messName !== 'No Mess Assigned';

    return (
        <Box sx={{ minHeight: '100vh', background: 'linear-gradient(135deg, #f1f5f9 0%, #dbeafe 50%, #e0e7ff 100%)' }}>
            <AppBar position="static" elevation={0} sx={{ background: 'linear-gradient(135deg, #2563eb 0%, #6366f1 100%)' }}>
                <Toolbar>
                    <Restaurant sx={{ mr: 1 }} />
                    <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: 600 }}>
                        Mess Management
                    </Typography>
                    <IconButton color="inherit" onClick={handleMenuOpen}>
                        <Avatar sx={{ bgcolor: 'white', color: '#2563eb' }}>{userData?.user.username.charAt(0).toUpperCase()}</Avatar>
                    </IconButton>
                    <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
                        <MenuItem onClick={() => navigate('/profile')}>
                            <AccountCircle sx={{ mr: 1 }} /> Profile
                        </MenuItem>
                        {hasMess && (
                            <MenuItem onClick={handleLeaveMess} sx={{ color: 'error.main' }}>
                                <Logout sx={{ mr: 1 }} /> Leave Mess
                            </MenuItem>
                        )}
                        <MenuItem onClick={handleLogout}>
                            <Logout sx={{ mr: 1 }} /> Logout
                        </MenuItem>
                    </Menu>
                </Toolbar>
            </AppBar>

            <Container maxWidth="lg" sx={{ py: 4 }}>
                {/* Welcome Section */}
                <Paper
                    elevation={0}
                    sx={{
                        p: 3,
                        mb: 4,
                        borderRadius: 3,
                        background: 'linear-gradient(135deg, #2563eb 0%, #6366f1 100%)',
                        color: 'white',
                    }}
                >
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 2 }}>
                        <Box>
                            <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
                                Welcome, {userData?.user.username}!
                            </Typography>
                            <Typography variant="body1" sx={{ opacity: 0.9 }}>
                                {hasMess ? `Mess: ${messName}` : 'No Mess Assigned'}
                            </Typography>
                        </Box>
                        {userData?.manager !== undefined && (
                            <Chip label={userData.manager ? 'Manager' : 'Member'} sx={{ bgcolor: 'white', color: '#2563eb', fontWeight: 600 }} />
                        )}
                    </Box>
                </Paper>

                {hasMess ? (
                    <>
                        {/* Mess Stats */}
                        <Typography variant="h6" sx={{ mb: 2, fontWeight: 600, color: '#334155' }}>
                            Mess Overview
                        </Typography>
                        <Grid container spacing={3} sx={{ mb: 4 }}>
                            <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                                <Card sx={{ borderRadius: 3, borderLeft: 4, borderColor: '#2563eb' }}>
                                    <CardContent>
                                        <Typography variant="body2" color="text.secondary">Mess Balance</Typography>
                                        <Typography variant="h5" sx={{ fontWeight: 700, color: '#2563eb' }}>
                                            ৳{memberActivity?.mess_balance || 0}
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                            <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                                <Card sx={{ borderRadius: 3, borderLeft: 4, borderColor: '#16a34a' }}>
                                    <CardContent>
                                        <Typography variant="body2" color="text.secondary">Total Deposit</Typography>
                                        <Typography variant="h5" sx={{ fontWeight: 700, color: '#16a34a' }}>
                                            ৳{memberActivity?.deposit || 0}
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                            <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                                <Card sx={{ borderRadius: 3, borderLeft: 4, borderColor: '#9333ea' }}>
                                    <CardContent>
                                        <Typography variant="body2" color="text.secondary">Meal Rate</Typography>
                                        <Typography variant="h5" sx={{ fontWeight: 700, color: '#9333ea' }}>
                                            ৳{memberActivity?.mess_meal_rate?.toFixed(2) || 0}
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                        </Grid>

                        {/* User Stats */}
                        <Typography variant="h6" sx={{ mb: 2, fontWeight: 600, color: '#334155' }}>
                            My Status
                        </Typography>
                        <Grid container spacing={3} sx={{ mb: 4 }}>
                            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                                <Card sx={{ borderRadius: 3, transition: 'all 0.3s', '&:hover': { boxShadow: 4 } }}>
                                    <CardContent>
                                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                            <Box>
                                                <Typography variant="body2" color="text.secondary">My Deposit</Typography>
                                                <Typography variant="h6" sx={{ fontWeight: 700, color: '#2563eb' }}>
                                                    ৳{memberActivity?.user_deposit || userData?.deposit || 0}
                                                </Typography>
                                            </Box>
                                            <AccountBalance sx={{ color: '#2563eb' }} />
                                        </Box>
                                    </CardContent>
                                </Card>
                            </Grid>
                            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                                <Card sx={{ borderRadius: 3, transition: 'all 0.3s', '&:hover': { boxShadow: 4 } }}>
                                    <CardContent>
                                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                            <Box>
                                                <Typography variant="body2" color="text.secondary">My Balance</Typography>
                                                <Typography variant="h6" sx={{ fontWeight: 700, color: '#16a34a' }}>
                                                    ৳{memberActivity?.user_balance || userData?.balance || 0}
                                                </Typography>
                                            </Box>
                                            <AttachMoney sx={{ color: '#16a34a' }} />
                                        </Box>
                                    </CardContent>
                                </Card>
                            </Grid>
                            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                                <Card sx={{ borderRadius: 3, transition: 'all 0.3s', '&:hover': { boxShadow: 4 } }}>
                                    <CardContent>
                                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                            <Box>
                                                <Typography variant="body2" color="text.secondary">My Meal Cost</Typography>
                                                <Typography variant="h6" sx={{ fontWeight: 700, color: '#ef4444' }}>
                                                    ৳{memberActivity?.user_cost?.toFixed(2) || 0}
                                                </Typography>
                                            </Box>
                                            <AttachMoney sx={{ color: '#ef4444' }} />
                                        </Box>
                                    </CardContent>
                                </Card>
                            </Grid>
                            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                                <Card sx={{ borderRadius: 3, transition: 'all 0.3s', '&:hover': { boxShadow: 4 } }}>
                                    <CardContent>
                                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                            <Box>
                                                <Typography variant="body2" color="text.secondary">Total Meals</Typography>
                                                <Typography variant="h6" sx={{ fontWeight: 700, color: '#ea580c' }}>
                                                    {memberActivity?.user_mess_meal || 0}
                                                </Typography>
                                            </Box>
                                            <LocalDining sx={{ color: '#ea580c' }} />
                                        </Box>
                                    </CardContent>
                                </Card>
                            </Grid>
                        </Grid>
                    </>
                ) : (
                    <Paper
                        sx={{
                            p: 4,
                            textAlign: 'center',
                            borderRadius: 3,
                            bgcolor: '#f8fafc',
                            border: '1px dashed #cbd5e1',
                        }}
                    >
                        <Stack spacing={2} alignItems="center">
                            <Box
                                sx={{
                                    width: 64,
                                    height: 64,
                                    borderRadius: '50%',
                                    bgcolor: '#e2e8f0',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    mb: 1,
                                }}
                            >
                                <People sx={{ fontSize: 32, color: '#64748b' }} />
                            </Box>
                            <Typography variant="h5" sx={{ fontWeight: 600, color: '#334155' }}>
                                No Mess Assigned
                            </Typography>
                            <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 400 }}>
                                You seem to be new here. Join an existing mess or create your own to get started.
                            </Typography>
                            <Button
                                variant="contained"
                                startIcon={<Add />}
                                onClick={() => setOpenCreateMessDialog(true)}
                                sx={{
                                    mt: 2,
                                    textTransform: 'none',
                                    fontWeight: 600,
                                    background: 'linear-gradient(135deg, #2563eb 0%, #6366f1 100%)',
                                }}
                            >
                                Create New Mess
                            </Button>
                        </Stack>
                    </Paper>
                )}

                {/* Quick Actions */}
                {hasMess && (
                    <Grid container spacing={3}>
                        <Grid size={{ xs: 12, md: 6 }}>
                            <Paper
                                sx={{
                                    p: 3,
                                    borderRadius: 3,
                                    cursor: 'pointer',
                                    transition: 'all 0.3s',
                                    '&:hover': {
                                        boxShadow: 4,
                                        transform: 'translateY(-4px)',
                                    },
                                }}
                                onClick={() => navigate('/meals')}
                            >
                                <Stack direction="row" spacing={2} alignItems="center">
                                    <Box
                                        sx={{
                                            width: 48,
                                            height: 48,
                                            borderRadius: '50%',
                                            bgcolor: '#dbeafe',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                        }}
                                    >
                                        <Restaurant sx={{ color: '#2563eb' }} />
                                    </Box>
                                    <Box>
                                        <Typography variant="h6" sx={{ fontWeight: 600 }}>
                                            Manage Meals
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            Add and view daily meals
                                        </Typography>
                                    </Box>
                                </Stack>
                            </Paper>
                        </Grid>

                        <Grid size={{ xs: 12, md: 6 }}>
                            <Paper
                                sx={{
                                    p: 3,
                                    borderRadius: 3,
                                    cursor: 'pointer',
                                    transition: 'all 0.3s',
                                    '&:hover': {
                                        boxShadow: 4,
                                        transform: 'translateY(-4px)',
                                    },
                                }}
                                onClick={() => navigate('/deposits')}
                            >
                                <Stack direction="row" spacing={2} alignItems="center">
                                    <Box
                                        sx={{
                                            width: 48,
                                            height: 48,
                                            borderRadius: '50%',
                                            bgcolor: '#dcfce7',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                        }}
                                    >
                                        <AccountBalance sx={{ color: '#16a34a' }} />
                                    </Box>
                                    <Box>
                                        <Typography variant="h6" sx={{ fontWeight: 600 }}>
                                            Manage Deposits
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            Add and view deposits
                                        </Typography>
                                    </Box>
                                </Stack>
                            </Paper>
                        </Grid>

                        <Grid size={{ xs: 12, md: 6 }}>
                            <Paper
                                sx={{
                                    p: 3,
                                    borderRadius: 3,
                                    cursor: 'pointer',
                                    transition: 'all 0.3s',
                                    '&:hover': {
                                        boxShadow: 4,
                                        transform: 'translateY(-4px)',
                                    },
                                }}
                                onClick={() => navigate('/members')}
                            >
                                <Stack direction="row" spacing={2} alignItems="center">
                                    <Box
                                        sx={{
                                            width: 48,
                                            height: 48,
                                            borderRadius: '50%',
                                            bgcolor: '#e0f2fe',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                        }}
                                    >
                                        <People sx={{ color: '#0284c7' }} />
                                    </Box>
                                    <Box>
                                        <Typography variant="h6" sx={{ fontWeight: 600 }}>
                                            Members
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            View list and add member
                                        </Typography>
                                    </Box>
                                </Stack>
                            </Paper>
                        </Grid>

                        <Grid size={{ xs: 12, md: 6 }}>
                            <Paper
                                sx={{
                                    p: 3,
                                    borderRadius: 3,
                                    cursor: 'pointer',
                                    transition: 'all 0.3s',
                                    '&:hover': {
                                        boxShadow: 4,
                                        transform: 'translateY(-4px)',
                                    },
                                }}
                                onClick={() => navigate('/costs')}
                            >
                                <Stack direction="row" spacing={2} alignItems="center">
                                    <Box
                                        sx={{
                                            width: 48,
                                            height: 48,
                                            borderRadius: '50%',
                                            bgcolor: '#f0fdf4',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                        }}
                                    >
                                        <AttachMoney sx={{ color: '#16a34a' }} />
                                    </Box>
                                    <Box>
                                        <Typography variant="h6" sx={{ fontWeight: 600 }}>
                                            Manage Costs
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            View and add mess costs
                                        </Typography>
                                    </Box>
                                </Stack>
                            </Paper>
                        </Grid>

                        {userData?.manager && (
                            <Grid size={{ xs: 12, md: 6 }}>
                                <Paper
                                    sx={{
                                        p: 3,
                                        borderRadius: 3,
                                        cursor: 'pointer',
                                        transition: 'all 0.3s',
                                        '&:hover': {
                                            boxShadow: 4,
                                            transform: 'translateY(-4px)',
                                        },
                                        background: 'linear-gradient(135deg, #fff1f2 0%, #ffe4e6 100%)',
                                    }}
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
                                    <Stack direction="row" spacing={2} alignItems="center">
                                        <Box
                                            sx={{
                                                width: 48,
                                                height: 48,
                                                borderRadius: '50%',
                                                bgcolor: '#fecaca',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                            }}
                                        >
                                            <Logout sx={{ color: '#dc2626' }} />
                                        </Box>
                                        <Box>
                                            <Typography variant="h6" sx={{ fontWeight: 600, color: '#991b1b' }}>
                                                Reset Month
                                            </Typography>
                                            <Typography variant="body2" sx={{ color: '#ef4444' }}>
                                                Reset all meal and deposit data
                                            </Typography>
                                        </Box>
                                    </Stack>
                                </Paper>
                            </Grid>
                        )}
                    </Grid>
                )}
            </Container>

            {/* Create Mess Dialog */}
            <Dialog
                open={openCreateMessDialog}
                onClose={() => setOpenCreateMessDialog(false)}
                maxWidth="sm"
                fullWidth
                PaperProps={{ sx: { borderRadius: 3 } }}
            >
                <DialogTitle sx={{ fontWeight: 600 }}>Create New Mess</DialogTitle>
                <DialogContent>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                        Enter a unique name for your new mess. You will automatically become the manager.
                    </Typography>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Mess Name"
                        fullWidth
                        value={newMessName}
                        onChange={(e) => setNewMessName(e.target.value)}
                        variant="outlined"
                        disabled={actionLoading}
                    />
                </DialogContent>
                <DialogActions sx={{ p: 3 }}>
                    <Button onClick={() => setOpenCreateMessDialog(false)} disabled={actionLoading}>Cancel</Button>
                    <Button
                        onClick={handleCreateMess}
                        variant="contained"
                        disabled={!newMessName.trim() || actionLoading}
                    >
                        {actionLoading ? 'Creating...' : 'Create Mess'}
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
}
