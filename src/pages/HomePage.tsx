import React, { useEffect, useState } from 'react';
import type { Url, PaginatedResponse } from '@/types/url';
import { getUrls } from '@/api/urls';
import { UrlForm } from '@/components/UrlForm';
import { UrlList } from '@/components/UrlList';
import { Toaster } from '@/components/ui/sonner';
import { Sidebar } from '@/components/Sidebar';

const HomePage: React.FC = () => {
    const [urls, setUrls] = useState<Url[]>([]);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState<'create' | 'list'>('create');
    const [currentPage, setCurrentPage] = useState(1);
    const [pagination, setPagination] = useState<PaginatedResponse<Url>['meta'] | null>(null);

    const fetchUrls = async (page: number = 1) => {
        setLoading(true);
        try {
            const response = await getUrls(page);
            if (response && response.data) {
                setUrls(response.data);
                setPagination(response.meta);
                setCurrentPage(response.meta.current_page);
            }
        } catch (error) {
            console.error('Failed to fetch URLs', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUrls(currentPage);
    }, [currentPage]);

    const handleTabChange = (tab: 'create' | 'list') => {
        setActiveTab(tab);
        if (tab === 'list') {
            fetchUrls(currentPage);
        }
    }

    return (
        <div className="flex min-h-screen bg-background text-foreground overflow-hidden">
            <Sidebar activeTab={activeTab} onTabChange={handleTabChange} />

            <main className="flex-1 h-screen overflow-y-auto">
                <div className="h-full flex flex-col">
                    <header className="h-16 border-b flex items-center px-8 bg-card">
                        <h1 className="text-sm font-bold uppercase tracking-widest">
                            {activeTab === 'create' ? 'Link Creation' : 'Shortened Links'}
                        </h1>
                    </header>

                    <div className="flex-1 p-8">
                        <div className="max-w-5xl mx-auto h-full">
                            {activeTab === 'create' ? (
                                <div className="h-full flex items-center justify-center">
                                    <UrlForm onUrlCreated={fetchUrls} />
                                </div>
                            ) : (
                                <section className="space-y-6">
                                    <div className="flex items-center justify-between border-b pb-4">
                                        <h2 className="text-xl font-bold">Manage Links</h2>
                                        <span className="text-xs font-bold bg-muted px-2 py-1 rounded">
                                            {pagination?.total || 0} TOTAL
                                        </span>
                                    </div>
                                    <UrlList
                                        urls={urls}
                                        onUrlDeleted={() => fetchUrls(currentPage)}
                                        loading={loading}
                                        currentPage={currentPage}
                                        totalPages={pagination?.last_page || 1}
                                        onPageChange={setCurrentPage}
                                    />
                                </section>
                            )}
                        </div>
                    </div>
                </div>
            </main>

            <Toaster position="bottom-right" richColors={false} />
        </div>
    );
};

export default HomePage;
