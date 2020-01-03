import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild
} from '@angular/core';
import { Pointer } from '../../common/model/color-pointer.model';

@Component({
  selector: 'gradient-control',
  templateUrl: './gradient-control.component.html',
  styleUrls: ['./gradient-control.component.css']
})
export class GradientControlComponent implements OnInit {
  @ViewChild('gradientPointersFieldRef', {static: true}) public gradientPointersField: ElementRef;
  @Output() public onCreatePointerEvent: EventEmitter<number> = new EventEmitter<number>();
  @Output() public onPointerSelectEvent: EventEmitter<Pointer> = new EventEmitter<Pointer>();
  @Output() public onPointerMoveEvent: EventEmitter<number> = new EventEmitter<number>();
  @Output() public gradientPointersFieldWidthEvent: EventEmitter<number> = new EventEmitter<number>();
  @Output() public onPointerRemoveEvent: EventEmitter<number> = new EventEmitter<number>();
  @Input() public pointerArray: Pointer[] = [];
  @Input() public currentPointer: Pointer;
  @Input() public gradientCSSCode: string;

  private canDrag: boolean = false;
  private onDragEventHandler: () => void;
  private onDragEndEventHandler: () => void;

  public ngOnInit(): void {
    this.hangDraggingEvents();
    this.gradientPointersFieldWidthEvent.emit(this.getGradientPointersFieldRefWidth());
  }
  public onCreatePointer(event: MouseEvent): void {
    if (event.target !== this.gradientPointersField.nativeElement) {
      return;
    }

    const offset = event.offsetX;

    this.onCreatePointerEvent.emit(offset);
  }
  public onPointerSelect(pointer: Pointer): void {
    this.onPointerSelectEvent.emit(pointer);
  }
  public onDragStart(event: MouseEvent, selectedPointer: Pointer): void {
    this.onPointerSelect(selectedPointer);
    this.enableDragging();
  }
  public onDrag(event: MouseEvent): void {
    if (!this.canDrag) {
      return;
    }

    if (this.currentPointer.pointerOffset + event.movementX < 0) {
      this.currentPointer.pointerOffset = 0;

      return;
    } else if (this.currentPointer.pointerOffset + event.movementX > this.gradientPointersField.nativeElement.offsetWidth) {
      this.currentPointer.pointerOffset = this.gradientPointersField.nativeElement.offsetWidth;

      return;
    }

    this.onPointerMoveEvent.emit(event.movementX);
  }
  public onDragEnd(event: MouseEvent): void {
    this.disableDragging();
  }
  public onPointerRemove(index: number): void {
    this.onPointerRemoveEvent.emit(index);
  }

  private hangDraggingEvents(): void {
    this.onDragEventHandler = this.onDrag.bind(this);
    this.onDragEndEventHandler = this.onDragEnd.bind(this);
  }
  private enableDragging(): void {
    this.canDrag = true;

    document.body.style.userSelect = 'none';
    document.addEventListener('mousemove', this.onDragEventHandler, true);
    document.addEventListener('mouseup', this.onDragEndEventHandler, true);
  }
  private disableDragging(): void {
    this.canDrag = false;

    document.body.style.userSelect = 'inherit';
    document.removeEventListener('mousemove', this.onDragEventHandler, true);
    document.removeEventListener('mouseup', this.onDragEndEventHandler, true);
  }
  private getGradientPointersFieldRefWidth(): number {
    return this.gradientPointersField.nativeElement.offsetWidth;
  }
}
