import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ErabiltzaileakIkusiPage } from './erabiltzaileak-ikusi.page';

describe('ErabiltzaileakIkusiPage', () => {
  let component: ErabiltzaileakIkusiPage;
  let fixture: ComponentFixture<ErabiltzaileakIkusiPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ErabiltzaileakIkusiPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ErabiltzaileakIkusiPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
