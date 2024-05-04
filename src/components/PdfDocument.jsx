import {
  Document,
  Font,
  Image,
  Page,
  StyleSheet,
  Text,
  View,
} from "@react-pdf/renderer";
import React from "react";

const styles = StyleSheet.create({
  page: {
    backgroundColor: "#ffffff",
    padding: 10,
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
  heading: {
    fontFamily: "Times-Roman",
    fontWeight: "extrabold",
    fontSize: 14,
    textAlign: "center",
    marginBottom: 4,
  },
  heading1: {
    fontFamily: "Times-Roman",
    fontWeight: "bold",
    fontSize: 14,
    textAlign: "left",
    marginBottom: 4,
  },
  text: {
    fontFamily: "Times-Roman",
    fontSize: 14,
    marginTop: 12,
    marginBottom: 5,
    textAlign: "left",
  },
  text1: {
    fontFamily: "Times-Roman",
    fontSize: 14,
    marginTop: 12,
    marginBottom: 5,
    textAlign: "center",
  },
  image: {
    marginTop: 10,
    marginBottom: 4,
    padding: 10,
  },
  pageNumber: {
    position: "absolute",
    fontSize: 8,
    bottom: 30,
    left: 0,
    right: 0,
    textAlign: "center",
    color: "grey",
  },
});

export default function PdfDocument() {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <Image
          src="/header_report.png"
          style={styles.image}
          alt="Report header"
        />
        <Text style={styles.heading}>
          Department of Computer Science & Enginnering/Information Technology
        </Text>
        <Text style={styles.text1}>
          Student Development Program Report on &apos;topic&apos;
        </Text>
        <View style={styles.section}>
          <Text style={styles.heading}>Details about the event</Text>
          <Text style={styles.text}>Conduction Date - </Text>
          <Text style={styles.text}>Time(Duration) - </Text>
          <Text style={styles.text}>Venue - </Text>
          <Text style={styles.text}>Attended by (Batch with Branch )  - </Text>
          <Text style={styles.text}>No. Of. Student attended the session - </Text>
          <Text style={styles.text}>No. Of. Staff attended the session - </Text>
          <Text style={styles.text}>Arranged by (Faculty name with mail id and contact details) - </Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.heading}>Details about the course</Text>
          <Text style={styles.text}>Course Name - </Text>
          <Text style={styles.text}>Batch - </Text>
          <Text style={styles.text}>Year and Division  - </Text>
          <Text style={styles.text}>CO and PO (Mention Numbers)   - </Text>
          <Text style={styles.text}>Semester (ODD/Even) - </Text>
          <Text style={styles.text}>Academic Year - </Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.heading}>About the Speaker</Text>
          <Text style={styles.text}>Name - </Text>
          <Text style={styles.text}>Company Name - </Text>
          <Text style={styles.text}>Designation  - </Text>
          <Text style={styles.text}>Contact Details(mail id and contact number)  - </Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.heading1}>Event Report:</Text>
          <Text style={styles.text}>Description: </Text>
          <Text style={styles.text}>Photos: </Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.heading1}>Students Feedback:</Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.heading1}>Attendace Sheet Photos:</Text>
        </View>
        <Text
          style={styles.pageNumber}
          render={({ pageNumber, totalPages }) =>
            `${pageNumber} / ${totalPages}`
          }
        />
      </Page>
    </Document>
  );
}
