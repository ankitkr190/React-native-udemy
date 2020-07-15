import React, { useState, useEffect, useContext } from "react";
import { StyleSheet, Text, View, Image, FlatList, Alert } from "react-native";
import { Card, FAB } from "react-native-paper";
import { useSelector, useDispatch } from "react-redux";
import { Mycontext } from "../App";

const Home = ({ navigation, route }) => {
  // const [data, setData] = useState([]);
  // const [loading, setLoading] = useState(true);
  // const dispatch = useDispatch();

  // const { data, loading } = useSelector((state) => {
  //   return state;
  // });

  const { state, dispatch } = useContext(Mycontext);
  const { data, loading } = state;

  const fetchData = () => {
    fetch("http://0ea13a4789d8.ngrok.io/")
      .then((res) => res.json())
      .then((results) => {
        // setData(results);
        // setLoading(false);

        dispatch({ type: "ADD_DATA", payload: results });
        dispatch({ type: "SET_LOADING", payload: false });
      })
      .catch((err) => {
        Alert.alert("something went wrong");
      });
  };
  useEffect(() => {
    fetchData();
  }, []);
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
              uri: item.picture,
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
    <View style={{ flex: 1 }}>
      <FlatList
        data={data}
        renderItem={({ item }) => {
          return renderList(item);
        }}
        keyExtractor={(item) => `${item._id}`}
        onRefresh={() => fetchData()}
        refreshing={loading}
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
