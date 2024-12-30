import React, { useEffect, useState, useContext } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Image,
} from "react-native";
import { ClickCountContext } from "./context/ClickCounterContext";

export default function Home() {
  const { clickCount, setClickCount, userName } = useContext(ClickCountContext);
  const [products, setProducts] = useState<any[]>([]);

  const handleItemClick = () => {
    setClickCount(clickCount + 1);
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(
          "https://www.thesportsdb.com/api/v1/json/3/search_all_leagues.php?c=England"
        );
        const data = await response.json();
        const SelectedItems = data.countries.slice(0, 10);
        setProducts(SelectedItems);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <View style={styles.outerContainer}>
      <View style={styles.titlebar}>
        <Image
          source={require("../assets/images/logo2.png")}
          style={styles.topImage}
        />
        <View style={styles.titleView}>
          <Text style={styles.titlebarText}>Hello {" " + userName}.</Text>
          <Text style={styles.titlebarText}>Welcome to SportsCorner</Text>
        </View>
      </View>

      <FlatList
        data={products}
        keyExtractor={(item) => item.idLeague.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.card} onPress={handleItemClick}>
            <Image source={{ uri: item.strFanart1 }} style={styles.cardImage} />
            <View style={styles.cardContent}>
              <Text style={styles.cardTitle}>{item.strLeague}</Text>
              <Text style={styles.cardDescription}>
                {item.strDescriptionFR}
              </Text>
            </View>
          </TouchableOpacity>
        )}
      />

      <TouchableOpacity style={styles.floatingButton}>
        <Text style={styles.floatingButtonText}>
          Click Counter: {clickCount}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    backgroundColor: "#000",
  },
  topImage: {
    height: 40,
    width: 40,
    marginRight: 20,
  },
  titlebar: {
    padding: 20,
    flexDirection: "row",
    backgroundColor: "#FFA500",
    justifyContent: "center",
    alignItems: "center",
  },
  titlebarText: {
    color: "#000",
    fontSize: 22,
    fontWeight: "500",
  },
  card: {
    margin: 10,
    backgroundColor: "#f9f9f9",
    borderRadius: 8,
    overflow: "hidden",
    elevation: 2,
  },
  titleView: {},
  cardImage: {
    height: 150,
    width: "100%",
  },
  cardContent: {
    padding: 10,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "bold",
  },
  cardDescription: {
    fontSize: 14,
    color: "#555",
  },
  floatingButton: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    height: 60,
    backgroundColor: "#FFA500",
    justifyContent: "center",
    alignItems: "center",
  },
  floatingButtonText: {
    color: "#000",
    fontSize: 20,
  },
});
