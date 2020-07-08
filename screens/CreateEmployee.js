import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Modal,
  Alert,
  KeyboardAvoidingView,
} from "react-native";
import { TextInput, Button } from "react-native-paper";
import * as ImagePicker from "expo-image-picker";

import * as Permissions from "expo-permissions";

const CreateEmployee = ({ navigation }) => {
  const [Name, setName] = useState("");
  const [Phone, setPhone] = useState("");
  const [Email, setEmail] = useState("");
  const [Salary, setSalary] = useState("");
  const [Picture, setPicture] = useState("");
  const [Position, setPosition] = useState("");
  const [modal, setModal] = useState(false);

  const submitData = () => {
    fetch("http://c9c93cdd1e81.ngrok.io/send-data", {
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
      });
  };

  return (
    <View style={styles.root}>
      <KeyboardAvoidingView>
        <TextInput
          label="Name"
          style={styles.inputStyle}
          theme={theme}
          value={Name}
          mode="outlined"
          onChangeText={(text) => setName(text)}
        />
        <TextInput
          label="Email"
          style={styles.inputStyle}
          theme={theme}
          value={Email}
          mode="outlined"
          onChangeText={(text) => setEmail(text)}
        />
        <TextInput
          label="Phone"
          style={styles.inputStyle}
          theme={theme}
          value={Phone}
          keyboardType="number-pad"
          mode="outlined"
          onChangeText={(text) => setPhone(text)}
        />
        <TextInput
          label="Salary"
          style={styles.inputStyle}
          theme={theme}
          value={Salary}
          mode="outlined"
          onChangeText={(text) => setSalary(text)}
        />
        <TextInput
          label="Position"
          style={styles.inputStyle}
          theme={theme}
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
        <Button
          style={styles.inputStyle}
          icon="content-save"
          mode="contained"
          onPress={() => submitData()}
        >
          SAVE
        </Button>

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
      </KeyboardAvoidingView>
    </View>
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
