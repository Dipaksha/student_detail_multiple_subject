import React, { useState } from "react";
import { Container, Button, Grid, TextField } from "@mui/material";
import AddCircle from "@mui/icons-material/AddCircle";
import { Delete } from "@mui/icons-material";
const studentDetialObject = {
  name: "",
  contact: "",
  subject: [""],
};
const dummyStudentList = [{ name: "", contact: "", subject: [""] }];
function Section() {
  const [studentList, setStudentList] = useState([
    { name: "", contact: "", subject: [{ id: "", value: "" }] },
  ]);
  const handleStuDetailChange = (studentIndex, name, value, stuSubIndex) => {
    const stuArray = [...studentList];
    if (name.includes("sub")) {
      let stuSubArr = stuArray[studentIndex].subject;
      stuSubArr[stuSubIndex].value = value;
    } else {
      let stuArray = [...studentList];
      let stuObject = stuArray[studentIndex];
      stuObject[name] = value;
      stuArray[studentIndex] = stuObject;
    }
    setStudentList(stuArray);
  };
  const addSubject = (studentIndex) => {
    let newList = [...studentList];
    let studentObject = { ...newList[studentIndex] };
    let studentSubjects = [...studentObject.subject, { id: "", value: "" }];
    const studentSubjectsAr = studentSubjects.map((el, ind) => ({
      id: ind,
      value: el.value,
    }));
    studentSubjects = studentObject.subject = studentSubjectsAr;
    newList[studentIndex] = studentObject;
    setStudentList(newList);
  };

  const addStudent = () => {
    setStudentList([
      ...studentList,
      { name: "", contact: "", subject: [{ id: "", value: "" }] },
    ]);
  };
  const deleteSubject = (studentIndex, stuSubIndex, subArr) => {
    let newStudentList = [...studentList];
    let deleteSubject = newStudentList[studentIndex].subject[stuSubIndex];
    let indexValue = subArr.indexOf(deleteSubject);
    if (subArr) {
      subArr.splice(indexValue, 1);
    }
    setStudentList(newStudentList);
  };
  const show = () => {
    console.log("studentList", studentList);
  };
  return (
    <Container maxWidth="sm">
      {studentList.map((stuDetail, studentIndex) => {
        return (
          <div
            style={{ border: "2px solid green", margin: "5px" }}
            key={studentIndex}
          >
            <Grid container style={{ margin: "10px" }}>
              <Grid width="100%">
                <label>Name : </label>
                <TextField
                  label="First Name"
                  name="name"
                  value={stuDetail.name}
                  onChange={(event) => {
                    handleStuDetailChange(
                      studentIndex,
                      "name",
                      event.target.value
                    );
                  }}
                />
              </Grid>
              <Grid width="100%">
                <label>Phone : </label>
                <TextField
                  label="Contact"
                  name="contact"
                  value={stuDetail.contact}
                  onChange={(event) => {
                    handleStuDetailChange(
                      studentIndex,
                      "contact",
                      event.target.value
                    );
                  }}
                />
              </Grid>
              <Grid width="100%">
                <label>Subject : </label>
                {stuDetail.subject.map((stuSub, stuSubIndex, subArr) => {
                  return (
                    <span key={stuSub.id}>
                      <TextField
                        label="Subject"
                        name={`subj${stuSubIndex}`}
                        value={stuSub.value}
                        onChange={(event) => {
                          handleStuDetailChange(
                            studentIndex,
                            `subj${stuSubIndex}`,
                            event.target.value,
                            stuSubIndex
                          );
                        }}
                      />
                      <Delete
                        onClick={() => {
                          deleteSubject(studentIndex, stuSubIndex, subArr);
                        }}
                        style={{
                          fontSize: 30,
                          color: "green",
                          marginTop: "7px",
                        }}
                      />
                    </span>
                  );
                })}
                <AddCircle
                  onClick={() => {
                    addSubject(studentIndex);
                  }}
                  style={{ fontSize: 30, color: "green" }}
                />
              </Grid>
            </Grid>
          </div>
        );
      })}

      <Button variant="contained" color="success" onClick={addStudent}>
        add Student
      </Button>
      <Button variant="contained" color="success" onClick={show}>
        Show
      </Button>
    </Container>
  );
}
export default Section;
