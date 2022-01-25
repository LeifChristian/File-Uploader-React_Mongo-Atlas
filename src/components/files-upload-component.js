import React, { Component } from "react";
import axios from "axios";

const styles = {
  container: {
    // backgroundColor: "teal",
    // // marginTop: "20%",
    textAlign: "center",
  },
  button: { padding: "5px", marginTop: "10px", justifyContent: "center" },

  link: {
    linkStyle: "none",
    color: "black",
  },

  img: { fontWeight: "800", width: "10%", height: "10%", borderRadius: "2rem" },

  input: { /*width: "105px",*/ marginBottom: "5px" },

  list: { listStyle: "none" },
};

export default class FilesUploadComponent extends Component {
  constructor(props) {
    super(props);

    this.onFileChange = this.onFileChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.dothings = this.dothings.bind(this);

    this.state = {
      imgCollection: "",
      title: "",
      body: "aaaa",
      stuff: "",
      img: [],
    };
  }

  async getFiles() {
    await axios.get("http://localhost:4000/api/").then((res) => {
      let ok = [];
      //   let linky = [];

      for (let i = 0; i < res.data.users.length; i++) {
        ok.push(res.data.users[i].imgCollection.toString());

        // linky.push(
        //   res.data.users[i].imgCollection
        //     .toString()
        //     .replace("http://localhost:4000/public/", "")
        //     .slice(37)
        // );
      }
      this.setState({ img: ok });
      console.log(ok);
    });
  }

  componentDidMount() {
    this.getFiles();
  }

  onFileChange(e) {
    this.setState({ imgCollection: e.target.files });
  }

  dothings(x) {
    console.log(x);

    let helper = Array.from(this.state.img);

    helper.splice(x, 1);

    this.setState({ img: helper });

    console.log(helper);
  }

  async onSubmit(e) {
    e.preventDefault();
    window.location.reload(true);
    var formData = new FormData();

    if (!formData) {
      alert("empty");
      return;
    }
    for (const key of Object.keys(this.state.imgCollection)) {
      formData.append("imgCollection", this.state.imgCollection[key]);
    }
    axios
      .post("http://localhost:4000/api/upload-images", formData, {})
      .then((res) => {
        console.log(res.data);
      })
      .then(this.getFiles());
    window.location.reload(true);
  }

  render() {
    return (
      <div style={styles.container}>
        <header>
          <h1>File Uploader</h1>
          <br></br>
          <br></br>
          <br></br>
        </header>
        <div>
          <form onSubmit={this.onSubmit}>
            <div>
              <input
                style={styles.input}
                type="file"
                name="imgCollection"
                onChange={this.onFileChange}
                multiple
                required
              />
            </div>

            <button className="btn btn-primary" type="submit">
              Upload
            </button>
          </form>

          <div>
            {this.state.img.map((file, i) => (
              <ul>
                <li key={i} style={styles.list}>
                  <div>
                    {/* {file ? (
                      <img
                        style={styles.img}
                        src={file}
                        alt=""
                      ></img>
                    ) : (
                      ""
                    )} */}

                    <img style={styles.img} src={file} alt="no img"></img>
                  </div>{" "}
                  <button className="btn btn-secondary" style={styles.button}>
                    <a
                      style={styles.link}
                      href={file}
                      target="_blank"
                      rel="noreferrer"
                    >
                      {file
                        .toString()
                        .replace("http://localhost:4000/public/", "")
                        .slice(37)}
                    </a>
                  </button>{" "}
                  <button
                    onClick={this.dothings.bind(this, i)}
                    className="=btn btn-danger"
                  >
                    X
                  </button>
                </li>
              </ul>
            ))}
          </div>
        </div>
      </div>
    );
  }
}
