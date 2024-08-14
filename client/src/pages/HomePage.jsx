import React, { useEffect, useState } from "react";
import moment from "moment";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import Navbar from "../components/Navbar";
import Spinner from "../components/Spinner";
import { Table, Modal, Form, Input, Select, Radio, message } from "antd";
import axios from "axios";

const HomePage = () => {
  const [showModal, setShowModal] = useState(false);
  const [employees, setEmployees] = useState([]);
  const [editingEmployee, setEditingEmployee] = useState(null);
  const [loading, setLoading] = useState(false);

  const columns = [
    {
      title: "Unique Id",
      dataIndex: "f_Id",
    },
    {
      title: "Name",
      dataIndex: "f_Name",
    },
    {
      title: "Email",
      dataIndex: "f_Email",
    },
    {
      title: "Mobile No.",
      dataIndex: "f_Mobile",
    },
    {
      title: "Designation",
      dataIndex: "f_Designation",
    },
    {
      title: "Gender",
      dataIndex: "f_Gender",
    },
    {
      title: "Course",
      dataIndex: "f_Course",
    },
    {
      title: "Createdate",
      dataIndex: "f_Createdate",
      render: (text) => <span>{moment(text).format("YYYY-MM-DD")}</span>,
    },
    {
      title: "Action",
      render: (record) => (
        <div>
          <EditOutlined
            onClick={() => {
              setEditingEmployee(record);
              setShowModal(true);
            }}
            className="text-xl"
          />
          <DeleteOutlined
            className="mx-2 text-xl"
            onClick={() => handleDelete(record)}
          />
        </div>
      ),
    },
  ];

  const handleDelete = async (record) => {
    try {
      setLoading(true);
      await axios.post("http://localhost:4000/api/employee/deleteEmployee", {
        employeeId: record._id,
      });
      setLoading(false);
      message.success("Employee is deleted");
    } catch (error) {
      setLoading(false);
      console.error(error);
      message.error("Unable to delete");
    }
  };

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const user = localStorage.getItem("token");
        setLoading(true);
        const res = await axios.post(
          "http://localhost:4000/api/employee/getEmployees",
          {
            userid: user._id,
          }
        );
        setLoading(false);
        setEmployees(res.data.employees);
      } catch (error) {
        console.log(error);
      }
    };
    fetchEmployees();

    const intervalId = setInterval(fetchEmployees, 300000);

    return () => clearInterval(intervalId);
  }, []);

  const handleSubmit = async (data) => {
    try {
      const user = localStorage.getItem("token");
      setLoading(true);

      if (editingEmployee) {
        await axios.post(`http://localhost:4000/api/employee/editEmployee`, {
          payload: {
            ...data,
            userid: user._id,
          },
          employeeId: editingEmployee._id,
        });

        setLoading(false);
        alert("Employee list is updated");
      } else {
        await axios.post("http://localhost:4000/api/employee/createEmployee", {
          ...data,
          userid: user._id,
        });
        setLoading(false);
        alert("Employee is added in Employees list", user);
      }

      setShowModal(false);
      setEditingEmployee(null);
    } catch (error) {
      setLoading(false);
      console.error(error);
      alert("Failed to add Employee");
    }
  };

  return (
    <div>
      {loading && <Spinner />}
      <Navbar employees={employees} />

      <div className="flex justify-between px-10 py-6">
        <h1 className="text-xl font-semibold">Employee list</h1>
        <button onClick={() => setShowModal(true)}>Add Employee</button>
      </div>

      <div className="">
        <Table columns={columns} dataSource={employees} />
      </div>

      <Modal
        title={editingEmployee ? "Edit Employee" : "Add Employee"}
        open={showModal}
        onCancel={() => setShowModal(false)}
        footer={false}
      >
        <Form
          layout="vertical"
          onFinish={handleSubmit}
          initialValues={editingEmployee}
        >
          <Form.Item label="Unique Id" name="f_Id">
            <Input />
          </Form.Item>
          <Form.Item label="Name" name="f_Name">
            <Input />
          </Form.Item>
          <Form.Item label="Email" name="f_Email">
            <Input />
          </Form.Item>
          <Form.Item label="Mobile no." name="f_Mobile">
            <Input />
          </Form.Item>
          <Form.Item label="Designation" name="f_Designation">
            <Select>
              <Select.Option value="hr">HR</Select.Option>
              <Select.Option value="manager">Manager</Select.Option>
              <Select.Option value="sales">Sales</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item label="Gender" name="f_Gender">
            <Select>
              <Select.Option value="male">Male</Select.Option>
              <Select.Option value="female">Female</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item label="Course" name="f_Course">
            <Input type="text" />
          </Form.Item>
          <Form.Item label="Createdate" name="f_Createdate">
            <Input type="date" />
          </Form.Item>

          <div className="d-flex justify-content-end">
            <button type="submit" className="btn btn-primary">
              SAVE
            </button>
          </div>
        </Form>
      </Modal>
    </div>
  );
};

export default HomePage;
