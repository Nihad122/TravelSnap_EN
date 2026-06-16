import * as FileSystem from 'expo-file-system/legacy';

export async function ensureTripFolder(
  tripId: string
): Promise<string> {
  const folderPath =
    `${FileSystem.documentDirectory}trips/${tripId}/`;

  const info = await FileSystem.getInfoAsync(folderPath);

  if (!info.exists) {
    await FileSystem.makeDirectoryAsync(folderPath, {
      intermediates: true,
    });
  }
  return folderPath;
}

export async function saveImageToTrip(
  uri: string,
  tripId: string
): Promise<string> {
  const folder = await ensureTripFolder(tripId);

  const fileName =
    `${Date.now()}-${uri.split("/").pop()}`;

  const newPath = folder + fileName;

  await FileSystem.copyAsync({
    from: uri,
    to: newPath,
  });
  return newPath;
}

export async function deleteImage(
  uri: string
): Promise<void> {
  const info = await FileSystem.getInfoAsync(uri);

  if (info.exists) {
    await FileSystem.deleteAsync(uri);
  }
}