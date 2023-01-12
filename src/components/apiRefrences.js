import axios from "axios";

export const getUser = (username) => {
    fetch(`https://fbla-backend.herokuapp.com/user/${username}`, {
      "method": "GET",
    })
      .then(response => response.json())
      .then(response => {
        console.log(response);
      })
      .catch(err => {
        console.log(err);
      });
  }

  export const getFeed = async (username) => {
    try {
      const data = await axios.get(`https://fbla-backend.herokuapp.com/post/getFeed/${username}`)
      const newData = JSON.stringify(data.data[0]);
      return newData;
    } catch (error) {
      alert("Something went wrong.");
    }
  };

export const getPost = async (postID) => {
  try {
    const data = await axios.get(`https://fbla-backend.herokuapp.com/post/${postID}`)
    var newData = JSON.stringify(data.data);
    newData =  JSON.parse(newData)
    return newData;
  } catch (error) {
    alert("Something went wrong.");
  }
};