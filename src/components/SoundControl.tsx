import React, { useState } from 'react';
import styled from 'styled-components';
import { soundService } from '../services/SoundService';

const SoundButton = styled.button`
  position: absolute;
  top: 20px;
  right: 20px;
  padding: 10px;
  background: none;
  border: none;
  cursor: pointer;
  font-size: 24px;
`;

const SoundControl: React.FC = () => {
  const [isMuted, setIsMuted] = useState(false);

  const toggleSound = () => {
    const newMuteState = soundService.toggleMute();
    setIsMuted(newMuteState);
  };

  return (
    <SoundButton onClick={toggleSound}>
      {isMuted ? '🔇' : '🔊'}
    </SoundButton>
  );
};

export default SoundControl; 