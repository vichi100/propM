import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Image,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard
} from "react-native";
import { TextInput, HelperText, useTheme } from "react-native-paper";
import RadioButton from "../components/RadioButtons";
import { ButtonGroup } from "react-native-elements";
import Button from "../components/Button";
import { Formik } from "formik";
import * as yup from "yup";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Snackbar from "../components/SnackbarComponent";

const options = [
  {
    key: "Residential",
    text: "Residential"
  },
  {
    key: "Commercial",
    text: "Commercial"
  }
];

const AddNewProperty = props => {
  const { navigation } = props;
  const [propertyForIndex, setPropertyForIndex] = useState(-1);
  const [selectedPropType, setSelectedPropType] = useState(null);
  const [ownerName, setOwnerName] = useState("");
  const [ownerMobile, setOwnerMobile] = useState("");
  const [ownerAddress, setOwnerAddress] = useState("");

  const [errorMessage, setErrorMessage] = useState("");
  const [isVisible, setIsVisible] = useState(false);

  const onSelectPropType = item => {
    if (selectedPropType && selectedPropType.key === item.key) {
      setSelectedPropType(null);
    } else {
      setSelectedPropType(item);
    }
    setIsVisible(false);
  };

  const selectPropertyForIndex = index => {
    setPropertyForIndex(index);
    setIsVisible(false);
  };

  const dismissSnackBar = () => {
    setIsVisible(false);
  };

  const onSubmit = () => {
    if (propertyForIndex === -1) {
      setErrorMessage("Select Property type missing");
      setIsVisible(true);
      return;
    } else if (selectedPropType === null) {
      setErrorMessage("Select Property type missing");
      setIsVisible(true);
      return;
    } else if (ownerName.trim() === "") {
      setErrorMessage("Owner name is missing");
      setIsVisible(true);
      return;
    } else if (ownerMobile.trim() === "") {
      setErrorMessage("Owner mobile is missing");
      setIsVisible(true);
      return;
    }

    navigation.navigate("LocalityDetails");
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#ffffff" }}>
      <KeyboardAwareScrollView onPress={Keyboard.dismiss}>
        <ScrollView style={styles.container}>
          <View style={styles.header}>
            <Text>Select Property Type</Text>
          </View>
          <View style={styles.propSection}>
            <RadioButton
              selectedOption={selectedPropType}
              onSelect={onSelectPropType}
              options={options}
            />
          </View>
          <View style={styles.header}>
            <Text>Select Property For</Text>
          </View>
          <View
            style={[styles.propSubSection, { marginBottom: 10, marginTop: 15 }]}
          >
            {/* <Text>Select Property For</Text> */}
            <ButtonGroup
              selectedBackgroundColor="rgba(27, 106, 158, 0.85)"
              onPress={selectPropertyForIndex}
              selectedIndex={propertyForIndex}
              buttons={["Rent", "Sell"]}
              // containerStyle={{ height: 30 }}
              textStyle={{ textAlign: "center" }}
              selectedTextStyle={{ color: "#fff" }}
              containerStyle={{
                borderRadius: 10,
                width: 300
                // borderColor: "red"
              }}
              containerBorderRadius={10}
            />
          </View>

          <View style={[styles.header, { marginTop: 30 }]}>
            <Text>Owner Details</Text>
          </View>
          <View style={styles.propSection}>
            <TextInput
              label="Name*"
              value={ownerName}
              // returnKeyType={"done"}
              onChangeText={text => setOwnerName(text)}
              onFocus={() => setIsVisible(false)}
              style={{ backgroundColor: "#ffffff" }}
              theme={{
                colors: {
                  // placeholder: "white",
                  // text: "white",
                  primary: "rgba(0,191,255, .9)",
                  underlineColor: "transparent",
                  background: "#ffffff"
                }
              }}
            />
            <TextInput
              label="Mobile*"
              value={ownerMobile}
              onChangeText={text => setOwnerMobile(text)}
              onFocus={() => setIsVisible(false)}
              keyboardType={"numeric"}
              returnKeyType={"done"}
              style={{ backgroundColor: "#ffffff", marginTop: 8 }}
              theme={{
                colors: {
                  // placeholder: "white",
                  // text: "white",
                  primary: "rgba(0,191,255, .9)",
                  underlineColor: "transparent",
                  background: "#ffffff"
                }
              }}
            />
            <TextInput
              label="Address*"
              value={ownerAddress}
              // returnKeyType={"done"}
              onChangeText={text => setOwnerAddress(text)}
              onFocus={() => setIsVisible(false)}
              style={{ backgroundColor: "#ffffff", marginTop: 8 }}
              theme={{
                colors: {
                  // placeholder: "white",
                  // text: "white",
                  primary: "rgba(0,191,255, .9)",
                  underlineColor: "transparent",
                  background: "#ffffff"
                }
              }}
            />
            {/* <TextInput
            mode="outlined"
            style={styles.inputContainerStyle}
            label="Address"
            placeholder="Address"
            value={locality}
            keyboardType={"numeric"}
            returnKeyType={"done"}
            onChangeText={locality => setLocality(locality)}
          /> */}
          </View>
          <View style={{ marginTop: 20 }}>
            <Button title="NEXT" onPress={() => onSubmit()} />
          </View>
        </ScrollView>
      </KeyboardAwareScrollView>
      <Snackbar
        visible={isVisible}
        textMessage={errorMessage}
        position={"top"}
        actionHandler={() => dismissSnackBar()}
        actionText="OK"
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 30,
    marginLeft: 20,
    marginRight: 20
  },
  header: {
    alignContent: "flex-start"
  },
  propSection: {
    marginTop: 20
  },
  propSubSection: {
    // marginTop: 50,
    marginBottom: 10,
    marginLeft: 10
  },
  inputContainerStyle: {
    margin: 8,
    backgroundColor: "#ffffff"
    // borderColor: "black",
    // borderWidth: 1
  }
  // propSubSection: {
  //   marginTop: 5,
  //   marginBottom: 5
  // },
});

export default AddNewProperty;