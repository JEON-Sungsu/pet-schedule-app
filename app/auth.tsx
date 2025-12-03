import { SafeAreaView, StyleSheet, Text, View } from 'react-native';

function AuthScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text>Authentication Screen</Text>
      </View>
    </SafeAreaView>
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
