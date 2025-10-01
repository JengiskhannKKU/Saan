import { useState, useEffect } from 'react';
import liff from '@line/liff';

interface LiffUserProfile {
  userId: string;
  displayName: string;
  pictureUrl?: string;
  statusMessage?: string;
}

interface UseLiffReturn {
  liff: typeof liff | null;
  isLoggedIn: boolean;
  profile: LiffUserProfile | null;
}

export const useLiff = (liffId: string): UseLiffReturn => {
  const [liffObject, setLiffObject] = useState<typeof liff | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [profile, setProfile] = useState<LiffUserProfile | null>(null);

  useEffect(() => {
    const initLiff = async () => {
      try {
        await liff.init({ liffId });
        setLiffObject(liff);

        if (liff.isLoggedIn()) {
          setIsLoggedIn(true);
          const userProfile = await liff.getProfile();
          setProfile({
            userId: userProfile.userId,
            displayName: userProfile.displayName,
            pictureUrl: userProfile.pictureUrl,
            statusMessage: userProfile.statusMessage,
          });
        } else {
          liff.login();
        }
      } catch (error) {
        console.error('LIFF initialization failed', error);
      }
    };

    initLiff();
  }, [liffId]);

  return { liff: liffObject, isLoggedIn, profile };
};
