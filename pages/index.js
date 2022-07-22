import Sidebar from "../components/Sidebar";
import DefaultPage from "../components/UI/DefaultPage";
import classes from "../styles/Home.module.css";


export default function Home() {
  return (
    <div className={classes.fullsize}>
      <Sidebar/>
      <DefaultPage/>
    </div>
  )
}
