import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import Leagues from "./features/leagues/leaguesComponent";
import LeagueComponent from "./features/leagues/league/leagueComponent";
import EditLeagueComponent from "./features/leagues/league/edit/editLeagueComponent";

import Footer from "./components/Shared/core/footer";
import Header from "./components/Shared/core/header";
import NotFound from "./components/not-found";

import LeagueTable from "./components/leagues/table";
import Statistic from "./components/leagues/statistic";
import Team from "./components/shared/team";
import Game from "./components/shared/game";
import Calendar from "./components/leagues/calendar";
import Tournament from "./components/tournaments/tournament";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isAdmin: false,
            isLoaded: false,
            error: null,
        };
    }
    
    componentDidMount() {
        fetch("/api/settings")
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        isAdmin: result.permissions.isAdmin,
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
        const { error, isAdmin, isLoaded } = this.state;

        if (error) {
            return <div>Ошибка: {error.message}</div>;
        } else {
            if (!isLoaded) {
                return (
                    <div className="spinner">
                        <div className="rect1"/>
                        <div className="rect2"/>
                        <div className="rect3"/>
                        <div className="rect4"/>
                        <div className="rect5"/>
                    </div>
                );
            } else {
                if (isAdmin) {
                    window.BBApp.start();
                    return (
                        <div>
                            <div id="main-header" />
                            <div className="container theme-showcase" role="main">
                                <div id="main-container" />
                            </div>
                            <footer id="main-footer">
                                <nav className="navbar navbar-bottom">
                                    <div className="container">
                                        <div className="navbar-header">
                                            <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
                                                <span className="sr-only">Toggle navigation</span>
                                                <span className="icon-bar"/>
                                                <span className="icon-bar"/>
                                                <span className="icon-bar"/>
                                            </button>
                                        </div>
                                        <div id="navbar" className="navbar-collapse collapse">
                                            <div className="navbar-header">
                                                <a className="navbar-brand diys-bottom-band " href="#">©&nbsp;&nbsp;2016 DIY FOOTBALL SITE (TEST)</a>
                                            </div>
                                        </div>
                                    </div>
                                </nav>
                            </footer>                            
                        </div>
                    )
                } else {
                    return (
                        <div>
                            <Header />
                            <div className="container theme-showcase" role="main">
                                <BrowserRouter>
                                    <Switch>                                                                                
                                        <Route exact path='/leagues/:leagueId/games/:gameId' component={Game} />
                                        <Route exact path='/leagues/:leagueId/teams/:teamId' component={Team} />
                                        <Route exact path='/leagues/:id/table' component={LeagueTable} />
                                        <Route exact path='/leagues/:leagueId/statistics' component={Statistic} />
                                        <Route exact path='/leagues/:leagueId/calendar' component={Calendar} />
                                        <Route exact path='/leagues/:id/edit' component={EditLeagueComponent} />
                                        <Route exact path='/leagues/:id' component={LeagueComponent} />
                                        <Route exact path='/tournaments/:tournamentId' component={Tournament} />                                        
                                        <Route exact path='/' component={Leagues} />
                                        <Route path='*' exact={true} component={NotFound} />
                                    </Switch>
                                </BrowserRouter>
                            </div>
                            <Footer />
                        </div>
                    );
                }
            }            
        }
    }
}
export default App;