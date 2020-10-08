import React, { Component } from "react";
import "./main.css";
import { convertFromRaw, EditorState } from "draft-js";
import Editor, { composeDecorators } from "draft-js-plugins-editor";
import createImagePlugin from "draft-js-image-plugin";
import moment from "moment";
import axios from "axios";

const imagePlugin = createImagePlugin();
const plugins = [imagePlugin];

export default class Main extends Component {
  state = {
    data: [],
    titleHeader: "",
    loading: true,
    activeData: [],
  };

  componentDidMount() {
    this._eventListener();
  }

  componentDidUpdate(prevProps) {
    const { id } = this.props;

    if (prevProps.id !== id) {
      const newData = this.state.data.filter((val) => val._id === id);
      this.setState({ activeData: newData });
    }
  }

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

  _renderUser = () => {
    const { data } = this.state;

    const img =
      data[0].authors &&
      data[0].authors[0].user &&
      data[0].authors[0].user.profile_picture &&
      data[0].authors[0].user.profile_picture.url_compressed;

    const fullName =
      data[0].authors &&
      data[0].authors[0].user &&
      data[0].authors[0].user.full_name;

    const joinDate =
      data[0].authors && data[0].authors[0].user && data[0].authors[0].join_at;

    return (
      <div className="wrapper-user">
        <img className="user-icon" src={img}></img>
        <span>
          <div>{fullName}</div>
          <div className="joint-date">
            {moment(joinDate).format("MMM DD YYYY")}
          </div>
        </span>
      </div>
    );
  };

  _renderHeader = () => {
    const { data } = this.state;
    console.log(data[0]);
    const titleHeader = data[0].title;

    return (
      <div className="wrapper-header">
        <div className="img-header">
          <h1 className="title-header">{titleHeader}</h1>
        </div>
      </div>
    );
  };

  _renderEditor = () => {
    const { id } = this.props;
    console.log(this.state.activeData);
    const parse = JSON.parse(
      this.state.activeData.length
        ? this.state.activeData[0].editorState
        : this.state.data[0].editorState
    );
    const contentState = convertFromRaw(parse);
    const editorState = EditorState.createWithContent(contentState);

    return (
      <div>
        <Editor editorState={editorState} plugins={plugins} readOnly={true} />
      </div>
    );
  };

  render() {
    return (
      <div> 
          {this.state.loading 
            ? ( <span>Loading ...</span> ) 
            : ( <div>    
                    {this._renderHeader()}
                    <div style={{ marginRight: "17%", marginLeft: "30%" }}>
                        {this._renderUser()}
                        {this._renderEditor()}
                    </div>
                </div> 
            )
          }
      </div>
    );
  }
}