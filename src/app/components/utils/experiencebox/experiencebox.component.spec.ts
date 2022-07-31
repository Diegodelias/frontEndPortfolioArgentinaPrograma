import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExperienceboxComponent } from './experiencebox.component';

describe('ExperienceboxComponent', () => {
  let component: ExperienceboxComponent;
  let fixture: ComponentFixture<ExperienceboxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExperienceboxComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExperienceboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
