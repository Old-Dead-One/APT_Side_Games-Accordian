import React from 'react';
import { Box, Typography, List, ListItem, Stack } from "@mui/material";
import { useCart } from '../components/CartContext';

const Cart: React.FC = () => {
    const { cartItems } = useCart();

    return (
        <Box>
            <Typography variant="h4">Cart</Typography>
            <List>
                {cartItems.map((item, index) => (
                    <ListItem key={index}>
                        <Stack
                            direction="column"
                            justifyContent="space-between"
                            alignItems="center"
                            spacing={2}
                        >
                            <List>
                                <ListItem disableGutters disablePadding><strong>Tour:&nbsp;</strong> {item.eventSummary.tourLabel}</ListItem>
                                <ListItem disableGutters disablePadding><strong>Location:&nbsp;</strong> {item.eventSummary.locationLabel}</ListItem>
                                <ListItem disableGutters disablePadding><strong>Event Name:&nbsp;</strong> {item.eventSummary.selectedEvent.name}</ListItem>
                                <ListItem disableGutters disablePadding><strong>Course:&nbsp;</strong> {item.eventSummary.selectedEvent.course}</ListItem>
                                <ListItem disableGutters disablePadding><strong>Date:&nbsp;</strong> {new Date(item.eventSummary.selectedEvent.date).toLocaleDateString()}</ListItem>
                            </List>
                            <List>
                                <ListItem disableGutters disablePadding><strong>Net Game:&nbsp;</strong> {item.sideGamesData.net}</ListItem>
                                <ListItem disableGutters disablePadding><strong>Super Skins:&nbsp;</strong> {item.sideGamesData.superSkins ? 'Yes' : 'No'}</ListItem>
                                <ListItem disableGutters disablePadding><strong>Division Skins:&nbsp;</strong> {item.sideGamesData.division}</ListItem>

                                <ListItem>Total Cost: ${item.sideGamesData.totalCost}</ListItem>
                            </List>
                        </Stack>
                    </ListItem>
                ))}
            </List>
        </Box>
    );
};

export default Cart;