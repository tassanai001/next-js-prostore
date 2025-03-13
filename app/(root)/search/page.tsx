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

    // Construct filter url
    const getFilterUrl = ({
        c,
        s,
        p,
        r,
        pg,
    }: {
        c?: string;
        s?: string;
        p?: string;
        r?: string;
        pg?: string;
    }) => {
        const params = { q, category, price, rating, sort, page };
        if (c) params.category = c;
        if (p) params.price = p;
        if (r) params.rating = r;
        if (pg) params.page = pg;
        if (s) params.sort = s;
        return `/search?${new URLSearchParams(params).toString()}`;
    };

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
            <div className='filter-links'>
                URL: {getFilterUrl({ c: "Men's Dress Shirts" })}
            </div>
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