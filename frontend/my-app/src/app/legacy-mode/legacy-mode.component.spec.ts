import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LegacyModeComponent } from './legacy-mode.component';

describe('LegacyModeComponent', () => {
  let component: LegacyModeComponent;
  let fixture: ComponentFixture<LegacyModeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LegacyModeComponent]
    });
    fixture = TestBed.createComponent(LegacyModeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
