import { Outlet, Link } from "react-router-dom";

const AppHeader = () => {
  return (
    <>
      <nav className="navbar sticky-top navbar-expand-lg ">
        <div className="container">
          <a className="navbar-brand" href="#">
            <img
              alt="Brand"
              width="40"
              height="40"
              src="data:image/png;base64,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"
            />
            PGA
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link className="nav-link" to="/">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/contact">
                  Contact
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/about">
                  About
                </Link>
              </li>
            </ul>
          </div>
          <ul className="nav navbar-nav navbar-right">
            <li>
              <Link className="nav-link" to="/login">
                Login
              </Link>
            </li>
          </ul>
        </div>
      </nav>
      <Outlet />
    </>
  );
};

export default AppHeader;
