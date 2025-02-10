import React, { useState, useEffect } from 'react';
import { Text, StyleSheet } from 'react-native';
import { theme } from '../styles/theme';

const Clock = () => {
  const [currentTime, setCurrentTime] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const hours = now.getHours();
      const minutes = now.getMinutes();
      const ampm = hours >= 12 ? 'PM' : 'AM';
      const formattedHours = hours % 12 || 12;
      const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
      setCurrentTime(`${formattedHours}:${formattedMinutes} ${ampm}`);
    };

    updateTime(); // Initial call
    const timer = setInterval(updateTime, 1000);

    return () => clearInterval(timer);
  }, []);

  return <Text style={styles.clockText}>{currentTime}</Text>;
};

const styles = StyleSheet.create({
  clockText: {
    fontSize: 18,
    color: theme.colors.primary,
    fontWeight: 'bold',
    marginLeft: 'auto',
    marginRight: 10,
  },
});

export default Clock; 