import React from 'react';
import type { Url } from '@/types/url';
import { deleteUrl } from '@/api/urls';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Copy, Trash2, ExternalLink, Calendar, ChevronLeft, ChevronRight } from 'lucide-react';
import { toast } from 'sonner';
import { formatDate } from '@/lib/utils';

interface UrlListProps {
    urls: Url[];
    onUrlDeleted: () => void;
    loading: boolean;
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

export const UrlList: React.FC<UrlListProps> = ({
    urls,
    onUrlDeleted,
    loading,
    currentPage,
    totalPages,
    onPageChange
}) => {
    const handleDelete = async (id: number) => {
        try {
            await deleteUrl(id);
            onUrlDeleted();
            toast.success('URL deleted successfully');
        } catch (error) {
            toast.error('Failed to delete URL');
            console.error(error);
        }
    };

    const copyToClipboard = (url: string) => {
        navigator.clipboard.writeText(url);
        toast.success('Copied to clipboard!');
    };

    if (loading) {
        return (
            <div className="w-full space-y-4">
                {[1, 2, 3, 4, 5].map((i) => (
                    <div key={i} className="h-14 w-full animate-pulse bg-muted rounded-none" />
                ))}
            </div>
        );
    }

    if (urls.length === 0) {
        return (
            <div className="text-center py-24 px-6 border bg-card rounded-none">
                <div className="bg-muted w-12 h-12 flex items-center justify-center mx-auto mb-4">
                    <ExternalLink className="w-5 h-5 text-muted-foreground" />
                </div>
                <h3 className="text-sm font-bold uppercase tracking-widest mb-1">No data available</h3>
                <p className="text-xs text-muted-foreground">Your shortened URLs will appear here.</p>
            </div>
        );
    }

    return (
        <div className="space-y-4">
            <div className="border bg-card shadow-none rounded-none overflow-hidden">
                <Table>
                    <TableHeader className="bg-muted/50 border-b">
                        <TableRow>
                            <TableHead className="font-bold text-[10px] uppercase tracking-widest h-10 text-foreground">Original Destination</TableHead>
                            <TableHead className="font-bold text-[10px] uppercase tracking-widest h-10 text-foreground">Shortened URL</TableHead>
                            <TableHead className="font-bold text-[10px] uppercase tracking-widest h-10 text-foreground hidden md:table-cell">Date Created</TableHead>
                            <TableHead className="text-right font-bold text-[10px] uppercase tracking-widest h-10 text-foreground">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {urls.map((url) => (
                            <TableRow key={url.id} className="hover:bg-muted/30 transition-colors border-b last:border-0 h-14">
                                <TableCell className="max-w-[200px] md:max-w-md overflow-hidden">
                                    <p className="truncate text-xs font-medium text-muted-foreground">{url.original_url}</p>
                                </TableCell>
                                <TableCell>
                                    <div className="flex items-center gap-2">
                                        <code className="text-[11px] font-mono px-2 py-1 bg-muted border border-border">
                                            {url.short_url}
                                        </code>
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            className="h-7 w-7 hover:bg-muted rounded-none"
                                            onClick={() => copyToClipboard(url.short_url)}
                                        >
                                            <Copy className="w-3.5 h-3.5" />
                                        </Button>
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            className="h-7 w-7 hover:bg-muted rounded-none"
                                            onClick={() => window.open(url.short_url, '_blank')}
                                        >
                                            <ExternalLink className="w-3.5 h-3.5" />
                                        </Button>
                                    </div>
                                </TableCell>
                                <TableCell className="hidden md:table-cell">
                                    <div className="flex items-center text-[10px] font-bold text-muted-foreground uppercase">
                                        <Calendar className="w-3 h-3 mr-1.5" />
                                        {formatDate(url.created_at)}
                                    </div>
                                </TableCell>
                                <TableCell className="text-right">
                                    <div className="flex items-center justify-end gap-1">
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            className="h-8 w-8 text-muted-foreground hover:text-foreground hover:bg-muted rounded-none"
                                            onClick={() => handleDelete(url.id)}
                                        >
                                            <Trash2 className="w-3.5 h-3.5" />
                                        </Button>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>

            {totalPages > 1 && (
                <div className="flex items-center justify-between px-2">
                    <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
                        Page {currentPage} of {totalPages}
                    </p>
                    <div className="flex items-center gap-2">
                        <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8 rounded-none border-input hover:bg-muted"
                            disabled={currentPage === 1}
                            onClick={() => onPageChange(currentPage - 1)}
                        >
                            <ChevronLeft className="w-4 h-4" />
                        </Button>
                        <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8 rounded-none border-input hover:bg-muted"
                            disabled={currentPage === totalPages}
                            onClick={() => onPageChange(currentPage + 1)}
                        >
                            <ChevronRight className="w-4 h-4" />
                        </Button>
                    </div>
                </div>
            )}
        </div>
    );
};
