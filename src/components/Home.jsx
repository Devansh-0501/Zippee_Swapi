import React, { useEffect, useState } from "react";
import CardGrid from "./CardGrid";
import "../styles/home.css";

const fakeLogin = async (username, password) => {
  await new Promise((r) => setTimeout(r, 600));
  if (username === "admin" && password === "password") {
    const token = "fake-jwt-token-" + Date.now();
    localStorage.setItem("mock_token", token);
    localStorage.setItem("token_expiry", Date.now() + 1000 * 60 * 2); // 2 min expiry
    return { token };
  }
  throw new Error("Invalid credentials");
};

const fakeRefreshToken = async () => {
  const token = "fake-jwt-token-" + Date.now();
  localStorage.setItem("mock_token", token);
  localStorage.setItem("token_expiry", Date.now() + 1000 * 60 * 2);
  return { token };
};

const Home = () => {
  const [data, setData] = useState([]);
  const [nextPage, setNextPage] = useState(null);
  const [prevPage, setPrevPage] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // auth states
  const [token, setToken] = useState(localStorage.getItem("mock_token"));
  const [authErr, setAuthErr] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // search + filter
  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState("");
  const [filterValue, setFilterValue] = useState("");

  // --- Fetch page data ---
  const fetchPage = async (url = "https://swapi.dev/api/people/?page=1") => {
    try {
      setLoading(true);
      const res = await fetch(url);
      const json = await res.json();
      setData(json.results);
      setNextPage(json.next);
      setPrevPage(json.previous);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch data.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPage();
  }, []);

  // --- Silent token refresh ---
  useEffect(() => {
    const interval = setInterval(async () => {
      const expiry = localStorage.getItem("token_expiry");
      if (expiry && Date.now() > expiry) {
        const newToken = await fakeRefreshToken();
        setToken(newToken.token);
      }
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // --- Auth handlers ---
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const { token } = await fakeLogin(username, password);
      setToken(token);
      setAuthErr("");
    } catch (err) {
      setAuthErr(err.message);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("mock_token");
    localStorage.removeItem("token_expiry");
    setToken(null);
  };

  // --- Filter + Search combined ---
  const filtered = data.filter((char) => {
    const matchSearch = char.name
      .toLowerCase()
      .includes(search.toLowerCase());

    let matchFilter = true;
    if (filterType && filterValue) {
      if (filterType === "homeworld")
        matchFilter = char.homeworld
          ?.toLowerCase()
          .includes(filterValue.toLowerCase());
      if (filterType === "film")
        matchFilter = char.films.some((f) =>
          f.toLowerCase().includes(filterValue.toLowerCase())
        );
      if (filterType === "species")
        matchFilter = char.species.some((s) =>
          s.toLowerCase().includes(filterValue.toLowerCase())
        );
    }

    return matchSearch && matchFilter;
  });

  // --- Pagination handlers ---
  const handleNext = () => {
    if (nextPage) {
      fetchPage(nextPage);
      setCurrentPage((p) => p + 1);
    }
  };

  const handlePrev = () => {
    if (prevPage) {
      fetchPage(prevPage);
      setCurrentPage((p) => p - 1);
    }
  };

  if (loading)
    return (
      <div className="home">
        <p className="message">Loading characters...</p>
      </div>
    );

  if (error)
    return (
      <div className="home">
        <p className="message error">{error}</p>
      </div>
    );

  if (!token)
    return (
      <div className="loginPage">
        <h2>Login to SWAPI Explorer</h2>
        <form onSubmit={handleLogin} className="loginForm">
          <input
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            placeholder="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit">Login</button>
        </form>
        {authErr && <p className="errorText">{authErr}</p>}
      </div>
    );

  return (
    <div className="home">
      <header className="header">
        <h1 className="title">Star Wars Characters</h1>
        <button className="logoutBtn" onClick={handleLogout}>
          Logout
        </button>
      </header>

      <div className="controls">
        <input
          placeholder="Search by name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select
          value={filterType}
          onChange={(e) => {
            setFilterType(e.target.value);
            setFilterValue("");
          }}
        >
          <option value="">Filter by...</option>
          <option value="homeworld">Homeworld</option>
          <option value="film">Film</option>
          <option value="species">Species</option>
        </select>
        {filterType && (
          <input
            placeholder={`Enter ${filterType}`}
            value={filterValue}
            onChange={(e) => setFilterValue(e.target.value)}
          />
        )}
      </div>

      <CardGrid resArray={filtered} />

      <div className="pagination">
        <button
          disabled={!prevPage}
          onClick={handlePrev}
          className="pageBtn"
        >
          ⬅ Previous
        </button>
        <span className="pageNumber">Page {currentPage}</span>
        <button
          disabled={!nextPage}
          onClick={handleNext}
          className="pageBtn"
        >
          Next ➡
        </button>
      </div>

      <div id="test-hook" data-testid="home-root"></div>
    </div>
  );
};

export default Home;
