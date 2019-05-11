import { Component, OnInit, Input, OnChanges, SimpleChanges } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { LocationService } from "../location/location.service";
import { ThemeService } from "../../services/theme.service";
import { distinctUntilChanged, tap, filter } from "rxjs/operators";
import { AudioService } from "../../services/audio.service";

@Component({
  selector: "app-device-notification",
  templateUrl: "./device-notification.component.html",
  styleUrls: ["./device-notification.component.scss"]
})
export class DeviceNotificationComponent implements OnInit, OnChanges {
  @Input("res")
  deviceResult;

  @Input() boundary;
  alarmKey: string = "alarm";
  boundary$: BehaviorSubject<boolean> = new BehaviorSubject(null);

  constructor(private mapService: LocationService, private themeService: ThemeService, private audioService: AudioService) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes["deviceResult"] && changes["deviceResult"].currentValue) {
      this.checkBoundary(changes["deviceResult"].currentValue);
    }
  }

  ngOnInit() {
    this.audioService.preload(this.alarmKey, "/assets/alarm.mp3");
    this.boundary$
      .pipe(
        filter(x=>!this.audioService.isMuted$.value),
        tap(x => {
          if (x != null) {
            if (x) this.audioService.stop(this.alarmKey);
            else this.audioService.play(this.alarmKey);
          }
        })
      )
      .subscribe();
  }

  // credits to user:69083 for this specific function
  arePointsNear(checkPoint, centerPoint, km) {
    var ky = 40000 / 360;
    var kx = Math.cos((Math.PI * centerPoint.lat) / 180.0) * ky;
    var dx = Math.abs(centerPoint.lng - checkPoint.lng) * kx;
    var dy = Math.abs(centerPoint.lat - checkPoint.lat) * ky;
    return Math.sqrt(dx * dx + dy * dy) <= km;
  }
  checkBoundary(result: any) {
    if (this.boundary) {
      if (result.lattitude && result.longitude) {
        let res = this.arePointsNear(
          { lat: +result.lattitude, lng: +result.longitude },
          JSON.parse(this.boundary.latLng),
          this.boundary.radius / 1000
        );
        this.boundary$.next(res);
      }
    } else {
      this.boundary$.next(null);
    }
  }

  onTracking() {
    if (this.deviceResult && this.deviceResult.lattitude && this.deviceResult.longitude) {
      let latLng = {
        lat: +this.deviceResult.lattitude,
        lng: +this.deviceResult.longitude
      };
      this.mapService.openModal({ enableSelection: false, marker: latLng });
    } else {
      this.themeService.alert("Missing Location Info", "Please check if the location is properly configured for the patient.");
    }
  }
}
