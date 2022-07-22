import classes from "./css/Sidebar.module.css";
import {
  ChatAltIcon,
  CubeTransparentIcon,
  DotsVerticalIcon,
  SearchIcon,
} from "@heroicons/react/solid";
import * as EmailValidator from "email-validator";
import { signOut } from "firebase/auth";
import { auth, db } from "../firebase";
import { collection, addDoc } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollection } from "react-firebase-hooks/firestore";
import { query, where } from "firebase/firestore";
import emailSeparator from "../utils/emailSeparator";
import { useRouter } from "next/router";

function Sidebar() {
  const [user] = useAuthState(auth);
  const router = useRouter();

  const redirect = (id) => {
    router.push(`/chat/${id}`);
  };

  const q = query(
    collection(db, "chats"),
    where("users", "array-contains", user.email)
  );

  const [chatsSnapshot] = useCollection(q);
  const chatBundle = chatsSnapshot?.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  const createChat = () => {
    const input = prompt(
      "Please enter email address of the user you wish to chat with."
    );

    if (!input) return null;

    if (
      EmailValidator.validate(input) &&
      input !== user.email &&
      !chatAllReadyExists(input)
    ) {
      //add chat to db if it already doesnt exist and also valid
      addDoc(collection(db, "chats"), { users: [user.email, input] }).then(
        (res) => console.log("doc added ", res)
      );
    } else {
      alert(
        "You have entered incorrect email id OR chat already exists!! Please check"
      );
    }
  };

  const chatAllReadyExists = (recipentEmail) =>
    !!chatsSnapshot?.docs.find(
      (chat) =>
        chat.data().users.find((user) => user === recipentEmail)?.length > 0
    );

  const userSignOut = () => {
    signOut(auth).then((res) => {
      console.log("You have been logged out!");
    });
  };

  return (
    <div className={classes.sidebarBlock}>
      <div className={classes.header}>
        <img
          src={user?.photoURL}
          className={classes.user}
          onClick={userSignOut}
        />
        <span className={classes.flexContainer}>
          <CubeTransparentIcon className={classes["button"]} />
          <ChatAltIcon onClick={createChat} className={classes["button"]} />
          <DotsVerticalIcon className={classes["button"]} />
        </span>
      </div>

      <div className={classes.searchBoxContainer}>
        <SearchIcon className={classes.button} />
        <input
          className={classes.searchBar}
          type="search"
          placeholder="Search or start new chat"
        />
      </div>

      <div className={classes.contactList}>
        <ul className={classes.listContainer}>
          {chatBundle?.map((chatPerson) => (
            <li
              className={classes.listItem}
              key={chatPerson.id}
              onClick={() => redirect(chatPerson.id)}
            >
              <div className={classes.user}>
                {emailSeparator(chatPerson.users, user)[0]} {/* [0] to get the first letter of the Recipient-emailID*/}
              </div>
              <div className={classes.descContainer}>
                <h3>{emailSeparator(chatPerson.users, user)}</h3>
                <p>Last chat to read</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Sidebar;

