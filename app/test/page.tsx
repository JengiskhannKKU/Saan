import React from 'react';
import { useLiff } from '@/lib/hooks/useLiff';

const LIFF_ID = process.env.NEXT_PUBLIC_LIFF_ID || '';

const LiffPage: React.FC = () => {
  const { liff, isLoggedIn, profile } = useLiff(LIFF_ID);

  if (!liff) return <p>Loading LIFF...</p>;

  return (
    <div>
      <h1>LINE LIFF in Next.js</h1>
      {isLoggedIn && profile ? (
        <div>
          <p>Welcome, {profile.displayName}</p>
          {profile.pictureUrl && <img src={profile.pictureUrl} alt="profile" />}
          <p>Status: {profile.statusMessage}</p>
        </div>
      ) : (
        <p>Redirecting to LINE login...</p>
      )}
    </div>
  );
};

export default LiffPage;
