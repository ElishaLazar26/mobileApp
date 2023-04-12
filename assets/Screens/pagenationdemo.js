import React, { useState, useEffect } from 'react';
import { FlatList, View, Text, TouchableOpacity } from 'react-native';
import { Button } from 'react-native-paper';

 // your list of items

const PaginationExample = () => {

const PAGE_SIZE = 10; // number of items to display per page

  const [currentPage, setCurrentPage] = useState(1);
  const [DATA, setDATA] = useState([]);
  const [DATAlength, setDATAlength] = useState(1);

  const totalPages = Math.ceil(DATAlength / PAGE_SIZE);
  // const totalPages = DATAlength / PAGE_SIZE

console.log(currentPage, 'totalPages')

  const fetchData = async () => {
   
    const response = await fetch(
      `https://delivigo-api.herokuapp.com/api/v5/restaurant/orders?status=10&PageNo=${currentPage}`,
      {
        headers: {
          Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0YWJsZSI6IlJlc3RhdXJhbnRzIiwiaWQiOiIyNyIsImlhdCI6MTY4MTA3Mzk0NX0.72nLDUVlNN6Mw7n-tLucLZCykd5UYHUz4i0ID6OftMM`, // SET HEADER IN TOKEN
        },
      }
    );
    const newData = await response.json();
    setDATA(newData.result);
    setDATAlength(newData.Count)
 
  };



  useEffect(() => {
    fetchData();

  }, [currentPage]);


  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };






const renderItem = ({item}) => {
  console.log(item, 'renderItem')
  return (
    <View><Text>{item?.OrderNumber} ---- {item?.FullName}</Text></View>
  )
}
  const renderPaginationControls = () => {
    const pages = [];

    for (let i = 1; i <= totalPages; i++) {
      pages.push(
        <TouchableOpacity
          key={i}
          onPress={() => handlePageChange(i)}
          style={{ padding: 10 }}
        >
        <Text>{i}</Text>
        </TouchableOpacity>
      );
    }

    return <View>{pages}</View>;
  };

  const startItemIndex = (currentPage - 1) * PAGE_SIZE;
  const endItemIndex = startItemIndex + PAGE_SIZE;

  return (
    <View>
      <FlatList
        // data={DATA.slice(startItemIndex, endItemIndex)}
        data={DATA}
        renderItem={renderItem}
        keyExtractor={(item ) => item.id}
      />
      {renderPaginationControls()}
    </View>
  );
};

export default PaginationExample;
