import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Container,
    Paper,
    Typography,
    Box,
    Button,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    AppBar,
    Toolbar,
    IconButton,
    CircularProgress,
    Alert,
    Chip,
    Stack,
} from '@mui/material';
import { ArrowBack, Add, People, PersonRemove } from '@mui/icons-material';
import { messService, type MessMember } from '../services/messService';
import { authService, type UserData } from '../services/authService';

export default function Members() {
    const navigate = useNavigate();
    const [members, setMembers] = useState<MessMember[]>([]);
    const [currentUser, setCurrentUser] = useState<UserData | null>(null);
    const [loading, setLoading] = useState(true);
    const [openDialog, setOpenDialog] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [formData, setFormData] = useState({
        username: '',
    });

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const [membersData, userData] = await Promise.all([
                messService.getMemberList(),
                authService.getUser(),
            ]);
            setMembers(membersData);
            setCurrentUser(userData);
        } catch (error) {
            console.error('Failed to fetch data:', error);
            setError('Failed to load data');
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async () => {
        setError('');
        setSuccess('');

        if (!formData.username.trim()) {
            setError('Please enter a username');
            return;
        }

        let messId = 0;

        if (currentUser?.mess_id) {
            messId = currentUser.mess_id;
        } else if (members.length > 0) {
            messId = members[0].mess;
        }

        if (messId === 0 && currentUser) {
            try {
                const messes = await messService.getMessList();
                const messName = typeof currentUser.mess_name === 'object'
                    ? (currentUser.mess_name as any).name
                    : currentUser.mess_name;

                if (messName) {
                    const myMess = messes.find(m => m.name === messName);
                    if (myMess) {
                        messId = myMess.id;
                    }
                }
            } catch (err) {
                console.error('Failed to fetch mess list:', err);
            }
        }

        if (messId === 0) {
            setError('Could not identify your mess. Please contact support.');
            return;
        }

        try {
            await messService.addMember({
                mess: messId,
                user: formData.username,
                status: 1
            });
            setSuccess('Member added successfully!');
            setOpenDialog(false);
            fetchData();
            setFormData({ username: '' });
        } catch (err: any) {
            setError(err.response?.data?.detail || 'Failed to add member');
        }
    };

    const isManager = currentUser?.manager === true;

    return (
        <Box sx={{ minHeight: '100vh', background: 'linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 50%, #bae6fd 100%)' }}>
            <AppBar position="static" elevation={0} sx={{ background: 'linear-gradient(135deg, #0284c7 0%, #0369a1 100%)' }}>
                <Toolbar>
                    <IconButton edge="start" color="inherit" onClick={() => navigate('/dashboard')}>
                        <ArrowBack />
                    </IconButton>
                    <People sx={{ mr: 1 }} />
                    <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: 600 }}>
                        Member Management
                    </Typography>
                    {isManager && (
                        <Button
                            variant="contained"
                            startIcon={<Add />}
                            onClick={() => setOpenDialog(true)}
                            sx={{
                                bgcolor: 'white',
                                color: '#0284c7',
                                textTransform: 'none',
                                fontWeight: 600,
                                '&:hover': {
                                    bgcolor: '#f3f4f6',
                                },
                            }}
                        >
                            Add Member
                        </Button>
                    )}
                </Toolbar>
            </AppBar>

            <Container maxWidth="lg" sx={{ py: 4 }}>
                {error && (
                    <Alert severity="error" sx={{ mb: 3, borderRadius: 2 }} onClose={() => setError('')}>
                        {error}
                    </Alert>
                )}
                {success && (
                    <Alert severity="success" sx={{ mb: 3, borderRadius: 2 }} onClose={() => setSuccess('')}>
                        {success}
                    </Alert>
                )}

                <Paper elevation={0} sx={{ borderRadius: 3, overflow: 'hidden' }}>
                    {loading ? (
                        <Box sx={{ display: 'flex', justifyContent: 'center', p: 8 }}>
                            <CircularProgress />
                        </Box>
                    ) : (
                        <TableContainer>
                            <Table>
                                <TableHead sx={{ background: 'linear-gradient(135deg, #0284c7 0%, #0369a1 100%)' }}>
                                    <TableRow>
                                        <TableCell sx={{ color: 'white', fontWeight: 600 }}>Username</TableCell>
                                        <TableCell sx={{ color: 'white', fontWeight: 600 }}>Email</TableCell>
                                        <TableCell sx={{ color: 'white', fontWeight: 600 }}>Role</TableCell>
                                        <TableCell align="center" sx={{ color: 'white', fontWeight: 600 }}>Status</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {members.length === 0 ? (
                                        <TableRow>
                                            <TableCell colSpan={4} align="center" sx={{ py: 8 }}>
                                                <Typography variant="body1" color="text.secondary">
                                                    No members found
                                                </Typography>
                                            </TableCell>
                                        </TableRow>
                                    ) : (
                                        members.map((member) => (
                                            <TableRow
                                                key={member.id}
                                                sx={{
                                                    '&:hover': {
                                                        bgcolor: '#f0f9ff',
                                                    },
                                                }}
                                            >
                                                <TableCell>{member.user.username}</TableCell>
                                                <TableCell>{member.user.email}</TableCell>
                                                <TableCell>
                                                    <Chip
                                                        label={member.role}
                                                        size="small"
                                                        color={member.role === 'Manager' ? 'primary' : 'default'}
                                                        variant={member.role === 'Manager' ? 'filled' : 'outlined'}
                                                    />
                                                </TableCell>
                                                <TableCell align="center">
                                                    <Chip
                                                        label={member.status ? 'Active' : 'Inactive'}
                                                        size="small"
                                                        color={member.status ? 'success' : 'error'}
                                                    />
                                                </TableCell>
                                            </TableRow>
                                        ))
                                    )}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    )}
                </Paper>
            </Container>

            {/* Add Member Dialog */}
            <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="sm" fullWidth PaperProps={{ sx: { borderRadius: 3 } }}>
                <DialogTitle sx={{ background: 'linear-gradient(135deg, #0284c7 0%, #0369a1 100%)', color: 'white', fontWeight: 600 }}>
                    Add New Member
                </DialogTitle>
                <DialogContent sx={{ mt: 3 }}>
                    <Stack spacing={2.5}>
                        <Typography variant="body2" color="text.secondary">
                            Enter the username of the user you want to add to this mess.
                        </Typography>
                        <TextField
                            fullWidth
                            label="Username"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            required
                            sx={{
                                '& .MuiOutlinedInput-root': {
                                    borderRadius: 2,
                                },
                            }}
                        />
                    </Stack>
                </DialogContent>
                <DialogActions sx={{ p: 3 }}>
                    <Button onClick={() => setOpenDialog(false)} sx={{ textTransform: 'none', color: 'text.secondary' }}>
                        Cancel
                    </Button>
                    <Button
                        onClick={handleSubmit}
                        variant="contained"
                        disabled={!formData.username}
                        sx={{
                            textTransform: 'none',
                            fontWeight: 600,
                            background: 'linear-gradient(135deg, #0284c7 0%, #0369a1 100%)',
                            '&:hover': {
                                background: 'linear-gradient(135deg, #0369a1 0%, #075985 100%)',
                            },
                        }}
                    >
                        Add Member
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
}
