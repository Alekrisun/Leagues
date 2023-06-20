import React from "react";
import { createRoot } from "react-dom/client";
import { data } from './data.js';

const root = createRoot(document.getElementById('league'));

const leagueElements = [];
console.log(data);
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

root.render(leagueElements);