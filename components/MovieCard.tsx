import React from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Ionicons from "@expo/vector-icons/Ionicons";
import Fontisto from "@expo/vector-icons/Fontisto";

export interface Movie {
  id: string;
  title: string;
  genre?: string;
  year?: number;
  rating: number;
  poster: string;
  isShowing: boolean;
}

export interface MovieCardProps {
  movie: Movie;
  layout?: "row" | "tile";
  onSelect: (id: string) => void;
}

const MovieCard: React.FC<MovieCardProps> = ({
  movie,
  layout = "row",
  onSelect,
}) => {
  const isTile = layout === "tile";

  return (
    <TouchableOpacity
      style={[styles.card, isTile && styles.cardTile]}
      onPress={() => onSelect(movie.id)}
      activeOpacity={0.8}
    >
      <View
        style={[styles.posterContainer, isTile && styles.posterContainerTile]}
      >
        <Image
          source={{ uri: movie.poster }}
          style={[styles.poster, isTile && styles.posterTile]}
          resizeMode="cover"
        />

        {isTile && (
          <View style={styles.ratingBadge}>
            <Text style={styles.ratingBadgeText}>
              <Fontisto name="star" size={15} color="yellow" /> {movie.rating}
            </Text>
          </View>
        )}
      </View>

      <View style={[styles.info, isTile && styles.infoTile]}>
        <Text
          style={[styles.title, isTile && styles.titleTile]}
          numberOfLines={isTile ? 1 : 2}
        >
          {movie.title}
        </Text>

        {!isTile && (
          <Text style={styles.subText}>
            {movie.genre || "N/A"} • {movie.year || "N/A"}
          </Text>
        )}

        {!isTile && (
          <Text style={styles.ratingRow}>
            ⭐ {Number(movie.rating).toFixed(1)}
          </Text>
        )}

        <Text style={styles.status}>
          {movie.isShowing ? (
            <Text style={styles.showing}>
              <MaterialIcons name="done" size={20} color="green" /> Đang chiếu
            </Text>
          ) : (
            <Text style={styles.stopped}>
              <Ionicons name="close" size={20} color="red" /> Ngừng chiếu
            </Text>
          )}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default React.memo(MovieCard);

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    backgroundColor: "#ffffff",
    borderRadius: 8,
    padding: 10,
    marginBottom: 12,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },

  cardTile: {
    flexDirection: "column",
    width: "48%",
    marginBottom: 12,
    padding: 8,
  },
  posterContainer: {
    position: "relative",
  },
  posterContainerTile: {
    width: "100%",
  },

  poster: {
    width: 70,
    height: 100,
    borderRadius: 6,
    backgroundColor: "#eee",
  },

  posterTile: {
    width: "100%",
    height: undefined,
    aspectRatio: 2 / 3,
  },

  ratingBadge: {
    position: "absolute",
    top: 6,
    right: 6,
    backgroundColor: "rgba(0, 0, 0, 0.75)",
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  ratingBadgeText: {
    color: "#ffca28",
    fontSize: 12,
    fontWeight: "bold",
  },

  info: {
    flex: 1,
    marginLeft: 12,
    justifyContent: "space-between",
  },
  infoTile: {
    marginLeft: 0,
    marginTop: 8,
  },

  title: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#222",
  },
  titleTile: {
    fontSize: 14,
  },
  subText: {
    fontSize: 13,
    color: "#666",
    marginVertical: 2,
  },
  ratingRow: {
    fontSize: 14,
    color: "#f39c12",
    fontWeight: "600",
  },
  status: {
    fontSize: 12,
    marginTop: 4,
  },
  showing: {
    color: "#2e7d32",
    fontWeight: "bold",
  },
  stopped: {
    color: "#c62828",
    fontWeight: "bold",
  },
});
