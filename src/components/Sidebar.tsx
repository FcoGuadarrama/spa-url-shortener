import { PlusCircle, List } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SidebarProps {
    activeTab: 'create' | 'list';
    onTabChange: (tab: 'create' | 'list') => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ activeTab, onTabChange }) => {
    return (
        <div className="w-64 border-r bg-card h-screen flex flex-col pt-8">
            <div className="px-6 mb-12 flex items-center gap-2">
                <span className="text-xl font-bold tracking-tighter uppercase">Tech challenge</span>
            </div>

            <nav className="flex-1 px-3 space-y-2">
                <button
                    onClick={() => onTabChange('create')}
                    className={cn(
                        "w-full flex items-center gap-3 px-4 py-3 rounded-md text-sm font-medium transition-colors",
                        activeTab === 'create'
                            ? "bg-primary text-primary-foreground"
                            : "text-muted-foreground hover:bg-muted hover:text-foreground"
                    )}
                >
                    <PlusCircle className="w-4 h-4" />
                    Create Link
                </button>
                <button
                    onClick={() => onTabChange('list')}
                    className={cn(
                        "w-full flex items-center gap-3 px-4 py-3 rounded-md text-sm font-medium transition-colors",
                        activeTab === 'list'
                            ? "bg-primary text-primary-foreground"
                            : "text-muted-foreground hover:bg-muted hover:text-foreground"
                    )}
                >
                    <List className="w-4 h-4" />
                    All Links
                </button>
            </nav>
        </div>
    );
};
