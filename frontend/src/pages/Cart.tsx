import React from "react";
import { Box, Typography, List, ListItem, Stack, Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';
import { useCart } from "../components/CartContext";


const Cart: React.FC = () => {
    const { cartItems, removeFromCart } = useCart();

    return (
        <Box sx={{ minWidth: 320 }}>
            <Typography align="center" variant="h6" minWidth={320}>
                <strong>Cart</strong>
            </Typography>
            {cartItems.length === 0 && <Typography variant="caption">Your cart is empty</Typography>}
            <List>
                {cartItems.map((item, key) => (
                    <ListItem key={key}>
                        <Stack
                            direction="column"
                            justifyContent="space-between"
                            alignItems="center"
                            minWidth={320}
                        >
                            <Box
                                sx={{
                                    flex: 1,
                                    border: "1px solid",
                                    borderRadius: "10px",
                                    boxSizing: "border-box",
                                    width: "auto",
                                    height: "auto",
                                    paddingLeft: 2,
                                    paddingRight: 2,
                                    overflow: "auto",
                                }}>
                                <List>
                                    <ListItem sx={{ fontSize: 20, color: "green" }} disableGutters disablePadding><strong>Selected Event:&nbsp;</strong></ListItem>
                                    <ListItem disableGutters disablePadding><strong>Tour:&nbsp;</strong> {item.eventSummary.tourLabel}</ListItem>
                                    <ListItem disableGutters disablePadding><strong>Location:&nbsp;</strong> {item.eventSummary.locationLabel}</ListItem>
                                    <ListItem disableGutters disablePadding><strong>Event Name:&nbsp;</strong> {item.eventSummary.selectedEvent.name}</ListItem>
                                    <ListItem disableGutters disablePadding><strong>Course:&nbsp;</strong> {item.eventSummary.selectedEvent.course}</ListItem>
                                    <ListItem disableGutters disablePadding><strong>Date:&nbsp;</strong> {new Date(item.eventSummary.selectedEvent.date).toLocaleDateString()}</ListItem>

                                    <ListItem sx={{ fontSize: 20, color: "green" }} disableGutters disablePadding><strong>Selected Side Games:&nbsp;</strong></ListItem>
                                    <ListItem disableGutters disablePadding><strong>Net Game:&nbsp;</strong> {item.sideGamesData.net}</ListItem>
                                    <ListItem disableGutters disablePadding><strong>Super Skins:&nbsp;</strong> {item.sideGamesData.superSkins ? "Yes" : "No"}</ListItem>
                                    <ListItem disableGutters disablePadding><strong>Division Skins:&nbsp;</strong> {item.sideGamesData.division}</ListItem>
                                    <ListItem sx={{ fontSize: 20, color: "red" }} disableGutters disablePadding><strong>Total Cost: ${item.sideGamesData.totalCost}</strong></ListItem>
                                </List>
                                <Button variant="outlined" color="secondary" sx={{ marginBottom: 1 }} startIcon={<DeleteIcon />}
                                    onClick={() => {
                                        if (removeFromCart) {
                                            removeFromCart(key);
                                        }
                                    }}
                                >
                                    Delete
                                </Button>
                            </Box>
                        </Stack>
                    </ListItem>
                ))}
            </List>
            <Button variant="contained" color="secondary" startIcon={<ShoppingCartCheckoutIcon />} onClick={() => { console.log("Checkout clicked") }}>Checkout</Button>
        </Box>
    );
};

export default Cart;