import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdditionalModeComponent } from './additional-mode.component';

describe('AdditionalModeComponent', () => {
  let component: AdditionalModeComponent;
  let fixture: ComponentFixture<AdditionalModeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdditionalModeComponent]
    });
    fixture = TestBed.createComponent(AdditionalModeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
