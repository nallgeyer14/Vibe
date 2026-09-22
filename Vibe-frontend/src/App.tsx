import React, { useEffect, useState } from 'react';
import { profiles, chats } from './data';
import BottomNav from './components/BottomNav';
import Welcome from './screens/Welcome';
import Onboarding from './screens/Onboarding';
import Interests from './screens/Interests';
import Login from './screens/Login'
import Vibes from './screens/Vibes';
import MatchScreen from './screens/Match';
import Activities from './screens/Activities';
import ActivityDetail from './screens/ActivityDetail';
import CreateActivity from './screens/CreateActivity';
import ChatsScreen from './screens/Chats';
import ChatDetail from './screens/ChatDetail';
import ProfileScreen from './screens/Profile';
import Settings from './screens/Settings';
import EditProfile from './screens/EditProfile';
import type { Profile } from './models/profiles';
import { checkBackend } from './services/api';



type AuthScreen = 'welcome' | 'login' | 'onboarding' | 'interests';
type Tab = 'vibes' | 'activities' | 'chats' | 'profile';
type SubScreen =
  | { type: 'match'; profile: Profile }
  | { type: 'activity-detail'; activityId: number }
  | { type: 'create-activity' }
  | { type: 'chat-detail'; chatId: number }
  | { type: 'settings' }
  | { type: 'edit-profile' };

export default function App() {
  useEffect(() => {
    checkBackend()
      .then((data) => {
        console.log('Backend:', data);
      })
      .catch((error) => {
        console.error('Backend connection failed:', error);
      });
  }, []);
  const [authScreen, setAuthScreen] = useState<AuthScreen | null>('welcome');
  const [activeTab, setActiveTab] = useState<Tab>('vibes');
  const [subScreen, setSubScreen] = useState<SubScreen | null>(null);
  const [matchProfile, setMatchProfile] = useState<Profile | null>(null);
  const [profileVersion, setProfileVersion] = useState(0);

  const totalUnread = chats.reduce((sum, c) => sum + c.unread, 0);

  // Auth flow
  if (authScreen === 'welcome') {
    return (
      <div className="phone">
        <Welcome
          onGetStarted={() => setAuthScreen('onboarding')}
          onLogin={() => setAuthScreen('login')}
        />
      </div>
    );
  }
  if (authScreen === 'login') {
    return (
      <div className="phone">
        <Login
          onBack={() => setAuthScreen('welcome')}
          onLoginSuccess={() => setAuthScreen(null)}
        />
      </div>
    );
  }
  if (authScreen === 'onboarding') {
    return (
      <div className="phone">
        <Onboarding onComplete={() => setAuthScreen('interests')} />
      </div>
    );
  }
  if (authScreen === 'interests') {
    return (
      <div className="phone">
        <Interests onComplete={() => setAuthScreen(null)} />
      </div>
    );
  }

  // Main app
  const handleMatch = (profile: Profile) => {
    setMatchProfile(profile);
    setSubScreen({ type: 'match', profile });
  };

  const handleTabChange = (tab: Tab) => {
    setActiveTab(tab);
    setSubScreen(null);
  };

  const renderContent = () => {
    // Subscreens that replace tab content
    if (subScreen) {
      if (subScreen.type === 'match' && matchProfile) {
        return (
          <MatchScreen
            profile={matchProfile}
            onChat={() => {
              setActiveTab('chats');
              setSubScreen({ type: 'chat-detail', chatId: 1 });
            }}
            onKeepSwiping={() => setSubScreen(null)}
          />
        );
      }

      if (subScreen.type === 'activity-detail') {
        return (
          <ActivityDetail
            activityId={subScreen.activityId}
            onBack={() => setSubScreen(null)}
            onChat={() => setSubScreen({ type: 'chat-detail', chatId: 2 })}
          />
        );
      }
      if (subScreen.type === 'create-activity') {
        return (
          <CreateActivity
            onBack={() => setSubScreen(null)}
            onPost={() => {
              setSubScreen(null);
            }}
          />
        );
      }
      if (subScreen.type === 'chat-detail') {
        return (
          <ChatDetail
            chatId={subScreen.chatId}
            onBack={() => setSubScreen(null)}
          />
        );
      }
      if (subScreen.type === 'settings') {
        return (
          <Settings
            onBack={() => setSubScreen(null)}
            onEditProfile={() => setSubScreen({ type: 'edit-profile' })}
          />
        );
      }
      
      if (subScreen.type === 'edit-profile') {
        return (
          <EditProfile
            onBack={() => setSubScreen(null)}
            onSaved={() => {
              setProfileVersion(version => version + 1);
              setSubScreen(null);
            }}
          />
        );
      }
    }

    // Main tabs
    switch (activeTab) {
      case 'vibes':
        return <Vibes onMatch={handleMatch} />;
      case 'activities':
        return (
          <Activities
            onActivityDetail={id => setSubScreen({ type: 'activity-detail', activityId: id })}
            onCreateActivity={() => setSubScreen({ type: 'create-activity' })}
          />
        );
      case 'chats':
        return (
          <ChatsScreen
            onChatOpen={id => setSubScreen({ type: 'chat-detail', chatId: id })}
          />
        );
        case 'profile':
          return (
            <ProfileScreen
              key={profileVersion}
              onSettings={() => setSubScreen({ type: 'settings' })}
              onEditProfile={() => setSubScreen({ type: 'edit-profile' })}
            />
          );
    }
  };

  const isFullScreen =
    subScreen?.type === 'match' ||
    subScreen?.type === 'create-activity' ||
    subScreen?.type === 'settings' ||
    subScreen?.type === 'edit-profile';
  
  const hidNav = subScreen?.type === 'activity-detail' || subScreen?.type === 'chat-detail' || isFullScreen;

  return (
    <div className="phone">
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
        }}
      >
        {renderContent()}
      </div>
  
      {!hidNav && (
        <BottomNav
          activeTab={activeTab}
          onTabChange={handleTabChange}
          unreadChats={totalUnread}
        />
      )}
    </div>
  );
}
