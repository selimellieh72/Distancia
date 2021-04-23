import React from "react";
import Auth from "../Components/auth/Auth";
import CircularProgessIndicator from "../Components/Core/CircularProgessIndicator";
import Header from "../Components/header/Header";
import { ReactComponent as ArrowSvg } from "../assets/svg/Ar-ID.svg";
import { ReactComponent as CheckSvg } from "../assets/svg/Check-LogIn.svg";
import { ReactComponent as HomeworkSvg } from "../assets/svg/notebook.svg";
import { ReactComponent as VideoChatSvg } from "../assets/svg/videoChat.svg";
import { ReactComponent as ClassRoomSvg } from "../assets/svg/classroom.svg";
import { ReactComponent as LibrarySvg } from "../assets/svg/library.svg";

export default function Home() {
  return (
    <div>
      <section className="homepage-steps">
        <div className="steps-lsist">
          <ul className="steps-list__items">
            <li className="steps-list__item">
              <div className="steps-list__image">
                <ArrowSvg className="steps-list__image__svg" />
                <h3 className="steps-list__description">Enter your ID</h3>
              </div>
            </li>
            <li className="steps-list__item">
              <div className="steps-list__image">
                <ArrowSvg className="steps-list__image__svg" />
                <h3 className="steps-list__description">Enter your password</h3>
              </div>
            </li>
            <li className="steps-list__item">
              <div className="steps-list__image">
                <CheckSvg className="steps-list__image__svg" />
                <h3 className="steps-list__description">LogIn</h3>
              </div>
            </li>
          </ul>
        </div>
      </section>
      <section className="homepage-features">
        <div className="homepage-feature dark">
          <div>
            <div className="homepage-feature__div">
              <HomeworkSvg />
              <p className="homepage-feature__description left dark">
                Create your Homeworks and send it to your students.
              </p>
            </div>
          </div>
        </div>
        <div className="homepage-feature light">
          <div>
            <div className="homepage-feature__div">
              <p className="homepage-feature__description right light">
                Live Chat system
                <br /> between
                <br />
                Teachers and Students.
              </p>
              <VideoChatSvg />
            </div>
          </div>
        </div>
        <div className="homepage-feature dark">
          <div>
            <div className="homepage-feature__div">
              <ClassRoomSvg />
              <p className="homepage-feature__description left dark">
                Create or answer tests <br /> posted by your teacher.
              </p>
            </div>
          </div>
        </div>
        <div className="homepage-feature light">
          <div>
            <div className="homepage-feature__div">
              <p className="homepage-feature__description right light">
                Have all your lectures grouped <br />
                at one and single
                <br /> location.
              </p>
              <LibrarySvg />
            </div>
          </div>
        </div>
      </section>
      <section className="footer">
        <h1>Copyright © 2020 Project EDU.lb Inc. All rights reserved.</h1>
      </section>
    </div>
  );
}
