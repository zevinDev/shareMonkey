import { React, useState, useMemo } from "react";
import { View } from "react-native";
import {Layout, Text, Section, SectionContent} from "react-native-rapi-ui";
import { Calendar } from "react-native-calendars";
import { getAllEventsOnDay } from "../components/apiRefrences";

// The code exports a default function that renders a custom calendar component
export default function ({ navigation }) {
  const [Events, setEvents] = useState([])
  const [selected, setSelected] = useState();
  // A custom calendar component is defined
  function CustomCalendar(props) {
    // Initial date is set to current date
    const initDate = currentDate();
    // Selected date is set to the initial date

    // Use memo hook to keep track of the selected date
    const marked = useMemo(
      () => ({
        [selected]: {
          selected: true,
          selectedColor: "#222222",
          selectedTextColor: "yellow",
        },
      }),
      [selected]
    );
    return (
      // Render the calendar component
      <Calendar
        initialDate={initDate}
        markedDates={marked}
        onDayPress={async(day) => {
          // Set the selected date when a day is pressed
          const events1 = await getAllEventsOnDay(day.dateString);
            var fields = [];
            if(events1.length > 0){
            for(var i = 0; i < events1.length; i++){
              fields.push(
                <Section key={events1[i].eventID} style={{ width: "100%" }}>
                  <SectionContent style={{ flexDirection: "row" }}>
                    <Text>{events1[i].name}</Text>
                  </SectionContent>
                </Section>
              )
            }
            setEvents(fields);
          } else {
            setEvents([<Section key="error" style={{ width: "100%" }}>
            <SectionContent style={{ flexDirection: "row" }}>
              <Text>There Are No Events</Text>
            </SectionContent>
            </Section>]);
          }
            setSelected(day.dateString);


          // Call the onDaySelect prop function if it exists
          props.onDaySelect && props.onDaySelect(day);
        }}
        {...props}
      />
    );
  }
  // Returns current date formatted as yyyy-mm-dd
  function currentDate() {
    var d = new Date(),
      month = "" + (d.getMonth() + 1),
      day = "" + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;

    return [year, month, day].join("-");
  }


  return (
    <Layout>
      <View>
        {/* Render the custom calendar component with onDaySelect prop */}
        <CustomCalendar
          onDaySelect={async (day) => {
          }}
        />
          {Events}
      </View>
    </Layout>
  );
}
