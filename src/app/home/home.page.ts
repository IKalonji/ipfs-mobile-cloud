import { Component } from '@angular/core';
import { LoadingController, ToastController } from '@ionic/angular';
// import { create } from "ipfs-http-client"
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(private loading: LoadingController,
    private toast: ToastController) {}

  slidesOptions = {
    slidesPerView: 1
  }

  files = ['Issa.pdf', 'CV_doc.word', 'Jumpman.mp3']

  upload(){
    document.getElementById('fileupload').click()
  }

  receivedfile(file:any){
    this.files.push(file.target.files[0].name)
    console.log(file.target.files[0].name)
    this.download('File uploading...', 'File successfully uploaded.')
    this.uploadFile(file.target.files[0])
  }

  async download(loadingText: string, toastText: string){
    let showDownload = await this.loading.create(
      {
        message: loadingText,
        duration: 4000
      }
    );

    await showDownload.present();

    setTimeout(async ()=>{
      let toast = await this.toast.create(
        {
          message: toastText,
          duration: 2000
        }
      );
  
      await toast.present()
    }, 4500)
  }

  getClient(): any {
    // @ts-ignore
    return create(`${environment.ipfs}:5001/api/v0`)
  }

  public async uploadFile(data: any): Promise<string> {
    let url = ''
    const client = this.getClient()

    try {
      const added = await client.add(data)
      url = `${environment.ipfs}/ipfs/${added.path}`
    } catch (error) {
      console.log(error)
    }

    return url
  }

}
