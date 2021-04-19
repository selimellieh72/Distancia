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
import Header from "./Components/header/Header";
import SeeAnswers from "./routers/test/SeeAnswers";
import TakeQuizz from "./routers/test/TakeQuizz";
import VideoPlayer from "./routers/VideoPlayer";

export default function Router(props) {
  return (
    <Switch>
      <PrivateRoute
        path="/homeworks"
        component={Homework}
        isViewable={props.isAuth}
        exact
      />
      <PrivateRoute
        path="/grades/:gradeId/chapter/:chapterId/homeworks"
        component={Homework}
        isViewable={props.isAuth}
      />
      <PrivateRoute
        path="/grades/:gradeId/chapter/:chapterId/lectures"
        component={Lecture}
        isViewable={props.isAuth}
      />
      <PrivateRoute
        path="/grades/:gradeId/lectures"
        component={Lecture}
        isViewable={props.isAuth}
      />
      <PrivateRoute
        path="/grades"
        component={Grades}
        isViewable={props.isAuth}
        exact
      />
      <PrivateRoute
        path="/manager"
        component={GradeManager}
        isViewable={props.isAuth}
      />
      <PrivateRoute
        path="/homeworks/:homeworkId"
        component={HomeworkTablePage}
        isViewable={props.isAuth && props.isTeacher}
      />

      <PrivateRoute
        path="/meetings"
        component={Meetings}
        isViewable={props.isAuth}
      />
      <PrivateRoute path="/tests" component={Tests} isViewable={props.isAuth} />
      <PrivateRoute
        path="/lecturedisplay"
        component={LectureDisplay}
        isViewable={props.isAuth}
      />
      <PrivateRoute
        path="/testcreator"
        component={CreateTest}
        isViewable={props.isAuth}
      />
      <PrivateRoute
        path="/messages"
        component={Messages}
        isViewable={props.isAuth}
      />
      <PrivateRoute
        path="/messageconversations"
        component={MessageConversation}
        isViewable={props.isAuth}
      />
      <PrivateRoute path="/stats" component={Stats} isViewable={props.isAuth} />

      <PrivateRoute
        path="/answers"
        component={SeeAnswers}
        isViewable={props.isAuth}
      />
      <PrivateRoute
        path="/takequizz"
        component={TakeQuizz}
        isViewable={props.isAuth}
      />
      <PrivateRoute
        path="/video"
        component={VideoPlayer}
        isViewable={props.isAuth}
      />
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
