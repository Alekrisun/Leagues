import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import 'regenerator-runtime/runtime'

import LeagueDataService from "./../../api/leagues.service"

export const fetchLeagues = createAsyncThunk('leagues/fetchLeagues', async () => {
    const res = await LeagueDataService.getAll()
    return res.data
})

export const leaguesSlice = createSlice({  
    name: 'leagues', 
    initialState: {  
        leagues: [],  
        tournaments : [],
        status: 'idle',  
        error: null
    },  
    reducers: {
        leagueAdd(state, action) { 
            state.push(action.payload)   
        }
    },
    extraReducers(builder) {    
        builder
            .addCase(fetchLeagues.pending, (state, action) => {        
                state.status = 'loading'      
            })      
            .addCase(fetchLeagues.fulfilled, (state, action) => {
                state.status = 'succeeded'       
                                               
                state.leagues = state.leagues.concat(action.payload.leagues)
                state.tournaments = state.tournaments.concat(action.payload.tournaments)                
            })      
            .addCase(fetchLeagues.rejected, (state, action) => {        
                state.status = 'failed'        
                state.error = action.error.message      
            })  
    }
})

export const { leagueAdd } = leaguesSlice.actions

export default leaguesSlice.reducer