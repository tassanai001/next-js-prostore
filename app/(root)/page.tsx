import ProductList from '@/components/shared/product/product-list';
import { getLatestProducts } from '@/lib/actions/product.action';
import { LATEST_PRODUCTS_LIMIT } from "@/lib/constants";

export const metadata = {
  title: "Home",
  description: "A modern e-commerce platform built with Next.js",
};

const HomePage = async () => {
  const latestProducts = await getLatestProducts();

  // Transform the products to match the expected Product type
  const transformedProducts = latestProducts.map((product) => ({
    ...product,
    price: product.price.toString(),
    rating: product.rating.toString(),
  }));

  return (
    <div className='space-y-8'>
      <h2 className='h2-bold'>Latest Products</h2>
      <ProductList title='Newest Arrivals' data={transformedProducts} limit={LATEST_PRODUCTS_LIMIT} />
    </div>
  );
}

export default HomePage;