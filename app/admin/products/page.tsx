import Link from 'next/link';
import { getAllProducts } from '@/lib/actions/product.action';
import { formatCurrency, formatId } from '@/lib/utils';

const AdminProductsPage = async (props: {
    searchParams: Promise<{
        page: string;
        query: string;
        category: string;
    }>;
}) => {
    const searchParams = await props.searchParams;

    const page = Number(searchParams.page) || 1;
    const searchText = searchParams.query || '';
    const category = searchParams.category || '';

    const products = await getAllProducts({
        query: searchText,
        page,
        category,
    });

    return (
        <div className='space-y-2'>
            <div className='flex-between'>
                <h1 className='h2-bold'>Products</h1>
            </div>
        </div>
    );
};

export default AdminProductsPage;