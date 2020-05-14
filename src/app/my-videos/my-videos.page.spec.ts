import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MyVideosPage } from './my-videos.page';

describe('MyVideosPage', () => {
  let component: MyVideosPage;
  let fixture: ComponentFixture<MyVideosPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyVideosPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MyVideosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
