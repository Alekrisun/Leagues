import React, { Component } from "react";

import Spinner from "./../Shared/core/spinner";

const GameTemplate = (props) => {
    
    const scores = props.scores.map((score, index) =>
    <tr key={index}>
        <td>{score.name}</td>
        <td>{score.score}</td>
        <td>{score.help}</td>
    </tr>    
    );
    
    return <div>
        <div className="row">
            <div className="main-league-title">
                <object className="table-img"
                        data={"/api/image/" + props.mediaId + "?width=120&height=120"}
                        type="image/png">
                    <img src="/Content/img/DefaultLogo_120x120.jpg"
                         alt="logo" />
                </object>
            </div>
            <div className="main-league-title">
                <h3>{props.name}</h3>
            </div>
        </div>

        <div className="main-league-title">
            <h3>{props.score}</h3>
        </div>

        <div className="dashboard">
            <div className="dashboard-box">
                <div className="dashboard-box-header row m0">
                </div>
                <div className="dashboard-box-content">
                    <table className="table table-striped table-colored-columns">
                        <thead>
                        <tr>
                            <th>Имя</th>
                            <th>Гол</th>
                            <th>Пас</th>                            
                        </tr>
                        </thead>
                        <tbody>
                        {scores}
                        { props.best &&
                            <tr>
                               <td colSpan="3">Лучший игрок: {props.best}</td> 
                            </tr>                            
                        }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>        
};

class Game extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            leagueId: props.match.params.leagueId,
            gameId: props.match.params.gameId,
            model: null,      
        };
    }

    componentDidMount() {
        fetch("/api/leagues/" + this.state.leagueId + "/games/" + this.state.gameId)
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
        const { error, isLoaded, model } = this.state;        
        
        if (error) {
            return <div>Ошибка: {error.message}</div>;
        } else if (!isLoaded) {
            return <Spinner/>;
        } else {
            
            return (
                <div>
                    <div className="row">
                        <div className="col-sm-6">
                            <GameTemplate 
                                name={model.homeTeamName}                                           
                                mediaId={model.homeTeamMediaId} 
                                score={model.homeTeamScore} 
                                best={model.homeTeamBest}
                                scores={model.homeTeamScores}/>
                        </div>
                        <div className="col-sm-6">
                            <GameTemplate
                                name={model.guestTeamName}
                                mediaId={model.guestTeamMediaId}
                                score={model.guestTeamScore}
                                best={model.guestTeamBest}
                                scores={model.guestTeamScores}/>
                        </div>
                    </div>
                </div>            
            );
        }
    }
}
export default Game;