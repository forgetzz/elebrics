import StatistikPage from "@/components/Dashboard/Statistik";
import {Home, Profile} from "../components/index"
import UploadMusic from "@/components/Dashboard/upload";




export const tabStrategies= {
  home: <Home />,
upload : <UploadMusic/>,
  chart: <StatistikPage />,
  profile: <Profile />,
};


export type TabKey = keyof typeof tabStrategies;