import http from "./http.common";

class LeagueDataService {
    getAll() {
        return http.get("/leagues")        
    }
}

export default new LeagueDataService()