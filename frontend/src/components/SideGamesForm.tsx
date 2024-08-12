import React from 'react';
import { Accordion, AccordionSummary, AccordionDetails, FormControl, FormControlLabel, RadioGroup, Radio, Typography, Checkbox, Button } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const MyAccordionForm = () => {
    const [net, setNet] = React.useState<string | null>(null);
    const [division, setDivision] = React.useState<string | null>(null);
    const [superSkins, setSuperSkins] = React.useState<boolean>(false);

    const handleNetChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setNet(value === net ? null : value); // Toggle selection
    };

    const handleDivisionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setDivision(value === division ? null : value); // Toggle selection
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

    return (
        <Accordion>
            <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="side-games-content"
                id="side-games-header"
                sx={{ margin: '0' }}
            >
                <Typography variant="subtitle1">Select Side Games</Typography>
            </AccordionSummary>
            <AccordionDetails>
                <FormControl component="fieldset">
                    <Typography variant="h6" align="center">Net Games</Typography>
                    <RadioGroup
                        name="net-group"
                        value={net || ''}
                        onChange={handleNetChange}
                        sx={{ mb: 2 }}
                    >
                        <FormControlLabel value='OpenNet' control={<Radio size='small' />} label='Open Net' />
                        <FormControlLabel value='SrNet' control={<Radio size='small' />} label='Sr. Net' />
                    </RadioGroup>

                    <Typography variant="h6" align="center">Skins</Typography>
                    <FormControl component="fieldset">
                        <FormControlLabel
                            control={
                                <Checkbox
                                    size='small'
                                    checked={superSkins}
                                    onChange={handleSuperSkinsChange}
                                />
                            }
                            label='Super Skins'
                        />
                    </FormControl>
                    <RadioGroup
                        name="division-group"
                        value={division || ''}
                        onChange={handleDivisionChange}
                    >
                        <FormControlLabel value='D1Skins' control={<Radio size='small' />} label='Division 1' />
                        <FormControlLabel value='D2Skins' control={<Radio size='small' />} label='Division 2' />
                        <FormControlLabel value='D3Skins' control={<Radio size='small' />} label='Division 3' />
                        <FormControlLabel value='D4Skins' control={<Radio size='small' />} label='Division 4' />
                        <FormControlLabel value='D5Skins' control={<Radio size='small' />} label='Division 5' />
                    </RadioGroup>

                    <Button
                        variant="contained"
                        color="secondary"
                        onClick={handleReset}
                        sx={{ mt: 2 }}
                    >
                        Reset
                    </Button>
                </FormControl>
            </AccordionDetails>
        </Accordion>
    );
};

export default MyAccordionForm;
