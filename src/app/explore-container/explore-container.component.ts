import { Component, Input } from '@angular/core';
import { PhotoService } from '../services/photo.service';
import { Storage } from '@ionic/storage-angular';
import { Media, MediaObject } from '@awesome-cordova-plugins/media/ngx';
import { File } from '@awesome-cordova-plugins/file/ngx';
import { LoadingController } from '@ionic/angular';
import { Platform } from '@ionic/angular';
@Component({
  selector: 'app-explore-container',
  templateUrl: './explore-container.component.html',
  styleUrls: ['./explore-container.component.scss'],
})
export class ExploreContainerComponent {

  constructor(public platform: Platform, public photoService: PhotoService, private storage: Storage, private media: Media, private file: File, private loadingCtrl: LoadingController) { }

  @Input() name?: string;
  public music: boolean = true;

  async ngOnInit() {
    await this.storage.create();
  }

  async take_picture() {
    const loading = await this.loadingCtrl.create({
      message: 'Generiere Musik'});
    try {
    await loading.present();
    const audioWAVURL: any = await this.photoService.take_and_upload_image()
    this.music = audioWAVURL;
    await loading.dismiss();} catch (error) {
    loading.dismiss();
 
  }}

  playSound() {
      let path = this.file.externalApplicationStorageDirectory;
      let filepath = `${path}/myfile.mp3`;
      let file: MediaObject = this.media.create(filepath);
      file.play();
  }

}
