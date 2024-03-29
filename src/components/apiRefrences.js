import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const getUser = async (username) => {
  try {
    const data = await axios.get(
      `https://fbla-backend.herokuapp.com/user/${username}`
    );
    var newData = JSON.stringify(data.data);
    newData = JSON.parse(newData);
    return newData;
  } catch (error) {
    console.log(error);
  }
};

export const getUserFromID = async (id) => {
  try {
    const data = await axios.get(
      `https://fbla-backend.herokuapp.com/user/id/${id}`
    );
    var newData = JSON.stringify(data.data);
    newData = JSON.parse(newData);
    return newData;
  } catch (error) {
    if (error.response.status == 404) return false;
    else console.log(error);
  }
};

export const getFeed = async (iUser) => {
  try {
    const data = await axios.get(
      `https://fbla-backend.casteel-fbla.repl.co/post/getFeed/${iUser}`
    );
    const newData = JSON.stringify(data.data[0]);
    return newData;
  } catch (error) {
    alert("Something went wrong.");
    console.error(error);
  }
};

export const getPost = async (postID) => {
  try {
    const data = await axios.get(
      `https://fbla-backend.herokuapp.com/post/${postID}`
    );
    var newData = JSON.stringify(data.data);
    newData = JSON.parse(newData);
    return newData;
  } catch (error) {
    alert("Something went wrong.");
  }
};

export const getLeaderboard = async (leaderType) => {
  try {
    const data = await axios.get(
      `https://fbla-backend.herokuapp.com/leaderboard/${leaderType}`
    );
    var newData = JSON.stringify(data.data);
    newData = JSON.parse(newData);
    return newData;
  } catch (error) {
    alert("Something went wrong.");
  }
};

export const likePost = async (postID, iUser, iToken) => {
  try {
    const data = await axios.post(
      `https://fbla-backend.herokuapp.com/post/like/${postID}`,
      {
        username: iUser,
        token: iToken,
      }
    );
    var newData = JSON.stringify(data.data);
    newData = JSON.parse(newData);
    return newData;
  } catch (error) {
    alert("Something went wrong.");
  }
};

export const dislikePost = async (postID, iUser, iToken) => {
  try {
    await axios.post(
      `https://fbla-backend.herokuapp.com/post/dislike/${postID}`,
      {
        username: iUser,
        token: iToken,
      }
    );
  } catch (error) {
    alert("Something went wrong.");
  }
};

export const getEvent = async (hashTag) => {
  try {
    const data = await axios.get(
      `https://fbla-backend.herokuapp.com/event/${hashtag}`
    );
    var newData = JSON.stringify(data.data);
    newData = JSON.parse(newData);
    return newData;
  } catch (error) {
    alert("Something went wrong.");
  }
};

export const getAllEventsOnDay = async (date) => {
  try {
    const data = await axios.get(
      `https://fbla-backend.herokuapp.com/event/day/${date}`
    );
    var newData = JSON.stringify(data.data);
    newData = JSON.parse(newData);
    return newData;
  } catch (error) {
    alert("Something went wrong.");
  }
};

export const createUser = async (
  id,
  name,
  username,
  role,
  school,
  year,
  profilePicture
) => {
  try {
    const data = await axios.post(
      `https://fbla-backend.casteel-fbla.repl.co/user`,
      {
        id: id,
        name: name,
        username: username,
        role: role,
        school: school,
        year: year,
        profilePicture: profilePicture,
      }
    );
    var newData = JSON.stringify(data.data);
    newData = JSON.parse(newData);
    return newData;
  } catch (error) {
    console.log(error);
    alert("Something went wrong.");
  }
};

export const createPost = async (postPicture, description, tags) => {
  const userData = JSON.parse(await AsyncStorage.getItem("userData"));
  console.log(userData);
  try {
    const data = await axios.post(`https://fbla-backend.herokuapp.com/post`, {
      username: userData.username,
      name: userData.name,
      postPicture: postPicture,
      description: description,
      tags: tags,
      token: userData.token,
      date: new Date(),
    });
    var newData = JSON.stringify(data.data);
    newData = JSON.parse(newData);
    return newData;
  } catch (error) {
    console.error(error);
    alert("Something went wrong.");
  }
};
