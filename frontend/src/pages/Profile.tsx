import React, { useEffect, useState } from "react";
import { useUser } from "../context/UserContext";
import { Box, Typography, List, Divider, Stack, Accordion, AccordionSummary, AccordionDetails, TextField, Button, IconButton } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Cancel";

const Profile: React.FC = () => {
    const { user, cartItems, updateUserEmail, updateUserPhone, updateUserdisplayName } = useUser();
    const [eventHistory, setEventHistory] = useState<any[]>([]);
    const [newEmail, setNewEmail] = useState<string>("");
    const [newPhone, setNewPhone] = useState<string>("");
    const [newDisplayName, setNewDisplayName] = useState<string>("");
    const [isEditing, setIsEditing] = useState<boolean>(false);

    useEffect(() => {
        setEventHistory(cartItems);
    }, [cartItems]);

    useEffect(() => {
        if (user) {
            setNewEmail(user.email || "");
            setNewPhone(user.phone || "");
            setNewDisplayName(user.user_metadata?.displayname || "");
        }
    }, [user]);

    if (!user) {
        return <Typography>Loading...</Typography>;
    }

    const handleSave = async () => {
        if (newEmail !== user?.email) await updateUserEmail(newEmail);
        if (newPhone !== user?.phone) await updateUserPhone(newPhone);
        if (newDisplayName !== user.user_metadata?.displayname) await updateUserdisplayName(newDisplayName);
        setIsEditing(false);
    };

    const handleCancel = () => {
        setIsEditing(false);
        setNewEmail(user?.email || "");
        setNewPhone(user?.phone || "");
        setNewDisplayName(user.user_metadata?.displayname || "");
    };

    return (
        <Box sx={{ padding: 2 }}>
            <Typography variant="h6" sx={{ mb: 1 }}>
                <strong>Profile</strong>
            </Typography>

            <Divider sx={{ mb: 2 }} />

            <Stack
                direction="column"
                alignItems="flex-start"
                spacing={0}
                sx={{ width: '100%' }}
            >
                <Stack direction="row" alignItems="center" spacing={0}>
                    <Typography variant="subtitle1" sx={{ marginRight: 1 }}>
                        <strong>User Information:</strong>
                    </Typography>
                    {!isEditing && (
                        <IconButton
                            size="small"
                            onClick={() => setIsEditing(true)}
                        >
                            <EditIcon fontSize="small" />
                        </IconButton>
                    )}
                </Stack>

                {isEditing ? (
                    <Stack direction="column" spacing={1}>
                        <TextField
                            label="Email"
                            variant="outlined"
                            value={newEmail}
                            onChange={(e) => setNewEmail(e.target.value)}
                            fullWidth
                            sx={{ marginBottom: 1 }}
                        />
                        <TextField
                            label="Phone"
                            variant="outlined"
                            value={newPhone}
                            onChange={(e) => setNewPhone(e.target.value)}
                            fullWidth
                            sx={{ marginBottom: 1 }}
                        />
                        <TextField
                            label="Display Name"
                            variant="outlined"
                            value={newDisplayName}
                            onChange={(e) => setNewDisplayName(e.target.value)}
                            fullWidth
                            sx={{ marginBottom: 1 }}
                        />
                        <Stack direction="row" spacing={1}>
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={handleSave}
                                startIcon={<SaveIcon fontSize="small" />}
                            >
                                Save
                            </Button>
                            <Button
                                variant="outlined"
                                color="secondary"
                                onClick={handleCancel}
                                startIcon={<CancelIcon fontSize="small" />}
                            >
                                Cancel
                            </Button>
                        </Stack>
                    </Stack>
                ) : (
                    <Stack direction="column" spacing={0}>
                        <Typography sx={{ marginBottom: 0 }}>
                            <strong>Email:</strong> {user?.email || "Not available"}
                        </Typography>
                        <Typography sx={{ marginBottom: 0 }}>
                            <strong>Phone:</strong> {user?.phone || "Not available"}
                        </Typography>
                        <Typography sx={{ marginBottom: 0 }}>
                            <strong>Display Name:</strong> {user.user_metadata?.displayname || "Not available"}
                        </Typography>
                    </Stack>
                )}
            </Stack>

            <Divider sx={{ my: 2 }} />

            <Typography variant="h6" sx={{ mb: 1 }}>
                <strong>Event History</strong>
            </Typography>
            {eventHistory.length === 0 ? (
                <Typography variant="subtitle1">No events in your history yet.</Typography>
            ) : (
                <List sx={{ padding: 0 }}>
                    {eventHistory.map((item, index) => (
                        <Accordion key={index} sx={{ boxShadow: 'none' }}>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls={`panel-content-${index}`}
                                id={`panel-header-${index}`}
                                sx={{ padding: 0 }}
                            >
                                <Typography>
                                    <strong>Event:</strong> {item.eventSummary.selectedEvent.name}
                                </Typography>
                            </AccordionSummary>
                            <AccordionDetails sx={{ textAlign: "left", padding: 0 }}>
                                <Box>
                                    <Typography><strong>Date:</strong> {new Date(item.eventSummary.selectedEvent.date).toLocaleDateString()}</Typography>
                                    <Typography><strong>Tour:</strong> {item.eventSummary.tourLabel}</Typography>
                                    <Typography><strong>Location:</strong> {item.eventSummary.locationLabel}</Typography>
                                    <Typography><strong>Net Game:</strong> {item.sideGamesData.net || "None"}</Typography>
                                    <Typography><strong>Super Skins:</strong> {item.sideGamesData.superSkins ? "Yes" : "No"}</Typography>
                                    <Typography><strong>Division Skins:</strong> {item.sideGamesData.division || "None"}</Typography>
                                    <Typography><strong>Total Cost:</strong> ${item.sideGamesData.totalCost}</Typography>
                                </Box>
                            </AccordionDetails>
                        </Accordion>
                    ))}
                </List>
            )}
        </Box>
    );
};

export default Profile;
