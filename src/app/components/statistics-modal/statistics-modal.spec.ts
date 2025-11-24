import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatisticsModal } from './statistics-modal';

describe('StatisticsModal', () => {
  let component: StatisticsModal;
  let fixture: ComponentFixture<StatisticsModal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StatisticsModal]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StatisticsModal);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
