import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ErabiltzaileakEditatuPage } from './erabiltzaileak-editatu.page';

describe('ErabiltzaileakEditatuPage', () => {
  let component: ErabiltzaileakEditatuPage;
  let fixture: ComponentFixture<ErabiltzaileakEditatuPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ErabiltzaileakEditatuPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ErabiltzaileakEditatuPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
