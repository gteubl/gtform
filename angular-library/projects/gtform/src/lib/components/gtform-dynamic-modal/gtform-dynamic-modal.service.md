DemoModalComponent

```typescript
export class DemoModalComponent implements OnInit {

  public data: { message: string } | undefined;

  public constructor(private modalService: GtformDynamicModalService) {
  }

  public ngOnInit(): void {
    this.data = this.modalService.config.data;
  }

  public close(): void {
    this.modalService.close(this, { message: 'Hello from child' });
  }

}
```

ParentComponent

```typescript
export class DemoParentComponent {

  public constructor(private modalService: GtformDynamicModalService) {
  }

  public showModal(): void {
    const ref = this.modalService.open(DemoModalComponent, {
      title: 'Dynamic Modal',
      style: { ...ModalSizes.large },
      data: { message: 'Hello from parent' }
    });

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ref.closed.subscribe((result: any) => {
      console.log('Modal closed with result:', result);
    });
  }
}

```
