import React from "react";
import { Route, Routes } from "react-router-dom";
import NotificationManager from "./components/NotificationsManager";
import Home from "./pages/Home";
import Auth from "./pages/Auth";  
import Host from "./pages/Host";
import Player from "./pages/Player";
import Shared from "./pages/Shared";
import Analtics from "./components/AnalyticsOverview";
import UserManagement from "./components/UserManagement";
import Statss from "./components/Statss";
import ContentModeration from "./components/ContentModeration";
import Login from "./components/Login";
import StartQuizRoom from "./components/StartQuizRoom";
import SystemMonitor from "./components/SystemMonitor";
import RoleManagement from "./components/RoleManagement";
import JoinQuiz from "./components/JoinQuiz";
import LobbyRoom from "./components/LobbyRoom";
import Leaderboard from "./components/Leaderboard";
import Register from "./components/Register";
import Leaderbord from "./components/Leaderbord";
import Footer from "./components/Footer";
import Createquiz from "./components/Createquiz";
import Questionmanager from "./components/Questionmanager";
import Quizroomhostviw from "./components/Quizroomhostviw";
import QuizRoomPlayerView from "./components/QuizRoomPlayerView";
import Forgetpass from "./components/Forgetpass";
import AdminLogin from "./components/Adminlogin";
import Achievements from "./components/Achievements";
import Admindashbord from "./components/Admindashbord";
import ActivityLogs from "./components/ActivityLogs"
import Features from "./components/Features";
import { ActivitySquare, Contact, ImageOff, Import } from "lucide-react";
import FeedbackCenter from "./components/FeedbackCenter";
import AnnouncementManager from "./components/AnnouncementManager";
import HostDashboardLayout from "./components/HostDashboardLayout";
import CreateQuizRoom from "./components/CreateQuizRoom";
import QuizHistoryPlayer from "./components/QuizHistoryPlayer";
import ProfileCustomization from "./components/ProfileCustomization";
import LeaderboardManagement from "./components/LeaderboardManagement";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/auth" element={<Auth />} />
      


      <Route path="/leaderboardManagement" element={<LeaderboardManagement/>} />
      <Route path="/quizHistoryPlayer" element={<QuizHistoryPlayer/>} />
      <Route path="/profileCustomization" element={<ProfileCustomization/>} />


      <Route path="/announcementManager" element={<AnnouncementManager/>} />


      <Route path="/achievements" element={<Achievements/>} />

      <Route path="/leaderboard" element={<Leaderboard/>} />


      <Route path="/joinQuiz" element={<JoinQuiz/>} />


      
      <Route path="/hostDashboardLayout" element={<HostDashboardLayout/>} />
      <Route path="/lobbyRoom" element={<LobbyRoom/>} />

      <Route path="/createQuizRoom" element={<CreateQuizRoom/>} />
      <Route path="/startQuizRoom" element={<StartQuizRoom/>} />
      
      <Route path="/feedbackCenter" element={<FeedbackCenter/>} />


      
      
      
      <Route path="/notificationManager" element={<NotificationManager/>} />
      
      <Route path="/activityLogs" element={<ActivityLogs/>} />
      
      <Route path="/analtics" element={<Analtics />} />
      
      <Route path="/userManagement" element={<UserManagement />} />
      <Route path="/statss" element={<Statss />} />
      <Route path="/adminlogin" element={<AdminLogin/>} />


      
      
      
      <Route path="/roleManagement" element={<RoleManagement/>} />

      <Route path="/contentModeration" element={<ContentModeration/>} />

      <Route path="/systemMonitor" element={<SystemMonitor/>} />

      
      <Route path="/admindashbord" element={<Admindashbord/>} />



      <Route path="/quizRoomPlayerView" element={<QuizRoomPlayerView />} />
      <Route path="/forgetpass" element={<Forgetpass/>} />
      {/* <Route path="/register" element={<Register/>} /> */}
      
      <Route path="/quizroomhostviw" element={<Quizroomhostviw />} />
      <Route path="/questionmanager" element={<Questionmanager />} />
      
      <Route path="/player" element={<Player/>} />
      
      {/* <Route path="/hostDashbord" element={<HostDashbord />} /> */}
      <Route path="/createquiz" element={<Createquiz/>} />

      
      <Route path="/register" element={<Register/>} />
      <Route path="/host" element={<Host />} />
      
      <Route path="/login" element={<Login/>}/>

      
      <Route path="/features" element={<Features/>}/>
      <Route path="/shared" element={<Shared />} />
      
      <Route path="/footer" element={<Footer />} />
      
      
      <Route path="/leaderbord" element={<Leaderbord/>} />
    </Routes>
  );
};

export default App;
















