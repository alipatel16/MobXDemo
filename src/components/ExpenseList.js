import React from 'react';
import { FlatList, StyleSheet } from 'react-native';

const ExpenseList = ({ data, renderItem, keyExtractor, style }) => {
  return (
    <FlatList
      data={data}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
      style={[styles.flatList, style]}
    />
  );
};

const styles = StyleSheet.create({
  flatList: {
    flex: 1,
  },
});

export default ExpenseList;