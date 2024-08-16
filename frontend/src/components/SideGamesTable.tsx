import React from 'react';
import { Radio, Checkbox, Typography, Button, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import useTheme from '@mui/material/styles/useTheme';

const SideGamesTable = () => {
    const theme = useTheme();

    const [net, setNet] = React.useState<string | null>(null);
    const [division, setDivision] = React.useState<string | null>(null);
    const [superSkins, setSuperSkins] = React.useState<boolean>(false);

    const handleNetChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setNet(value === net ? null : value);
    };

    const handleDivisionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setDivision(value === division ? null : value);
    };

    const handleSuperSkinsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const checked = event.target.checked;
        setSuperSkins(checked);
    };

    const handleReset = () => {
        setNet(null);
        setDivision(null);
        setSuperSkins(false);
    };

    const getLabelColor = (selected: boolean) => selected ? theme.palette.primary : theme.palette.text.disabled;

    const rows = [
        { name: 'Open Net', cost: 30, selected: net === 'OpenNet' },
        { name: 'Senior Net', cost: 40, selected: net === 'SrNet' },
        { name: 'Super Skins', cost: 40, selected: superSkins },
        { name: 'Division 1', cost: 20, selected: division === 'D1Skins' },
        { name: 'Division 2', cost: 20, selected: division === 'D2Skins' },
        { name: 'Division 3', cost: 20, selected: division === 'D3Skins' },
        { name: 'Division 4', cost: 20, selected: division === 'D4Skins' },
        { name: 'Division 5', cost: 20, selected: division === 'D5Skins' },
    ];

    const totalCost = rows.reduce((acc, row) => acc + (row.selected ? row.cost : 0), 0);

    return (
        <TableContainer component={Paper}>
            <Typography align="center" variant='h6'>
                <strong>Available Side Games</strong>
            </Typography>
            <Table sx={{ minWidth: 320 }} size="small" aria-label="side games table">
                <TableHead>
                    <TableRow>
                        <TableCell>
                            <Typography variant='subtitle1'>
                                <strong>Net</strong>
                            </Typography>
                        </TableCell>
                        <TableCell>
                            <Typography variant='subtitle1'>
                                <strong>Games</strong>
                            </Typography>
                        </TableCell>
                        <TableCell>
                            <Typography align='right' variant='subtitle1'>
                                <strong>Cost</strong>
                            </Typography>
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    <TableRow>
                        <TableCell>
                            <Radio
                                size="small"
                                checked={net === 'OpenNet'}
                                onChange={handleNetChange}
                                value="OpenNet"
                                sx={{ color: getLabelColor(net === 'OpenNet') as string, padding: 0 }}
                            />
                        </TableCell>
                        <TableCell component="th" scope="row">
                            <Typography sx={{ color: getLabelColor(net === 'OpenNet') as string | undefined }}>
                                Open Net
                            </Typography>
                        </TableCell>
                        <TableCell align="right">
                            <Typography sx={{ color: getLabelColor(net === 'OpenNet') as string | undefined }}>
                                $30
                            </Typography>
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>
                            <Radio
                                size="small"
                                checked={net === 'SrNet'}
                                onChange={handleNetChange}
                                value="SrNet"
                                sx={{ color: getLabelColor(net === 'SrNet') as string, padding: 0 }}
                            />
                        </TableCell>
                        <TableCell component="th" scope="row">
                            <Typography sx={{ color: getLabelColor(net === 'SrNet') as string | undefined }}>
                                Senior Net
                            </Typography>
                        </TableCell>
                        <TableCell align="right">
                            <Typography sx={{ color: getLabelColor(net === 'SrNet') as string | undefined }}>
                                $40
                            </Typography>
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell colSpan={3} component="th" scope="row">
                            <Typography variant='subtitle1'>
                                <strong>Gross</strong>
                            </Typography>
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>
                            <Checkbox
                                size="small"
                                checked={superSkins}
                                onChange={handleSuperSkinsChange}
                                sx={{ color: getLabelColor(superSkins) as string, padding: 0, }}
                            />
                        </TableCell>
                        <TableCell component="th" scope="row">
                            <Typography sx={{ color: getLabelColor(superSkins) as string | undefined }}>
                                Super Skins
                            </Typography>
                        </TableCell>
                        <TableCell align="right">
                            <Typography sx={{ color: getLabelColor(superSkins) as string | undefined }}>
                                $40
                            </Typography>
                        </TableCell>
                    </TableRow>
                    {['D1Skins', 'D2Skins', 'D3Skins', 'D4Skins', 'D5Skins'].map((divisionValue, index) => (
                        <TableRow key={divisionValue}>
                            <TableCell>
                                <Radio
                                    size="small"
                                    checked={division === divisionValue}
                                    onChange={handleDivisionChange}
                                    value={divisionValue}
                                    sx={{ color: getLabelColor(division === divisionValue) as string, padding: 0 }}
                                />
                            </TableCell>
                            <TableCell component="th" scope="row">
                                <Typography sx={{ color: getLabelColor(division === divisionValue) as string | undefined }}>
                                    Division {index + 1}
                                </Typography>
                            </TableCell>
                            <TableCell align="right">
                                <Typography sx={{ color: getLabelColor(division === divisionValue) as string | undefined }}>$20</Typography>
                            </TableCell>
                        </TableRow>
                    ))}
                    <TableRow>
                        <TableCell component="th" scope="row"><strong>Total</strong></TableCell>
                        <TableCell colSpan={2} align="right">
                            <Typography sx={{ color: getLabelColor(!!totalCost) as string }}><strong>${totalCost}</strong></Typography>
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell colSpan={3}>
                            <Stack direction="row" justifyContent="space-between">
                                <Button variant="contained" color="secondary" onClick={handleReset} sx={{ padding: 0 }}>
                                    Reset
                                </Button>
                                <Button variant="contained" color="secondary">
                                    Add to Cart
                                </Button>
                            </Stack>
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default SideGamesTable;
