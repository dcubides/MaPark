import { Injectable } from '@angular/core';
import { RequestOptions, Headers } from '@angular/http';
import { Events, ToastController } from '@ionic/angular';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { UserInterface } from 'src/app/Interfaces/user-interface';
import { promise } from 'protractor';
import { environment } from '@environments/environment';
import { resolve } from 'dns';


@Injectable({
  providedIn: 'root'
})
export class ServiceAPIService {

user: {
  Nombre: string,
  Correo: string
};
private urlService = `${environment.urlDominio}/`; //url del servicio esta enviroments
//private urlService = 'https://apigeolocalizacion.azurewebsites.net/';
//private urlService = 'http://localhost:64289/';
//private urlService = 'http://192.168.1.8:64289/';

//api/geoparques

  constructor(
    private http: HttpClient,
    private event: Events,
    private toastCtrl: ToastController
  ) { }

login(user) {
const urlService1 = this.urlService + 'api/GEOUsuarios/' + user.Correo + '/' + user.Clave;

return new Promise(resolve => {
  return this.http.get(urlService1)
    .subscribe(
      data => {
        resolve(data);
      }, err => {
        if (err.status === 0 || err.status === 400) {
          resolve(err.status);
        } else {
          resolve(null);
        }
      });
});
}

getParques() {
  const urlService1 = this.urlService + 'api/GEOParques';

  return new Promise(resolve => {
    return this.http.get(urlService1)
    .subscribe(
      data => {
        resolve(data);
      }, err => {
        if (err.status === 0 || err.status === 400) {
          resolve(err.status);
        } else {
          resolve(null);
        }
      }
    );
  });
}

getParquesById(Id) {
  const urlService1 = this.urlService + 'api/GEOParques/' + Id;

  return new Promise(resolve => {
    return this.http.get(urlService1)
    .subscribe(
      data => {
        resolve(data);
      }, err => {
        if (err.status === 0 || err.status === 400) {
          resolve(err.status);
        } else {
          resolve(null);
        }
      }
    );
  });
}

getElementosById(Id) {
  const urlService1 = this.urlService + 'api/GEOElementos/' + Id;

  return new Promise(resolve => {
    return this.http.get(urlService1)
    .subscribe(
      data => {
        resolve(data);
      }, err => {
        if (err.status === 0 || err.status === 400) {
          resolve(err.status);
        } else {
          resolve(null);
        }
      }
    );
  });
}

getElementos() {
  const urlService1 = this.urlService + 'api/GEOElementos/';

  return new Promise(resolve => {
    return this.http.get(urlService1)
    .subscribe(
      data => {
        resolve(data);
      }, err => {
        if (err.status === 0 || err.status === 400) {
          resolve(err.status);
        } else {
          resolve(null);
        }
      }
    );
  });
}

addElementos(coordenadas) {
  console.log(coordenadas);
  const urlService1 = this.urlService + 'api/GEOCoordenadas/';

  return new Promise(resolve => {
    return this.http.post(urlService1, coordenadas)
    .subscribe(
      data => {
        resolve(data);
      }, err => {
        if (err.status === 0 || err.status === 400) {
          resolve(err.status);
        } else {
          resolve(null);
        }
      }
    );
  });
}


addInventario(inventario) {
  const urlService1 = this.urlService + 'api/geoinventarios/';

  return new Promise(resolve => {
    return this.http.post(urlService1, inventario)
    .subscribe(
      data => {
        resolve(data);
      }, err => {
        if (err.status === 0 || err.status === 400) {
          resolve(err.status);
        } else {
          resolve(null);
        }
      }
    );
  });
}

getInventarioId(idparque, idelemento) {
  const urlService1 = this.urlService + 'api/geoinventarios/' + idparque + '/' + idelemento;

  return new Promise(resolve => {
    return this.http.get(urlService1)
      .subscribe(
        data => {
          resolve(data);
        }, err => {
          if (err.status === 0 || err.status === 400) {
            resolve(err.status);
          } else {
            resolve(null);
          }
        });
  });
  }

  getCoordenadaElemento(idInventario) {
    const urlService1 = this.urlService + 'api/geocoordenadas/' + idInventario;
  
    return new Promise(resolve => {
      return this.http.get(urlService1)
        .subscribe(
          data => {
            resolve(data);
          }, err => {
            if (err.status === 0 || err.status === 400) {
              resolve(err.status);
            } else {
              resolve(null);
            }
          });
    });
    }

}
