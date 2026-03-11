//import Image from "next/image";
//import styles from "./profile.module.css";
//import EventsPage from "./events/page";
//import ProfilePage from "./Profile/ProfilePage";
//import Test from "./Profile/test";
import CustomCursor from "@/components/custom/Cursor";
import LoginPage from "./login/page";
//import Timeline from "./timeline/Timeline";

export default function Home() {
  return (
    <>
      <CustomCursor />
      <LoginPage />
    </>
  );
}
