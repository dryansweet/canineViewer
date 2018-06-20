import { Injectable, Inject } from "@angular/core";
import { Http, Response } from "@angular/http";
import { errorHandler } from "@angular/platform-browser/src/browser";

@Injectable({
  providedIn: "root"
})
export class DataService {
  constructor(public http: Http) {}
  public test() {
    return "A'llo Darlin";
  }

  public getListofDogs() {
    return new Promise(resolve => {
      this.http
        .get("https://dog.ceo/api/breeds/list/all")
        .subscribe(res => resolve(res.json().message), err => console.log(err));
    });
  }

  //returns 1 image path of requested dog
  public fetchPic(dog?: string) {
      console.log(dog)
    return new Promise(resolve => {
      if (!dog) {
        this.http
          .get("https://dog.ceo/api/breeds/image/random")
          .subscribe(
            res => resolve(res.json().message),
            err => {
                resolve({"err": "Ooops something went wrong....Please verify that you are able to visit 'https://dog.ceo/dog-api/documentation/breed'"})
                this.errorHandler(err)
            }
          );
      } else {
        let request = "https://dog.ceo/api/breed/" + dog + "/images";
        this.http
          .get(request)
          .subscribe(res => {
             console.log(res.json().message.length)
             let max = res.json().message.length
             let num = Math.floor(Math.random()*(max-1)+0)
             resolve(res.json().message[num])
          }, err => console.log(err));
      }
    });
  }

  errorHandler(err){
      // This is would be an ideal spot to run an analytics and gracefully handle failures. 
      // My best guess as to why you're seeing this is that 
      // 1) the OpenAPI is down 
      // 2) Your internet filter isn't allowing it or 
      // 3) You're not connected to the internet
      console.log(err) 
  }
}
