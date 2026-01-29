import { StyleSheet, Text, View } from 'react-native';

function AuthScreen() {
  return (
    <View style={styles.container}>
      <Text>Authentication Screen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default AuthScreen;
