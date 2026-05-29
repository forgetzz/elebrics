import StatistikPage from "@/components/Dashboard/Statistik";
import {Home, Profile} from "../components/index"
import UploadMusic from "@/components/Dashboard/upload";
import Withdraw from "@/components/Dashboard/Withdraw";




export const tabStrategies= {
  home: <Home />,
upload : <UploadMusic/>,
  profile: <Profile />,
  withdraw : <Withdraw/>
};


export type TabKey = keyof typeof tabStrategies;