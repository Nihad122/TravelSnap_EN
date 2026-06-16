import { Colors } from '@/constants/Colors';
import { useTrips } from '@/contexts/TripContext';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { Stack, useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import { Alert, Dimensions, FlatList, Image, Modal, Pressable, StyleSheet, Text, View, } from 'react-native';

const SIZE = (Dimensions.get('window').width - 16) / 3;

export default function GalleryScreen() {
    const { id } = useLocalSearchParams<{ id: string }>();
    const { trips, addGalleryImage } = useTrips();

    const trip = trips.find((t) => t.id === id);

    const [selectedUri, setSelectedUri] = useState<string | null>(null);

    if (!trip) {
        return (
        <View style={styles.center}>
            <Text style={styles.emptyText}>Trip not found</Text>
        </View>
        );
    }

    const galleryUris = trip.galleryUris ?? [];

    const pickImage = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ['images'],
            allowsEditing: true,
            quality: 0.8,
        });

        if (!result.canceled) {
        addGalleryImage(id, result.assets[0].uri);
        }
    };

    const takePhoto = async () => {
        const permission = await ImagePicker.requestCameraPermissionsAsync();

        if (permission.status !== 'granted') {
        Alert.alert('Permission denied');
        return;
        }

    const result = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        quality: 0.8,
    });

    if (!result.canceled) {
        addGalleryImage(id, result.assets[0].uri);
        }
    };

    return (
        <>
            <Stack.Screen
                options={{
                    title: `${trip.title} — ${galleryUris.length} photos`,
                }}
            />

            <View style={styles.container}>
                {galleryUris.length === 0 ? (
                    <View style={styles.emptyContainer}>
                        <Ionicons
                        name="images-outline"
                        size={72}
                        color={Colors.textSecondary}
                        />
                        <Text style={styles.emptyText}>
                            No photos yet — add your first!
                        </Text>
                    </View>
                ) : (
                    <FlatList
                        data={galleryUris}
                        keyExtractor={(item, index) => item + index}
                        numColumns={3}
                        renderItem={({ item }) => (
                            <Pressable onPress={() => setSelectedUri(item)}>
                                <Image source={{ uri: item }} style={styles.thumbnail} />
                            </Pressable>
                        )}
                    />
                )}

                {}
                <Pressable
                style={styles.fab}
                onPress={() =>
                    Alert.alert('Add photo', 'Choose source', [
                        { text: 'Camera', onPress: takePhoto },
                        { text: 'Gallery', onPress: pickImage },
                        { text: 'Cancel', style: 'cancel' },
                    ])
                }
                >
                    <Ionicons name="camera" size={24} color="black" />
                </Pressable>

                {}
                <Modal visible={!!selectedUri} animationType="fade">
                    <View style={styles.modalContainer}>
                        {selectedUri && (
                            <Image
                            source={{ uri: selectedUri }}
                            style={styles.fullImage}
                            resizeMode="contain"
                            />
                        )}

                        <Pressable
                        style={styles.closeButton}
                        onPress={() => setSelectedUri(null)}
                        >
                        <Ionicons name="close" size={32} color="white" />
                        </Pressable>
                    </View>
                </Modal>
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.background,
        padding: 4,
    },

    center: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.background,
    },

    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },

    emptyText: {
        color: Colors.textSecondary,
        marginTop: 12,
        fontSize: 16,
    },

    thumbnail: {
        width: SIZE,
        height: SIZE,
        margin: 2,
    },

    modalContainer: {
        flex: 1,
        backgroundColor: 'black',
        justifyContent: 'center',
    },

    fullImage: {
        flex: 1,
        width: '100%',
    },

    closeButton: {
        position: 'absolute',
        top: 50,
        right: 20,
    },

    fab: {
        position: 'absolute',
        bottom: 20,
        right: 20,
        width: 56,
        height: 56,
        borderRadius: 28,
        backgroundColor: '#61DAFB',
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 6,
    },
});