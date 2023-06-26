import { View, Text, StyleSheet, Alert, TouchableOpacity } from 'react-native';

const Test2 = () => {
  const showAlert = () => {
    Alert.alert(
      'Willst du die App löschen?', // Titel
      'Drücke auf Löschen um die App zu entfernen.', // Nachricht
      [
        {
          text: 'Abbrechen', // Text Schaltfläche
          onPress: () => console.log('Benachrichtigung abgebrochen'),
          style: 'cancel', // Stil der Schaltfläche
        },
        {
          text: 'Löschen',
          onPress: () => console.log('Benachrichtigung gelöscht'),
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Press the button to send a notification.</Text>
      <TouchableOpacity style={styles.button} onPress={showAlert}>
        <Text style={styles.buttonText}>Send</Text>
      </TouchableOpacity>
    </View>
  );
};

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

  text: {
    textAlign: 'center',
    fontSize: 24,
    fontWeight: 'bold',
    fontFamily: 'Satoshi',
    color: 'black',
  },
});

export default Test2;
