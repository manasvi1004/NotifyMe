import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  ScrollView,
  StyleSheet,
} from 'react-native';
import { Calendar } from 'react-native-calendars';
import { theme } from '../styles/theme';
import EventForm from './EventForm';
import Clock from './Clock';

const CalendarComponent = () => {
  const [selected, setSelected] = useState('');
  const [events, setEvents] = useState({});
  const [modalVisible, setModalVisible] = useState(false);

  const onDayPress = (day) => {
    setSelected(day.dateString);
    setModalVisible(true);
  };

  const handleAskOut = (eventData) => {
    const newEvent = {
      ...eventData,
      date: selected,
      marked: true,
      isValentine: true,
    };

    setEvents(prevEvents => ({
      ...prevEvents,
      [selected]: {
        ...prevEvents[selected],
        events: [...(prevEvents[selected]?.events || []), newEvent],
        dots: [{
          color: theme.colors.heart,
          selectedDotColor: theme.colors.white,
        }],
      },
    }));

    setModalVisible(false);
  };

  const markedDates = {
    ...Object.keys(events).reduce((acc, date) => ({
      ...acc,
      [date]: {
        marked: true,
        dots: events[date].dots,
      },
    }), {}),
    [selected]: {
      selected: true,
      selectedColor: theme.colors.secondary,
      dots: events[selected]?.dots,
    },
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Calendar</Text>
        <Clock />
      </View>

      <Calendar
        style={styles.calendar}
        theme={{
          ...theme.calendar,
          todayTextColor: theme.colors.heart,
          selectedDayBackgroundColor: theme.colors.heart,
        }}
        onDayPress={onDayPress}
        markedDates={markedDates}
        markingType={'multi-dot'}
      />

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <EventForm
              onSubmit={handleAskOut}
              onCancel={() => setModalVisible(false)}
              date={selected}
            />
          </View>
        </View>
      </Modal>

      <ScrollView style={styles.eventsContainer}>
        {events[selected]?.events?.map((event, index) => (
          <View
            key={index}
            style={[
              styles.eventCard,
              { borderLeftColor: event.isReminder ? theme.colors.reminder : theme.colors.primary }
            ]}
          >
            <Text style={styles.eventTitle}>{event.title}</Text>
            {event.description && (
              <Text style={styles.eventDescription}>{event.description}</Text>
            )}
            {event.isReminder && (
              <Text style={styles.reminderTime}>⏰ {event.time}</Text>
            )}
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    justifyContent: 'space-between',
    paddingRight: 10,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: theme.colors.primary,
    marginLeft: 10,
  },
  calendar: {
    borderRadius: 10,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: theme.colors.white,
    borderRadius: 20,
    margin: 20,
    maxHeight: '80%',
    paddingTop: 60,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: theme.colors.primary,
    textAlign: 'center',
    width: '100%',
    position: 'absolute',
    top: 20,
    left: 0,
    right: 0,
  },
  eventsContainer: {
    flex: 1,
    marginTop: 20,
  },
  eventCard: {
    backgroundColor: theme.colors.white,
    borderRadius: 8,
    padding: 15,
    marginBottom: 10,
    borderLeftWidth: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  eventTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: theme.colors.text,
    marginBottom: 5,
  },
  eventDescription: {
    fontSize: 14,
    color: theme.colors.text,
    marginBottom: 5,
  },
  reminderTime: {
    fontSize: 14,
    color: theme.colors.reminder,
    fontWeight: 'bold',
  },
});

export default CalendarComponent;
