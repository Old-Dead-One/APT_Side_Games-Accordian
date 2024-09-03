import React from "react";
import { SideGames } from "./Types";
import SideGamesTable from "./SideGamesTable";
import { Box } from "@mui/material";

interface SelectSideGamesProps {
    rows: SideGames[];
    net: string | null;
    division: string | null;
    superSkins: boolean;
    totalCost: number;
    onNetChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onDivisionChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onSuperSkinsChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onAddToCart: () => void;
}

const SelectSideGames: React.FC<SelectSideGamesProps> = ({
    rows,
    net,
    division,
    superSkins,
    onNetChange,
    onDivisionChange,
    onSuperSkinsChange,
    onAddToCart,
    totalCost
}) => {

    return (
        <Box>
            <SideGamesTable
                rows={rows}
                net={net}
                division={division}
                superSkins={superSkins}
                onNetChange={onNetChange}
                onDivisionChange={onDivisionChange}
                onSuperSkinsChange={onSuperSkinsChange}
                onAddToCart={onAddToCart}
                totalCost={totalCost}
            />
        </Box>
    );
};

export default SelectSideGames;
