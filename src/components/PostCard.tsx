import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { Post, User } from "../types/index";
import { api } from "../services/api";

interface Props {
  post: Post;
  onPress?: () => void;
  isDetail?: boolean;
}

export default function PostCard({ post, onPress, isDetail = false }: Props) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await api.getUserById(post.user_id);
        setUser(userData);
      } catch (error) {
        // Fallback if user is deleted or not found on GoRest
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

  const CardContent = (
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
