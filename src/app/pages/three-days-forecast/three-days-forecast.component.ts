import { Component, OnInit, OnDestroy } from "@angular/core";
import { Router } from "@angular/router";
import { map } from "rxjs/operators";
import * as moment from "moment";

import { WeatherService } from "../../shared/services/weather.service";

@Component({
  selector: "app-three-days-forecast",
  templateUrl: "./three-days-forecast.component.html",
  styleUrls: ["./three-days-forecast.component.scss"]
})
export class ThreeDaysForecastComponent implements OnInit, OnDestroy {
  public navigation = {
    top: "/weather/tomorrow",
    right: "/calendar",
    bottom: "/weather/today",
    left: "/"
  };

  public weather$ = this.weatherService.getWeather().pipe(
    map(weather => {
      weather = weather.list.slice(2, 5);
      for (let i = 0; i < weather.length; i++) {
        weather[i].weekday = moment.unix(weather[i].dt).weekday();
      }

      return weather;
    })
  );

  constructor(private weatherService: WeatherService, private router: Router) {}

  ngOnInit() {}

  ngOnDestroy() {}

  getWeekday(dayNumber) {
    switch (dayNumber) {
      case 0:
        return "Pon";
      case 1:
        return "Wt";
      case 2:
        return "Śr";
      case 3:
        return "Czw";
      case 4:
        return "Pt";
      case 5:
        return "Sob";
      case 6:
        return "Nd";
    }
  }

  onSwipeLeft() {
    if (this.navigation.right) this.router.navigate([this.navigation.right]);
  }

  onSwipeRight() {
    if (this.navigation.left) this.router.navigate([this.navigation.left]);
  }

  onSwipeUp() {
    if (this.navigation.bottom) this.router.navigate([this.navigation.bottom]);
  }

  onSwipeDown() {
    if (this.navigation.top) this.router.navigate([this.navigation.top]);
  }
}