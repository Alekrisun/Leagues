import React, { Component } from "react";

class Header extends Component {
    render() {
        return (
            <div>
                <nav className="navbar navbar-fixed-top">
                    <div className="container">
                        <div className="navbar-header">
                            <button type="button" className="navbar-toggle collapsed" data-toggle="collapse"
                                    data-target="#navbar" aria-expanded="false" aria-controls="navbar">
                                <span className="sr-only">Toggle navigation</span>
                                <span className="icon-bar"></span>
                                <span className="icon-bar"></span>
                                <span className="icon-bar"></span>
                            </button>
                        </div>
                        <div id="navbar" className="navbar-collapse collapse">
                            <div className="navbar-header">
                                <a className="navbar-brand diys-top-band" href="/">Diy football site</a>
                            </div>
                        </div>                        
                    </div>
                </nav>             
            </div>
        );
    }
}

export default Header;