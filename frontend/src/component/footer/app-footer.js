import React from "react";
import "./app-footer.css";

export const AppFooter = () => {
  const currentYear = new Date().getFullYear();

  return (
    <>
      <nav className="navbar fixed-bottom navbar-expand-lg navbar-dark  ">
        <div className="container">
          <div className="collapse navbar-collapse" id="navbarNav">
            {Array.from(Array(6), (e, i) => {
              return (
                <div className="col-sm-12 col-md-2" key={i}>
                  <a href="https://www.pga.com/">
                    <img
                      className="img-fluid img-center"
                      alt="bhuppal@hotmail.com"
                      src={
                        process.env.PUBLIC_URL +
                        `/images/thumbnails/${i + 1}_imggolfcourse.jpg`
                      }
                    />
                  </a>
                </div>
              );
            })}
          </div>
          <ul className="nav navbar-nav navbar-right">
            <li>
              <div className="footer-copyright text-center py-3">
                <p className="footer p-3">
                  Copyright &copy; {currentYear}
                  <a
                    className="p-3"
                    href="https://www.pga.com/"
                  >
                    PGA
                  </a>
                </p>
              </div>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
};

export default AppFooter;
