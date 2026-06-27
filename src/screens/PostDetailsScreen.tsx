import React, { useEffect, useState } from "react";
import {
  View,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  Text,
} from "react-native";
import { Comment, RootStackParamList } from "../types/index";
import { api } from "../services/api";
import PostCard from "../components/PostCard";
import CommentCard from "../components/CommentCard";

type PostDetailsRouteProp = {
  params: RootStackParamList["PostDetails"];
};

interface Props {
  route: PostDetailsRouteProp;
}

export default function PostDetailsScreen({ route }: Props) {
  const { post } = route.params;
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const data = await api.getCommentsByPost(post.id);
        setComments(data);
      } catch (error) {
        console.error("Error fetching comments:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchComments();
  }, [post.id]);

  return (
    <View style={styles.container}>
      <FlatList
        data={comments}
        keyExtractor={(item) => item.id.toString()}
        ListHeaderComponent={() => (
          <>
            <PostCard post={post} isDetail={true} />
            <Text style={styles.commentsHeader}>
              Comments ({comments.length})
            </Text>
            {loading && (
              <ActivityIndicator
                size="small"
                color="#0D8ABC"
                style={styles.loader}
              />
            )}
          </>
        )}
        renderItem={({ item }) => <CommentCard comment={item} />}
        ListEmptyComponent={() =>
          !loading ? (
            <Text style={styles.emptyText}>No comments yet.</Text>
          ) : null
        }
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  commentsHeader: {
    fontSize: 18,
    fontWeight: "bold",
    marginHorizontal: 16,
    marginTop: 20,
    marginBottom: 10,
    color: "#111827",
  },
  loader: {
    marginTop: 20,
  },
  emptyText: {
    textAlign: "center",
    color: "#6B7280",
    marginTop: 20,
  },
  listContainer: {
    paddingBottom: 30,
  },
});
