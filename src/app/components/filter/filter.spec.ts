import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Filter } from './filter';
import { Component, EventEmitter } from '@angular/core';

describe('Filter Component', () => {
  let component: Filter;
  let fixture: ComponentFixture<Filter>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Filter]
    }).compileComponents();

    fixture = TestBed.createComponent(Filter);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the Filter component', () => {
    expect(component).toBeTruthy();
  });

  it('should emit furnished check value', () => {
    spyOn(component.onFurnishedCheck, 'emit');
    const event = { target: { checked: true } } as unknown as Event;
    component.furnished(event);
    expect(component.onFurnishedCheck.emit).toHaveBeenCalledWith(true);
  });

  it('should emit shared as true', () => {
    spyOn(component.onSharedCheck, 'emit');
    const event = {} as Event;
    component.shared(event);
    expect(component.onSharedCheck.emit).toHaveBeenCalledWith(true);
  });

  it('should emit negotiable check value', () => {
    spyOn(component.onNegotiableCheck, 'emit');
    const event = { target: { checked: false } } as unknown as Event;
    component.negotiable(event);
    expect(component.onNegotiableCheck.emit).toHaveBeenCalledWith(false);
  });

  it('should update selected range and emit it', () => {
    spyOn(component.onSelectedRange, 'emit');
    const mockEvent = {
      target: { value: '12000' }
    } as unknown as Event;

    component.range(mockEvent);
    expect(component.selectedRange()).toBe(12000);
    expect(component.onSelectedRange.emit).toHaveBeenCalledWith(12000);
  });
});
