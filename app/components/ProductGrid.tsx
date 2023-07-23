import {GoTypography} from 'react-icons/go';
import {GoArrowRight} from 'react-icons/go';
import {RxFrame} from 'react-icons/rx';
import {HiOutlineSparkles} from 'react-icons/hi';
import {useEffect} from 'react';

import {ProductCard, Section, useDrawer} from '~/components';
import type {HomepageFeaturedProductsQuery} from 'storefrontapi.generated';
import {useCartFetchers} from '~/hooks/useCartFetchers';

import {Logo} from './Logo';
import {CartCount, CartDrawer} from './Layout';

const mockProducts = {
  nodes: new Array(12).fill(''),
};

type ProductGridProps = HomepageFeaturedProductsQuery & {
  title?: string;
  count?: number;
};

export function ProductGrid({
  title = 'Featured Products',
  products = mockProducts,
  count = 12,
  ...props
}: ProductGridProps) {
  const {
    isOpen: isCartOpen,
    openDrawer: openCart,
    closeDrawer: closeCart,
  } = useDrawer();

  const addToCartFetchers = useCartFetchers('ADD_TO_CART');

  // toggle cart drawer when adding to cart
  useEffect(() => {
    if (isCartOpen || !addToCartFetchers.length) return;
    openCart();
  }, [addToCartFetchers, isCartOpen, openCart]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 p-12 gap-6 grid-flow-row-dense">
      <div className="flex flex-col justify-between">
        <div>
          <Logo />
          <div className="flex items-center space-x-2 text-primary/50 -mt-2">
            <GoTypography />
            <GoArrowRight />
            <RxFrame />
          </div>

          <div className="leading-[150%] font-normal">
            <p className="mt-10">You prompt,</p>
            <p>
              <i>It imagines,</i>
            </p>
            <p>We deliver, Worldwide.</p>
          </div>
        </div>
        <div className="flex items-center w-full space-x-2">
          <p className="italic text-primary/50">hand curated biweekly</p>
          <div className="flex-grow-[1] h-[1px] bg-primary/25"></div>
          <CartDrawer isOpen={isCartOpen} onClose={closeCart} />
          <CartCount isHome openCart={openCart} />
        </div>
      </div>
      {products.nodes.map((product) => (
        <ProductCard product={product} key={product.id} />
      ))}
    </div>
  );
}
