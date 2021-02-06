import "src/pages/login/style.sass";
import React, { FC, FormEvent, useState } from "react";
import { BASE_API_URL } from "src/config";
import PropTypes from "prop-types";
import { RouteComponentProps } from "react-router-dom";
import axios from "axios";
import { swapiPeopleSearch } from "src/types/swapi";
import { useDispatch } from "react-redux";

const Login: FC<RouteComponentProps> = ({ history }) => {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const {
        data: swapiPeopleSearchResult,
      } = await axios.get<swapiPeopleSearch>(
        `${BASE_API_URL}/people?search=${name}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        },
      );
      const { count, results } = swapiPeopleSearchResult;

      if (
        count === 1 &&
        name === results[0].name &&
        password === results[0].birth_year
      ) {
        dispatch({
          type: "USER_LOGIN",
          payload: { isLoggedIn: true, name },
        });
        history.push("/");
      } else setError("Invalid credential");
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <div className="login">
        <div className="container">
          <div className="content">
            <form className="form" data-testid="form" onSubmit={submit}>
              <div>
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  id="name"
                  data-testid="name-input"
                  placeholder="Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  id="password"
                  data-testid="password-input"
                  placeholder="********"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              {error && <p>{error}</p>}
              <button data-testid="login-button">Login</button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

Login.propTypes = {
  history: PropTypes.any,
};

export default Login;
