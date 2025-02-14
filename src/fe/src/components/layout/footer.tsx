export default function Footer() {
  return (
    <footer id="main-footer">
      <nav className="navbar navbar-bottom">
        <div className="container">
          <div className="navbar-header">
            <button
              type="button"
              className="navbar-toggle collapsed"
              data-toggle="collapse"
              data-target="#navbar"
              aria-expanded="false"
              aria-controls="navbar"
            >
              <span className="sr-only">Toggle navigation</span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
            </button>
          </div>
          <div id="navbar" className="navbar-collapse collapse">
            <div className="navbar-header">
              <a className="navbar-brand diys-bottom-band " href="#">
                ©&nbsp;&nbsp;2024 DIY FOOTBALL SITE
              </a>
            </div>
          </div>
        </div>
      </nav>
    </footer>
  );
}
