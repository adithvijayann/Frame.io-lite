import React, { useRef, useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet } from "react-native";
import { Video } from "expo-av";
import AsyncStorage from "@react-native-async-storage/async-storage";
import DrawingOverlay from "./components/DrawingOverlay";

export default function VideoScreen() {
  const videoRef = useRef<Video>(null);
  const [status, setStatus] = useState<any>({});
  const [comments, setComments] = useState<any[]>([]);
  const [input, setInput] = useState("");
  const [isDrawing, setIsDrawing] = useState(false);
  const [selectedColor, setSelectedColor] = useState("black");

  
  useEffect(() => {
    (async () => {
      const saved = await AsyncStorage.getItem("comments");
      if (saved) setComments(JSON.parse(saved));
    })();
  }, []);

  
  useEffect(() => {
    AsyncStorage.setItem("comments", JSON.stringify(comments));
  }, [comments]);

  const handleAddComment = () => {
    if (!input.trim()) return;
    setComments((prev) => [
      ...prev,
      { text: input, time: status.positionMillis / 1000 },
    ]);
    setInput("");
  };

  const formatTime = (sec: number) => {
    const m = Math.floor(sec / 60);
    const s = Math.floor(sec % 60);
    return `${m}:${s.toString().padStart(2, "0")}`;
  };

  const seekTo = (time: number) => {
    videoRef.current?.setPositionAsync(time * 1000);
  };

  return (
    <View style={styles.container}>
      <View>
        <Video
          ref={videoRef}
          style={styles.video}
          source={{ uri: "https://www.w3schools.com/html/mov_bbb.mp4" }}
          useNativeControls
          resizeMode="contain"
          onPlaybackStatusUpdate={(s) => setStatus(s)}
        />
        <DrawingOverlay enabled={isDrawing} selectedColor={selectedColor} />
      </View>

      {/* Comments */}
      <FlatList
        data={comments}
        keyExtractor={(_, i) => i.toString()}
        renderItem={({ item }) => (
          <View style={styles.commentRow}>
            <TouchableOpacity onPress={() => seekTo(item.time)}>
              <Text style={styles.timestamp}> {formatTime(item.time)} </Text>
            </TouchableOpacity>
            <Text style={styles.commentText}>{item.text}</Text>
          </View>
        )}
        style={styles.commentList}
      />

      {/* Comment bar */}
      <View style={styles.commentBar}>
        <Text style={styles.timestamp}>
          {status.positionMillis ? formatTime(status.positionMillis / 1000) : "0:00"}
        </Text>

        {/* Toggle drawing */}
        <TouchableOpacity onPress={() => setIsDrawing((prev) => !prev)} style={styles.iconButton}>
          <Text style={{ fontSize: 18 }}>✏️</Text>
        </TouchableOpacity>

        {/* Show colors only when drawing */}
        {isDrawing && (
          <View style={styles.colorRow}>
            {["black", "red", "blue", "green", "yellow"].map((c) => (
              <TouchableOpacity
                key={c}
                onPress={() => setSelectedColor(c)}
                style={[
                  styles.colorDot,
                  { backgroundColor: c, borderWidth: selectedColor === c ? 2 : 0 },
                ]}
              />
            ))}
          </View>
        )}

        <TextInput
          style={styles.input}
          placeholder="Write your comment here"
          value={input}
          onChangeText={setInput}
        />

        <TouchableOpacity onPress={handleAddComment} style={styles.commentBtn}>
          <Text style={{ color: "white" }}>Comment</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "white" },
  video: { width: "100%", height: 220, backgroundColor: "black" },
  commentList: { flex: 1, padding: 10 },
  commentRow: { flexDirection: "row", alignItems: "center", marginBottom: 8 },
  timestamp: { color: "green", fontWeight: "600", marginRight: 6 },
  commentText: { fontSize: 15 },
  commentBar: {
    flexDirection: "row",
    alignItems: "center",
    padding: 8,
    borderTopWidth: 1,
    borderColor: "#ddd",
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 6,
    paddingHorizontal: 8,
    marginHorizontal: 6,
  },
  commentBtn: {
    backgroundColor: "brown",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 6,
  },
  iconButton: { marginHorizontal: 6 },
  colorRow: { flexDirection: "row", marginRight: 6 },
  colorDot: {
    width: 20,
    height: 20,
    borderRadius: 10,
    marginHorizontal: 2,
  },
});
