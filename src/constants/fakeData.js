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
      thumbnail: `https://randompicturegenerator.com/img/people-generator/gf4c0473ceabc555c6e63f25a850f83b9f0db287ccf5b9002822baa0ee584ddc5ff30efd5d97a02b54b73a9b5bc9884f5_640.jpg`,
      path: "https://google.com",
      reverse: false,
    },
    {
      id: "12223",
      title: "NFT Marketplace",
      thumbnail: `https://randompicturegenerator.com/img/people-generator/g846294a31ce69fb5a7c35f45e3c4a917e1448ac59b4514d8def85c9d0c34e79e4a42edfb2d4c142e9ff4889235f7dc95_640.jpg`,
      path: "https://google.com",
      reverse: true,
    },
    {
      id: "1224323",
      title: "Những bữa tiệc sang trọng",
      thumbnail: `https://randomwordgenerator.com/img/picture-generator/51e8dc454957b10ff3d8992cc12c30771037dbf85254794e702673dd9e49_640.jpg`,
      path: "https://google.com",
      reverse: false,
    },
    {
      id: "1222233",
      title: "Du lịch Đà Nẵng 3 ngày 2 đêm",
      thumbnail: ` https://randomwordgenerator.com/img/picture-generator/anton-darius-2pH3TnjoZ0o-unsplash.jpg`,
      path: "https://google.com",
      reverse: true,
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
