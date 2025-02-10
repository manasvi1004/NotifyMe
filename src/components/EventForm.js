import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Switch,
  StyleSheet,
} from 'react-native';
import { theme } from '../styles/theme';

const EventForm = ({ onSubmit, onCancel }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [isReminder, setIsReminder] = useState(false);
  const [time, setTime] = useState('12:00');

  const handleSubmit = () => {
    if (title.trim()) {
      onSubmit({
        title,
        description,
        isReminder,
        time,
      });
      setTitle('');
      setDescription('');
      setIsReminder(false);
      setTime('12:00');
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity 
        style={styles.closeButton} 
        onPress={onCancel}
      >
        <Text style={styles.closeButtonText}>✕</Text>
      </TouchableOpacity>

      <Text style={styles.label}>Title</Text>
      <TextInput
        style={styles.input}
        value={title}
        onChangeText={setTitle}
        placeholder="Event title..."
        placeholderTextColor={theme.colors.disabled}
      />

      <Text style={styles.label}>Description</Text>
      <TextInput
        style={[styles.input, styles.descriptionInput]}
        value={description}
        onChangeText={setDescription}
        placeholder="Event description..."
        placeholderTextColor={theme.colors.disabled}
        multiline
      />

      <View style={styles.reminderContainer}>
        <Text style={styles.label}>Set Reminder</Text>
        <Switch
          value={isReminder}
          onValueChange={setIsReminder}
          trackColor={{ false: theme.colors.disabled, true: theme.colors.primary }}
          thumbColor={isReminder ? theme.colors.secondary : '#f4f3f4'}
        />
      </View>

      {isReminder && (
        <TextInput
          style={styles.input}
          value={time}
          onChangeText={setTime}
          placeholder="Time (HH:MM)"
          placeholderTextColor={theme.colors.disabled}
        />
      )}

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button, styles.submitButton]}
          onPress={handleSubmit}
        >
          <Text style={styles.buttonText}>Save</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, styles.cancelButton]}
          onPress={onCancel}
        >
          <Text style={styles.buttonText}>Cancel</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    position: 'relative',
  },
  closeButton: {
    position: 'absolute',
    right: 15,
    top: 15,
    width: 30,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1,
  },
  closeButtonText: {
    fontSize: 20,
    color: theme.colors.primary,
    fontWeight: 'bold',
  },
  label: {
    fontSize: 16,
    color: theme.colors.primary,
    marginBottom: 5,
    fontWeight: 'bold',
    marginTop: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: theme.colors.secondary,
    borderRadius: 8,
    padding: 10,
    marginBottom: 15,
    color: theme.colors.text,
  },
  descriptionInput: {
    height: 100,
    textAlignVertical: 'top',
  },
  reminderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  button: {
    flex: 0.48,
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  submitButton: {
    backgroundColor: theme.colors.primary,
  },
  cancelButton: {
    backgroundColor: theme.colors.disabled,
  },
  buttonText: {
    color: theme.colors.white,
    fontWeight: 'bold',
  },
});

export default EventForm; 