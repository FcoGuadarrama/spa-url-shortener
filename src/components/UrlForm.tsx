import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { createUrl } from '@/api/urls';
import { Link2, Copy, Check, Loader2 } from 'lucide-react';
import { toast } from 'sonner';

interface UrlFormProps {
    onUrlCreated: () => void;
}

export const UrlForm: React.FC<UrlFormProps> = ({ onUrlCreated }) => {
    const [url, setUrl] = useState('');
    const [loading, setLoading] = useState(false);
    const [createdUrl, setCreatedUrl] = useState<string | null>(null);
    const [copied, setCopied] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!url) return;

        setLoading(true);
        try {
            const response = await createUrl(url);
            setCreatedUrl(response.short_url);
            setUrl('');
            onUrlCreated();
            toast.success('URL shortened successfully!');
        } catch (error) {
            toast.error('Failed to shorten URL. Please try again.');
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const copyToClipboard = () => {
        if (!createdUrl) return;
        navigator.clipboard.writeText(createdUrl);
        setCopied(true);
        toast.success('Copied to clipboard!');
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <Card className="w-full max-w-xl mx-auto border shadow-none bg-card rounded-none">
            <CardHeader className="pb-8">
                <CardTitle className="text-xl font-bold tracking-tight uppercase">
                    New Short Link
                </CardTitle>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                        <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                            Destination URL
                        </label>
                        <div className="relative">
                            <Link2 className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                            <Input
                                type="url"
                                placeholder="https://example.com/property-listing"
                                value={url}
                                onChange={(e) => setUrl(e.target.value)}
                                className="pl-10 h-11 border-input bg-background focus-visible:ring-1 focus-visible:ring-primary ring-offset-0 rounded-none"
                                required
                            />
                        </div>
                    </div>
                    <Button
                        type="submit"
                        disabled={loading}
                        className="w-full h-11 font-bold uppercase tracking-widest bg-primary text-primary-foreground hover:bg-primary/90 rounded-none shadow-none"
                    >
                        {loading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
                        Create Link
                    </Button>
                </form>

                {createdUrl && (
                    <div className="mt-12 p-6 border bg-muted/30 rounded-none flex items-center justify-between animate-in fade-in duration-500">
                        <div className="overflow-hidden">
                            <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-1">Success! Your link is ready</p>
                            <p className="text-sm font-mono truncate">{createdUrl}</p>
                        </div>
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={copyToClipboard}
                            className="shrink-0 ml-4 hover:bg-background rounded-none"
                        >
                            {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                        </Button>
                    </div>
                )}
            </CardContent>
        </Card>
    );
};
