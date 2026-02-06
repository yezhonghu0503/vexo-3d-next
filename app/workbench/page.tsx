'use client';

import { useState } from 'react';
import Header from '@/components/Header';
import ModelCard from '@/components/ModelCard';
import { 
  Plus, 
  Type, 
  Image as ImageIcon, 
  Box, 
  Download, 
  Library, 
  History, 
  Star, 
  Search,
  LayoutGrid,
  List as ListIcon,
  RefreshCw,
  CheckSquare
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import styles from './page.module.css';

export default function Workbench() {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [activeTab, setActiveTab] = useState('text-to-3d');

  const menuItems = [
    { id: 'text-to-3d', icon: Type, label: 'Text to 3D' },
    { id: 'image-to-3d', icon: ImageIcon, label: 'Image to 3D' },
    { id: 'edit', icon: Box, label: 'Model Edit' },
    { id: 'export', icon: Download, label: 'Model Export' },
    { id: 'library', icon: Library, label: 'Asset Library' },
  ];

  const workbenchModels = [
    { id: '101', title: 'Modern Chair v2', prompt: 'Modern minimalist style chair, wood texture', image: 'https://images.unsplash.com/photo-1592078615290-033ee584e267?w=800&auto=format&fit=crop&q=60', type: 'realistic', resolution: '4k' },
    { id: '102', title: 'Sci-Fi Aircraft', prompt: 'Future aircraft, streamlined design', image: 'https://images.unsplash.com/photo-1512446816042-444d641267d4?w=800&auto=format&fit=crop&q=60', type: 'low-poly', resolution: '2k' },
    { id: '103', title: 'Cartoon Character - Xiao Ming', prompt: 'Chibi boy character design', image: 'https://images.unsplash.com/photo-1627637819846-52269a8448b1?w=800&auto=format&fit=crop&q=60', type: 'cartoon', resolution: '4k' },
    { id: '104', title: 'Old Wooden Chest', prompt: 'Old wooden chest asset for games', image: 'https://images.unsplash.com/photo-1565514020125-9988514a34b7?w=800&auto=format&fit=crop&q=60', type: 'realistic', resolution: '2k' },
    { id: '105', title: 'Crystal Ball', prompt: 'Magic crystal ball, glowing effects', image: 'https://images.unsplash.com/photo-1496564203457-11bb12075d90?w=800&auto=format&fit=crop&q=60', type: 'realistic', resolution: '4k' },
    { id: '106', title: 'Low Poly Car', prompt: 'Low polygon police car model', image: 'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=800&auto=format&fit=crop&q=60', type: 'low-poly', resolution: '2k' },
  ] as const;

  return (
    <div className={styles.container}>
      <Header />
      
      <div className={styles.wrapper}>
        {/* Left Sidebar */}
        <aside className={styles.sidebar}>
          <Button className={styles.newBtn}>
            <Plus size={16} /> New Generation
          </Button>

          <div className={styles.menu}>
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <button 
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`${styles.menuItem} ${activeTab === item.id ? styles.menuItemActive : ''}`}
                >
                  <Icon size={18} className={styles.menuIcon} />
                  {item.label}
                </button>
              );
            })}
          </div>

          {/* Separator */}
          <div className={styles.separator}></div>
          
          <div className={styles.assets}>
            <p className={styles.assetsTitle}>My Assets</p>
            <button className={styles.assetItem}>
              <History size={16} /> History
            </button>
            <button className={styles.assetItem}>
              <Star size={16} /> Favorites
            </button>
          </div>
        </aside>

        {/* Right Content Area */}
        <main className={styles.content}>
          {/* Toolbar */}
          <div className={styles.toolbar}>
            <div className={styles.toolbarLeft}>
              <h2 className={styles.toolbarTitle}>All Models</h2>
              <div className={styles.divider}></div>
              <div className={styles.searchWrapper}>
                <Search className={styles.searchIcon} size={16} />
                <Input 
                  placeholder="Search models..." 
                  className={styles.searchInput}
                />
              </div>
            </div>

            <div className={styles.toolbarRight}>
              <Select defaultValue="newest">
                <SelectTrigger className={styles.selectTrigger}>
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">Newest Created</SelectItem>
                  <SelectItem value="name">Sort by Name</SelectItem>
                </SelectContent>
              </Select>

              <div className={styles.viewToggle}>
                <button 
                  onClick={() => setViewMode('grid')}
                  className={`${styles.viewBtn} ${viewMode === 'grid' ? styles.viewBtnActive : ''}`}
                >
                  <LayoutGrid size={16} />
                </button>
                <button 
                  onClick={() => setViewMode('list')}
                  className={`${styles.viewBtn} ${viewMode === 'list' ? styles.viewBtnActive : ''}`}
                >
                  <ListIcon size={16} />
                </button>
              </div>
            </div>
          </div>

          {/* Model Grid */}
          <div className={styles.gridContainer}>
            <div className={styles.grid}>
              {/* Add Placeholder Card */}
              <div className={styles.placeholderCard}>
                <div className={styles.placeholderIcon}>
                  <Plus size={28} />
                </div>
                <span className={styles.placeholderText}>New Model</span>
              </div>
              
              {workbenchModels.map((model) => (
                <ModelCard key={model.id} {...model} isWorkbench={true} />
              ))}
            </div>
          </div>

          {/* Floating Action Bar */}
          <div className={styles.actionBar}>
            <Button variant="ghost" size="sm" className={styles.actionBtn}>
              <CheckSquare size={15} /> Batch Select
            </Button>
            <div className={styles.actionDivider}></div>
            <Button variant="ghost" size="sm" className={styles.actionBtn}>
              <RefreshCw size={15} /> Refresh List
            </Button>
            <div className={styles.actionDivider}></div>
            <Button variant="ghost" size="sm" className={styles.actionBtn}>
              <Download size={15} /> Export Format: GLB
            </Button>
          </div>
        </main>
      </div>
    </div>
  );
}

