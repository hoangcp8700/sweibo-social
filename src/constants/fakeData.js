import axios from "axios";

const GET_USERS = async () => {
  try {
    const response = await axios.get(
      `https://jsonplaceholder.typicode.com/users`
    );
    const newUser = await response.data.map((item) => ({
      ...item,
      avatar: "https://i.pravatar.cc/150",
    }));

    const newUser1 = await response.data.map((item) => ({
      ...item,
      id: Math.floor(Math.random() * 2381231),
      avatar: "https://i.pravatar.cc/150",
    }));
    return [...newUser, ...newUser1];
  } catch (error) {
    console.log(error);
  }
};

export default { GET_USERS };
