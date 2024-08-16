import React from 'react';
import { FormControl, FormControlLabel, RadioGroup, Radio, Typography, Checkbox, Button, Box, Stack } from '@mui/material';
import useTheme from '@mui/material/styles/useTheme';

const SideGamesForm = () => {
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

    return (
        <Box
            sx={{
                flex: 1,
                paddingBottom: '6px',
                border: '1px solid',
                borderColor: theme.palette.mode === 'dark' ? '#dcddde' : '#000000',
                borderRadius: '10px',
                boxSizing: 'border-box',
                backgroundColor: theme.palette.background.paper,
                color: theme.palette.text.primary,
            }}
        >
            <Typography align="center" variant="h6">
                <strong>Available Side Games</strong>
            </Typography>
            <FormControl component="fieldset">
                <Typography variant="inherit" align="left">Net Games</Typography>
                <RadioGroup
                    name="net-group"
                    value={net || ''}
                    onChange={handleNetChange}
                    sx={{ mb: 2 }}
                >
                    <FormControlLabel
                        value='OpenNet'
                        control={<Radio size='small' />}
                        label={<Typography sx={{ color: getLabelColor(net === 'OpenNet') as string }}>Open Net</Typography>}
                    />
                    <FormControlLabel
                        value='SrNet'
                        control={<Radio size='small' />}
                        label={<Typography sx={{ color: getLabelColor(net === 'SrNet') as string }}>Senior Net</Typography>}
                    />
                </RadioGroup>
                <Typography variant="inherit" align="left">Skins</Typography>
                <FormControl component="fieldset">
                    <FormControlLabel
                        control={
                            <Checkbox
                                size='small'
                                checked={superSkins}
                                onChange={handleSuperSkinsChange}
                            />
                        }
                        label={<Typography sx={{ color: getLabelColor(superSkins) as string }}>Super Skins</Typography>}
                    />
                </FormControl>
                <RadioGroup
                    name="division-group"
                    value={division || ''}
                    onChange={handleDivisionChange}
                >
                    <FormControlLabel
                        value='D1Skins'
                        control={<Radio size='small' />}
                        label={<Typography sx={{ color: getLabelColor(division === 'D1Skins') as string }}>Division 1</Typography>}
                    />
                    <FormControlLabel
                        value='D2Skins'
                        control={<Radio size='small' />}
                        label={<Typography sx={{ color: getLabelColor(division === 'D2Skins') as string }}>Division 2</Typography>}
                    />
                    <FormControlLabel
                        value='D3Skins'
                        control={<Radio size='small' />}
                        label={<Typography sx={{ color: getLabelColor(division === 'D3Skins') as string }}>Division 3</Typography>}
                    />
                    <FormControlLabel
                        value='D4Skins'
                        control={<Radio size='small' />}
                        label={<Typography sx={{ color: getLabelColor(division === 'D4Skins') as string }}>Division 4</Typography>}
                    />
                    <FormControlLabel
                        value='D5Skins'
                        control={<Radio size='small' />}
                        label={<Typography sx={{ color: getLabelColor(division === 'D5Skins') as string }}>Division 5</Typography>}
                    />
                </RadioGroup>
                <Typography variant="h5" align="right">Total:</Typography>

                <Stack spacing={15} direction="row">
                    <Button
                        variant="contained"
                        color="secondary"
                        onClick={handleReset}
                    >
                        Reset
                    </Button>
                    <Button
                        variant="contained"
                        color="secondary"
                        onClick={handleReset}
                    >
                        Add to Cart
                    </Button>
                </Stack>
            </FormControl>
        </Box>
    );
};

export default SideGamesForm;
