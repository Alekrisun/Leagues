import React from 'react';
import { ReactDOM } from 'react';
import { createRoot } from "react-dom/client";
import { leagues, tournaments } from './data';



const newLeague = document.getElementsByClassName('col-sm-4');
const root = createRoot(newLeague);


for (const league in leagues) {
    const logo = (
       <img
        className='dashboard-list-item-logo img-70-70'
        src={eagues[league].logo}
        alt={leagues[league].alt}
        /> 
    );
    const name = leagues[league].name;
    const description = leagues[league].description;

    const addLeague = (
            <div class="col-sm-4">
            <a class="dashboard-list-item" href="#">
                <div class="dashboard-list-item-sub">
                    <img ={logo}/>
                </div>
                <div class="dashboard-list-item-sub">
                    <div class="dashboard-list-item_name">{name}</div>
                    <div class="dashboard-list-item_description">{description}</div>
                    </div>
            </a>
        </div> 
    
    )
   
};


root.render(addLeague)