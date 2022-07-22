import React from "react";
import Center from "../../components/Center";
import Sidebar from "../../components/Sidebar";
import classes from "../../styles/Home.module.css";
import { useRouter } from "next/router";
import {
  useCollectionData,
  useDocumentData,
} from "react-firebase-hooks/firestore";
import {
  addDoc,
  collection,
  doc,
  limitToLast,
  orderBy,
  query,
  serverTimestamp,
} from "firebase/firestore";
import { auth, db } from "../../firebase";
import { useAuthState } from "react-firebase-hooks/auth";

function Chat() {
  const [user] = useAuthState(auth);
  const router = useRouter();
  const { id } = router.query;
  const q = query(
    collection(db, `chats/${id}/messages`),
    orderBy("timestamp"),
    limitToLast(20)
  );
  const [messages] = useCollectionData(q);
  const [chatUsers] = useDocumentData(doc(db, "chats", id));

  const sendMessage = async (chat) => {
    //event.preventDefault();
    await addDoc(collection(db, `chats/${id}/messages`), {
      text: chat,
      sender: user.email,
      timestamp: serverTimestamp(),
    });
  };
  return (
    <div className={classes.fullsize}>
      <Sidebar />
      <Center
        messages={messages}
        chatUsers={chatUsers}
        user={user}
        sendMessage={sendMessage}
      />
    </div>
  );
}

export default Chat;
