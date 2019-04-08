import { Directive, NgZone, HostListener, Output, EventEmitter, Input, OnInit, ElementRef, Renderer2 } from "@angular/core";
import { ModalController } from "@ionic/angular";
import { LocationModalComponent } from "./location-modal.component";
import { LocationService } from "./location.service";
import { NgxConfig } from "ngx-map";

@Directive({
  selector: "[appLocation]"
})
export class LocationDirective implements OnInit {
  @Input("appLocation") marker;
  @Input("enableSelection") enableSelection;
  @Input("disableOnClickTrigger") disableOnClickTrigger: boolean = false;

  @Output("onSelect")
  onLocation: EventEmitter<string> = new EventEmitter();

  constructor(private service: LocationService, private element: ElementRef, private renderer: Renderer2) {}

  ngOnInit(): void {
    console.log("Location directive oninit");
    if (!this.disableOnClickTrigger) {
      this.renderer.listen(this.element.nativeElement, "click", this.openMap.bind(this));
    }
  }

  openMap() {
    let props: NgxConfig = {};
    if (this.marker) {
      try {
        let marker = JSON.parse(this.marker);
        if (marker.lat && marker.lng) {
          props = {
            ...props,
            marker: marker
          };
        }
      } catch (e) {}
    }
    if (this.enableSelection) {
      props = {
        ...props,
        enableSelection: this.enableSelection
      };
    }
    this.service.openModal(props).then(modal => {
      modal.onWillDismiss().then(res => {
        if (res.data) {
          this.onLocation.emit(res.data);
        }
      });
    });
  }
}
