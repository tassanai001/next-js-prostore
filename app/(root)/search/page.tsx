import Pagination from '@/components/shared/pagination';
import ProductCard from '@/components/shared/product/product-card';
import { getAllProducts } from '@/lib/actions/product.action';

const SearchPage = async (props: {
    searchParams: Promise<{
        q?: string;
        category?: string;
        price?: string;
        rating?: string;
        sort?: string;
        page?: string;
    }>;
}) => {
    const {
        q = 'all',
        category = 'all',
        price = 'all',
        rating = 'all',
        sort = 'newest',
        page = '1',
    } = await props.searchParams;

    console.log(q, category, price, rating, sort, page);

    // Get products
    const products = await getAllProducts({
        category,
        query: q,
        price,
        rating,
        page: Number(page),
        sort,
    });

    return (
        <div className='grid md:grid-cols-5 md:gap-5'>
            <div className='filter-links'>{/* FILTERS */}</div>
            <div className='md:col-span-4 space-y-4'>
                <div className='grid grid-cols-1 gap-4 md:grid-cols-3'>
                    {products!.data.length === 0 && <div>No product found</div>}
                    {products!.data.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
                {products!.totalPages! > 1 && (
                    <Pagination page={page} totalPages={products!.totalPages} />
                )}
            </div>
        </div>
    );
};

export default SearchPage;