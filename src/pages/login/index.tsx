import "src/pages/login/style.sass";
import React, { FC, FormEvent, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";
import { RouteComponentProps } from "react-router-dom";
import { StateInterface } from "src/redux";
import axios from "axios";
import { swapiPeopleSearch } from "src/types/swapi";

interface test {
  ok: string;
}
const Login: FC<RouteComponentProps> = ({ history }) => {
  const dispatch = useDispatch();
  const state = useSelector<StateInterface, StateInterface>((state) => state);
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const {
        data: swapiPeopleSearchResult,
      } = await axios.get<swapiPeopleSearch>(
        `https://swapi.dev/api/people?search=${name}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        },
      );
      const { count, results } = swapiPeopleSearchResult;
      console.log(count, results);
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
            <form className="form" onSubmit={submit}>
              <div>
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  id="name"
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
                  placeholder="********"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              {error && <p>{error}</p>}
              <button>Login</button>
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
