import React from "react";
import { Switch, Redirect, Route } from "react-router-dom";
import Tests from "./routers/test/Tests";
import Lecture from "./routers/lectures/Lecture";
import Meetings from "./routers/Meetings";
import LectureDisplay from "./routers/lectures/LectureDisplay";
import CreateTest from "./routers/test/CreateTest";
import Messages from "./routers/messages/Message";
import MessageConversation from "./routers/messages/MessageConversation";
import Stats from "./routers/Stats";
import Home from "./routers/Home";
import Homework from "./routers/homework/Homework";
import Grades from "./routers/grades/Grades";
import GradeManager from "./routers/grades/GradeManager";
import HomeworkTablePage from "./routers/homework/HomeworkTablePage";
import Auth from "./Components/auth/Auth";
import PrivateRoute from "./Components/Core/PrivateRoute";

export default function Router(props) {
  return (
    <Switch>
      <PrivateRoute
        path="/homeworks"
        component={Homework}
        isAuth={props.isAuth}
        exact
      />
      <PrivateRoute
        path="/homeworks/:id"
        component={Homework}
        isAuth={props.isAuth}
      />
      <PrivateRoute path="/grades" component={Grades} isAuth={props.isAuth} />
      <PrivateRoute
        path="/manager"
        component={GradeManager}
        isAuth={props.isAuth}
      />
      <PrivateRoute
        path="/homeworktable"
        component={HomeworkTablePage}
        isAuth={props.isAuth}
      />
      <PrivateRoute path="/lecture" component={Lecture} isAuth={props.isAuth} />
      <PrivateRoute
        path="/meetings"
        component={Meetings}
        isAuth={props.isAuth}
      />
      <PrivateRoute path="/tests" component={Tests} isAuth={props.isAuth} />
      <PrivateRoute
        path="/lecturedisplay"
        component={LectureDisplay}
        isAuth={props.isAuth}
      />
      <PrivateRoute
        path="/testcreator"
        component={CreateTest}
        isAuth={props.isAuth}
      />
      <PrivateRoute
        path="/messages"
        component={Messages}
        isAuth={props.isAuth}
      />
      <PrivateRoute
        path="/messageconversations"
        component={MessageConversation}
        isAuth={props.isAuth}
      />
      <PrivateRoute path="/stats" component={Stats} isAuth={props.isAuth} />

      <Route path="/login" component={Auth}></Route>
      <Route path="/register" render={() => <Auth type="signup" />}></Route>

      <Route
        path="/"
        exact
        render={() => (!props.isAuth ? <Home /> : <Redirect to="/grades" />)}
      />
    </Switch>
  );
}
