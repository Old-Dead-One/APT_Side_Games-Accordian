import React, { useEffect, useState } from "react";
import { useUser } from "../context/UserContext"; // Import the useUser hook
import { Box, Typography, List, ListItem, Divider } from "@mui/material";

const Profile: React.FC = () => {
    const { user, cartItems } = useUser();
    const [eventHistory, setEventHistory] = useState<any[]>([]);

    useEffect(() => {
        // Assuming cartItems store historical event data
        setEventHistory(cartItems);
    }, [cartItems]);

    return (
        <Box sx={{ padding: 3 }}>
            <Typography variant="h4" gutterBottom>
                Profile
            </Typography>

            <Typography variant="h6">User Information</Typography>
            <Typography><strong>Email:</strong> {user?.email}</Typography>
            <Typography><strong>Username:</strong> {user?.username || "Not available"}</Typography>

            <Divider sx={{ my: 2 }} />

            <Typography variant="h6">Event History</Typography>
            {eventHistory.length === 0 ? (
                <Typography>No events in your history yet.</Typography>
            ) : (
                <List>
                    {eventHistory.map((item, index) => (
                        <ListItem key={index}>
                            <Box>
                                <Typography variant="subtitle1">
                                    <strong>Event:</strong> {item.eventSummary.selectedEvent.name}
                                </Typography>
                                <Typography>
                                    <strong>Date:</strong> {new Date(item.eventSummary.selectedEvent.date).toLocaleDateString()}
                                </Typography>
                                <Typography>
                                    <strong>Tour:</strong> {item.eventSummary.tourLabel}
                                </Typography>
                                <Typography>
                                    <strong>Location:</strong> {item.eventSummary.locationLabel}
                                </Typography>
                                <Typography>
                                    <strong>Net Game:</strong> {item.sideGamesData.net}
                                </Typography>
                                <Typography>
                                    <strong>Total Cost:</strong> ${item.sideGamesData.totalCost}
                                </Typography>
                            </Box>
                        </ListItem>
                    ))}
                </List>
            )}
        </Box>
    );
};

export default Profile;
