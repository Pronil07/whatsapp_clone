import React, { useEffect, useRef, useState } from "react";
import classes from "./css/Center.module.css";
import {
  DotsVerticalIcon,
  EmojiHappyIcon,
  LinkIcon,
  PaperAirplaneIcon,
  SearchIcon,
  UserCircleIcon,
} from "@heroicons/react/solid";
import emailSeparator from "../utils/emailSeparator";

const Center = (props) => {
  const { user, chatUsers, messages } = props;
  const [chat, setChat] = useState("");
  const bottomOfText = useRef();

  const onMsgChange = (e) => {
    setChat(e.target.value);
  };

  const sendChat = () => {
    props.sendMessage(chat);
    setChat("");
  };

  useEffect(() => {
    setTimeout(
      bottomOfText.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      }),
      100
    );
  }, [messages]);

  return (
    <div className={classes.centerBlock}>
      {/* TopBar section */}
      <div className={classes.header}>
        <section className={classes.flexContainer}>
          <UserCircleIcon className={classes.user} />
          <h3>{emailSeparator(chatUsers?.users, user)}</h3>
        </section>
        <section className={classes.flexContainer}>
          <SearchIcon className={classes.button} />
          <DotsVerticalIcon className={classes.button} />
        </section>
      </div>

      {/* ChatArea section */}
      <div className={classes.chatArea}>
        {messages?.map((msg) => (
          <p
            key={msg.id}
            className={
              msg.sender === user.email ? classes.sentMsg : classes.receivedMsg
            }
          >
            {msg.text}
          </p>
        ))}
        <div className={classes.scroller} ref={bottomOfText}></div>
      </div>
      

      {/* Bottom Bar section */}
      <div className={classes.footer}>
        <EmojiHappyIcon className={classes.button} />
        <LinkIcon className={classes.button} />
        <input
          type="text"
          placeholder="Type a message"
          className={classes.textBar}
          onChange={onMsgChange}
          value={chat}
        />
        {/* <div class={classes.textBar} role="textbox" contentEditable> </div> */}
        <PaperAirplaneIcon
          className={`${classes.button} ${classes.rotate}`}
          onClick={sendChat}
        />
      </div>
    </div>
  );
};

export default Center;
