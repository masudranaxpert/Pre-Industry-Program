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
    MenuItem,
    Select,
    FormControl,
    InputLabel,
} from '@mui/material';
import { ArrowBack, Add, AccountBalance } from '@mui/icons-material';
import { messService, type DepositData, type MessMember } from '../services/messService';

interface DepositResponse extends DepositData {
    member_info?: {
        id: number;
        first_name: string;
        last_name: string;
        username: string;
    };
}

export default function Deposits() {
    const navigate = useNavigate();
    const [deposits, setDeposits] = useState<DepositResponse[]>([]);
    const [members, setMembers] = useState<MessMember[]>([]);
    const [loading, setLoading] = useState(true);
    const [openDialog, setOpenDialog] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [formData, setFormData] = useState({
        deposit_amount: 0,
        deposit_details: '',
        date: new Date().toISOString().split('T')[0],
        member: 0,
    });

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const [depositsData, membersData] = await Promise.all([
                messService.getDepositList(),
                messService.getMemberList(),
            ]);
            setDeposits(depositsData as DepositResponse[]);
            setMembers(membersData);
        } catch (error) {
            console.error('Failed to fetch data:', error);
            setError('Failed to load data');
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: name === 'deposit_amount' ? parseInt(value) || 0 : value,
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

        if (formData.deposit_amount <= 0) {
            setError('Deposit amount must be greater than 0');
            return;
        }

        if (formData.member === 0) {
            setError('Please select a member');
            return;
        }

        try {
            await messService.createDeposit(formData);
            setSuccess('Deposit added successfully!');
            setOpenDialog(false);
            fetchData();
            setFormData({
                deposit_amount: 0,
                deposit_details: '',
                date: new Date().toISOString().split('T')[0],
                member: 0,
            });
        } catch (err: any) {
            setError(err.response?.data?.detail || 'Failed to add deposit');
        }
    };

    const getTotalDeposits = () => {
        return deposits.reduce((sum, deposit) => sum + deposit.deposit_amount, 0);
    };

    const getMemberName = (deposit: DepositResponse) => {
        if (deposit.member_info) {
            const { first_name, last_name, username } = deposit.member_info;
            if (first_name || last_name) {
                return `${first_name} ${last_name}`.trim();
            }
            return username;
        }
        return deposit.member || 'N/A';
    };

    return (
        <Box sx={{ minHeight: '100vh', background: 'linear-gradient(135deg, #ecfdf5 0%, #a7f3d0 50%, #6ee7b7 100%)' }}>
            <AppBar position="static" elevation={0} sx={{ background: 'linear-gradient(135deg, #059669 0%, #10b981 100%)' }}>
                <Toolbar>
                    <IconButton edge="start" color="inherit" onClick={() => navigate('/dashboard')}>
                        <ArrowBack />
                    </IconButton>
                    <AccountBalance sx={{ mr: 1 }} />
                    <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: 600 }}>
                        Deposit Management
                    </Typography>
                    <Button
                        variant="contained"
                        startIcon={<Add />}
                        onClick={() => setOpenDialog(true)}
                        sx={{
                            bgcolor: 'white',
                            color: '#059669',
                            textTransform: 'none',
                            fontWeight: 600,
                            '&:hover': {
                                bgcolor: '#f3f4f6',
                            },
                        }}
                    >
                        Add Deposit
                    </Button>
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

                {/* Total Deposit Card */}
                <Paper
                    elevation={0}
                    sx={{
                        p: 3,
                        mb: 4,
                        borderRadius: 3,
                        background: 'linear-gradient(135deg, #059669 0%, #10b981 100%)',
                        color: 'white',
                    }}
                >
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <Box>
                            <Typography variant="body1" sx={{ opacity: 0.9, mb: 0.5 }}>
                                Total Deposits
                            </Typography>
                            <Typography variant="h3" sx={{ fontWeight: 700 }}>
                                ৳{getTotalDeposits()}
                            </Typography>
                        </Box>
                        <AccountBalance sx={{ fontSize: 64, opacity: 0.8 }} />
                    </Box>
                </Paper>

                <Paper elevation={0} sx={{ borderRadius: 3, overflow: 'hidden' }}>
                    {loading ? (
                        <Box sx={{ display: 'flex', justifyContent: 'center', p: 8 }}>
                            <CircularProgress />
                        </Box>
                    ) : (
                        <TableContainer>
                            <Table>
                                <TableHead sx={{ background: 'linear-gradient(135deg, #059669 0%, #10b981 100%)' }}>
                                    <TableRow>
                                        <TableCell sx={{ color: 'white', fontWeight: 600 }}>Date</TableCell>
                                        <TableCell sx={{ color: 'white', fontWeight: 600 }}>Member</TableCell>
                                        <TableCell align="right" sx={{ color: 'white', fontWeight: 600 }}>
                                            Amount
                                        </TableCell>
                                        <TableCell sx={{ color: 'white', fontWeight: 600 }}>Details</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {deposits.length === 0 ? (
                                        <TableRow>
                                            <TableCell colSpan={4} align="center" sx={{ py: 8 }}>
                                                <Typography variant="body1" color="text.secondary">
                                                    No deposits recorded yet
                                                </Typography>
                                            </TableCell>
                                        </TableRow>
                                    ) : (
                                        deposits.map((deposit) => (
                                            <TableRow
                                                key={deposit.id}
                                                sx={{
                                                    '&:hover': {
                                                        bgcolor: '#ecfdf5',
                                                    },
                                                }}
                                            >
                                                <TableCell>{deposit.date}</TableCell>
                                                <TableCell>
                                                    <Chip label={getMemberName(deposit)} size="small" sx={{ bgcolor: '#d1fae5', color: '#065f46' }} />
                                                </TableCell>
                                                <TableCell align="right" sx={{ fontWeight: 700, color: '#059669' }}>
                                                    ৳{deposit.deposit_amount}
                                                </TableCell>
                                                <TableCell sx={{ color: 'text.secondary' }}>{deposit.deposit_details || '-'}</TableCell>
                                            </TableRow>
                                        ))
                                    )}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    )}
                </Paper>
            </Container>

            {/* Add Deposit Dialog */}
            <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="sm" fullWidth PaperProps={{ sx: { borderRadius: 3 } }}>
                <DialogTitle sx={{ background: 'linear-gradient(135deg, #059669 0%, #10b981 100%)', color: 'white', fontWeight: 600 }}>
                    Add New Deposit
                </DialogTitle>
                <DialogContent sx={{ mt: 3 }}>
                    <Stack spacing={2.5}>
                        <FormControl fullWidth>
                            <InputLabel id="member-select-label">Select Member</InputLabel>
                            <Select
                                labelId="member-select-label"
                                value={formData.member}
                                label="Select Member"
                                onChange={handleMemberChange}
                                sx={{
                                    borderRadius: 2,
                                }}
                            >
                                <MenuItem value={0} disabled>
                                    <em>Choose a member</em>
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
                            label="Date"
                            name="date"
                            type="date"
                            value={formData.date}
                            onChange={handleChange}
                            InputLabelProps={{ shrink: true }}
                            sx={{
                                '& .MuiOutlinedInput-root': {
                                    borderRadius: 2,
                                },
                            }}
                        />
                        <TextField
                            fullWidth
                            label="Deposit Amount"
                            name="deposit_amount"
                            type="number"
                            value={formData.deposit_amount}
                            onChange={handleChange}
                            required
                            inputProps={{ min: 0 }}
                            sx={{
                                '& .MuiOutlinedInput-root': {
                                    borderRadius: 2,
                                },
                            }}
                        />
                        <TextField
                            fullWidth
                            label="Details (Optional)"
                            name="deposit_details"
                            value={formData.deposit_details}
                            onChange={handleChange}
                            multiline
                            rows={3}
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
                        sx={{
                            textTransform: 'none',
                            fontWeight: 600,
                            background: 'linear-gradient(135deg, #059669 0%, #10b981 100%)',
                            '&:hover': {
                                background: 'linear-gradient(135deg, #047857 0%, #059669 100%)',
                            },
                        }}
                    >
                        Add Deposit
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
}
