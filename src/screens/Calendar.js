import { React, useState, useMemo } from "react";
import { View } from "react-native";
import {Layout, Text, Section, SectionContent, useTheme, themeColor} from "react-native-rapi-ui";
import { Calendar } from "react-native-calendars";
import { getAllEventsOnDay } from "../components/apiRefrences";

// The code exports a default function that renders a custom calendar component
export default function ({ navigation }) {
  const [Events, setEvents] = useState([])
  const [selected, setSelected] = useState();
  const [month, setMonth] = useState();
  const { isDarkmode, setTheme } = useTheme();


  // A custom calendar component is defined
  function CustomCalendar(props) {
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
        initialDate={month}
        markedDates={marked}
        onDayPress={async(day) => {
          // Set the selected date when a day is pressed
          const events1 = await getAllEventsOnDay(day.dateString);
          setMonth(day.dateString);
            var fields = [];
            if(events1.length > 0){
            for(var i = 0; i < events1.length; i++){
              fields.push(
                <Section key={events1[i].eventID} style={{ width: "100%" }}>
                  <SectionContent>
                    <Text>{events1[i].name}</Text>
                    <Text>Description: {events1[i].description}</Text>
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
        style={{marginTop: -40}}
        theme={{
          calendarBackground: isDarkmode ? themeColor.dark300 : themeColor.white300,
          textSectionTitleColor: isDarkmode ? themeColor.white200 : themeColor.dark300,
          textSectionTitleDisabledColor: '#d9e1e8',
          selectedDayBackgroundColor: '#00adf5',
          selectedDayTextColor: '#ffffff',
          todayTextColor: '#00adf5',
          dayTextColor: '#2d4150',
          textDisabledColor: '#d9e1e8',
          dotColor: '#00adf5',
          selectedDotColor: '#ffffff',
          arrowColor: 'orange',
          disabledArrowColor: '#d9e1e8',
          monthTextColor: 'blue',
          indicatorColor: 'blue',
          textDayFontWeight: 'bold',
          textMonthFontWeight: 'bold',
          textDayHeaderFontWeight: 'bold',
          textDayFontSize: 16,
          textMonthFontSize: 16,
          textDayHeaderFontSize: 14
        }}
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
