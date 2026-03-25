import * as MediaLibrary from "expo-media-library";
import React, { useEffect, useState } from "react";
import {
  Dimensions,
  Image,
  Modal,
  SectionList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
  Linking
} from "react-native";

const screenWidth = Dimensions.get("window").width;
const imageSize = screenWidth / 3;

type Photo = {
  id: string;
  uri: string;
  creationTime: number;
};

type PhotoSection = {
  title: string;
  data: Photo[][];
};

export default function Index() {
  const [permissionStatus, setPermissionStatus] = useState<string | null>(null);
  const [groupedPhotos, setGroupedPhotos] = useState<PhotoSection[]>([]);
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);
  const [loading, setLoading] = useState(true);
  const [after, setAfter] = useState<string | null>(null);

  useEffect(() => {
    requestPermission();
  }, []);

  const requestPermission = async () => {
    try {
      const { status } = await MediaLibrary.requestPermissionsAsync();
      setPermissionStatus(status);
    } catch (error) {
      console.log("Erro de permissão:", error);
      setPermissionStatus("denied");
    }
  };

  const loadPhotos = async (loadMore = false) => {
    if (permissionStatus !== "granted") return;

    setLoading(true);

    const media = await MediaLibrary.getAssetsAsync({
      mediaType: MediaLibrary.MediaType.photo,
      first: 50,
      after: loadMore ? after ?? undefined : undefined,
      sortBy: [MediaLibrary.SortBy.creationTime]
    });

    const newPhotos: Photo[] = media.assets.map(asset => ({
      id: asset.id,
      uri: asset.uri,
      creationTime: asset.creationTime
    }));

    setAfter(media.endCursor);

    setGroupedPhotos(prev => {
      const allPhotos = loadMore
        ? [...flattenPhotos(prev), ...newPhotos]
        : newPhotos;

      return groupPhotosByDate(allPhotos);
    });

    setLoading(false);
  };

  useEffect(() => {
    if (permissionStatus === "granted") {
      loadPhotos();
    }
  }, [permissionStatus]);

  const flattenPhotos = (sections: PhotoSection[]) => {
    return sections.flatMap(section =>
      section.data.flatMap(row => row)
    );
  };

  const openPhoto = async (photo: Photo) => {
    const assetInfo = await MediaLibrary.getAssetInfoAsync(photo.id);
    const uri = assetInfo.localUri || assetInfo.uri;

    if (uri) {
      setSelectedPhoto({ ...photo, uri });
    }
  };

  const groupPhotosByDate = (photos: Photo[]) => {
    const groups: Record<string, Photo[]> = {};

    photos.forEach(photo => {
      const date = new Date(photo.creationTime);

      const formattedDate = date.toLocaleDateString("pt-BR", {
        weekday: "short",
        day: "numeric",
        month: "short"
      });

      if (!groups[formattedDate]) {
        groups[formattedDate] = [];
      }

      groups[formattedDate].push(photo);
    });

    return Object.keys(groups)
      .sort((a, b) => {
        return groups[b][0].creationTime - groups[a][0].creationTime;
      })
      .map(date => {
        const rows: Photo[][] = [];

        for (let i = 0; i < groups[date].length; i += 3) {
          rows.push(groups[date].slice(i, i + 3));
        }

        return {
          title: date,
          data: rows
        };
      });
  };

  const selectedDate = selectedPhoto
    ? new Date(selectedPhoto.creationTime).toLocaleString("pt-BR", {
        day: "numeric",
        month: "long",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit"
      })
    : "";

  // 🔥 TELA DE PERMISSÃO CORRIGIDA
  if (permissionStatus !== "granted") {
    return (
      <View style={styles.center}>
        <Text style={{ color: "white", marginBottom: 10 }}>
          Precisamos de acesso à galeria
        </Text>

        <TouchableOpacity onPress={requestPermission}>
          <Text style={{ color: "cyan" }}>
            Tentar novamente
          </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => Linking.openSettings()}>
          <Text style={{ color: "orange", marginTop: 10 }}>
            Abrir configurações
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

  if (loading && groupedPhotos.length === 0) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="white" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <SectionList
        sections={groupedPhotos}
        keyExtractor={(item) => item[0].id}
        showsVerticalScrollIndicator={false}
        onEndReached={() => loadPhotos(true)}
        onEndReachedThreshold={0.5}
        ListFooterComponent={
          loading ? <ActivityIndicator color="white" /> : null
        }
        renderSectionHeader={({ section }) => (
          <Text style={styles.date}>{section.title}</Text>
        )}
        renderItem={({ item }) => (
          <View style={styles.row}>
            {item.map(photo => (
              <TouchableOpacity
                key={photo.id}
                onPress={() => openPhoto(photo)}
              >
                <Image source={{ uri: photo.uri }} style={styles.image} />
              </TouchableOpacity>
            ))}
          </View>
        )}
      />

      <Modal visible={!!selectedPhoto} animationType="fade">
        <View style={styles.viewer}>
          <TouchableOpacity
            style={styles.topBar}
            onPress={() => setSelectedPhoto(null)}
          >
            <Text style={styles.close}>←</Text>
            <Text style={styles.viewerDate}>{selectedDate}</Text>
          </TouchableOpacity>

          {selectedPhoto && (
            <Image
              source={{ uri: selectedPhoto.uri }}
              style={styles.viewerImage}
              resizeMode="contain"
            />
          )}

          <View style={styles.bottomBar}>
            <Text style={styles.button}>Compartilhar</Text>
            <Text style={styles.button}>Editar</Text>
            <Text style={styles.button}>Adicionar</Text>
            <Text style={styles.button}>Lixeira</Text>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#000" },
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
  date: { color: "white", fontSize: 16, padding: 10 },
  row: { flexDirection: "row" },
  image: {
    width: imageSize,
    height: imageSize,
    margin: 1
  },
  viewer: {
    flex: 1,
    backgroundColor: "black",
    justifyContent: "center",
    alignItems: "center"
  },
  viewerImage: {
    width: "100%",
    height: "80%"
  },
  topBar: {
    position: "absolute",
    top: 50,
    left: 15,
    flexDirection: "row",
    alignItems: "center"
  },
  viewerDate: {
    color: "white",
    marginLeft: 10
  },
  close: {
    color: "white",
    fontSize: 28
  },
  bottomBar: {
    position: "absolute",
    bottom: 30,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-around"
  },
  button: {
    color: "white",
    fontSize: 14
  }
});