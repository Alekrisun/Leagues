import React, { Component } from "react";

import Spinner from "./../Shared/core/spinner";

function EventTemplate(props) {
    
    const playoffGames = props.playoffGames.map((game, index) =>
        <div key={index} className="dashboard-box-content dashboard-box-content__padded">
            <div className="dashboard-box-content__row" data-id="{{gameId}}">
                <div className="dashboard-box-content__half-left">
                    <h5 className="inline-block">{game.homeTeamName}</h5>
                    {game.homeTeamMediaId &&
                    <object data={"/api/image/" + game.homeTeamMediaId + "?width=50&height=50"} type="image/png">
                        <img src="/Content/img/DefaultLogo_50x50.jpg" alt="logo"/>
                    </object>
                    }
                </div>
                <div className="inline-block">
                    <h4>
                        <b>{game.homeTeamScore} - {game.guestTeamScore}
                        </b>
                    </h4>
                </div>
                <div className="dashboard-box-content__half-right">
                    { game.guestTeamMediaId &&
                    <object data={"/api/image/" + game.guestTeamMediaId + "?width=50&height=50"} type="image/png">
                        <img src="/Content/img/DefaultLogo_50x50.jpg" alt="logo"/>
                    </object>
                    }
                    <h5 className="inline-block">{game.guestTeamName}</h5>
                </div>
            </div>
        </div>
    )
    
    const groupGames = props.groupGames.map((game, index) =>
        <tr key={index}>
            <td className="number-cell">{index}.</td>
            <td>
                <object data={"/api/image/" + game.mediaId + "?width=25&height=25"} type="image/png">
                    <img src="/Content/img/DefaultLogo_25x25.jpg" alt="logo"/>
                </object>
                {game.name}
            </td>
            <td className="text-right width-50">
                {game.goals}
            </td>
            <td className="text-right width-50">
                {game.missed}
            </td>
            <td className="text-right width-50">
                {game.wins}
            </td>
            <td className="text-right width-50">
                {game.drafts}
            </td>
            <td className="text-right width-50">
                {game.loses}
            </td>
            <td className="text-right width-50">
                {game.points}
            </td>
        </tr>        
    )      
    
    const games =  props.games.map((game, index) =>
        <div key={index} className="dashboard-box-content__row" data-id="{{gameId}}">
            <div className="dashboard-box-content__half-left">
                <div className="inline-block">{game.homeTeamName}</div>
                <object data={"/api/image/" + game.homeTeamMediaId + "?width=25&height=25"} type="image/png">
                    <img src="/Content/img/DefaultLogo_25x25.jpg" alt="logo"/>
                </object>
            </div>
            <div className="inline-block">
                <div>
                    <b>{game.homeTeamScore} - {game.guestTeamScore}</b>
                </div>
            </div>
            <div className="dashboard-box-content__half-right">
                <object data={"/api/image/" + game.guestTeamMediaId + "?width=25&height=25"} type="image/png">
                    <img src="/Content/img/DefaultLogo_25x25.jpg" alt="logo"/>
                </object>
                <div className="inline-block">{game.guestTeamName}</div>
            </div>
        </div>                  
    )
    
    return <div className="row">
        {playoffGames && playoffGames.length > 0 &&
        <div className="col-sm-12">
            <div className="dashboard-box">
                <div className="dashboard-box-header row m0">
                    <div className="dashboard-box-header__title col-sm-7 p0">
                        {props.name}
                    </div>
                </div>
                {playoffGames}
            </div>            
        </div>
        }

        {props.groupGames && props.groupGames.length > 0 &&
        <div className="col-sm-6">
            <div className="dashboard-box">
                <div className="dashboard-box-header row m0">
                    <div className="dashboard-box-header__title col-sm-7 p0">
                        {props.name}
                    </div>
                </div>
                <div className="dashboard-box-content">
                    <table className="table table-hovered mb0 table-colored-columns">
                        <thead>
                        <tr>
                            <th></th>
                            <th>Команда</th>
                            <th className="text-right width-50">Г</th>
                            <th className="text-right width-50">Пр</th>
                            <th className="text-right width-50">В</th>
                            <th className="text-right width-50">Н</th>
                            <th className="text-right width-50">П</th>
                            <th className="text-right width-50">О</th>
                        </tr>
                        </thead>
                        <tbody>
                        {groupGames}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
        }

        { games && games.length > 0 &&
        <div className="col-sm-6">
            <div className="dashboard-box">
                <div className="dashboard-box-header row m0">
                    <div className="dashboard-box-header__title col-sm-7 p0">
                        Игры
                    </div>
                </div>
                <div className="dashboard-box-content dashboard-box-content__padded">
                    {games}
                </div>
            </div>
        </div>
        }
        
    </div>
}

class Tournament extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            tournamentId: props.match.params.tournamentId,
            model: null,      
        };
    }

    componentDidMount() {
        fetch("/api/tournaments/" + this.state.tournamentId + "/info/")
            .then(res => res.json())
            .then(
                (result) => {                    
                    this.setState({
                        isLoaded: true,
                        model: result                        
                    });
                },
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            )
    }
    
    render() {
        const { error, isLoaded, tournamentId, model } = this.state;        
        
        if (error) {
            return <div>Ошибка: {error.message}</div>;
        } else if (!isLoaded) {
            return <Spinner/>;
        } else {
            const descriptionColClass = model.description ? "col-sm-6" : "col-sm-12";
                            
            return (
                <div>
                    <div className="dashboard">
                        <div className="row">                            
                            <div className={descriptionColClass}>
                                <div className="dashboard-box dashboard-box-padded height-140">
                                    <div className="dashboard-box__image">
                                        <object data={"/api/image/" + model.mediaId + "?width=120&height=120"} type="image/png">
                                            <img src="/Content/img/DefaultLogo_120x120.jpg" alt="logo" />
                                        </object>                                        
                                    </div>
                                    <div className="dashboard-box__name">
                                        { model.name }
                                    </div>
                                    { model.subName &&
                                        <div className="dashboard-box__sub-name">
                                            { model.subName }
                                        </div>
                                    }
                                </div>
                            </div>
                            { model.description &&
                            <div className={descriptionColClass}>
                                <div className="dashboard-box dashboard-box-padded height-140" dangerouslySetInnerHTML={{__html: model.description}} />                                
                            </div>
                            }
                        </div>
                        
                        { model.events &&
                            model.events.map((eventModel, index) =>
                                <EventTemplate
                                    key={index}
                                    playoffGames={eventModel.playoffGames}
                                    groupGames={eventModel.groupGames}
                                    games={eventModel.games}
                                    informationSpace={eventModel.informationSpace}
                                    name={eventModel.name} />
                            )   
                        }
                    </div>                    
                </div>
            );
        }
    }
}
export default Tournament;