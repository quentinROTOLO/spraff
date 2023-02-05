import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DictionaryDetailsComponent } from './dictionary-details.component';

describe('DictionaryDetailsComponent', () => {
  let component: DictionaryDetailsComponent;
  let fixture: ComponentFixture<DictionaryDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DictionaryDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DictionaryDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
