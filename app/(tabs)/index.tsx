import {
  ScrollView,
  StyleSheet,
  TextInput,
  View,
  Text,
  Button,
} from "react-native";

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <View>
        <TextInput placeholder="Search link" style={styles.input} />
      </View>

      <Text style={styles.title}>Links</Text>
      <ScrollView>
        <View style={styles.lists}>
          {Array.from({ length: 12 }).map((_, idx) => (
            <View key={idx} style={styles.list}>
              <Text>Name</Text>
              <Text>https://google.com/q=engine</Text>
            </View>
          ))}
        </View>
      </ScrollView>
      <Button title="Add" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    gap: 8,
    padding: 8,
    flex: 1,
  },
  input: {
    borderWidth: 1,
    borderColor: "#000000",
    borderRadius: 6,
    padding: 10,
  },
  title: {
    fontWeight: 700,
  },
  lists: {
    display: "flex",
    gap: 6,
  },
  list: {
    // borderColor: "#000000",
    // borderWidth: 1,
    borderRadius: 6,
    padding: 8,
    backgroundColor: "#ffffff",
  },
  fab: {
    position: "fixed",
    bottom: 4,
    right: 4,
  },
});
