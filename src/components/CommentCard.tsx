import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { Comment } from "../types/index";

interface Props {
  comment: Comment;
}

export default function CommentCard({ comment }: Props) {
  const avatarUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(comment.name)}&background=F3F4F6&color=333&rounded=true`;

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Image source={{ uri: avatarUrl }} style={styles.avatar} />
        <Text style={styles.userName}>{comment.name}</Text>
      </View>
      <Text style={styles.body}>{comment.body}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#FAFAFA",
    padding: 12,
    marginVertical: 6,
    marginHorizontal: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  avatar: {
    width: 30,
    height: 30,
    borderRadius: 15,
    marginRight: 10,
  },
  userName: {
    fontWeight: "600",
    fontSize: 14,
    color: "#374151",
  },
  body: {
    fontSize: 14,
    color: "#4B5563",
    lineHeight: 20,
  },
});
