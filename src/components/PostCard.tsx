import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native"; //imports mobile develpment UI building blocks
import { Post, User } from "../types/index"; //import post & user blueprints from index.ts
import { api } from "../services/api"; //imports the custom service api created in api.ts

interface Props {
  //defines the prpoerties of a post
  post: Post; //ensures a post follows the Post bp
  onPress?: () => void; //? = optional function designed to handle the pressing of a post by a user
  isDetail?: boolean; //? = optional boolean to indicate if the post is in detail view
}

export default function PostCard({ post, onPress, isDetail = false }: Props) {
  //creates the actual postcard ekements.
  //isDetail is assumed to be false by default so that if this data isn't passed then the app doesn't break

  const [user, setUser] = useState<User | null>(null);
  // initially has no user data, gets updated when fetchUser is called

  const [loading, setLoading] = useState(true);
  //used to load the UI element initially, then display a loading state
  //once the delayed data arrives, the content is displayed and its state changes to loaded (loading = false)

  useEffect(() => {
    //desgined to display loading state and change it once data arrives
    const fetchUser = async () => {
      //async function used because of unpredictable fetching time (async functions can pause and wait)
      try {
        const userData = await api.getUserById(post.user_id);
        //lazy loading is perfromed where each card uses the ID it was given to fetch its own user data rather than having to do multiple api calls

        setUser(userData);
      } catch (error) {
        // fallback if user is deleted or not found on GoRest

        setUser({
          id: post.user_id,
          name: `User ${post.user_id}`,
          email: "",
          gender: "unknown",
          status: "inactive",
        });
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, [post.user_id]);

  const avatarUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(user?.name || "U")}&background=6d31ea&color=fff&rounded=true`;

  const CardContent = //actual card formatting
    (
      <View style={[styles.card, isDetail && styles.detailCard]}>
        <View style={styles.header}>
          {loading ? (
            <ActivityIndicator
              size="small"
              color="#6d31ea"
              style={styles.loader}
            />
          ) : (
            <>
              <Image source={{ uri: avatarUrl }} style={styles.avatar} />
              <Text style={styles.userName}>{user?.name}</Text>
            </>
          )}
        </View>
        <Text style={styles.title}>{post.title}</Text>
        <Text style={styles.body} numberOfLines={isDetail ? undefined : 3}>
          {post.body}
        </Text>
      </View>
    );

  if (onPress) {
    //if onPress is true, then card reacts to user input by changing opacity to indicate it was pressed
    return (
      <TouchableOpacity onPress={onPress} activeOpacity={0.7}>
        {CardContent}
      </TouchableOpacity>
    );
  }

  return CardContent;
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    padding: 16,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  detailCard: {
    marginHorizontal: 0,
    marginVertical: 0,
    borderRadius: 0,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    shadowOpacity: 0,
    elevation: 0,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
    minHeight: 40,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  userName: {
    fontWeight: "bold",
    fontSize: 16,
    color: "#333",
  },
  loader: {
    marginLeft: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
    color: "#1a1a1a",
  },
  body: {
    fontSize: 14,
    color: "#555",
    lineHeight: 20,
  },
});
