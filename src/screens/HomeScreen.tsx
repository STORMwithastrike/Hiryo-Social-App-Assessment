import React, { useEffect, useState } from "react";
import {
  View,
  FlatList, //it's an optimized compnent for rendering large lists smoothly
  ActivityIndicator,
  StyleSheet,
  RefreshControl, //used for pull to rrefresh functionality
} from "react-native";
import { Post, RootStackParamList } from "../types/index";
import { api } from "../services/api";
import PostCard from "../components/PostCard";

type HomeScreenNavigationProp = {
  navigate: (
    screen: "PostDetails",
    params: RootStackParamList["PostDetails"],
  ) => void;
};

interface Props {
  navigation: HomeScreenNavigationProp;
}

export default function HomeScreen({ navigation }: Props) {
  const [posts, setPosts] = useState<Post[]>([]); //an array of posts that starts empty initially
  const [loading, setLoading] = useState(true); //sets page loading to true initially
  const [refreshing, setRefreshing] = useState(false); //sets refresh to false intially

  const fetchPosts = async () => {
    try {
      const data = await api.getPosts();
      setPosts(data); //waits for posts to arrive, and once they do they're saved into the posts array
    } catch (error) {
      console.error("Error fetching posts:", error); //logs error to console if posts fail to load
    } finally {
      setLoading(false); //stops loading & refresh state whether they succeed or fail.
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchPosts(); //designed to fetch posts when page is loaded initially
  }, []);

  const onRefresh = () => {
    setRefreshing(true); //sets the refresh state to true and fetch posts everytime user refreshes
    fetchPosts();
  };

  if (loading) {
    return (
      //shows the loading spinner UI elemetn
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#6d31ea" />
      </View>
    );
  }

  return (
    //returns the homepage UI elemnt and formatting
    <View style={styles.container}>
      <FlatList
        data={posts}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <PostCard
            post={item}
            onPress={() => navigation.navigate("PostDetails", { post: item })}
          />
        )}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F3F4F6",
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  listContainer: {
    paddingVertical: 10,
  },
});
