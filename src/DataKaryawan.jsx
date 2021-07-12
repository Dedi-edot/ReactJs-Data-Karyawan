import React from "react";
import Axios from "axios";

class DataKaryawan extends React.Component {
  state = {
    dataKaryawan: [],
    addKaryawan: {
      id: 0,
      nama: "",
      jabatan: "",
      gender: "",
      birthday: 0,
    },
  };

  fetchData = () => {
    Axios.get(`http://localhost:2000/data-karyawan`).then((res) => {
      this.setState({ dataKaryawan: res.data });
    });
  };

  componentDidMount() {
    this.fetchData();
  }

  handleDelete = (e) => {
    Axios.delete(`http://localhost:2000/data-karyawan/${e.target.value}`).then(
      (res) => {
        alert("Delete Data Berhasil");
        this.fetchData();
      }
    );
  };

  handleChange = (e) => {
    let newData = { ...this.state.addKaryawan };
    newData["id"] = new Date().getTime();
    newData[e.target.name] = e.target.value;
    this.setState({ addKaryawan: newData });
  };

  handleAdd = () => {
    Axios.post(
      `http://localhost:2000/data-karyawan/`,
      this.state.addKaryawan
    ).then((res) => {
      alert("Berhasil menambahkan data karyawan");
      let clearData = { ...this.state.addKaryawan };
      clearData["id"] = "";
      clearData["nama"] = "";
      clearData["jabatan"] = "";
      clearData["gender"] = "";
      clearData["birthday"] = "";
      this.setState({ addKaryawan: clearData });
      this.fetchData();
    });
  };

  render() {
    return (
      <div>
        <div className="bg-primary">
          <div className="text-light text-center">
            <h1>Data Karyawan</h1>
          </div>
        </div>
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="card border-2 rounded">
                <div className="card-header bg-primary text-light">
                  <strong>Tambah Data Karyawan</strong>
                </div>
                <div className="container">
                  <div className="card-body ">
                    <div>
                      <input
                        type="text"
                        name="nama"
                        placeholder="Input Nama Karyawan"
                        value={this.state.addKaryawan.nama}
                        onChange={this.handleChange}
                        className="mx-2"
                      />
                      <input
                        type="text"
                        name="jabatan"
                        placeholder="Input Jabatan"
                        value={this.state.addKaryawan.jabatan}
                        onChange={this.handleChange}
                        className="mx-2"
                      />
                      <input
                        type="text"
                        name="gender"
                        placeholder="Input Jenis Kelamin"
                        value={this.state.addKaryawan.gender}
                        onChange={this.handleChange}
                        className="mx-2"
                      />
                      <input
                        type="date"
                        name="birthday"
                        value={this.state.addKaryawan.birthday}
                        onChange={this.handleChange}
                        className="mx-2"
                      />
                      <button
                        className="btn btn-success"
                        onClick={this.handleAdd}
                      >
                        Add Data
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="container mt-1">
          <div className="row">
            <div className="col-12">
              <div className="bg-primary text-light p-2">
                <strong>Daftar Karyawan</strong>
              </div>
            </div>
          </div>
        </div>
        <div className="container">
          <div className="row">
            <div className="col-12">
              {this.state.dataKaryawan.map((data, index) => {
                return (
                  <div key={index} className="card border-2 rounded">
                    <div className="card-body">
                      <p>Nama Karyawan : {data.nama}</p>
                      <p>Jabatan : {data.jabatan}</p>
                      <p>Jenis Kelamin : {data.gender}</p>
                      <p>Tanggal Lahir : {data.birthday}</p>
                      <button
                        className="btn-warning m-1"
                        value={data.id}
                        onClick={this.handleEdit}
                      >
                        Edit
                      </button>
                      <button
                        className="btn-danger m-1"
                        value={data.id}
                        onClick={this.handleDelete}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default DataKaryawan;
