import React, { Component, useState } from "react";
import {
  StyleSheet,
  View,
  Image,
  Text,
  ImageBackground,
  Animated,
  TouchableOpacity,
  Modal,
  TouchableHighlight,
  Dimensions,
  Share,
  Linking
} from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Ionicons from "react-native-vector-icons/Ionicons";
import { ButtonGroup } from "react-native-elements";
import { Avatar } from "react-native-elements";
import { numDifferentiation } from "../../util/methods";

// https://reactnativecode.com/create-custom-sliding-drawer-using-animation/
// https://www.skptricks.com/2019/05/react-native-custom-animated-sliding-drawer.html

const Sliding_Drawer_Width = 250;
const width = Dimensions.get("window").width;

const ContactResidentialRentCard = props => {
  const { navigation, item } = props;
  console.log(item.property_id);
  let animatedValue = new Animated.Value(0);
  let toggleFlag = 0;
  const [disabled, setDisabled] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [index, setIndex] = React.useState(null);

  let Animation = new Animated.Value(0);

  let Sliding_Drawer_Toggle = true;

  const updateIndex = index => {
    setIndex(index);
  };

  const ShowSlidingDrawer = () => {
    // console.log(Sliding_Drawer_Toggle);
    if (Sliding_Drawer_Toggle === true) {
      Animated.timing(Animation, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true
      }).start(() => {
        Sliding_Drawer_Toggle = false;
      });
    } else {
      Animated.timing(Animation, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true
      }).start(() => {
        Sliding_Drawer_Toggle = true;
      });
    }
  };

  const Animation_Interpolate = Animation.interpolate({
    inputRange: [0, 1],
    // outputRange: [370, 135]
    // outputRange: [-(Sliding_Drawer_Width - width * 1.55), 135]
    // outputRange: ["330%", "100%"]
    // outputRange: ["250%", "100%"]
    outputRange: [Sliding_Drawer_Width - 33, -15]
  });

  // console.log(width);

  const makeCall = mobile => {
    const url = "tel://" + mobile;
    Linking.openURL(url);
  };

  const onShare = async () => {
    // https://docs.expo.io/versions/latest/react-native/share/
    try {
      const result = await Share.share({
        message:
          "React Native | A framework for building native apps using React"
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <View style={styles.card}>
      <View style={styles.MainContainer}>
        <View
          style={[
            {
              flexDirection: "row",
              alignItems: "flex-start",
              paddingRight: 16,
              // paddingLeft: 16,
              // paddingBottom: 16,
              // paddingTop: 16,
              width: "100%",
              backgroundColor: "#ffffff"
            }
            // { backgroundColor: "rgba(245,245,245, 0.8)" }
          ]}
        >
          <Avatar
            square
            size={60}
            title={props.item.name && props.item.name.slice(0, 2)}
            activeOpacity={0.7}
            titleStyle={{ color: "rgba(105,105,105, .9)" }}
            source={{
              uri: props.item.photo
            }}
            avatarStyle={{
              borderWidth: 1,
              borderColor: "rgba(127,255,212, .9)",
              // borderTopLeftRadius: 1,
              borderStyle: "solid"
            }}
          />
          <View style={{ paddingLeft: 20, paddingTop: 10 }}>
            <Text style={[styles.title]}>{item.customer_details.name}</Text>
            <Text style={[StyleSheet.subTitle]}>
              {item.customer_details.mobile1}
            </Text>
            <Text style={[StyleSheet.subTitle]}>
              {item.customer_details.address}
            </Text>
          </View>
        </View>

        <Animated.View
          style={[
            styles.drawer,
            { transform: [{ translateX: Animation_Interpolate }] }
          ]}
        >
          <View style={styles.Main_Sliding_Drawer_Container}>
            {/* Put All Your Components Here Which You Want To Show Inside Sliding Drawer. */}
            <TouchableOpacity
              onPress={ShowSlidingDrawer}
              style={{ paddingTop: 20 }}
            >
              <MaterialCommunityIcons
                name="chevron-left"
                color={"#ffffff"}
                size={30}
              />
            </TouchableOpacity>
            <View style={styles.verticalLine} />
            <TouchableOpacity
              // disabled={Sliding_Drawer_Toggle}
              onPress={() => {
                setModalVisible(true);
              }}
              style={{ padding: 15, backgroundColor: "#e57373" }}
            >
              <Ionicons name="close-sharp" color={"#ffffff"} size={30} />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => onShare()}
              style={{ padding: 15, backgroundColor: "#0091ea" }}
            >
              <Ionicons name="share-social" color={"#ffffff"} size={30} />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigation.navigate("Meeting", item)}
              style={{ padding: 15, backgroundColor: "#ffd600" }}
            >
              <Ionicons name="ios-alarm-outline" color={"#ffffff"} size={30} />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => makeCall(item.owner_details.mobile1)}
              style={{ padding: 15, backgroundColor: "#00bfa5" }}
            >
              <Ionicons name="call" color={"#ffffff"} size={30} />
              <Text style={{ fontSize: 8, paddingTop: 5 }}>OWNER</Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
      </View>

      <View
        style={[
          styles.detailsContainer
          // { backgroundColor: "rgba(192,192,192, 0.1)" }
        ]}
      >
        <View style={[styles.details]}>
          <View style={[styles.subDetails]}>
            <Text style={[styles.subDetailsValue, { marginTop: 5 }]}>
              {item.customer_property_details.bhk_type}
            </Text>
            {/* <Text style={[styles.subDetailsTitle]}>BHK</Text> */}
          </View>
          <View style={styles.verticalLine}></View>
          <View style={[styles.subDetails]}>
            <Text style={[styles.subDetailsValue]}>
              {numDifferentiation(item.customer_rent_details.expected_rent)}
            </Text>
            <Text style={[styles.subDetailsTitle]}>Rent</Text>
          </View>
          <View style={styles.verticalLine}></View>
          <View style={[styles.subDetails]}>
            <Text style={[styles.subDetailsValue]}>
              {numDifferentiation(item.customer_rent_details.expected_deposit)}
            </Text>
            <Text style={[styles.subDetailsTitle]}>Deposit</Text>
          </View>
          <View style={styles.verticalLine}></View>
          <View style={[styles.subDetails]}>
            <Text style={[styles.subDetailsValue]}>
              {item.customer_property_details.furnishing_status}
            </Text>
            <Text style={[styles.subDetailsTitle]}>Furnishing</Text>
          </View>
          {/* <View style={styles.verticalLine}></View>
          <View style={[styles.subDetails]}>
            <Text style={[styles.subDetailsValue]}>800 sqft</Text>
            <Text style={[styles.subDetailsTitle]}>Buildup</Text>
          </View> */}
        </View>
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(false);
        }}
      >
        <View style={styles.centeredView1}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>
              Did you win deal for this property?
            </Text>
            <ButtonGroup
              selectedBackgroundColor="rgba(27, 106, 158, 0.85)"
              onPress={updateIndex}
              selectedIndex={index}
              buttons={["Yes", "No"]}
              // containerStyle={{ height: 30 }}
              textStyle={{ textAlign: "center" }}
              selectedTextStyle={{ color: "#fff" }}
              containerStyle={{ borderRadius: 10, width: 300 }}
              containerBorderRadius={10}
            />

            <View
              style={{
                position: "absolute",
                flexDirection: "row",
                right: 0,
                bottom: 0,
                marginTop: 20,
                marginBottom: 20,
                padding: 20
                // justifyContent: "flex-end"
              }}
            >
              <TouchableHighlight
                style={{ ...styles.cancelButton }}
                onPress={() => {
                  setModalVisible(!modalVisible);
                }}
              >
                <Text style={styles.textStyle}>Cancel</Text>
              </TouchableHighlight>
              <TouchableHighlight
                style={{ ...styles.applyButton }}
                onPress={() => {
                  setModalVisible(!modalVisible);
                }}
              >
                <Text style={styles.textStyle}>Apply</Text>
              </TouchableHighlight>
            </View>
          </View>
        </View>
      </Modal>
      {/* close property modal  */}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flex: 1,
    justifyContent: "center",
    // shadowOpacity: 0.0015 * 5 + 0.18,
    // shadowRadius: 0.54 * 5,
    // shadowOffset: {
    //   height: 0.6 * 5
    // },
    backgroundColor: "white",
    borderColor: "#ffffff",
    // borderWidth: 1,
    marginTop: 2
  },
  cardImage: {
    // alignSelf: "stretch",
    marginBottom: 16,
    flex: 1,
    width: "100%",
    height: "auto"
    // justifyContent: "center",
    // alignItems: "stretch"
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "flex-start",
    paddingRight: 16,
    paddingLeft: 16,
    paddingBottom: 16,
    paddingTop: 16,
    width: "100%",
    backgroundColor: "#ffffff"
  },
  title: {
    fontSize: 16,
    fontWeight: "600"
  },
  subTitle: {
    fontSize: 14,
    fontWeight: "400",
    color: "rgba(255 ,255 ,255 , 0.87)"
  },
  detailsContainer: {
    // borderBottomWidth: 1,
    // borderTopColor: "#ffffff",
    borderBottomColor: "#bdbdbd",
    // borderTopWidth: 1,
    borderBottomWidth: 1,
    marginBottom: 3
  },

  details: {
    padding: 10,
    flexDirection: "row",
    justifyContent: "space-between"
  },
  subDetailsTitle: {
    fontSize: 12,
    fontWeight: "400"
  },
  subDetailsValue: {
    fontSize: 14,
    fontWeight: "600"
  },
  verticalLine: {
    height: "100%",
    width: 1,
    backgroundColor: "#909090"
  },
  MainContainer: {
    // flex: 1,
    // justifyContent: "center",
    // alignItems: "center"
  },

  Root_Sliding_Drawer_Container: {
    position: "absolute",
    flexDirection: "row",
    // left: 0,
    // bottom: 0,
    // top: Platform.OS == "ios" ? 20 : 0,
    width: Sliding_Drawer_Width
  },

  Main_Sliding_Drawer_Container: {
    // flex: 1,
    flexDirection: "row",
    backgroundColor: "#616161",
    height: 63
    // paddingHorizontal: 10
    // justifyContent: "center",
    // alignItems: "center"
  },

  TextStyle: {
    fontSize: 25,
    padding: 10,
    textAlign: "center",
    color: "#FF5722"
  },
  centeredView1: {
    flex: 1,
    justifyContent: "center",
    alignContent: "center",
    marginTop: 22,
    marginBottom: 20
  },
  modalView: {
    margin: 20,
    height: 250,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
  applyButton: {
    // backgroundColor: "#F194FF",
    // width: 150,
    // textAlign: "center",
    // borderRadius: 20,
    // paddingLeft: 60,
    // paddingRight: 20,
    // paddingTop: 10,
    // paddingBottom: 10,
    // elevation: 2,
    marginLeft: 10,
    marginRight: 10
  },

  cancelButton: {
    // backgroundColor: "#F194FF",
    // width: 150,
    // textAlign: "center",
    // borderRadius: 20,
    // paddingLeft: 55,
    // paddingRight: 20,
    // paddingTop: 10,
    // paddingBottom: 10,
    // elevation: 2,
    marginLeft: 10,
    marginRight: 30
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  },
  drawer: {
    position: "absolute",
    // top: Platform.OS == "ios" ? 20 : 0,
    right: 0,
    bottom: 0,
    width: Sliding_Drawer_Width,
    flexDirection: "row"
  }
});

export default ContactResidentialRentCard;