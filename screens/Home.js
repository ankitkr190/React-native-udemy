import React from "react";
import { StyleSheet, Text, View, Image, FlatList } from "react-native";
import { Card, FAB } from "react-native-paper";

const Home = ({ navigation }) => {
  const data = [
    {
      id: 1,
      name: "Ankit",
      email: "ankit@abc.com",
      salary: "5lpa",
      phone: "123",
      position: "web dev",
      picture:
        "https://images.unsplash.com/photo-1453396450673-3fe83d2db2c4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
    },
    {
      id: 2,
      name: "Ramesh",
      email: "ramesh@abc.com",
      salary: "5lpa",
      phone: "123",
      position: "app dev",
      picture:
        "https://images.unsplash.com/photo-1453396450673-3fe83d2db2c4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
    },
    {
      id: 3,
      name: "Suresh",
      email: "suresh@abc.com",
      salary: "5lpa",
      phone: "123",
      position: "ml dev",
      picture:
        "https://images.unsplash.com/photo-1453396450673-3fe83d2db2c4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
    },
    {
      id: 4,
      name: "Suresh",
      email: "suresh@abc.com",
      salary: "5lpa",
      phone: "123",
      position: "ml dev",
      picture:
        "https://images.unsplash.com/photo-1453396450673-3fe83d2db2c4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
    },
    {
      id: 5,
      name: "Suresh",
      email: "suresh@abc.com",
      salary: "5lpa",
      phone: "123",
      position: "ml dev",
      picture:
        "https://images.unsplash.com/photo-1453396450673-3fe83d2db2c4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
    },
    {
      id: 6,
      name: "Suresh",
      email: "suresh@abc.com",
      salary: "5lpa",
      phone: "123",
      position: "ml dev",
      picture:
        "https://images.unsplash.com/photo-1453396450673-3fe83d2db2c4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
    },
    {
      id: 7,
      name: "Suresh",
      email: "suresh@abc.com",
      salary: "5lpa",
      phone: "123",
      position: "ml dev",
      picture:
        "https://images.unsplash.com/photo-1453396450673-3fe83d2db2c4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
    },
    {
      id: 8,
      name: "Suresh",
      email: "suresh@abc.com",
      salary: "5lpa",
      phone: "123",
      position: "ml dev",
      picture:
        "https://images.unsplash.com/photo-1453396450673-3fe83d2db2c4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
    },
    {
      id: 9,
      name: "Suresh",
      email: "suresh@abc.com",
      salary: "5lpa",
      phone: "123",
      position: "ml dev",
      picture:
        "https://images.unsplash.com/photo-1453396450673-3fe83d2db2c4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
    },
    {
      id: 10,
      name: "Suresh",
      email: "suresh@abc.com",
      salary: "5lpa",
      phone: "123",
      position: "ml dev",
      picture:
        "https://images.unsplash.com/photo-1453396450673-3fe83d2db2c4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
    },
  ];

  const renderList = (item) => {
    return (
      <Card
        style={styles.mycard}
        onPress={() => navigation.navigate("Profile", { item })}
      >
        <View style={styles.cardView}>
          <Image
            style={{ width: 60, height: 60, borderRadius: 50 }}
            source={{
              uri:
                "https://images.unsplash.com/photo-1453396450673-3fe83d2db2c4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
            }}
          />

          <View style={{ marginLeft: 10 }}>
            <Text style={styles.text}>{item.name}</Text>
            <Text>{item.position}</Text>
          </View>
        </View>
      </Card>
    );
  };
  return (
    <View>
      <FlatList
        data={data}
        renderItem={({ item }) => {
          return renderList(item);
        }}
        keyExtractor={(item) => `${item.id}`}
      />
      <FAB
        onPress={() => navigation.navigate("Create")}
        style={styles.fab}
        small={false}
        theme={{ colors: { accent: "#006aff" } }}
        icon="plus"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  mycard: {
    margin: 5,
  },
  cardView: {
    flexDirection: "row",
  },
  text: {
    fontSize: 18,
  },
  fab: {
    position: "absolute",
    margin: 16,
    right: 0,
    bottom: 0,
  },
});

export default Home;
