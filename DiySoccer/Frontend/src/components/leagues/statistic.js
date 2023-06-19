import React, { Component } from "react";

import Spinner from "./../Shared/core/spinner";

class Statistic extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            leagueId: props.match.params.leagueId,
            model: null,      
        };
    }

    componentDidMount() {
        fetch("/api/leagues/" + this.state.leagueId + "/statistics/")
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
        const { error, isLoaded, leagueId, model } = this.state;
        if (error) {
            return <div>Ошибка: {error.message}</div>;
        } else if (!isLoaded) {
            return <Spinner/>;
        } else {
            
            const bestPlayers = model.bestPlayers.map((player, index) =>
                <tr key={index}>
                    <td>{player.name}</td>
                    <td className="width-100 text-right">{player.num}</td>
                </tr>
            )

            const helpers = model.bestHelpers.map((player, index) =>
                <tr key={index}>
                    <td>{player.name}</td>
                    <td className="width-100 text-right">{player.num}</td>
                </tr>
            )

            const forwards = model.bestForwards.map((player, index) =>
                <tr key={index}>
                    <td>{player.name}</td>
                    <td className="width-100 text-right">{player.num}</td>
                </tr>
            )
            
            return (
                <div className="dashboard">

                    <div className="row">
                        <div className="col-sm-4">
                            <div className="dashboard-box">
                                <div className="dashboard-box-header dashboard-box-header-border row m0">
                                    <div className="dashboard-box-header__title col-sm-7 p0">
                                        Лучшие игроки
                                    </div>
                                    <div className="dashboard-box-header__link col-sm-5 p0">
                                    </div>
                                </div>
                                <div className="dashboard-box-content">
                                    <table className="table table-striped mb0">
                                        <thead>
                                        <tr>
                                            <th>Имя</th>
                                            <th className="width-100 text-right">Очки</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {bestPlayers}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-4">
                            <div className="dashboard-box">
                                <div className="dashboard-box-header dashboard-box-header-border row m0">
                                    <div className="dashboard-box-header__title col-sm-7 p0">
                                        Лучшие ассисстенты
                                    </div>
                                    <div className="dashboard-box-header__link col-sm-5 p0">
                                    </div>
                                </div>
                                <div className="dashboard-box-content">
                                    <table className="table table-striped mb0">
                                        <thead>
                                        <tr>
                                            <th>Имя</th>
                                            <th className="width-100 text-right">Очки</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {helpers}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-4">
                            <div className="dashboard-box">
                                <div className="dashboard-box-header dashboard-box-header-border row m0">
                                    <div className="dashboard-box-header__title col-sm-7 p0">
                                        Лучшие бомбардиры
                                    </div>
                                    <div className="dashboard-box-header__link col-sm-5 p0">
                                    </div>
                                </div>
                                <div className="dashboard-box-content">
                                    <table className="table table-striped mb0">
                                        <thead>
                                            <tr>
                                            <th>Имя</th>
                                            <th className="width-100 text-right">Очки</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                        {forwards}
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
export default Statistic;