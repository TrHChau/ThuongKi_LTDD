import React, { useEffect, useState, useCallback } from "react";
import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  FlatList,
  Alert,
  Switch,
  RefreshControl,
} from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import MovieCard, { Movie } from "./components/MovieCard";

const API_URL = "https://6abba0d7b2118ed7abb91771.mockapi.io/Movies";

export default function App() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [isGrid, setIsGrid] = useState<boolean>(false);

  const [refreshing, setRefreshing] = useState<boolean>(false);

  const fetchMovies = async () => {
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      setMovies(data);
    } catch (error) {
      console.error("Lỗi tải API:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await fetchMovies();
    setRefreshing(false);
  }, []);

  const handleSelectMovie = (id: string) => {
    const selectedMovie = movies.find((m) => String(m.id) === String(id));
    if (selectedMovie) {
      Alert.alert("Thông tin phim", `Bạn đã chọn phim: ${selectedMovie.title}`);
    }
  };

  const numColumns = isGrid ? 2 : 1;

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Movie App</Text>
          <View style={styles.switchContainer}>
            <Text style={styles.switchLabel}>Dạng lưới</Text>
            <Switch
              value={isGrid}
              onValueChange={(value) => setIsGrid(value)}
              trackColor={{ false: "#767577", true: "#81b0ff" }}
              thumbColor={isGrid ? "#ffffff" : "#f4f3f4"}
            />
          </View>
        </View>

        <View style={styles.content}>
          {loading ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color="#e50914" />
              <Text style={{ marginTop: 8 }}>Đang tải danh sách phim...</Text>
            </View>
          ) : (
            <FlatList
              key={`flatlist-${numColumns}`}
              data={movies}
              numColumns={numColumns}
              renderItem={({ item }) => (
                <MovieCard
                  movie={item}
                  layout={isGrid ? "tile" : "row"}
                  onSelect={handleSelectMovie}
                />
              )}
              keyExtractor={(item) => String(item.id)}
              columnWrapperStyle={isGrid ? styles.columnWrapper : undefined}
              contentContainerStyle={styles.listContent}
              // a. Thêm thuộc tính refreshControl vào FlatList
              refreshControl={
                <RefreshControl
                  refreshing={refreshing}
                  onRefresh={onRefresh}
                  colors={["#e50914"]}
                  tintColor="#e50914"
                />
              }
            />
          )}
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: "#f99da2",
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
  },
  switchContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  switchLabel: {
    color: "#fff",
    marginRight: 8,
    fontSize: 14,
    fontWeight: "500",
  },
  content: {
    flex: 1,
  },
  listContent: {
    padding: 8,
  },
  columnWrapper: {
    justifyContent: "space-between",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
