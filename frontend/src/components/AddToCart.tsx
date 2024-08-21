import React from 'react';
import { EventItem } from './Types';
import { Box, List, ListItem } from '@mui/material';

interface AddToCartProps {
    eventSummary: {
        selectedEvent: EventItem | null;
        tourLabel: string | null;
        locationLabel: string | null;
    };
    sideGamesData: {
        net: string | null;
        division: string | null;
        superSkins: boolean;
        rows: {
            name: string;
            cost: number;
            selected: boolean;
        }[];
        totalCost: number;
    };
}

const AddToCart: React.FC<AddToCartProps> = ({ eventSummary, sideGamesData }) => {
    return (
        <Box>
            <List>
                <ListItem>Summary</ListItem>
                <ListItem>Event: {eventSummary.selectedEvent?.name ?? 'None'}</ListItem>
                <ListItem>Tour: {eventSummary.tourLabel ?? 'None'}</ListItem>
                <ListItem>Location: {eventSummary.locationLabel ?? 'None'}</ListItem>
                <ListItem>Side Games</ListItem>
                <ListItem>
                    {sideGamesData.rows
                        .filter(row => row.selected)
                        .map((row, index) => (
                            <li key={index}>{row.name}: ${row.cost}</li>
                        ))}
                </ListItem>
                <p>Total Cost: ${sideGamesData.totalCost}</p>
            </List>
        </Box>
    );
};

export default AddToCart;
