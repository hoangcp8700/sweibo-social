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

const GET_ADVERTISE = () => {
  const arr = [
    {
      id: "123",
      title: "Quảng cáo bán hàng online cùng tiktok",
      thumbnail: `https://scontent.fsgn5-11.fna.fbcdn.net/v/t45.1600-4/cp0/q90/spS444/p296x100/262052192_23848964865580655_5196786653449324933_n.png.jpg?_nc_cat=110&ccb=1-5&_nc_sid=67cdda&_nc_ohc=WYPNk-8t2AkAX_3gttc&_nc_ht=scontent.fsgn5-11.fna&oh=00_AT_GBn80XcsVn9rTOMpwzLhtpHl1J-aeKRhlaRnZOl-RAw&oe=61E9A6E4`,
      path: "https://google.com",
    },
    {
      id: "12223",
      title: "NFT Marketplace",
      thumbnail: `https://scontent.fsgn5-10.fna.fbcdn.net/v/t45.1600-4/cp0/q75/spS444/p296x100/194484182_23848002198700391_4322638678952833879_n.jpg?_nc_cat=1&ccb=1-5&_nc_sid=67cdda&_nc_ohc=DBvchkPvM2UAX-Y0I9f&_nc_ht=scontent.fsgn5-10.fna&oh=00_AT_nCnB2VORDh3YfGdp3M2FyFYO_kCL8-QUUY0fHwJgC9Q&oe=61EA1BC6`,
      path: "https://google.com",
    },
  ];
  return arr;
};

const GET_COLLECTION_SAVE = () => {
  const arr = [
    {
      id: "123",
      title: "Nhà ở",
      path: "collections/nha-o",
      thumbnail: `https://scontent.fsgn5-10.fna.fbcdn.net/v/t45.1600-4/cp0/q75/spS444/p296x100/194484182_23848002198700391_4322638678952833879_n.jpg?_nc_cat=1&ccb=1-5&_nc_sid=67cdda&_nc_ohc=DBvchkPvM2UAX-Y0I9f&_nc_ht=scontent.fsgn5-10.fna&oh=00_AT_nCnB2VORDh3YfGdp3M2FyFYO_kCL8-QUUY0fHwJgC9Q&oe=61EA1BC6`,
    },
    {
      id: "123243",
      title: "Xe cộ",
      path: "collections/xe-co",
      thumbnail: `https://scontent.fsgn5-10.fna.fbcdn.net/v/t45.1600-4/cp0/q75/spS444/p296x100/194484182_23848002198700391_4322638678952833879_n.jpg?_nc_cat=1&ccb=1-5&_nc_sid=67cdda&_nc_ohc=DBvchkPvM2UAX-Y0I9f&_nc_ht=scontent.fsgn5-10.fna&oh=00_AT_nCnB2VORDh3YfGdp3M2FyFYO_kCL8-QUUY0fHwJgC9Q&oe=61EA1BC6`,
    },
    {
      id: "212123",
      title: "Top top",
      path: "collections/top-top",
      thumbnail: `https://scontent.fsgn5-10.fna.fbcdn.net/v/t45.1600-4/cp0/q75/spS444/p296x100/194484182_23848002198700391_4322638678952833879_n.jpg?_nc_cat=1&ccb=1-5&_nc_sid=67cdda&_nc_ohc=DBvchkPvM2UAX-Y0I9f&_nc_ht=scontent.fsgn5-10.fna&oh=00_AT_nCnB2VORDh3YfGdp3M2FyFYO_kCL8-QUUY0fHwJgC9Q&oe=61EA1BC6`,
    },
  ];
  return arr;
};
export default { GET_USERS, GET_ADVERTISE, GET_COLLECTION_SAVE };
