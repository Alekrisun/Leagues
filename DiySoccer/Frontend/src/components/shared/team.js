import React, { Component } from "react";

import Spinner from "./../Shared/core/spinner";
import {useHistory} from "react-router-dom";

class Team extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            leagueId: props.match.params.leagueId,
            teamId: props.match.params.teamId,
            model: null,      
        };
    }

    componentDidMount() {
        fetch("/api/leagues/" + this.state.leagueId + "/teams/" + this.state.teamId + "/info/")
            .then(res => res.json())
            .then(
                (result) => {       
                    console.log(result);
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
        const { error, isLoaded, leagueId, teamId, model } = this.state;        
        
        if (error) {
            return <div>Ошибка: {error.message}</div>;
        } else if (!isLoaded) {
            return <Spinner/>;
        } else {

            const playersStats = model.playersStats.map((stat, index) =>
                <tr key={index}>
                    <td className="text-left width-100">{stat.num}</td>
                    <td className="text-left width-620">{stat.name}</td>
                    <td className="text-right width-100">{stat.best}</td>
                    <td className="text-right width-100">{stat.goal}</td>
                    <td className="text-right width-100">{stat.help}</td>
                    <td className="text-right width-100">{stat.sum}</td>
                </tr>
            );

            const GameChild = (props) => {
                let game = props.game;                
                                
                if (game.id) {
                    let history = useHistory();
                    let gamePath = "/leagues/" + props.leagueId + "/games/" + game.id;
                    
                    return (
                        <tr key={props.index}
                            className="cursor-pointer"
                            onClick={() => history.push(gamePath)}>
                            <td>{game.event}</td>
                            <td>{game.name}</td>
                            <td>{game.goals}</td>
                        </tr>
                    );                    
                } else {
                    return (
                        <tr key={props.index}>
                            <td>{game.event}</td>
                            <td>{game.name}</td>
                            <td>{game.goals}</td>
                        </tr>
                    );
                }                
            }
            
            const games = model.games.map((game, index) => <GameChild key={index} game={game} index={index} leagueId={leagueId} /> );
            
            const stats = model.stats.map((stat) =>
                <tr key={stat.id}>
                    <td>{stat.gamesCount}</td>
                    <td>{stat.wins}</td>
                    <td>{stat.loses}</td>
                    <td>{stat.draw}</td>
                    <td>{stat.scores}</td>
                    <td>{stat.missed}</td>
                    <td>{stat.points}</td>
                </tr>    
            );
            
            return (
                <div className="dashboard">
                    <div className="row">
                        <div className="col-sm-12">
                            <div className="dashboard-box dashboard-box-padded height-140">
                                <div className="dashboard-box__image">
                                    { model.mediaId &&
                                    <object className="table-img"
                                            data={"/api/image/uncut/" + model.mediaId + "?width=120&height=120"}
                                            type="image/png">
                                        <img src="/Content/img/DefaultLogo_120x120.jpg"
                                             alt="logo" />
                                    </object>
                                    }
                                </div>
                                
                                <div className="dashboard-box__name">
                                    {model.name}
                                </div>
                            </div>
                        </div>
                    </div>

                    { model.description &&
                    <div className="dashboard-box">
                        <div className="dashboard-box-header row m0">
                            <div className="dashboard-box-header__title col-sm-12 p0">
                                Описание
                            </div>
                        </div>
                        <div className="dashboard-box-content">
                            { model.description }
                        </div>
                    </div>
                    }

                    { model.stats &&
                    <div className="dashboard-box">
                        <div className="dashboard-box-header row m0">
                            <div className="dashboard-box-header__title col-sm-12 p0">
                                Статистика команды
                            </div>
                        </div>
                        <div className="dashboard-box-content">
                            <table className="table table-striped table-colored-columns">
                                <thead>
                                    <tr>
                                        <th>Кол-во игр</th>
                                        <th>Победы</th>
                                        <th>Поражения</th>
                                        <th>Ничьи</th>
                                        <th>Голы</th>
                                        <th>Пропущенные</th>
                                        <th>Очки</th>
                                    </tr>
                                </thead>
                                <tbody>
                                {stats}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    }

                    {model.playersStats &&
                    <div className="dashboard-box">
                        <div className="dashboard-box-header row m0">
                            <div className="dashboard-box-header__title col-sm-12 p0">
                                Статистика игроков
                            </div>
                        </div>
                        <div className="dashboard-box-content">
                            <table className="table table-striped table-colored-columns">
                                <thead>
                                <tr>
                                    <th className="text-left width-100">Номер</th>
                                    <th className="text-left width-620">Имя</th>
                                    <th className="text-right width-100">Лучший</th>
                                    <th className="text-right width-100">Гол</th>
                                    <th className="text-right width-100">Пас</th>
                                    <th className="text-right width-100">Гол + пас</th>
                                </tr>
                                </thead>
                                <tbody>
                                {playersStats}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    }
                    
                    <div className="dashboard-box">
                        <div className="dashboard-box-header row m0">
                            <div className="dashboard-box-header__title col-sm-12 p0">
                                Календарь
                            </div>
                        </div>
                        <div className="dashboard-box-content">
                            <table className="table table-striped table-colored-columns">
                                <tbody className="games-container">
                                {games}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            );
        }
    }
}
export default Team;