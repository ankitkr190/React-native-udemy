import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Modal,
  Alert,
  KeyboardAvoidingView,
  Keyboard,
} from "react-native";
import { TextInput, Button } from "react-native-paper";
import * as ImagePicker from "expo-image-picker";

import * as Permissions from "expo-permissions";

const CreateEmployee = ({ navigation, route }) => {
  const getDetails = (type) => {
    if (route.params) {
      switch (type) {
        case "name":
          return route.params.name;
        case "phone":
          return route.params.phone;
        case "email":
          return route.params.email;
        case "salary":
          return route.params.salary;
        case "picture":
          return route.params.picture;
        case "position":
          return route.params.position;
      }
    }
    return "";
  };

  const [Name, setName] = useState(getDetails("name"));
  const [Phone, setPhone] = useState(getDetails("phone"));
  const [Email, setEmail] = useState(getDetails("email"));
  const [Salary, setSalary] = useState(getDetails("salary"));
  const [Picture, setPicture] = useState(getDetails("picture"));
  const [Position, setPosition] = useState(getDetails("position"));
  const [modal, setModal] = useState(false);
  const [enableshift, setenableShift] = useState(false);

  const submitData = () => {
    fetch("http://bb2a00a2ca3e.ngrok.io/send-data", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: Name,
        email: Email,
        phone: Phone,
        salary: Salary,
        picture: Picture,
        position: Position,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        Alert.alert(`${data.name} is saved successfully`);
        navigation.navigate("Home");
      })
      .catch((err) => {
        Alert.alert("something went wrong");
      });
  };

  const updateDetails = () => {
    fetch("http://bb2a00a2ca3e.ngrok.io/update", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: route.params._id,
        name: Name,
        email: Email,
        phone: Phone,
        salary: Salary,
        picture: Picture,
        position: Position,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        Alert.alert(`${data.name} is updated successfully`);
        navigation.navigate("Home");
      })
      .catch((err) => {
        Alert.alert("something went wrong");
      });
  };

  const pickFromGallery = async () => {
    const { granted } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    if (granted) {
      let data = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.5,
      });
      if (!data.cancelled) {
        let newFile = {
          uri: data.uri,
          type: `test/${data.uri.split(".")[1]}`,
          name: `test.${data.uri.split(".")[1]}`,
        };
        handleUpload(newFile);
      }
    } else {
      Alert.alert("you need to give up permissions to work");
    }
  };

  const pickFromCamera = async () => {
    const { granted } = await Permissions.askAsync(Permissions.CAMERA);
    if (granted) {
      let data = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.5,
      });
      if (!data.cancelled) {
        let newFile = {
          uri: data.uri,
          type: `test/${data.uri.split(".")[1]}`,
          name: `test.${data.uri.split(".")[1]}`,
        };
        handleUpload(newFile);
      }
    } else {
      Alert.alert("you need to give up permissions to work");
    }
  };

  const handleUpload = (image) => {
    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "employeeApp");
    data.append("cloud_name", "ankitkr190");

    fetch("https://api.cloudinary.com/v1_1/ankitkr190/image/upload", {
      method: "post",
      body: data,
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setPicture(data.url);
        setModal(false);
      })
      .catch((err) => {
        Alert.alert("error while uploading");
      });
  };

  return (
    <KeyboardAvoidingView
      behavior="position"
      style={styles.root}
      enabled={enableshift}
    >
      <View>
        <TextInput
          label="Name"
          style={styles.inputStyle}
          theme={theme}
          onFocus={() => setenableShift(false)}
          value={Name}
          mode="outlined"
          onChangeText={(text) => setName(text)}
        />
        <TextInput
          label="Email"
          style={styles.inputStyle}
          theme={theme}
          onFocus={() => setenableShift(false)}
          value={Email}
          mode="outlined"
          onChangeText={(text) => setEmail(text)}
        />
        <TextInput
          label="Phone"
          style={styles.inputStyle}
          theme={theme}
          onFocus={() => setenableShift(false)}
          value={Phone}
          keyboardType="number-pad"
          mode="outlined"
          onChangeText={(text) => setPhone(text)}
        />
        <TextInput
          label="Salary"
          style={styles.inputStyle}
          theme={theme}
          onFocus={() => setenableShift(true)}
          value={Salary}
          mode="outlined"
          onChangeText={(text) => setSalary(text)}
        />
        <TextInput
          label="Position"
          style={styles.inputStyle}
          theme={theme}
          onFocus={() => setenableShift(true)}
          value={Position}
          mode="outlined"
          onChangeText={(text) => setPosition(text)}
        />
        <Button
          style={styles.inputStyle}
          icon={Picture == "" ? "upload" : "check"}
          mode="contained"
          onPress={() => setModal(true)}
        >
          UPLOAD IMAGE
        </Button>
        {route.params ? (
          <Button
            style={styles.inputStyle}
            icon="content-save"
            mode="contained"
            onPress={() => updateDetails()}
          >
            Update Details
          </Button>
        ) : (
          <Button
            style={styles.inputStyle}
            icon="content-save"
            mode="contained"
            onPress={() => submitData()}
          >
            SAVE
          </Button>
        )}

        <Modal
          animationType="slide"
          transparent={true}
          visible={modal}
          onRequestClose={() => {
            setModal(false);
          }}
        >
          <View style={styles.modalView}>
            <View style={styles.modalButtonView}>
              <Button
                theme={theme}
                icon="camera"
                mode="contained"
                onPress={() => pickFromCamera()}
              >
                Camera
              </Button>
              <Button
                theme={theme}
                icon="image-area"
                mode="contained"
                onPress={() => pickFromGallery()}
              >
                Gallery
              </Button>
            </View>
            <View>
              <Button theme={theme} onPress={() => setModal(false)}>
                Cancel
              </Button>
            </View>
          </View>
        </Modal>
      </View>
    </KeyboardAvoidingView>
  );
};
const theme = {
  colors: {
    primary: "#006aff",
  },
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  inputStyle: {
    margin: 5,
  },
  modalButtonView: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10,
  },
  modalView: {
    position: "absolute",
    bottom: 2,
    width: "100%",
    backgroundColor: "white",
  },
});

export default CreateEmployee;
