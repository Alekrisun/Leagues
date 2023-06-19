import React, { Component, useEffect } from "react"
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

import { fetchLeagues } from './leaguesSlice'

class Leagues extends Component { 
    render() {
        return (
            <Template />
        );
    }
}

function LeaguesTemplate(props){

    const items = props.items.map((league) =>
        <div className="col-sm-4" key={league.id}>
            <Link to={"/" + props.route + "/" + league.id}
                  className="dashboard-list-item cursor-pointer" >
                { league.mediaId !== null &&
                <div className="dashboard-list-item-sub">
                    <div className="dashboard-list-item_logo img-70-70">
                        <object data={"/api/image/" + league.mediaId + "?width=70&height=70"} type="image/png">
                            <img src="./Content/img/DefaultLogo_70x70.png" alt="Stack Overflow logo and icons and such" />
                        </object>
                    </div>
                </div>
                }
                <div className="dashboard-list-item-sub">
                    <div className="dashboard-list-item_name">{league.name}</div>
                    <div className="dashboard-list-item_description">{league.description}</div>
                    <div className="dashboard-list-item_actions">
                        <Link className="btn btn-primary"
                        to={"/" + props.route + "/" + league.id + "/edit/"}>
                            <i className="fa fa-edit" />
                        </Link>
                    </div>                    
                </div>
            </Link>
        </div>
    );

    return (
        <div className="dashboard-list">
            <div className="col-sm-12 dashboard-list-title">
                {props.title}
            </div>
            {items}
        </div>
    );
}

function Template() {

    const dispatch = useDispatch()

    const leagues = useSelector(state => state.leagues.leagues)
    const tournaments = useSelector(state => state.leagues.tournaments)
    const status = useSelector(state => state.leagues.status)

    useEffect(() => {    
        if (status === 'idle') {      
            dispatch(fetchLeagues())    
        }
    }, [status, dispatch])
    
    /*const onAddLeagueClicked = () => {
        dispatch(
            leagueAdd({
                id: "613864a4a382733fcc8e41a5",
                type: 1,
                mediaId: "61386536a382733fcc8e41a6",
                name: "SPB DIY League",
                description: "2021-2022"
            })
        )
    }*/
    
    return <div>
        <button className="btn btn-primary">
            <i className="fa fa-plus" />
        </button>
        <div className="dashboard">
            { status === "succeeded" &&
                <div>
                    <LeaguesTemplate items={leagues} title="Лиги" route="leagues" />
                    <LeaguesTemplate items={tournaments} title="Турниры" route="tournaments" />
                </div>
            }            
        </div>
    </div>
}

export default Leagues;