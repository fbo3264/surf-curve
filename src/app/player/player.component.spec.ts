import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Player } from './player';

describe('PlayerComponent', () => {
  let component: Player;
  let fixture: ComponentFixture<Player>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Player ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Player);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
