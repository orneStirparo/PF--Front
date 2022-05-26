import React, { useContext, useEffect, useState } from 'react';
import { RefreshControl, ScrollView, Alert, StyleSheet } from 'react-native';
import Card from "./Card";
import GlobalContext from "../global/context";
import { groupsForCategory } from "../../utils/api.js";
import Loading from "../loading/Loading";
import Header from "../header/HeaderUser";
import { TextInput } from 'react-native-gesture-handler';

export default function Groups({ category, navigation }) {

  console.log("components groupsByCategory Index");

  const [groups, setGroups] = useState([]);
  const { authData } = useContext(GlobalContext);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [filterData, setFilterData] = useState([]);

  useEffect(() => {
    onload();
  }, []);

  async function onload() {
    setLoading(true);
    try {
      const res = await groupsForCategory(category.name, authData.token);
      if (res.success && res.data.length > 0) {
        setGroups(res.data)
        setFilterData(res.data);
        setLoading(false);
      }
    } catch (error) {
      Alert.alert('Por el momento no hay grupos en esta categoria');
      setLoading(false);
    }
  }

  const searchFilter = (text) => {
    if (text) {
      const newData = groups.filter(item => {
        const itemData = `${item.name}`;
        const textData = text.toLowerCase();
        return itemData.indexOf(textData) > -1;
      });
      setGroups(newData);
      setSearch(text);
    } else {
      setGroups(filterData);
      setSearch('');
    }

  }

  return (
    <Loading loading={loading}>
      <Header navigation={navigation} title={category.name} visibleGoBack={true} />

      <TextInput
        placeholder='Search Here'
        value={search}
        style={styles.textInputSearch}
        onChangeText={(text) => searchFilter(text)}
        textAlign='center'
      />

      <ScrollView refreshControl={<RefreshControl refreshing={false} onRefresh={onload} />}>
        <Card groups={groups} navigation={navigation} onload={onload} />
      </ScrollView>
    </Loading>
  );
}

const styles = StyleSheet.create({
  textInputSearch: {
    height: 30,
    marginTop: 5,
    marginLeft: 15,
    marginRight: 15,
    backgroundColor: '#dddddd99',
    borderRadius: 10,
  }
});