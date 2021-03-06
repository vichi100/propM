import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Platform,
  SafeAreaView,
  ScrollView,
  KeyboardAvoidingView,
  Keyboard,
  style,
  FlatList,
  Linking
} from "react-native";
import { connect } from "react-redux";
import Ionicons from "react-native-vector-icons/Ionicons";
import axios from "axios";
import PropDetailsFromListing from "./PropDetailsFromListing";
import PropDetailsFromListingForSell from "./PropDetailsFromListingForSell";
import CommercialRentPropDetails from "./commercial/rent/CommercialRentPropDetails";
import CommercialSellPropDetails from "./commercial/sell/CommercialSellPropDetails";
import CustomerDetailsResidentialRentFromList from "./contacts/CustomerDetailsResidentialRentFromList";
import CustomerDetailsResidentialBuyFromList from "./contacts/CustomerDetailsResidentialBuyFromList";
import CustomerDetailsCommercialRentFromList from "./contacts/CustomerDetailsCommercialRentFromList";
import CustomerDetailsCommercialBuyFromList from "./contacts/CustomerDetailsCommercialBuyFromList";

const MessageDetails = props => {
  const item = props.route.params.item;
  console.log("props.route.params: ", item);
  return (
    <SafeAreaView>
      <ScrollView>
        <View>
          <View style={{ padding: 10, fontSize: 16, paddingTop: 15 }}>
            <Text
              style={{
                fontSize: 15,
                // fontWeight: "600",
                color: "#424242"
              }}
            >
              I have customer for your {item.subject.location_area},
              {item.subject.city} property. Please call me on +91{" "}
              {item.sender_details.mobile} - {item.subject.name}
            </Text>
            <View
              style={{ flexDirection: "row", justifyContent: "flex-start" }}
            >
              <Text
                style={{
                  textAlign: "right",
                  color: "#424242",
                  fontSize: 12,
                  marginTop: 5
                }}
              >
                {new Date(item.create_date_time).toDateString()}
              </Text>
            </View>
          </View>
          {item.subject.subject_category === "property" ? (
            item.subject.subject_type === "Residential" ? (
              item.subject.subject_for === "Rent" ? (
                <PropDetailsFromListing />
              ) : (
                <PropDetailsFromListingForSell />
              )
            ) : item.subject.subject_type === "Commercial" ? (
              item.subject.subject_for === "Rent" ? (
                <CommercialRentPropDetails />
              ) : (
                <CommercialSellPropDetails />
              )
            ) : null
          ) : item.subject.subject_category === "customer" ? (
            item.subject.subject_type === "Residential" ? (
              item.subject.subject_for === "Rent" ? (
                <CustomerDetailsResidentialRentFromList />
              ) : (
                <CustomerDetailsResidentialBuyFromList />
              )
            ) : item.subject.subject_type === "Commercial" ? (
              item.subject.subject_for === "Rent" ? (
                <CustomerDetailsCommercialRentFromList />
              ) : (
                <CustomerDetailsCommercialBuyFromList />
              )
            ) : null
          ) : null}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default MessageDetails;
