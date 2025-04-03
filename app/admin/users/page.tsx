import { auth } from '@/auth';
import Pagination from '@/components/shared/pagination';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { getAllUsers, deleteUser } from '@/lib/actions/user.actions';
import { formatId } from '@/lib/utils';
import { Metadata } from 'next';
import Link from 'next/link';
import DeleteDialog from '@/components/shared/delete-dialog';
import { requireAdmin } from '@/lib/auth-guard';

export const metadata: Metadata = {
    title: 'Admin Users',
};

const AdminUserPage = async (props: {
    searchParams: Promise<{ page: string; query: string }>;
}) => {
    await requireAdmin();
    const searchParams = await props.searchParams;

    const { page = '1', query: searchText } = searchParams;

    const session = await auth();
    if (session?.user.role !== 'admin')
        throw new Error('admin permission required');

    const users = await getAllUsers({ page: Number(page), query: searchText });

    return (
        <div className='space-y-2'>
            <h1 className='h2-bold'>Users</h1>
            {searchText && (
                <div>
                    Filtered by <i>&quot;{searchText}&quot;</i>{' '}
                    <Link href={`/admin/users`}>
                        <Button variant='outline' size='sm'>
                            Remove Filter
                        </Button>
                    </Link>
                </div>
            )}
            <div>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>ID</TableHead>
                            <TableHead>NAME</TableHead>
                            <TableHead>EMAIL</TableHead>
                            <TableHead>ROLE</TableHead>
                            <TableHead>ACTIONS</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {users?.data.map((user) => (
                            <TableRow key={user.id}>
                                <TableCell>{formatId(user.id)}</TableCell>
                                <TableCell>{user.name}</TableCell>
                                <TableCell>{user.email}</TableCell>
                                <TableCell>
                                    {user.role === 'admin' ? (
                                        <Badge variant='default'>Admin</Badge>
                                    ) : (
                                        <Badge variant='secondary'>User</Badge>
                                    )}
                                </TableCell>
                                <TableCell className='flex gap-1'>
                                    <Button asChild variant='outline' size='sm'>
                                        <Link href={`/admin/users/${user.id}`}>Edit</Link>
                                    </Button>
                                    <DeleteDialog id={user.id} action={deleteUser} />
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                {users?.totalPages && users.totalPages > 1 && (
                    <Pagination page={page} totalPages={users.totalPages} />
                )}
            </div>
        </div>
    );
};

export default AdminUserPage;