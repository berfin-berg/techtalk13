import { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import * as Notifications from 'expo-notifications';

// Bestimmt die Art von Benachrichtigungen 
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true, // Benachrichtigung anzeigen
    shouldPlaySound: false, // Ton nicht abspielen
    shouldSetBadge: false, // kein Abzeichen setzen
  }),
});

const Test1 = () => {
  const [message, setMessage] = useState('');

// Überprüfung ob App berechtigt ist für Benachrichtigungen 
useEffect(() => { 
    (async () => {
      const existingStatus =
        (await Notifications.getPermissionsAsync()) as any;
      console.log('Existing Status: ', existingStatus);

// Überprüft ob die Berechtigung zum Anzeigen von Benachrichtigung vorhanden ist
      if (existingStatus.status !== 'granted') {
        // Falls keine Berechtigung vorliegt, dann Ausführung
        const status = (await Notifications.requestPermissionsAsync()) as any; // gibt ein Promise zurück, das sich mit dem neuen Berechtigungsstatus auflöst, nachdem Bentuzer:in aufgefordert wurde, die Berechtigung zu gewähren oder verweigern
        // Benutzer:in wird aufgefordert Berechtigung zu geben
        console.log('Requested Status: ', status);
      }
    })();

// Benachrichtigungs-Listener - wenn eine Benachrichtigung empfangen wird, wird diese mit Hey :) gesetzt
    const subscription = Notifications.addNotificationResponseReceivedListener(
      () => {
        setMessage('Hey :)');
      }
    );

// leeres Array - Effekt wird nur einmal ausgeführt
    return () => {
      subscription.remove();
    };
  }, []);

// Funktion die Benachrichtigung in 5 Sekunden versendet - Planen
  const scheduleNotification = async () => {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: 'Test Notification',
        body: 'This is a sample notification.',
      },
      trigger: { seconds: 5 },
    });
  };

// Funktion um die Nachricht zurückzusetzen wenn man auf den Bildschirm tippt 
  const handleScreenTap = () => {
    setMessage(''); //leerer String
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        Press the button to send a notification in 5 seconds.
      </Text>
      <TouchableOpacity style={styles.button} onPress={scheduleNotification}> 
        <Text style={styles.buttonText}>Send</Text>
      </TouchableOpacity>
      {message !== '' && ( // überprüft ob Zustand leer ist
        <TouchableOpacity
          style={styles.messageContainer}
          onPress={handleScreenTap}>
          <Text style={styles.messageText}>{message}</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

// Styling
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#FBAF04',
    borderRadius: 40,
    width: 100,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.6,
    shadowRadius: 16,
    elevation: 20,
    marginTop: 50,
  },
  buttonText: {
    fontSize: 24,
    color: 'white',
    fontFamily: 'Satoshi',
    fontWeight: 'bold',
  },
  messageContainer: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  messageText: {
    color: 'white',
    fontSize: 40,
    fontWeight: 'bold',
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    fontFamily: 'Satoshi',
  },
  text: {
    textAlign: 'center',
    fontSize: 24,
    fontWeight: 'bold',
    fontFamily: 'Satoshi',
    color: 'black',
  },
});

export default Test1;