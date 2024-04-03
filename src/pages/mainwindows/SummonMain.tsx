import React, { useState, useEffect, useRef } from 'react';
import { useMyResourcesSettersContext, useMyResourcesContext } from '../../data/ResourcesContext';
import { useVisibilityContext, useVisibilitySettersContext } from '../../data/VisibilityContext';
import { useMyFollowersContext, useMyFollowersSettersContext } from '../../data/FollowersContext';
import './SummonMain.css';



export default function SummonMain(eventObject: any) {
  const { divVisibility } = useVisibilityContext();
  const {  setVisibility, toggleVisibility} = useVisibilitySettersContext();
  const followers = useMyFollowersContext();
  const followersSetters = useMyFollowersSettersContext();

  const summonRef = useRef<HTMLVideoElement | null>(null);

  const [isFadingIn, setIsFadingIn] = useState(false);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [isVideoVisible, setIsVideoVisible] = useState(false);


  const handleClick = () => {
    setIsVideoVisible(true);
    setIsFadingIn(true);
  
    setTimeout(() => {
      if(summonRef.current)
      {
        summonRef.current.playbackRate = 0.75;
        summonRef.current.currentTime = 0; // rewind the video to the start
        summonRef.current.play();
      }
    }, 500); // delay the start of the video by .5 seconds
  
    setTimeout(() => {
      setIsFadingIn(false);
      setIsFadingOut(true);
      setIsVideoVisible(false);
    }, 4000);
  
    setTimeout(() => {
      setIsFadingOut(false);
    }, 6500);
  };


  return (
    <div className="summon-main" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }} onClick={handleClick}>
      {!isVideoVisible && (<button onClick={handleClick}>Summon</button>)}
      {isVideoVisible && (
        <>
          {(isFadingIn || isFadingOut) && <div className={`dimmed-screen ${isFadingIn ? 'fade-in' : 'fade-out'}`}></div>}
          <video ref={summonRef} style={{ width: '100%', height: '100%', zIndex: 1000 }} src="/animations/summon_test.webm" loop={false} controls={false} autoPlay={false} muted={false} />
        </>
      )}
    </div>
  );
};