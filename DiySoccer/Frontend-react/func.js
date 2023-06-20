import React from 'react';
import ReactDOM from 'react-dom';
import { createRoot } from "react-dom/client";
import { leagues, tournaments } from './data.js';

const newLeague = document.getElementById('league');
const root = createRoot(newLeague);


const leagueElements = [];
for (const league in leagues) {
    const logo = (
        <img
            className='dashboard-list-item-logo img-70-70'
            src={leagues[league].logo}
            alt={leagues[league].alt}
        />
    );
    const name = leagues[league].name;
    const description = leagues[league].description;

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



ReactDOM.render(leagueElements, root);
