import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addPerson,
  deletePerson,
  getPerson,
  loadPeople,
  updatePerson,
} from "../redux/action";
import { Container, Form, Grid, Radio } from "semantic-ui-react";
import { Header, Image, Table } from "semantic-ui-react";
import { Button } from "semantic-ui-react";
import styled from "styled-components";
import Avater from "../images/avater.jpg";
import Avater1 from "../images/avater1.jpg";

const Home = () => {
  const { people } = useSelector((state) => state.data);
  const { person } = useSelector((state) => state.data);
  const [toggle, setToggle] = useState(false);
  const [toggle1, setToggle1] = useState(false);
  const [state, setState] = useState({
    id: "",
    name: "",
    gender: "",
    dept: "",
    semester: "",
    course: "",
  });
  const { id, name, gender, dept, semester, course } = state;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadPeople());
  }, []);

  //handle delete function
  const handleDelete = (id) => {
    if (window.confirm("Are you sure to delete this student ?")) {
      dispatch(deletePerson(id));
      dispatch(loadPeople());
    }
  };

  const handleToggle = () => {
    setToggle(!toggle);
    console.log(toggle);
    setToggle1(false);
  };
  const handleToggle1 = () => {
    setToggle(false);
    console.log(toggle);
    setState({
      id: "",
      name: "",
      gender: "",
      dept: "",
      semester: "",
      course: "",
    });
  };

  const handleChange = (e) => {
    let { name, value } = e.target;
    setState({ ...state, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    //  if (!id || !title || !body) {
    //    setError("Provide all the information");
    //  } else {
    dispatch(addPerson(state));

    //  setError("");
    //  }
    setToggle(!toggle);
    setState({
      id: "",
      name: "",
      gender: "",
      dept: "",
      semester: "",
      course: "",
    });
  };
  const handleUpdate = (id) => {
    dispatch(getPerson(id));
    setToggle(!toggle);
    setToggle1(true);
  };
  useEffect(() => {
    if (person) {
      setState({ ...person });
    }
  }, [person]);
  const handleSubmit1 = (e) => {
    e.preventDefault();
    console.log(state);
    dispatch(updatePerson(state, id));
    setToggle(!toggle);
    setState({
      id: "",
      name: "",
      gender: "",
      dept: "",
      semester: "",
      course: "",
    });
  };
  return (
    <HomeStyle>
      <Container>
        <div className="heading">
          <Grid columns={2}>
            <Grid.Row>
              <Grid.Column>
                <h1>STUDENT MANAGMENT SYSTEM</h1>
              </Grid.Column>
              <Grid.Column>
                {!toggle && (
                  <Button
                    content="Add Student"
                    primary
                    size="tiny"
                    onClick={() => handleToggle()}
                  />
                )}

                {toggle && (
                  <Button
                    content="X"
                    color="red"
                    size="tiny"
                    className="headingButton"
                    onClick={() => handleToggle1()}
                  />
                )}
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </div>
        {toggle && (
          <Form onSubmit={!toggle1 ? handleSubmit : handleSubmit1}>
            <Form.Group widths="equal">
              <Form.Field>
                <label>Name</label>
                <input
                  placeholder="Name"
                  value={name}
                  type="text"
                  name="name"
                  onChange={handleChange}
                />
              </Form.Field>
              <Form.Field>
                <label>Depertment</label>
                <input
                  placeholder="Depertment"
                  value={dept}
                  type="text"
                  name="dept"
                  onChange={handleChange}
                />
              </Form.Field>
            </Form.Group>
            <Form.Group widths="equal">
              <Form.Field>
                <label>Student ID</label>
                <input
                  placeholder="Student Id"
                  value={id}
                  type="number"
                  name="id"
                  onChange={handleChange}
                />
              </Form.Field>

              <Form.Field>
                <label>Gender</label>
                <input
                  placeholder="Semester"
                  value={gender}
                  type="text"
                  name="gender"
                  onChange={handleChange}
                />
              </Form.Field>
              <Form.Field>
                <label>Semester</label>
                <input
                  placeholder="Semester"
                  value={semester}
                  type="text"
                  name="semester"
                  onChange={handleChange}
                />
              </Form.Field>
            </Form.Group>
            <Form.Field>
              <label>Course</label>
              <input
                placeholder="Course"
                value={course}
                type="text"
                name="course"
                onChange={handleChange}
              />
            </Form.Field>

            <Button
              content="Cancle"
              color="red"
              className="headingButton"
              onClick={() => handleToggle1()}
            />

            <Button color="green" type="submit">
              {!toggle1 ? "Submit" : "Update"}
              {console.log(toggle1)}
            </Button>
          </Form>
        )}
        <Table basic="very" celled striped className="table">
          <Table.Header className="first">
            <Table.Row>
              <Table.HeaderCell>Name</Table.HeaderCell>
              <Table.HeaderCell>Semester</Table.HeaderCell>
              <Table.HeaderCell>Course</Table.HeaderCell>
              <Table.HeaderCell>Date</Table.HeaderCell>
              <Table.HeaderCell>Action</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          {people &&
            people.map((person) => (
              <Table.Body>
                <Table.Row>
                  <Table.Cell>
                    <Header as="h4" image>
                      {person.gender === "Male" ? (
                        <Image src={Avater} rounded size="mini" />
                      ) : (
                        <Image src={Avater1} rounded size="mini" />
                      )}

                      <Header.Content>
                        {person.name}
                        <Header.Subheader>{person.dept}</Header.Subheader>
                      </Header.Content>
                    </Header>
                  </Table.Cell>
                  <Table.Cell>{person.semester}</Table.Cell>
                  <Table.Cell>{person.course}</Table.Cell>
                  <Table.Cell>21th March,2021</Table.Cell>
                  <Table.Cell>
                    <div>
                      <Button
                        content="Edit"
                        primary
                        size="tiny"
                        onClick={() => handleUpdate(person.id)}
                      />
                      <Button
                        content="Delete"
                        color="red"
                        size="tiny"
                        onClick={() => handleDelete(person.id)}
                      />
                    </div>
                  </Table.Cell>
                </Table.Row>
              </Table.Body>
            ))}
        </Table>
      </Container>
    </HomeStyle>
  );
};

export default Home;

const HomeStyle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  .heading {
    margin: 2rem auto;
    margin-left: 12rem;
    position: relative;

    &::before {
      content: "";
      height: 2px;
      position: absolute;
      bottom: 0;
      left: -30px;
      width: 85%;
      background-color: black;
    }
  }
  .headingButton {
    margin-top: 2px;
  }
  .table {
    margin: 0 !important;
  }
`;
