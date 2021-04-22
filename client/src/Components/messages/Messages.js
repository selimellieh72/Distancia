import React from "react";
import moment from "moment";
import { authContext } from "../../providers/AuthContext";

export default function Messages({ messages, scrollRef }) {
console.log(messages)
  return (
    <div className="messages-body">
      {messages?.map(
        (message) => (
          <div
            key={message._id}
            className={`message-container ${
              message.isMe ? "message-out" : "message-in"
            }`}
          >
            <div
              className={`message-holder ${
                message.isMe ? "right-sent" : "left-received"
              }`}
            >
              <div>
                {message.sender?.fullName !== undefined && (
                  <>
                    <span className={message.sender?.isTeacher?"message-sender teacher-sender":"message-sender"}>
                      {message.sender?.fullName}
                    </span>
                    <br />{" "}
                  </>
                )}
                <div>
                  <span>{message.text}</span>
                  <br />
                </div>
                <div className="message-timing">
                  <span className="message-timing__hour">
                    {moment(message.created_at).format("HH:mm")}
                  </span>
                </div>
              </div>
            </div>
          </div>
        )
        //     {/* <div className="message-container message-in">
        //   <div className="message-holder left-received">
        //     <span>
        //       Bonjour eleve je suis disponible pour repondre a vos questions.{" "}
        //     </span>{" "}
        //   </div>
        // </div> */}
      )}
      <div style={{ float: "left", clear: "both" }} ref={scrollRef}></div>
    </div>
  );
}
