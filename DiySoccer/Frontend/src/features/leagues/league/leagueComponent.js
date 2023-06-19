import React, { Component } from "react";
import {Link, Redirect, useHistory } from "react-router-dom";

class LeagueComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            id: props.match.params.id,
            model: null,      
        };
    }

    componentDidMount() {
        fetch("/api/leagues/" + this.state.id + "/info/")
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
        const { error, isLoaded, id, model } = this.state;        
        
        if (error) {
            return <div>Ошибка: {error.message}</div>;
        } else if (!isLoaded) {
            return <div />;
        } else {

            const Child = (props) => {
                let team = props.team;
                
                let history = useHistory();
                let path = "/leagues/" + id + "/teams/" + team.id;                
                
                return <tr className="team-row cursor-pointer"
                           key={team.id}
                           onClick={() => history.push(path)}>
                    <td className="number-cell">{props.index + 1}.</td>
                    <td>
                        { team.mediaId &&
                        <object className="table-img" data={"/api/image/" + team.mediaId + "?width=25&height=25"} type="image/png">
                            <img src="/Content/img/DefaultLogo_25x25.jpg" alt="logo" />
                        </object>
                        }
                        {team.name}
                    </td>
                    <td className="width-60 text-center">{team.games}</td>
                    <td className="width-60 text-center">{team.points}</td>
                </tr> 
            };
            
            const validTeams = model.teams && model.teams.length > 0;
            const teams = validTeams
                ? model.teams.map((team, index) => <Child key={index} team={team} index={index} />)
                :
                <tr>
                    <td colSpan="4">Нет данных</td>
                </tr>;

            const validEvents = model.events && model.events.length > 0;
            const events = validEvents
                ? model.events.map((singleEvent) => <tr key={singleEvent.name}>
                        <td className="width-200">
                            <div>
                                {singleEvent.name}
                            </div>
                            <div>
                                {singleEvent.date}
                            </div>
                        </td>
                        <td>
                            { singleEvent.teams &&
                                singleEvent.teams.map((team) => <div key={team}>{team}</div>)
                            }
                        </td>
                    </tr>
                )
                : 
                <tr>
                    <td colSpan="3">Нет данных</td>
                </tr>

            const validGamesToPlay = model.gamesToPlay && model.gamesToPlay.length > 0;
            const gamesToPlay = validGamesToPlay
                ? model.gamesToPlay.map((gameToPlay) =>
                    <tr key={gameToPlay.name}>
                        <td className="width-200">
                            <div>{gameToPlay.name}</div>
                            <div>{gameToPlay.date}</div>
                        </td>
                        <td>
                            {
                                gameToPlay.teams.map((team) =>
                                    <div key={team}>{team}</div>
                                )
                            }
                        </td>
                    </tr>
                )
                : <tr><td colSpan="3">Нет данных</td></tr>
            
            return (
                <div className="dashboard">
                    <div className="row">
                        <div className="col-sm-5">
                            <div className="dashboard-box dashboard-box-padded height-140">
                                <div className="dashboard-box__image">
                                    <object data={"/api/image/" + model.mediaId + "?width=120&height=120"} type="image/png">
                                        <img src="/Content/img/DefaultLogo_120x120.jpg" alt="logo" />
                                    </object>                                    
                                </div>
                                <div className="dashboard-box__name">
                                    {model.name}
                                </div>
                                <div className="dashboard-box__sub-name">
                                    {model.subName}
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-7">
                            <div className="dashboard-box height-140">
                                <div className="dashboard-box__description">
                                    <div className="dashboard-box__description-text">
                                        {model.description}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-sm-7">
                            <div className="dashboard-box">
                                <div className="dashboard-box-header row m0">
                                    <div className="dashboard-box-header__link col-sm-7 p0">
                                    </div>
                                    <div className="dashboard-box-header__link col-sm-5 p0">
                                        <i className="fa fa-share" />
                                        <Link to={"/leagues/" + id + "/table"}>Таблица</Link>
                                    </div>
                                </div>
                                <div className="dashboard-box-content">
                                    <table className="table table-hovered mb0 table-colored-columns">
                                        <thead>
                                            <tr>
                                                <th></th>
                                                <th>Команда</th>
                                                <th className="width-60 text-center">Игры</th>
                                                <th className="width-60 text-center">Очки</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {teams}                                    
                                        </tbody>                                     
                                    </table>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-5">
                            <div className="dashboard-box">
                                <div className="dashboard-box-header dashboard-box-header-border row m0">
                                    <div className="dashboard-box-header__title col-sm-7 p0">
                                    </div>
                                    <div className="dashboard-box-header__link col-sm-5 p0">
                                        <i className="fa fa-share" />
                                        <a href={"/leagues/" + id + "/calendar"}>события</a>
                                    </div>
                                </div>
                                <div className="dashboard-box-content">
                                    <table className="table table-hovered mb0">
                                        <thead>
                                        <tr>
                                            <th className="width-200">Событие</th>
                                            <th>Команды</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                            {events}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            <div className="dashboard-box">
                                <div className="dashboard-box-header dashboard-box-header-border row m0">
                                    <div className="dashboard-box-header__title col-sm-7 p0">
                                    </div>
                                    <div className="dashboard-box-header__link col-sm-5 p0">
                                        <i className="fa fa-share" />
                                        <Link to={"/leagues/" + id + "/statistics"}>статистика</Link>
                                    </div>
                                </div>
                                <div className="dashboard-box-content">
                                    <table className="table table-hovered mb0 table-colored-columns">
                                        <thead>
                                        <tr>
                                            <th className="width-200">Название</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        <tr>                                            
                                            <td className="width-200">
                                                Лучший игрок
                                            </td>                                            
                                            <td>
                                                { model.bestPlayer &&
                                                    <div>
                                                        <object className="table-img"
                                                                data={"/api/image/" + model.bestPlayer.mediaId + "?width=25&height=25"}
                                                                type="image/png">
                                                            <img src="/Content/img/DefaultLogo_25x25.jpg"
                                                                 alt="logo" />
                                                        </object>
                                                        <span>{model.bestPlayer.name}</span>
                                                    </div>
                                                }    
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="width-200">
                                                Лучший бомбардир
                                            </td>
                                            <td>
                                                { model.bestGoalPlayer &&
                                                <div>
                                                    <object className="table-img"
                                                            data={"/api/image/" + model.bestGoalPlayer.mediaId + "?width=25&height=25"}
                                                            type="image/png">
                                                        <img src="/Content/img/DefaultLogo_25x25.jpg"
                                                             alt="logo" />
                                                    </object>
                                                    <span>{model.bestGoalPlayer.name}</span>
                                                </div>
                                                }
                                            </td>                                           
                                        </tr>
                                        <tr>
                                            <td className="width-200">
                                                Лучший ассисстент
                                            </td>
                                            <td>
                                                { model.bestHelpPlayer &&
                                                <div>
                                                    <object className="table-img"
                                                            data={"/api/image/" + model.bestHelpPlayer.mediaId + "?width=25&height=25"}
                                                            type="image/png">
                                                        <img src="/Content/img/DefaultLogo_25x25.jpg"
                                                             alt="logo" />
                                                    </object>
                                                    <span>{model.bestHelpPlayer.name}</span>
                                                </div>
                                                }
                                            </td>
                                        </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>

                            {model.gamesToPlay &&
                            <div className="dashboard-box">
                                <div className="dashboard-box-header dashboard-box-header-border row m0">
                                    <div className="dashboard-box-header__title col-sm-7 p0">
                                    </div>
                                    <div className="dashboard-box-header__link col-sm-5 p0">
                                        <i className="fa fa-share" />
                                        <a href="#leagues/{{id}}/calendar">Пропущенные</a>
                                    </div>
                                </div>
                                <div className="dashboard-box-content">
                                    <table className="table table-hovered mb0">
                                        <thead>
                                        <tr>
                                            <th className="width-200">Событие</th>
                                            <th>Команды</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {gamesToPlay}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            }
                        </div>
                    </div>
                </div>
            );
        }
    }
}
export default LeagueComponent;