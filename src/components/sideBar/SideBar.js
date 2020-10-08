import React, { Component } from "react";
import "./sideBar.css";
import axios from "axios";

export default class SideBar extends Component {
  state = {
    data: [],
    openSideBar: true,
    iconSideBar: true,
  };

  componentDidMount() {
    this._eventListener();
  }

  _handleClickSideBar = () => {
    this.setState({
      openSideBar: !this.state.openSideBar,
      iconSideBar: !this.state.iconSideBar,
    });
  };

  async _eventListener() {
    axios
      .get("http://api.mapid.io/blog/get_list_docs_public/blog")
      .then((res) => {
        this.setState({ data: res.data, loading: false });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  _handleClickNav = (id) => {
    const { onGetId } = this.props;
    onGetId(id);
  };

  render() {
    const seminar = this.state.data.filter(
      (seminar) => seminar.sub_bracket === "seminar"
    );
    const blog = this.state.data.filter(
      (blog) => blog.sub_bracket === "achievement"
    );
    const news = this.state.data.filter((news) => news.sub_bracket === "news");
    const partnership = this.state.data.filter(
      (partnership) => partnership.sub_bracket === "partnership"
    );
    const notice = this.state.data.filter(
      (notice) => notice.sub_bracket === "teknis_kompetisi_mapid"
    );
    // console.log(partnership);
    return (
      <div className="container-sideBar">
        <div className="stickyBar">
          <button
            onClick={this._handleClickSideBar}
            className={this.state.openSideBar ? "closeBtn" : "openBtn"}
          >&gt;</button>
        </div>
        <div
          className={this.state.openSideBar ? "close-sideBar" : "show-sideBar"}
        >
          <div className="blog">BLOG</div>
          <div className="subMenu"> SEMINAR &amp; WORKSHOP</div>
          <ul>
            {seminar.map((val, idx) => (
              <li key={idx} onClick={() => this._handleClickNav(val._id)}>
                <a>{val.title}</a>
              </li>
            ))}
          </ul>
          <div className="subMenu">ACHIEVEMENT</div>
          <ul>
            {blog.map((bl, idx) => (
              <li key={idx} onClick={() => this._handleClickNav(bl._id)}>
                <a>{bl.title}</a>
              </li>
            ))}
          </ul>
          <div className="subMenu">NEWS</div>
          <ul>
            {news.map((nws, idx) => (
              <li key={idx} onClick={() => this._handleClickNav(nws._id)}>
                <a>{nws.title}</a>
              </li>
            ))}
          </ul>
          <div className="subMenu">PARTNERSHIP</div>
          <ul>
            {partnership.map((partner, idx) => (
              <li key={idx} onClick={() => this._handleClickNav(partner._id)}>
                <a>{partner.title}</a>
              </li>
            ))}
          </ul>
          <div className="subMenu">Kompetisi MAPID</div>
          <ul>
            {notice.map((note, idx) => (
              <li key={idx} onClick={() => this._handleClickNav(note._id)}>
                {note.title}
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
}
