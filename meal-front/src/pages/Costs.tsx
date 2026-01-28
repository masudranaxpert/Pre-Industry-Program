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
    Stack,
    InputAdornment,
    MenuItem,
    Select,
    FormControl,
    InputLabel,
    Chip,
} from '@mui/material';
import { ArrowBack, Add, AttachMoney, Description, CalendarToday } from '@mui/icons-material';
import { messService, type CostData, type MessMember } from '../services/messService';
import { authService, type UserData } from '../services/authService';

export default function Costs() {
    const navigate = useNavigate();
    const [costs, setCosts] = useState<CostData[]>([]);
    const [members, setMembers] = useState<MessMember[]>([]);
    const [currentUser, setCurrentUser] = useState<UserData | null>(null);
    const [loading, setLoading] = useState(true);
    const [openDialog, setOpenDialog] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [formData, setFormData] = useState({
        meal_cost: '',
        meal_cost_details: '',
        date: new Date().toISOString().split('T')[0],
        member: 0,
    });

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const [costsData, membersData, userData] = await Promise.all([
                messService.getCostList(),
                messService.getMemberList(),
                authService.getUser(),
            ]);
            setCosts(costsData);
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

    const handleMemberChange = (e: any) => {
        setFormData({
            ...formData,
            member: e.target.value,
        });
    };

    const handleSubmit = async () => {
        setError('');
        setSuccess('');

        if (!formData.meal_cost || !formData.date) {
            setError('Please fill in all required fields');
            return;
        }

        try {
            await messService.createCost({
                meal_cost: Number(formData.meal_cost),
                meal_cost_details: formData.meal_cost_details,
                date: formData.date,
                member: formData.member || undefined,
            });
            setSuccess('Cost added successfully!');
            setOpenDialog(false);
            fetchData();
            setFormData({
                meal_cost: '',
                meal_cost_details: '',
                date: new Date().toISOString().split('T')[0],
                member: 0,
            });
        } catch (err: any) {
            setError(err.response?.data?.detail || 'Failed to add cost');
        }
    };

    const getMemberName = (memberId: number | undefined) => {
        if (!memberId) return null;
        const member = members.find(m => m.id === memberId);
        if (member) {
            return member.user.first_name || member.user.last_name
                ? `${member.user.first_name} ${member.user.last_name}`.trim()
                : member.user.username;
        }
        return `Member #${memberId}`;
    };

    const isManager = currentUser?.manager === true;

    return (
        <Box sx={{ minHeight: '100vh', background: 'linear-gradient(135deg, #f0fdf4 0%, #dcfce7 50%, #bbf7d0 100%)' }}>
            <AppBar position="static" elevation={0} sx={{ background: 'linear-gradient(135deg, #16a34a 0%, #15803d 100%)' }}>
                <Toolbar>
                    <IconButton edge="start" color="inherit" onClick={() => navigate('/dashboard')}>
                        <ArrowBack />
                    </IconButton>
                    <AttachMoney sx={{ mr: 1 }} />
                    <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: 600 }}>
                        Mess Costs
                    </Typography>
                    {isManager && (
                        <Button
                            variant="contained"
                            startIcon={<Add />}
                            onClick={() => setOpenDialog(true)}
                            sx={{
                                bgcolor: 'white',
                                color: '#16a34a',
                                textTransform: 'none',
                                fontWeight: 600,
                                '&:hover': {
                                    bgcolor: '#f0fdf4',
                                },
                            }}
                        >
                            Add Cost
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
                                <TableHead sx={{ background: 'linear-gradient(135deg, #16a34a 0%, #15803d 100%)' }}>
                                    <TableRow>
                                        <TableCell sx={{ color: 'white', fontWeight: 600 }}>Date</TableCell>
                                        <TableCell sx={{ color: 'white', fontWeight: 600 }}>Member</TableCell>
                                        <TableCell sx={{ color: 'white', fontWeight: 600 }}>Amount</TableCell>
                                        <TableCell sx={{ color: 'white', fontWeight: 600 }}>Details</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {costs.length === 0 ? (
                                        <TableRow>
                                            <TableCell colSpan={4} align="center" sx={{ py: 8 }}>
                                                <Typography variant="body1" color="text.secondary">
                                                    No costs records found
                                                </Typography>
                                            </TableCell>
                                        </TableRow>
                                    ) : (
                                        costs.map((cost) => (
                                            <TableRow
                                                key={cost.id}
                                                sx={{
                                                    '&:hover': {
                                                        bgcolor: '#f0fdf4',
                                                    },
                                                }}
                                            >
                                                <TableCell>{cost.date}</TableCell>
                                                <TableCell>
                                                    <Chip
                                                        label={getMemberName(cost.member) || 'General Cost'}
                                                        size="small"
                                                        sx={{ bgcolor: '#dcfce7', color: '#166534' }}
                                                    />
                                                </TableCell>
                                                <TableCell sx={{ fontWeight: 600, color: '#16a34a' }}>
                                                    ৳{cost.meal_cost}
                                                </TableCell>
                                                <TableCell>{cost.meal_cost_details || '-'}</TableCell>
                                            </TableRow>
                                        ))
                                    )}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    )}
                </Paper>
            </Container>

            {/* Add Cost Dialog */}
            <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="sm" fullWidth PaperProps={{ sx: { borderRadius: 3 } }}>
                <DialogTitle sx={{ background: 'linear-gradient(135deg, #16a34a 0%, #15803d 100%)', color: 'white', fontWeight: 600 }}>
                    Add New Cost
                </DialogTitle>
                <DialogContent sx={{ mt: 3 }}>
                    <Stack spacing={2.5}>
                        <FormControl fullWidth>
                            <InputLabel id="member-select-label">Select Member (Optional)</InputLabel>
                            <Select
                                labelId="member-select-label"
                                value={formData.member}
                                label="Select Member (Optional)"
                                onChange={handleMemberChange}
                                sx={{
                                    borderRadius: 2,
                                }}
                            >
                                <MenuItem value={0}>
                                    <em>General Cost (None)</em>
                                </MenuItem>
                                {members.map((member) => (
                                    <MenuItem key={member.id} value={member.id}>
                                        {member.user.first_name || member.user.last_name
                                            ? `${member.user.first_name} ${member.user.last_name}`.trim()
                                            : member.user.username}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <TextField
                            fullWidth
                            label="Amount"
                            name="meal_cost"
                            type="number"
                            value={formData.meal_cost}
                            onChange={handleChange}
                            required
                            InputProps={{
                                startAdornment: <InputAdornment position="start">৳</InputAdornment>,
                            }}
                            sx={{
                                '& .MuiOutlinedInput-root': {
                                    borderRadius: 2,
                                },
                            }}
                        />
                        <TextField
                            fullWidth
                            label="Details"
                            name="meal_cost_details"
                            value={formData.meal_cost_details}
                            onChange={handleChange}
                            multiline
                            rows={2}
                            InputProps={{
                                startAdornment: <InputAdornment position="start"><Description fontSize="small" /></InputAdornment>,
                            }}
                            sx={{
                                '& .MuiOutlinedInput-root': {
                                    borderRadius: 2,
                                },
                            }}
                        />
                        <TextField
                            fullWidth
                            label="Date"
                            name="date"
                            type="date"
                            value={formData.date}
                            onChange={handleChange}
                            required
                            InputLabelProps={{ shrink: true }}
                            InputProps={{
                                startAdornment: <InputAdornment position="start"><CalendarToday fontSize="small" /></InputAdornment>,
                            }}
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
                        disabled={!formData.meal_cost || !formData.date}
                        sx={{
                            textTransform: 'none',
                            fontWeight: 600,
                            background: 'linear-gradient(135deg, #16a34a 0%, #15803d 100%)',
                            '&:hover': {
                                background: 'linear-gradient(135deg, #15803d 0%, #14532d 100%)',
                            },
                        }}
                    >
                        Add Cost
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
}
