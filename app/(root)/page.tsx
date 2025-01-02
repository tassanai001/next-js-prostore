import ProductList from '@/components/shared/product/product-list';
import sampleData from '@/sample-data/db/sample-data'

export const metadata = {
  title: "Home",
  description: "A modern e-commerce platform built with Next.js",
};

const HomePage = () => {
  return (
    <div className='space-y-8'>
      <h2 className='h2-bold'>Latest Products</h2>
      <ProductList title='Newest Arrivals' data={sampleData.products} limit={4} />
    </div>
  );
}

export default HomePage;