import React from "react";
import "@/views/style/FooterNavbar.css";
import '@fortawesome/fontawesome-free/css/all.min.css';

const FooterNavbar = () => {
  return (
    <div className="containerFooter">
      <footer className="bg-light text-center text-white">
        <div className="containerFooter p-4 pb-0">
        <nav className="navbar navbar-expand-lg ">
        <div  class="collapse navbar-collapse">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item">
              <a className="nav-link" href="#">Product</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">Blogs</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">Auction Result</a>
            </li>
          </ul>
          <form className="form-inline my-2 my-lg-0">
            <div className="input-group">
              <input className="form-control" type="search" placeholder="Search" aria-label="Search" />
              <div className="input-group-append">
                <button className="btn-search" type="submit">Search</button>
              </div>
            </div>
          </form>
        </div>
        
      </nav>
          <section className="mb-4">
            <a
              className="btn btn-floating m-1"
              style={{ backgroundColor: '#8896AB' }}
              href="#!"
              role="button"
            >
              <i className="fab fa-facebook-f"></i>
            </a>

            <a
              className="btn btn-floating m-1"
              style={{ backgroundColor: '#8896AB' }}
              href="#!"
              role="button"
            >
              <i className="fab fa-twitter"></i>
            </a>

            <a
              className="btn btn-floating m-1"
              style={{ backgroundColor: '#8896AB' }}
              href="#!"
              role="button"
            >
              <i className="fab fa-google"></i>
            </a>

            <a
              className="btn btn-floating m-1"
              style={{ backgroundColor: '#8896AB' }}
              href="#!"
              role="button"
            >
              <i className="fab fa-instagram"></i>
            </a>

            <a
              className="btn btn-floating m-1"
              style={{ backgroundColor: '#8896AB' }}
              href="#!"
              role="button"
            >
              <i className="fab fa-linkedin-in"></i>
            </a>

            <a
             className="btn btn-floating m-1"
             style={{ backgroundColor: '#8896AB' }}
              href="#!"
              role="button"
            >
              <i className="fab fa-github"></i>
            </a>
          </section>
        </div>
      </footer>
    </div>
  );
}

export default FooterNavbar;
