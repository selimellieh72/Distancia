import React from "react";

export default function Messages({ messages, scrollRef }) {
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
              <span>{message.text} </span>
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
