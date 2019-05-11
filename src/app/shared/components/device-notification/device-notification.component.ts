import { Component, OnInit, Input, OnChanges, SimpleChanges } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { LocationService } from "../location/location.service";
import { ThemeService } from "../../services/theme.service";

@Component({
  selector: "app-device-notification",
  templateUrl: "./device-notification.component.html",
  styleUrls: ["./device-notification.component.scss"]
})
export class DeviceNotificationComponent implements OnInit, OnChanges {
  @Input()
  data;

  boundary$: BehaviorSubject<boolean> = new BehaviorSubject(null);

  constructor(private mapService: LocationService, private themeService: ThemeService) {}

  ngOnChanges(changes: SimpleChanges): void {}

  ngOnInit() {}

  // credits to user:69083 for this specific function
  arePointsNear(checkPoint, centerPoint, km) {
    var ky = 40000 / 360;
    var kx = Math.cos((Math.PI * centerPoint.lat) / 180.0) * ky;
    var dx = Math.abs(centerPoint.lng - checkPoint.lng) * kx;
    var dy = Math.abs(centerPoint.lat - checkPoint.lat) * ky;
    return Math.sqrt(dx * dx + dy * dy) <= km;
  }
  checkBoundary(device: any) {
    if (device.Boundary) {
      if (device.Result.lattitude && device.Result.longitude) {
        device.isOk = this.arePointsNear(
          { lat: +device.Result.lattitude, lng: +device.Result.longitude },
          JSON.parse(device.Boundary.latLng),
          device.Boundary.radius / 1000
        );
        this.boundary$.next(device.isOk);
      }
    } else {
      this.boundary$.next(null);
    }
  }

  onTracking(device: any) {
    console.log(device);
    if (device.Result && device.Result.lattitude && device.Result.longitude) {
      let latLng = {
        lat: +device.Result.lattitude,
        lng: +device.Result.longitude
      };
      this.mapService.openModal({ enableSelection: false, marker: latLng });
    } else {
      this.themeService.alert("Missing Location Info", "Please check if the location is properly configured for the patient.");
    }
  }
}
