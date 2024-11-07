import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductDetailComponent } from './product-detail.component';
import { signal } from '@angular/core';
import { of } from 'rxjs';
import { ProductMockBuilder } from '../../../../../shared/mocks/product-mock';
import { CartStore } from '../../../../../core/store/cart.store';
import { ProductsService } from '../../shared/service/products.service';
import { CartStoreBuilder } from '../../../../../shared/mocks/cart-mock';

describe('ProductDetailComponent', () => {
  let component: ProductDetailComponent;
  let fixture: ComponentFixture<ProductDetailComponent>;
  const PRODUCT_ID = 5;

  const addToCartMock = jasmine.createSpy('addToCart');
  const productServiceMock = jasmine.createSpyObj('ProductsService',['getProduct']);
  const productMock = new ProductMockBuilder().withId(PRODUCT_ID).build();
  productServiceMock.getProduct = jasmine.createSpy('getProduct').and.returnValue(of(productMock))

  const cartStoreMock = new CartStoreBuilder()
    .withAddToCart(addToCartMock)
    .build();

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProductDetailComponent],
      providers:[
        {provide: CartStore, useValue: cartStoreMock},
        {provide: ProductsService, useValue:productServiceMock}
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductDetailComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('productId',PRODUCT_ID);
    fixture.detectChanges();
  });

  it('should get the product with ID '+ PRODUCT_ID, () => {
    const compiled = fixture.nativeElement as HTMLElement;
    
    expect(compiled.querySelector('#product-detail-id')?.textContent).toEqual(PRODUCT_ID.toString());
  });

  it('should call action who add a new product to store', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    compiled.querySelector('#product-detail-add-to-cart')?.dispatchEvent(new Event('click'))

    expect(addToCartMock).toHaveBeenCalled();
  });
});
