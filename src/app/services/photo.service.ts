import { Injectable } from '@angular/core';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { Filesystem, Directory } from '@capacitor/filesystem';
import { Preferences } from '@capacitor/preferences';
import { ServiceApIsService, TogetherServiceGenerateData } from './generated';

export interface UserPhoto {
  filepath: string;
  webviewPath?: string;
}


@Injectable({
  providedIn: 'root'
})
export class PhotoService {

  constructor() { }
  public photo?: UserPhoto;
  private PHOTO_STORAGE: string = 'photo';
  public audioURL: any;

  public async addNewToGallery() {
    const capturedPhoto = await Camera.getPhoto({
      resultType: CameraResultType.Uri,
      source: CameraSource.Camera,
      quality: 100
    });
    this.photo = { filepath: "soon...", webviewPath: capturedPhoto.webPath! }
    const audioURL = await this.savePicture(this.photo);
    Preferences.set({
      key: this.PHOTO_STORAGE,
      value: JSON.stringify(this.photo),
    });
   return audioURL 
  }

  getWAVFile(blob: Blob) {
    this.audioURL = URL.createObjectURL(blob)
    return this.audioURL
  }







  private async savePicture(photo: UserPhoto) {
    // Convert photo to base64 format, required by Filesystem API to save
    const base64Data = await this.readAsBase64(photo);
    const blob = await this.getBlob(photo)

    const togetherServiceData: TogetherServiceGenerateData = {
      formData: {
        img: blob,
        txt: ""
      }
    };
    const response = await ServiceApIsService.togetherServiceGenerate(togetherServiceData)
    console.log("neue response" + response)
    let wavMusic = this.getWAVFile(response)
    const fileName = Date.now() + '.jpeg';
    const savedFile = await Filesystem.writeFile({
      path: fileName,
      data: base64Data,
      directory: Directory.Data
    });
    return wavMusic
  }
  private async readAsBase64(photo: UserPhoto) {
    // Fetch the photo, read as a blob, then convert to base64 format
    const response = await fetch(photo.webviewPath!);
    const blob = await response.blob();

    return await this.convertBlobToBase64(blob) as string;
  }
  private async getBlob(photo: UserPhoto) {
    const response = await fetch(photo.webviewPath!);
    return await response.blob();
  }

  private convertBlobToBase64 = (blob: Blob) => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = reject;
    reader.onload = () => {
      resolve(reader.result);
    };
    reader.readAsDataURL(blob);
  });

  async take_and_upload_image() {
    let audioWAVURL = await this.addNewToGallery();
    return audioWAVURL
  }




}
