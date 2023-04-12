// import React, { useState, useEffect } from 'react';
// import { FlatList, View, Text, Button } from 'react-native';

//  

// const PAGE_SIZE = 20;

//  

// const MyList = () => {
//   const [data, setData] = useState([]);
//   const [page, setPage] = useState(1);

//  

//   const fetchData = async () => {
//     const response = await fetch(`https://delivigo-api.herokuapp.com/api/v5/restaurant/orders?status=40&PageNo=${page}`);
//     const newData = await response.json();
//     setData([...data, ...newData]);
//   };

//  

//   useEffect(() => {
//     fetchData();
//   }, [page]);

//  

//   const handleLoadMore = () => {
//     setPage(page + 1);
//   };

//  

//   const renderItem = ({ item,index }) => {
//     return (
// <View>
// <Text> {index} : {item.OrderNumber}</Text>

// </View>
//     );
//   };

//  

//   return (
// <FlatList
//       data={data}
// //       keyExtractor={(item) => item.id}
//       renderItem={renderItem}
//       onEndReached={handleLoadMore}
//       onEndReachedThreshold={1.5}
//       ListFooterComponent={<Button title="Load More" onPress={handleLoadMore} />}
//     />
//   );
// };

//  

// export default MyList;


import React, { useState, useEffect } from 'react';
import { FlatList, View, Text, Button } from 'react-native';

 

const PAGE_SIZE = 20;

 

const MyList = () => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);

 

  const fetchData = async () => {
    const response = await fetch(`https://jsonplaceholder.typicode.com/posts?_page=${page}`);
    const newData = await response.json();
    setData([...data, ...newData]);
  };

 

  useEffect(() => {
    fetchData();
  }, [page]);

 

  const handleLoadMore = () => {
    setPage(page + 1);
  };

 

  const renderItem = ({ item }) => {
    return (
<View>
<Text>{item?.id}{item.title}</Text>

</View>
    );
  };

 

  return (
<FlatList
      data={data}
      keyExtractor={(item) => item.id}
      renderItem={renderItem}
      onEndReached={handleLoadMore}
      onEndReachedThreshold={0.5}
      ListFooterComponent={<Button title="Load More" onPress={handleLoadMore} />}
    />
  );
};

 

export default MyList;