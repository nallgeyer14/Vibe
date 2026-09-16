import React, { useState } from 'react';
import { Profile as ProfileData, chats } from './data';
import BottomNav from './components/BottomNav';
import Welcome from './screens/Welcome';
import Onboarding from './screens/Onboarding';
import Interests from './screens/Interests';
import Vibes from './screens/Vibes';
import MatchScreen from './screens/Match';
import Activities from './screens/Activities';
import ActivityDetail from './screens/ActivityDetail';
import CreateActivity from './screens/CreateActivity';
import ChatsScreen from './screens/Chats';
import ChatDetail from './screens/ChatDetail';
import ProfileScreen from './screens/Profile';
import Settings from './screens/Settings';

type AuthScreen = 'welcome' | 'onboarding' | 'interests';
type Tab = 'vibes' | 'activities' | 'chats' | 'profile';
type SubScreen =
  | { type: 'match'; profile: ProfileData }
  | { type: 'activity-detail'; activityId: number }
  | { type: 'create-activity' }
  | { type: 'chat-detail'; chatId: number }
  | { type: 'settings' };

export default function App() {
  const [authScreen, setAuthScreen] = useState<AuthScreen | null>('welcome');
  const [activeTab, setActiveTab] = useState<Tab>('vibes');
  const [subScreen, setSubScreen] = useState<SubScreen | null>(null);
  const [matchProfile, setMatchProfile] = useState<ProfileData | null>(null);

  const totalUnread = chats.reduce((sum, c) => sum + c.unread, 0);

  // Auth flow
  if (authScreen === 'welcome') {
    return (
      <div className="phone">
        <Welcome
          onGetStarted={() => setAuthScreen('onboarding')}
          onLogin={() => setAuthScreen(null)}
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
  const handleMatch = (profile: ProfileData) => {
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
          <Settings onBack={() => setSubScreen(null)} />
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
            onSettings={() => setSubScreen({ type: 'settings' })}
          />
        );
    }
  };

  const isFullScreen = subScreen?.type === 'match' || subScreen?.type === 'create-activity' || subScreen?.type === 'settings';
  const hidNav = subScreen?.type === 'activity-detail' || subScreen?.type === 'chat-detail' || isFullScreen;

  return (
    <div className="phone">
      <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
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
