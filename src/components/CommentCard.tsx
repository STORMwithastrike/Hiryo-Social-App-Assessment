import React from "react"; //imports the react library
import { View, Text, StyleSheet, Image } from "react-native"; //imports mobile develpment UI building blocks
import { Comment } from "../types/index"; //imports the comment blueprint from index.ts

interface Props {
  comment: Comment; //this makes it so that any comment passed down matches the Comment blueprint we imported earlier
}

export default function CommentCard({ comment }: Props) {
  //creates the actual comment card for every comment received.
  // it uses the Props interface to enforce comment blueprint we wrote in index.ts

  const avatarUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(comment.name)}&background=F3F4F6&color=333&rounded=true`;
  // this line is designed to obtain avater pfps for the user's initials.
  // it takes an attribute for the commenter's name and formats it into a URL to obtain
  // the proper initials with the desired colours from the ui-avatars.com API

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Image source={{ uri: avatarUrl }} style={styles.avatar} />
        <Text style={styles.userName}>{comment.name}</Text>
      </View>
      <Text style={styles.body}>{comment.body}</Text>
    </View>
  ); //returns the comment card element.
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
