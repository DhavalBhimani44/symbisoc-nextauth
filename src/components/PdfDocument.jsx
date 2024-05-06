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
    margin: 8,
    padding: 8,
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

export default function PdfDocument({ eventData, count }) {
  const formatDate = () => {
    const date = new Date(eventData.date);
    const options = { day: 'numeric', month: 'long', year: 'numeric' };
    return date.toLocaleDateString('en-GB', options);
  };
  console.log("count pdf: ", count);
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
          Student Development Program Report on &apos;{eventData.title}&apos;
        </Text>
        <View style={styles.section}>
          <Text style={styles.heading}>Details about the event</Text>
          <Text style={styles.text}>
            <Text style={{ fontWeight: "bold" }}>Conduction Date</Text> - {formatDate(eventData.date)}
          </Text>
          <Text style={styles.text}>Time(Duration) - {eventData.time}</Text>
          <Text style={styles.text}>Venue - {eventData.location}</Text>
          <Text style={styles.text}>Attended by (Batch with Branch )  - {eventData.batch} ({eventData.branch})</Text>
          <Text style={styles.text}>No. Of. Student attended the session - {count}</Text>
          <Text style={styles.text}>No. Of. Staff attended the session - </Text>
          <Text style={styles.text}>Arranged by (Faculty name with mail id and contact details) - {eventData.faculty} {eventData.facultyMail}/{eventData.facultyContact}</Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.heading}>Details about the course</Text>
          <Text style={styles.text}>Course Name - {eventData.course}</Text>
          <Text style={styles.text}>Batch - {eventData.batch}</Text>
          <Text style={styles.text}>Year and Division  - {eventData.year} - {eventData.division}</Text>
          <Text style={styles.text}>CO and PO (Mention Numbers) - {eventData.copo}</Text>
          <Text style={styles.text}>Semester (ODD/Even) - {eventData.semester}</Text>
          <Text style={styles.text}>Academic Year - {eventData.academicyear}</Text>
        </View>
        <Text
          style={styles.pageNumber}
          render={({ pageNumber, totalPages }) =>
            `${pageNumber} / ${totalPages}`
          }
        />
      </Page>

      {/* Second Page */}
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <Text style={styles.heading}>About the Speaker</Text>
          <Text style={styles.text}>Name - {eventData.speaker}</Text>
          <Text style={styles.text}>Company Name - {eventData.speakerCompany}</Text>
          <Text style={styles.text}>Designation  - {eventData.speakerDesignation}</Text>
          <Text style={styles.text}>Contact Details(mail id and contact number) - {eventData.speakerMail}/{eventData.speakerContact}</Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.heading1}>Event Report: Accepted</Text>
          <Text style={styles.text}>Description: {eventData.description}</Text>
          <Text style={styles.text}>Photos: </Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.heading1}>Students Feedback: Event was very informative and the speaker flawlessly delievered the concepts in an easy to understand manner. All in all, excellent work by the organising committee</Text>
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
