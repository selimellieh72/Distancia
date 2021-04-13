import React, { useContext, useEffect } from "react";
import {
  Switch,
  Route,
  useHistory,
  Redirect,
  useLocation,
} from "react-router-dom";

import axios from "axios";

import Auth from "./auth/Auth";
import PrivateRoute from "./Core/PrivateRoute";
import { authContext } from "../providers/AuthContext";
import Home from "../routers/Home";
import Homework from "../routers/homework/Homework";
import Grades from "../routers/grades/Grades";
import GradeManager from "../routers/grades/GradeManager";
import HomeworkTablePage from "../routers/homework/HomeworkTablePage";
import CircularProgessIndicator from "./Core/CircularProgessIndicator";
import Tests from "../routers/test/Tests";
import Lecture from "../routers/lectures/Lecture";
import Meetings from "../routers/Meetings";
import LectureDisplay from "../routers/lectures/LectureDisplay";
import CreateTest from "../routers/test/CreateTest";

export default function App() {
  const [authInfo, setAuthInfo] = useContext(authContext);
  const history = useHistory();
  const location = useLocation();

  useEffect(() => {
    async function getUser() {
      try {
        axios.defaults.withCredentials = true;
        const response = await axios.get("/session", {
          withCredentials: true,
        });

        setAuthInfo({
          username: response.data.username,
          isTeacher: response.data.isTeacher,
          discipline: response.data.discipline,
          fullName: response.data.fullName,
          isAuth: true,
        });
        history.push(location.pathname);
      } catch (e) {
        setAuthInfo({ ...authInfo, isAuth: false });
        console.log(e.response);
      }
    }
    getUser();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <main>
      {authInfo.isAuth === null ? (
        <CircularProgessIndicator />
      ) : (
        <Switch>
          <PrivateRoute
            path="/homeworks"
            component={Homework}
            isAuth={authInfo.isAuth}
            exact
          />
          <PrivateRoute
            path="/homeworks/:id"
            component={Homework}
            isAuth={authInfo.isAuth}
          />
          <PrivateRoute
            path="/grades"
            component={Grades}
            isAuth={authInfo.isAuth}
          />
          <PrivateRoute
            path="/manager"
            component={GradeManager}
            isAuth={authInfo.isAuth}
          />
          <PrivateRoute
            path="/homeworktable"
            component={HomeworkTablePage}
            isAuth={authInfo.isAuth}
          />
          <PrivateRoute
            path="/lecture"
            component={Lecture}
            isAuth={authInfo.isAuth}
          />
          <PrivateRoute
            path="/meetings"
            component={Meetings}
            isAuth={authInfo.isAuth}
          />
          <PrivateRoute
            path="/tests"
            component={Tests}
            isAuth={authInfo.isAuth}
          />
          <PrivateRoute
            path="/lecturedisplay"
            component={LectureDisplay}
            isAuth={authInfo.isAuth}
          />
          <PrivateRoute
            path="/testcreator"
            component={CreateTest}
            isAuth={authInfo.isAuth}
          />

          <Route path="/login" component={Auth}></Route>
          <Route
            path="/register"
            render={(props) => <Auth type="signup" />}
          ></Route>

          <Route
            path="/"
            exact
            render={() =>
              !authInfo.isAuth ? <Home /> : <Redirect to="/grades" />
            }
          />
        </Switch>
      )}
    </main>
  );
}
