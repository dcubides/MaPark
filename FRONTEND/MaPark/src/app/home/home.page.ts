import { Component, OnInit } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { LoadingController, NavController, AlertController, ToastController, ModalController, Events } from '@ionic/angular';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { ServiceAPIService } from 'src/app/services/service-api.service';
import { IParques } from '../Interfaces/iparques';
import { UserInterface } from '../Interfaces/user-interface';

declare var google;
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  mapRef = null;
  parques: IParques[] = [];
  errorMessage = '';
  userModel: UserInterface[] = [];

  constructor(
    private geolocation: Geolocation,
    private loadCtrl: LoadingController,
    private parqueervice: ServiceAPIService,
    private router: Router,
    private storage: Storage,
    private navCtrl: NavController,
    private toastCtrl: ToastController
  ) {}

  ngOnInit() {
    this.storage.get('userData').then((text: any) => {
      console.log(text);
      if (text != null) {
         // this.LoadParques();
          this.cargarMapa();
      } else {
        this.navCtrl.navigateRoot('login');
      }
    });
  }

  async LoadParques() {
    const loading = await this.loadCtrl.create({
      message: 'Validando...',
      spinner: 'bubbles'
    });
    loading.present();

    let dataa = await this.parqueervice.getParques()
        .then(async (data: any) => {
        loading.dismiss();
        if (data != null) {
            this.parques = data;
            console.log(this.parques);
           } else {
              let toast = await this.toastCtrl.create({
                message: "No existen parques.",
                duration: 3000,
                position: "middle"
              });
              toast.present();
           }
        });
    this.mostrarParques();
  }

  cargarMapa(): void {
    this.loadMap();
  }

  async loadMap() {
    const loading = await this.loadCtrl.create({
      message: 'Validando...',
      spinner: 'bubbles'
    });
    loading.present();

    const myLatLng = await this.dondEestoy();


    const mapEle: HTMLElement = document.getElementById('map');

    this.mapRef = new google.maps.Map(mapEle, {
      center: myLatLng,
      zoom: 12
    });

    const styledMapType = new google.maps.StyledMapType([
      {
        elementType: 'geometry',
        stylers: [
          {
            color: '#1d2c4d'
          }
        ]
      },
      {
        elementType: 'labels.text.fill',
        stylers: [
          {
            color: '#8ec3b9'
          }
        ]
      },
      {
        elementType: 'labels.text.stroke',
        stylers: [
          {
            color: '#1a3646'
          }
        ]
      },
      {
        featureType: 'administrative',
        elementType: 'geometry',
        stylers: [
          {
            visibilit: 'off'
          }
        ]
      },
      {
        featureTyp: 'administrative.country',
        elementType: 'geometry.stroke',
        stylers: [
          {
            color: '#4b6878'
          }
        ]
      },
      {
        featureType: 'administrative.land_parcel',
        elementType: 'labels.text.fill',
        stylers: [
          {
            color: '#64779e'
          }
        ]
      },
      {
        featureType: 'administrative.province',
        elementType: 'geoetry.stroke',
        stylers: [
          {
            color: '#4b6878'
          }
        ]
      },
      {
        featureType: 'landscape.man_made',
        elementType: 'geometry.stroke',
        stylers: [
          {
            color: '#334e87'
          }
        ]
      },
      {
        featureType: 'landscape.natural',
        elementType: 'geometry',
        stylers: [
          {
            color: '#023e58'
          }
        ]
      },
      {
        featureType: 'poi',
        stylers: [
          {
            visibility: 'off'
          }
        ]
      },
      {
        featureType: 'poi',
        elementType: 'geometry',
        stylers: [
          {
            color: '#283d6a'
          }
        ]
      },
      {
        featureType: 'poi',
        elementType: 'labels.text.fill',
        stylers: [
          {
            color: '#6f9ba5'
          }
        ]
      },
      {
        featureType: 'poi',
        elementType: 'labels.text.stroke',
        stylers: [
          {
            color: '#1d2c4d'
          }
        ]
      },
      {
        featureType: 'poi.park',
        elementType: 'geometry.fill',
        stylers: [
          {
            color: '#023e58'
          }
        ]
      },
      {
        featureType: 'poi.park',
        elementType: 'labels.text.fill',
        stylers: [
          {
            color: '#3C7680'
          }
        ]
      },
      {
        featureType: 'road',
        elementType: 'geometry',
        stylers: [
          {
            color: '#304a7d'
          }
        ]
      },
      {
        featureType: 'road',
        elementType: 'labels.icon',
        stylers: [
          {
            visibility: 'off'
          }
        ]
      },
      {
        featureType: 'road',
        elementType: 'labels.text.fill',
        stylers: [
          {
            color: '#98a5be'
          }
        ]
      },
      {
        featureType: 'road',
        elementType: 'labels.text.stroke',
        stylers: [
          {
            color: '#1d2c4d'
          }
        ]
      },
      {
        featureType: 'road.highway',
        elementType: 'geometry',
        stylers: [
          {
            color: '#2c6675'
          }
        ]
      },
      {
        featureType: 'road.highway',
        elementType: 'geometry.stroke',
        stylers: [
          {
            color: '#255763'
          }
        ]
      },
      {
        featureType: 'road.highway',
        elementType: 'labels.text.fill',
        stylers: [
          {
            color: '#b0d5ce'
          }
        ]
      },
      {
        featureType: 'road.highway',
        elementType: 'labels.text.stroke',
        stylers: [
          {
            color: '#023e58'
          }
        ]
      },
      {
        featureType: 'transit',
        stylers: [
          {
            visibility: 'off'
          }
        ]
      },
      {
        featureType: 'transit',
        elementType: 'labels.text.fill',
        stylers: [
          {
            color: '#98a5be'
          }
        ]
      },
      {
        featureType: 'transit',
        elementType: 'labels.text.stroke',
        stylers: [
          {
            color: '#1d2c4d'
          }
        ]
      },
      {
        featureType: 'transit.line',
        elementType: 'geometry.fill',
        stylers: [
          {
            color: '#283d6a'
          }
        ]
      },
      {
        featureType: 'transit.station',
        elementType: 'geometry',
        stylers: [
          {
            color: '#3a4762'
          }
        ]
      },
      {
        featureType: 'water',
        elementType: 'geometry',
        stylers: [
          {
            color: '#0e1626'
          }
        ]
      },
      {
        featureType: 'water',
        elementType: 'labels.text.fill',
        stylers: [
          {
            color: '#4e6d70'
          }
        ]
      }
    ]);

    this.mapRef.mapTypes.set('styled_map', styledMapType);
    this.mapRef.setMapTypeId('styled_map');

    google.maps.event.addListenerOnce(this.mapRef, 'idle', () => {
      this.AddMarker(myLatLng.lat, myLatLng.lng, 'Mi Ubicación', 'info' , 0);
      loading.dismiss();
      });

  }

  private AddMarker(lat: number, lng: number, nombre: string, type: string, id: number ) {
  const iconBase = '../../assets/icon/';

  const icons = {
    parque: {
      icon: iconBase + 'parque.png'
              },
      library: {
        icon: iconBase + 'parque.png'		},
      info: {
          icon: iconBase + 'ubicacion.png'
        }
      };

  const marker = new google.maps.Marker({
  position: {
    lat: lat,
    lng: lng
    },
			// zoom: 8,
    map: this.mapRef,
    title: nombre,
    icon :  icons[type].icon
    });

  const infowindow = new google.maps.InfoWindow({
    content: `
					<div>
						<h4>
							${nombre}${id}
						</h4>
						<a href="park-detail/${id}">Ir al detalle</a>
					</div>
				`
    });

  marker.addListener('click', function() {
  infowindow.open(this.mapRef, marker);
  });

}

private async dondEestoy() {
  const rta = await this.geolocation.getCurrentPosition();

  return {
      lat: rta.coords.latitude,
      lng: rta.coords.longitude
    };
  }

  private mostrarParques() {
    for(let i = 0; i < this.parques.length; i++) {
      this.AddMarker(this.parques[i].coord_y, this.parques[i].coord_x, this.parques[i].nombre_Parque, 'parque' , this.parques[i].id);
      }
  }

   private clearMarkers() {
    this.parques = [];
    this.mostrarParques();
  }


}
