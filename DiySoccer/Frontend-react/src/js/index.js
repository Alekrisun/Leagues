import React from "react";
import { createRoot } from "react-dom/client";


const LeagueRoot = createRoot(document.getElementById('league'));
const tournamentsRoot = createRoot(document.getElementById('tournaments'));


const data = async () => {
    const leagueUrl = 'http://localhost:59295/api/leagues';
    const endpoint = leagueUrl;

    try {
        const response = await fetch(endpoint);
        if(response.ok) {
            const jsonResponse = await response.json();
            return jsonResponse;
        }
    } catch (error) {
        console.log(error)
        
    }

}

const leagueElements = [];
for (const index in data.leagues) {
    const logo = (
        <img
            className='dashboard-list-item-logo img-70-70'
            src={data.leagues[index].logo}
            alt={data.leagues[index].alt}
        />
    );
    const name = data.leagues[index].name;
    const description = data.leagues[index].description;

    const leagueElement = (
        <div className="col-sm-4">
            <a className="dashboard-list-item" href="#">
                <div className="dashboard-list-item-sub">
                    {logo}
                </div>
                <div className="dashboard-list-item-sub">
                    <div className="dashboard-list-item_name">{name}</div>
                    <div className="dashboard-list-item_description">{description}</div>
                </div>
            </a>
        </div>
    );

    leagueElements.push(leagueElement);
    
};

const tournamentElements = [];

for (const index in data.tournaments) {
    const logo = (
        <img
            className='dashboard-list-item-logo img-70-70'
            src={data.tournaments[index].logo}
            alt={data.tournaments[index].alt}
        />
    );
    const name = data.tournaments[index].name;
    const description = data.tournaments[index].description;

    const tournamentElement = (
        <div className="col-sm-4">
            <a className="dashboard-list-item" href="#">
                <div className="dashboard-list-item-sub">
                    {logo}
                </div>
                <div className="dashboard-list-item-sub">
                    <div className="dashboard-list-item_name">{name}</div>
                    <div className="dashboard-list-item_description">{description}</div>
                </div>
            </a>
        </div>
    );

    tournamentElements.push(tournamentElement);
    
};

LeagueRoot.render(leagueElements);
tournamentsRoot.render(tournamentElements);