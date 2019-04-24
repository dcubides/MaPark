import { Component, OnInit, ViewChild } from '@angular/core';
import { IonInfiniteScroll, NavController, ToastController, LoadingController } from '@ionic/angular';
import { ServiceAPIService } from 'src/app/services/service-api.service';
import { IParques } from '../Interfaces/iparques';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-list',
  templateUrl: 'list.page.html',
  styleUrls: ['list.page.scss']
})
export class ListPage implements OnInit {

  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;

  inicio: number;
  fin: number;
  dataList: IParques[] = [];
  parques: IParques[] = [];
  errorMessage = '';

  constructor(
    private parqueService: ServiceAPIService,
    private navCtrl: NavController,
    private loadCtrl: LoadingController,
    private toastCtrl: ToastController,
    private storage: Storage
    ) {
    this.inicio = 0;
    this.fin = 40;
  }

  ngOnInit() {
    this.storage.get('userData').then((text: any) => {
      console.log(text);
      if (text != null) {
         // this.LoadParques();
          this.LoadListParks();
      } else {
        this.navCtrl.navigateRoot('login');
      }
    });
  }

  async LoadListParks() {
    const loading = await this.loadCtrl.create({
      message: 'Validando...',
      spinner: 'bubbles'
    });
    loading.present();

    let dataa = await this.parqueService.getParques()
        .then(async (data: any) => {
        loading.dismiss();
        if (data != null) {
            this.parques = data;
            console.log(this.parques);
           } else {
              let toast = await this.toastCtrl.create({
                message: 'No existen parques.',
                duration: 3000,
                position: 'middle'
              });
              toast.present();
           }
        });
    this.cargarDatos();
  }

  cargarDatos() {
    this.dataList = this.parques.slice(this.inicio, this.fin);
   }

  loadData(event) {
    console.log('Done');
    setTimeout(() => {

      this.inicio = this.inicio + 40;
      this.fin = this.fin + 40;
      this.dataList =  this.dataList.concat(this.parques.slice(this.inicio, this.fin));

      event.target.complete();

      if (this.dataList.length >= this.parques.length) {
        event.target.disabled = true;
        this.inicio = 0;
        this.fin = 40;
      }

    }, 500);
  }

}
