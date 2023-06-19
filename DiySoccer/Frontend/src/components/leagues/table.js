import React, { Component } from "react";
import {Redirect, useHistory} from "react-router-dom";

import Spinner from "./../Shared/core/spinner";

class LeagueTable extends Component {
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
        fetch("/api/leagues/" + this.state.id + "/table/")
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
            return <Spinner/>;
        } else {

            const Child = (props) => {

                let team = props.team;

                let history = useHistory();
                let path = "/leagues/" + id + "/teams/" + team.id;
                
                return <tr key={team.id}
                           className="cursor-pointer"
                           onClick={() => history.push(path)}>
                    <td>
                        { team.mediaId &&
                        <object className="table-img"
                                data={"/api/image/" + team.mediaId + "?width=25&height=25"}
                                type="image/png">
                            <img src="/Content/img/DefaultLogo_25x25.jpg"
                                 alt="logo" />
                        </object>
                        }
                        {team.name}
                    </td>
                    <td className="width-100 text-right">{team.gamesCount}</td>
                    <td className="width-100 text-right">{team.wins}</td>
                    <td className="width-100 text-right">{team.draw}</td>
                    <td className="width-100 text-right">{team.loses}</td>
                    <td className="width-100 text-right">{team.scores}-{team.missed} ({team.scores-team.missed})</td>
                    <td className="width-100 text-right">{team.points}</td>
                </tr>
            }
            
            const valid = model.teamStats && model.teamStats.length > 0;
            const teams = valid
                ? model.teamStats.map((team, index) => <Child key={index} team={team} index={index} />)
                : <tr><td colSpan="3">Нет данных</td></tr>
            
            return (
                <div className="dashboard">
                    <div className="row">
                        <div className="col-sm-12">
                            <div className="dashboard-box">
                                <div className="dashboard-box-content">
                                    <table className="table table-striped mb0">
                                        <thead>
                                        <tr>
                                            <th>Название</th>
                                            <th className="width-100 text-right">Кол-во игр</th>
                                            <th className="width-100 text-right">Победы</th>
                                            <th className="width-100 text-right">Ничьи</th>
                                            <th className="width-100 text-right">Поражения</th>
                                            <th className="width-125 text-right">Голы</th>
                                            <th className="width-100 text-right">Очки</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {teams}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            );
        }
    }
}
export default LeagueTable;