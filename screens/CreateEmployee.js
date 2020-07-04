import React, { useState } from "react";
import { StyleSheet, Text, View, Modal, Alert } from "react-native";
import { TextInput, Button } from "react-native-paper";
import * as ImagePicker from "expo-image-picker";

import * as Permissions from "expo-permissions";

const CreateEmployee = () => {
  const [Name, setName] = useState("");
  const [Phone, setPhone] = useState("");
  const [Email, setEmail] = useState("");
  const [Salary, setSalary] = useState("");
  const [Picture, setPicture] = useState("");
  const [modal, setModal] = useState(false);

  const pickFromGallery = async () => {
    const { granted } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    if (granted) {
      await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.5,
      });
      console.log(data);
    } else {
      Alert.alert("you need to give up permissions to work");
    }
  };

  const pickFromCamera = async () => {
    const { granted } = await Permissions.askAsync(Permissions.CAMERA);
    if (granted) {
      await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.5,
      });
      console.log(data);
    } else {
      Alert.alert("you need to give up permissions to work");
    }
  };

  return (
    <View style={styles.root}>
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
      <Button
        style={styles.inputStyle}
        icon="upload"
        mode="contained"
        onPress={() => setModal(true)}
      >
        UPLOAD IMAGE
      </Button>
      <Button
        style={styles.inputStyle}
        icon="content-save"
        mode="contained"
        onPress={() => console.log("saved")}
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
