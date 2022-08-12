import { Component } from '@angular/core';
import { AuthService } from './shared/services/auth.service';
import { TranslateService } from '@ngx-translate/core';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(
    public authService: AuthService,
    private translateServ: TranslateService
  ) {
    translateServ.setDefaultLang('en');
    translateServ.use('en');
  }
  title = 'Nika Abramishvili';
  onChangeLanguage() {
    console.log();
    if (this.translateServ.currentLang === 'en') {
      this.translateServ.use('ka');
    } else {
      this.translateServ.use('en');
    }
  }
}
