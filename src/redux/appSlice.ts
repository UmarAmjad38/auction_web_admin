import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AppState {
    selectedAuction: number | null;
    selectedLot: number | null;
}

const initialState: AppState = {
    selectedAuction: null,
    selectedLot: null,
};

const appSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        setSelectedAuction: (state, action: PayloadAction<number | null>) => {
            state.selectedAuction = action.payload;
        },
        setSelectedLot: (state, action: PayloadAction<number | null>) => {
            state.selectedLot = action.payload;
        },
    },
});

export const { setSelectedAuction, setSelectedLot } = appSlice.actions;
export default appSlice.reducer;
