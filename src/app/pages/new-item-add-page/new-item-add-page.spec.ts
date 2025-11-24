import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewItemAddPage } from './new-item-add-page';

describe('NewItemAddPage', () => {
  let component: NewItemAddPage;
  let fixture: ComponentFixture<NewItemAddPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NewItemAddPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewItemAddPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
