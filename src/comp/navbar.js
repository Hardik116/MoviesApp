import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [isMoviesDropdownOpen, setMoviesDropdownOpen] = useState(false);
  const [isTvShowsDropdownOpen, setTvShowsDropdownOpen] = useState(false);
  const [isLanguagesDropdownOpen, setLanguagesDropdownOpen] = useState(false);

  const handleDropdownToggle = (dropdown) => {
    switch (dropdown) {
      case 'movies':
        setMoviesDropdownOpen(!isMoviesDropdownOpen);
        break;
      case 'tvShows':
        setTvShowsDropdownOpen(!isTvShowsDropdownOpen);
        break;
      case 'languages':
        setLanguagesDropdownOpen(!isLanguagesDropdownOpen);
        break;
      default:
        break;
    }
  };

  const handleSearch = (event) => {
    event.preventDefault();
    const searchQuery = event.target.elements.search.value.trim();

    if (searchQuery) {
      // Navigate to the search results page
      navigate(`/search?query=${encodeURIComponent(searchQuery)}`);
    }
  };

  const isActive = (pathname) => {
    return pathname === location.pathname ? 'active' : '';
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-dark" data-bs-theme="dark">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">MoviesApp</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className={`nav-item dropdown ${isMoviesDropdownOpen ? 'show' : ''}`}>
                <a className="nav-link dropdown-toggle" href="/" id="navbarDropdownMovies" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded={isMoviesDropdownOpen} onClick={() => handleDropdownToggle('movies')}>
                  Movies
                </a>
                <div className={`dropdown-menu ${isMoviesDropdownOpen ? 'show' : ''}`} aria-labelledby="navbarDropdownMovies">
                  <Link className={`dropdown-item ${isActive('/Pop')}`} to="/Pop">Popular</Link>
                  <Link className={`dropdown-item ${isActive('/Toprated')}`} to="/Toprated">Top Rated</Link>
                  <Link className={`dropdown-item ${isActive('/Trending')}`} to="/Trending">Trending</Link>
                </div>
              </li>
              <li className={`nav-item dropdown ${isTvShowsDropdownOpen ? 'show' : ''}`}>
                <a className="nav-link dropdown-toggle" href="/" id="navbarDropdownTvShows" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded={isTvShowsDropdownOpen} onClick={() => handleDropdownToggle('tvShows')}>
                  Tv shows
                </a>
                <div className={`dropdown-menu ${isTvShowsDropdownOpen ? 'show' : ''}`} aria-labelledby="navbarDropdownTvShows">
                  <Link className={`dropdown-item ${isActive('/Popu')}`} to="/Popu">Popular</Link>
                  <Link className={`dropdown-item ${isActive('/Toprate')}`} to="/Toprate">Top Rated</Link>
                  <Link className={`dropdown-item ${isActive('/Trend')}`} to="/Trend">Trending</Link>
                </div>
              </li>
              <li className={`nav-item dropdown ${isLanguagesDropdownOpen ? 'show' : ''}`}>
                <a className="nav-link dropdown-toggle" href="/" id="navbarDropdownLanguages" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded={isLanguagesDropdownOpen} onClick={() => handleDropdownToggle('languages')}>
                  Languages
                </a>
                <div className={`dropdown-menu ${isLanguagesDropdownOpen ? 'show' : ''}`} aria-labelledby="navbarDropdownLanguages">
                  <Link className={`dropdown-item ${isActive('/English')}`} to="/English">English</Link>
                  <Link className={`dropdown-item ${isActive('/Hindi')}`} to="/Hindi">Hindi</Link>
                  <Link className={`dropdown-item ${isActive('/Gujarati')}`} to="/Gujarati">Gujarati</Link>
                  <Link className={`dropdown-item ${isActive('/Marathi')}`} to="/Marathi">Marathi</Link>
                </div>
              </li>
            </ul>
            <form className="d-flex" onSubmit={handleSearch} role="search">
              <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" name="search" />
              <button className="btn btn-outline-success" type="submit">
                Search
              </button>
            </form>
          </div>
        </div>
      </nav>
    </div>
  );
}