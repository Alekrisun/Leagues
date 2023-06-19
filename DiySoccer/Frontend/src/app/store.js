import { configureStore } from '@reduxjs/toolkit'

import leaguesReducer from '../features/leagues/leaguesSlice'

export default configureStore({  
    reducer: {
        leagues: leaguesReducer
    }
})