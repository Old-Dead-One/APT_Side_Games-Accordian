import React from "react";
import { Box, Typography, List, ListItem, Stack } from "@mui/material";
import { useCart } from "../components/CartContext";
import { Button } from "react-bootstrap";

const Cart: React.FC = () => {
    const { cartItems } = useCart();

    return (
        <Box>
            <Typography variant="h4">Cart</Typography>
            <List>
                {cartItems.map((item, key) => (
                    <ListItem key={key}>
                        <Stack
                            direction="column"
                            justifyContent="space-between"
                            alignItems="center"
                        >
                            <Box
                                sx={{
                                    flex: 1,
                                    border: "1px solid",
                                    borderRadius: "10px",
                                    boxSizing: "border-box",
                                    width: "auto",
                                    minWidth: "320px",
                                    height: "auto",
                                    paddingLeft: 2,
                                    overflow: "auto",
                                }}>
                                <List>
                                    <ListItem sx={{ fontSize: 20, color: "green" }} disableGutters><strong>Selected Event:&nbsp;</strong></ListItem>
                                    <ListItem disableGutters disablePadding><strong>Tour:&nbsp;</strong> {item.eventSummary.tourLabel}</ListItem>
                                    <ListItem disableGutters disablePadding><strong>Location:&nbsp;</strong> {item.eventSummary.locationLabel}</ListItem>
                                    <ListItem disableGutters disablePadding><strong>Event Name:&nbsp;</strong> {item.eventSummary.selectedEvent.name}</ListItem>
                                    <ListItem disableGutters disablePadding><strong>Course:&nbsp;</strong> {item.eventSummary.selectedEvent.course}</ListItem>
                                    <ListItem disableGutters disablePadding><strong>Date:&nbsp;</strong> {new Date(item.eventSummary.selectedEvent.date).toLocaleDateString()}</ListItem>
                                </List>
                                <List>
                                    <ListItem sx={{ fontSize: 20, color: "green" }} disableGutters><strong>Selected Side Games:&nbsp;</strong></ListItem>
                                    <ListItem disableGutters disablePadding><strong>Net Game:&nbsp;</strong> {item.sideGamesData.net}</ListItem>
                                    <ListItem disableGutters disablePadding><strong>Super Skins:&nbsp;</strong> {item.sideGamesData.superSkins ? "Yes" : "No"}</ListItem>
                                    <ListItem disableGutters disablePadding><strong>Division Skins:&nbsp;</strong> {item.sideGamesData.division}</ListItem>
                                    <ListItem sx={{ fontSize: 20, color: "red" }} disableGutters><strong>Total Cost: ${item.sideGamesData.totalCost}</strong></ListItem>
                                </List>
                            </Box>
                        </Stack>
                    </ListItem>
                ))}
            </List>
            <Button variant="primary" onClick={() => { console.log("Checkout clicked") }}>Checkout</Button>
        </Box>
    );
};

export default Cart;