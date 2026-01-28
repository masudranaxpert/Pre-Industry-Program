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
    MenuItem,
    Select,
    FormControl,
    InputLabel,
    Chip,
} from '@mui/material';
import { ArrowBack, Add, Restaurant } from '@mui/icons-material';
import { messService, type MealData, type MessMember } from '../services/messService';

interface MealResponse extends MealData {
    member_info?: {
        id: number;
        first_name: string;
        last_name: string;
        username: string;
    };
}

export default function Meals() {
    const navigate = useNavigate();
    const [meals, setMeals] = useState<MealResponse[]>([]);
    const [members, setMembers] = useState<MessMember[]>([]);
    const [loading, setLoading] = useState(true);
    const [openDialog, setOpenDialog] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [formData, setFormData] = useState({
        breakfast: 0,
        lunch: 0,
        dinner: 0,
        date: new Date().toISOString().split('T')[0],
        member: 0,
    });

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const [mealsData, membersData] = await Promise.all([
                messService.getMealList(),
                messService.getMemberList(),
            ]);
            setMeals(mealsData as MealResponse[]);
            setMembers(membersData);
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
            [e.target.name]: parseFloat(e.target.value) || 0,
        });
    };

    const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            date: e.target.value,
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

        if (formData.member === 0) {
            setError('Please select a member');
            return;
        }

        try {
            await messService.createMeal(formData);
            setSuccess('Meal added successfully!');
            setOpenDialog(false);
            fetchData();
            setFormData({
                breakfast: 0,
                lunch: 0,
                dinner: 0,
                date: new Date().toISOString().split('T')[0],
                member: 0,
            });
        } catch (err: any) {
            setError(err.response?.data?.detail || 'Failed to add meal');
        }
    };

    const getTotalMeals = (meal: MealResponse) => {
        return meal.breakfast + meal.lunch + meal.dinner;
    };

    const getMemberName = (meal: MealResponse) => {
        if (meal.member_info) {
            const { first_name, last_name, username } = meal.member_info;
            if (first_name || last_name) {
                return `${first_name} ${last_name}`.trim();
            }
            return username;
        }
        return meal.member || 'N/A';
    };

    return (
        <Box sx={{ minHeight: '100vh', background: 'linear-gradient(135deg, #fff7ed 0%, #fed7aa 50%, #fca5a5 100%)' }}>
            <AppBar position="static" elevation={0} sx={{ background: 'linear-gradient(135deg, #ea580c 0%, #dc2626 100%)' }}>
                <Toolbar>
                    <IconButton edge="start" color="inherit" onClick={() => navigate('/dashboard')}>
                        <ArrowBack />
                    </IconButton>
                    <Restaurant sx={{ mr: 1 }} />
                    <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: 600 }}>
                        Meal Management
                    </Typography>
                    <Button
                        variant="contained"
                        startIcon={<Add />}
                        onClick={() => setOpenDialog(true)}
                        sx={{
                            bgcolor: 'white',
                            color: '#ea580c',
                            textTransform: 'none',
                            fontWeight: 600,
                            '&:hover': {
                                bgcolor: '#f3f4f6',
                            },
                        }}
                    >
                        Add Meal
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

                <Paper elevation={0} sx={{ borderRadius: 3, overflow: 'hidden' }}>
                    {loading ? (
                        <Box sx={{ display: 'flex', justifyContent: 'center', p: 8 }}>
                            <CircularProgress />
                        </Box>
                    ) : (
                        <TableContainer>
                            <Table>
                                <TableHead sx={{ background: 'linear-gradient(135deg, #ea580c 0%, #dc2626 100%)' }}>
                                    <TableRow>
                                        <TableCell sx={{ color: 'white', fontWeight: 600 }}>Date</TableCell>
                                        <TableCell sx={{ color: 'white', fontWeight: 600 }}>Member</TableCell>
                                        <TableCell align="center" sx={{ color: 'white', fontWeight: 600 }}>
                                            Breakfast
                                        </TableCell>
                                        <TableCell align="center" sx={{ color: 'white', fontWeight: 600 }}>
                                            Lunch
                                        </TableCell>
                                        <TableCell align="center" sx={{ color: 'white', fontWeight: 600 }}>
                                            Dinner
                                        </TableCell>
                                        <TableCell align="center" sx={{ color: 'white', fontWeight: 600 }}>
                                            Total
                                        </TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {meals.length === 0 ? (
                                        <TableRow>
                                            <TableCell colSpan={6} align="center" sx={{ py: 8 }}>
                                                <Typography variant="body1" color="text.secondary">
                                                    No meals recorded yet
                                                </Typography>
                                            </TableCell>
                                        </TableRow>
                                    ) : (
                                        meals.map((meal) => (
                                            <TableRow
                                                key={meal.id}
                                                sx={{
                                                    '&:hover': {
                                                        bgcolor: '#fff7ed',
                                                    },
                                                }}
                                            >
                                                <TableCell>{meal.date}</TableCell>
                                                <TableCell>
                                                    <Chip label={getMemberName(meal)} size="small" sx={{ bgcolor: '#fed7aa', color: '#9a3412' }} />
                                                </TableCell>
                                                <TableCell align="center">{meal.breakfast}</TableCell>
                                                <TableCell align="center">{meal.lunch}</TableCell>
                                                <TableCell align="center">{meal.dinner}</TableCell>
                                                <TableCell align="center" sx={{ fontWeight: 700, color: '#ea580c' }}>
                                                    {getTotalMeals(meal)}
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

            {/* Add Meal Dialog */}
            <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="sm" fullWidth PaperProps={{ sx: { borderRadius: 3 } }}>
                <DialogTitle sx={{ background: 'linear-gradient(135deg, #ea580c 0%, #dc2626 100%)', color: 'white', fontWeight: 600 }}>
                    Add New Meal
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
                            type="date"
                            value={formData.date}
                            onChange={handleDateChange}
                            InputLabelProps={{ shrink: true }}
                            sx={{
                                '& .MuiOutlinedInput-root': {
                                    borderRadius: 2,
                                },
                            }}
                        />
                        <TextField
                            fullWidth
                            label="Breakfast"
                            name="breakfast"
                            type="number"
                            value={formData.breakfast}
                            onChange={handleChange}
                            inputProps={{ min: 0, max: 100, step: 0.5 }}
                            sx={{
                                '& .MuiOutlinedInput-root': {
                                    borderRadius: 2,
                                },
                            }}
                        />
                        <TextField
                            fullWidth
                            label="Lunch"
                            name="lunch"
                            type="number"
                            value={formData.lunch}
                            onChange={handleChange}
                            inputProps={{ min: 0, max: 100, step: 0.5 }}
                            sx={{
                                '& .MuiOutlinedInput-root': {
                                    borderRadius: 2,
                                },
                            }}
                        />
                        <TextField
                            fullWidth
                            label="Dinner"
                            name="dinner"
                            type="number"
                            value={formData.dinner}
                            onChange={handleChange}
                            inputProps={{ min: 0, max: 100, step: 0.5 }}
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
                            background: 'linear-gradient(135deg, #ea580c 0%, #dc2626 100%)',
                            '&:hover': {
                                background: 'linear-gradient(135deg, #c2410c 0%, #b91c1c 100%)',
                            },
                        }}
                    >
                        Add Meal
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
}
