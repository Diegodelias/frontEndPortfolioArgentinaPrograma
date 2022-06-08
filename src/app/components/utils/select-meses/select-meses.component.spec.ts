import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectMesesComponent } from './select-meses.component';

describe('SelectMesesComponent', () => {
  let component: SelectMesesComponent;
  let fixture: ComponentFixture<SelectMesesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectMesesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectMesesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
