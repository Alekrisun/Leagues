import React, { Component } from "react";

import Spinner from "./../Shared/core/spinner";

const GameTemplate = (props) => {        
    return <tr key={props.index}>
        
    </tr>
}

class Calendar extends Component {
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
        fetch("/api/leagues/" + this.state.leagueId + "/calendar/")
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
                
            return (
                <div className="dashboard">
                    <div className="row">
                        { model.events &&
                            model.events.map((eventModel, index) =>                                
                                <div key={index} 
                                    className="col-sm-4">
                                    <div className="dashboard-box">
                                        <div className="dashboard-box-content">
                                            <table className="table table-striped mb0">
                                                <thead>
                                                <tr>
                                                    <th>
                                                        <div>
                                                            {eventModel.name}    
                                                        </div>
                                                        <div>
                                                            { eventModel.startDate &&
                                                            eventModel.startDate.substring(0, 10)
                                                            }
                                                        </div>                                                        
                                                    </th>
                                                    <th className="width-60 text-right" />
                                                </tr>
                                                </thead>
                                                <tbody>
                                                { eventModel.games &&
                                                    eventModel.games.map((game, index) => 
                                                        <tr key={index}> 
                                                            <td>{game.homeTeamName} - {game.guestTeamName}</td>
                                                            <td className="width-60 text-center">
                                                                { game.exist &&
                                                                <div>{game.homeTeamScore} - {game.guestTeamScore}</div>                                                              
                                                                }
                                                            </td>
                                                        </tr>
                                                    )
                                                }                                                
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>                                
                            )                            
                        }                        
                    </div>
                </div>
            );
        }
    }
}
export default Calendar;