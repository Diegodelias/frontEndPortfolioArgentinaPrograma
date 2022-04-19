import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfSkillsComponent } from './prof-skills.component';

describe('ProfSkillsComponent', () => {
  let component: ProfSkillsComponent;
  let fixture: ComponentFixture<ProfSkillsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfSkillsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfSkillsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
