import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import CalendarComponent from './src/components/Calendar';
import { theme } from './src/styles/theme';

const App = () => {
  return (
    <SafeAreaView style={styles.container}>
      <CalendarComponent />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
});

export default App;
