'use client';

import { useEffect, useState } from 'react';
import { Container } from '@/components/Container';
import { Section } from '@/components/Section';

interface Signup {
    id: string;
    name: string;
    email: string;
    company: string | null;
    role: string;
    use_case: string;
    created_at: string;
}

export default function AdminPage() {
    const [signups, setSignups] = useState<Signup[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [sortBy, setSortBy] = useState<'created_at' | 'email' | 'name'>('created_at');
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

    useEffect(() => {
        fetchSignups();
    }, []);

    const fetchSignups = async () => {
        try {
            setLoading(true);
            const response = await fetch('/api/admin/signups');
            if (!response.ok) {
                throw new Error('Failed to fetch signups');
            }
            const data = await response.json();
            setSignups(data);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to load signups');
        } finally {
            setLoading(false);
        }
    };

    const exportToCSV = () => {
        const headers = ['Name', 'Email', 'Company', 'Role', 'Use Case', 'Signed Up'];
        const rows = filteredSignups.map((signup) => [
            signup.name,
            signup.email,
            signup.company || '',
            signup.role,
            signup.use_case,
            new Date(signup.created_at).toLocaleDateString()
        ]);

        const csvContent = [
            headers.join(','),
            ...rows.map((row) => row.map((cell) => `"${cell}"`).join(','))
        ].join('\n');

        const blob = new Blob([csvContent], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `hyrelog-signups-${new Date().toISOString().split('T')[0]}.csv`;
        a.click();
        window.URL.revokeObjectURL(url);
    };

    const filteredSignups = signups
        .filter((signup) => {
            const search = searchTerm.toLowerCase();
            return (
                signup.name.toLowerCase().includes(search) ||
                signup.email.toLowerCase().includes(search) ||
                (signup.company && signup.company.toLowerCase().includes(search)) ||
                signup.role.toLowerCase().includes(search)
            );
        })
        .sort((a, b) => {
            let aVal: string | number = a[sortBy];
            let bVal: string | number = b[sortBy];

            if (sortBy === 'created_at') {
                aVal = new Date(a.created_at).getTime();
                bVal = new Date(b.created_at).getTime();
            } else {
                aVal = String(aVal).toLowerCase();
                bVal = String(bVal).toLowerCase();
            }

            if (sortOrder === 'asc') {
                return aVal > bVal ? 1 : -1;
            } else {
                return aVal < bVal ? 1 : -1;
            }
        });

    const stats = {
        total: signups.length,
        withCompany: signups.filter((s) => s.company).length,
        recent: signups.filter(
            (s) => new Date(s.created_at) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
        ).length
    };

    if (loading) {
        return (
            <Section>
                <Container>
                    <div className="mx-auto max-w-6xl text-center">
                        <p className="text-gray-600 dark:text-gray-400">Loading signups...</p>
                    </div>
                </Container>
            </Section>
        );
    }

    if (error) {
        return (
            <Section>
                <Container>
                    <div className="mx-auto max-w-6xl">
                        <div className="rounded-lg border border-red-200 bg-red-50 p-6 dark:border-red-800 dark:bg-red-900/20">
                            <p className="text-red-800 dark:text-red-200">Error: {error}</p>
                        </div>
                    </div>
                </Container>
            </Section>
        );
    }

    return (
        <Section>
            <Container>
                <div className="mx-auto max-w-6xl">
                    <div className="mb-8">
                        <h1 className="mb-4 text-4xl font-bold text-gray-900 dark:text-white">
                            Early Access Signups
                        </h1>
                        <p className="text-gray-600 dark:text-gray-400">
                            Manage and view all early access requests
                        </p>
                    </div>

                    {/* Stats */}
                    <div className="mb-6 grid gap-4 sm:grid-cols-3">
                        <div className="rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-900">
                            <div className="text-3xl font-bold text-gray-900 dark:text-white">
                                {stats.total}
                            </div>
                            <div className="text-sm text-gray-600 dark:text-gray-400">
                                Total Signups
                            </div>
                        </div>
                        <div className="rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-900">
                            <div className="text-3xl font-bold text-gray-900 dark:text-white">
                                {stats.recent}
                            </div>
                            <div className="text-sm text-gray-600 dark:text-gray-400">
                                Last 7 Days
                            </div>
                        </div>
                        <div className="rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-900">
                            <div className="text-3xl font-bold text-gray-900 dark:text-white">
                                {stats.withCompany}
                            </div>
                            <div className="text-sm text-gray-600 dark:text-gray-400">
                                With Company
                            </div>
                        </div>
                    </div>

                    {/* Controls */}
                    <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                        <div className="flex-1">
                            <input
                                type="text"
                                placeholder="Search by name, email, company, or role..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm focus:border-gray-900 focus:outline-none focus:ring-1 focus:ring-gray-900 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:focus:border-gray-500"
                            />
                        </div>
                        <div className="flex gap-2">
                            <select
                                value={sortBy}
                                onChange={(e) =>
                                    setSortBy(e.target.value as 'created_at' | 'email' | 'name')
                                }
                                className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm focus:border-gray-900 focus:outline-none focus:ring-1 focus:ring-gray-900 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:focus:border-gray-500"
                            >
                                <option value="created_at">Sort by Date</option>
                                <option value="email">Sort by Email</option>
                                <option value="name">Sort by Name</option>
                            </select>
                            <button
                                onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
                                className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm transition-colors hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
                            >
                                {sortOrder === 'asc' ? '↑' : '↓'}
                            </button>
                            <button
                                onClick={exportToCSV}
                                className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium transition-colors hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
                            >
                                Export CSV
                            </button>
                        </div>
                    </div>

                    {/* Table */}
                    <div className="overflow-x-auto rounded-lg border border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900">
                        <table className="w-full">
                            <thead className="border-b border-gray-200 bg-gray-50 dark:border-gray-800 dark:bg-gray-800">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-700 dark:text-gray-300">
                                        Name
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-700 dark:text-gray-300">
                                        Email
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-700 dark:text-gray-300">
                                        Company
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-700 dark:text-gray-300">
                                        Role
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-700 dark:text-gray-300">
                                        Use Case
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-700 dark:text-gray-300">
                                        Signed Up
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
                                {filteredSignups.length === 0 ? (
                                    <tr>
                                        <td
                                            colSpan={6}
                                            className="px-6 py-8 text-center text-sm text-gray-500 dark:text-gray-400"
                                        >
                                            {searchTerm
                                                ? 'No signups match your search'
                                                : 'No signups yet'}
                                        </td>
                                    </tr>
                                ) : (
                                    filteredSignups.map((signup) => (
                                        <tr
                                            key={signup.id}
                                            className="transition-colors hover:bg-gray-50 dark:hover:bg-gray-800"
                                        >
                                            <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900 dark:text-white">
                                                {signup.name}
                                            </td>
                                            <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-600 dark:text-gray-400">
                                                <a
                                                    href={`mailto:${signup.email}`}
                                                    className="hover:text-gray-900 dark:hover:text-gray-100"
                                                >
                                                    {signup.email}
                                                </a>
                                            </td>
                                            <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-600 dark:text-gray-400">
                                                {signup.company || '-'}
                                            </td>
                                            <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-600 dark:text-gray-400">
                                                {signup.role}
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">
                                                <div className="max-w-xs truncate" title={signup.use_case}>
                                                    {signup.use_case}
                                                </div>
                                            </td>
                                            <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-600 dark:text-gray-400">
                                                {new Date(signup.created_at).toLocaleDateString('en-AU', {
                                                    year: 'numeric',
                                                    month: 'short',
                                                    day: 'numeric',
                                                    hour: '2-digit',
                                                    minute: '2-digit'
                                                })}
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>

                    <div className="mt-4 text-sm text-gray-600 dark:text-gray-400">
                        Showing {filteredSignups.length} of {signups.length} signups
                    </div>
                </div>
            </Container>
        </Section>
    );
}

