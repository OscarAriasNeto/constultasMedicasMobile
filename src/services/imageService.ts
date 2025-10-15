import * as ImagePicker from 'expo-image-picker';
import { storageService, STORAGE_KEYS } from './storage';
import { dinoPatient } from '../utils/assetHelper';

export interface ImageResult {
  uri: string;
  base64?: string;
  width: number;
  height: number;
  fileSize?: number;
}

export const imageService = {
  // Solicita permissões necessárias
  async requestPermissions(): Promise<boolean> {
    try {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        alert('Desculpe, precisamos de permissão para acessar a galeria de fotos!');
        return false;
      }
      return true;
    } catch (error) {
      console.error('Erro ao solicitar permissões:', error);
      return false;
    }
  },

  async takePhoto(): Promise<ImageResult | null> {
    try {
      const cameraPermission = await ImagePicker.requestCameraPermissionsAsync();
      if (cameraPermission.status !== 'granted') {
        alert('Precisamos de acesso à câmera para tirar uma foto.');
        return null;
      }

      const result = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8,
        base64: true,
      });

      if (result.canceled) {
        return null;
      }

      const asset = result.assets?.[0];
      if (!asset) {
        return null;
      }

      return {
        uri: asset.uri,
        base64: asset.base64 ?? undefined,
        width: asset.width,
        height: asset.height,
        fileSize: asset.fileSize,
      };
    } catch (error) {
      console.error('Erro ao capturar foto:', error);
      return null;
    }
  },

  // Abre a galeria para seleção de imagem
  async pickImageFromGallery(): Promise<ImageResult | null> {
    try {
      const hasPermission = await this.requestPermissions();
      if (!hasPermission) return null;

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1], // Aspecto quadrado para foto de perfil
        quality: 0.8,
        base64: true, // Necessário para armazenamento local
      });

      if (result.canceled) {
        return null;
      }

      const asset = result.assets?.[0];
      if (!asset) {
        return null;
      }

      return {
        uri: asset.uri,
        base64: asset.base64 ?? undefined,
        width: asset.width,
        height: asset.height,
        fileSize: asset.fileSize,
      };
    } catch (error) {
      console.error('Erro ao selecionar imagem:', error);
      return null;
    }
  },

  // Salva a imagem localmente com base no tipo de usuário
  async saveProfileImage(userId: string, image: ImageResult): Promise<string> {
    try {
      const imageKey = `${STORAGE_KEYS.PROFILE_IMAGE}:${userId}`;
      const imageData = JSON.stringify(image);

      await storageService.setItem(imageKey, imageData);

      const indexKey = STORAGE_KEYS.PROFILE_IMAGE_INDEX;
      const userImages = (await storageService.getItem<string[]>(indexKey)) || [];

      if (!userImages.includes(userId)) {
        userImages.unshift(userId);
        await storageService.setItem(indexKey, userImages);
      }

      return image.base64 ? `data:image/jpeg;base64,${image.base64}` : image.uri;
    } catch (error) {
      console.error('Erro ao salvar imagem de perfil:', error);
      throw new Error('Não foi possível salvar a imagem de perfil');
    }
  },

  // Obtém a imagem de perfil salva localmente
  async getProfileImage(userId: string): Promise<ImageResult | null> {
    try {
      const imageKey = `${STORAGE_KEYS.PROFILE_IMAGE}:${userId}`;
      const imageData = await storageService.getItem<string>(imageKey);

      if (!imageData) return null;

      return JSON.parse(imageData);
    } catch (error) {
      console.error('Erro ao obter imagem de perfil:', error);
      return null;
    }
  },

  async getUserProfileImage(userId: string): Promise<string | null> {
    const storedImage = await this.getProfileImage(userId);
    if (!storedImage) {
      return null;
    }

    return storedImage.base64
      ? `data:image/jpeg;base64,${storedImage.base64}`
      : storedImage.uri;
  },

  // Remove uma imagem de perfil salva
  async removeProfileImage(userId: string): Promise<void> {
    try {
      const imageKey = `${STORAGE_KEYS.PROFILE_IMAGE}:${userId}`;
      await storageService.removeItem(imageKey);

      const indexKey = STORAGE_KEYS.PROFILE_IMAGE_INDEX;
      const userImages = (await storageService.getItem<string[]>(indexKey)) || [];
      const updatedImages = userImages.filter((id) => id !== userId);
      await storageService.setItem(indexKey, updatedImages);
    } catch (error) {
      console.error('Erro ao remover imagem de perfil:', error);
      throw new Error('Não foi possível remover a imagem de perfil');
    }
  },

  // Limpa imagens antigas para evitar uso excessivo de armazenamento
  async cleanupOldImages(currentUserId?: string): Promise<void> {
    try {
      const indexKey = STORAGE_KEYS.PROFILE_IMAGE_INDEX;
      const userImages = (await storageService.getItem<string[]>(indexKey)) || [];

      if (userImages.length <= 5) {
        return;
      }

      const imagesToRemove = userImages.slice(5).filter((id) => id !== currentUserId);

      for (const imageId of imagesToRemove) {
        const imageKey = `${STORAGE_KEYS.PROFILE_IMAGE}:${imageId}`;
        await storageService.removeItem(imageKey);
      }

      // Atualiza o índice
      const updatedImages = userImages.slice(0, 5);
      await storageService.setItem(indexKey, updatedImages);
    } catch (error) {
      console.error('Erro ao limpar imagens antigas:', error);
    }
  },

  // Valida se uma URI de imagem é válida
  validateImageUri(uri: string): boolean {
    if (!uri) return false;

    // Verifica se é uma URI de dados base64 ou uma URI local válida
    return (
      uri.startsWith('data:image/') ||
      uri.startsWith('file://') ||
      uri.startsWith('content://') ||
      uri.startsWith('https://')
    );
  },

  // Gera uma URI placeholder caso não tenha imagem
  getPlaceholderImage(): string {
    return dinoPatient;
  },
};
