"use client";

import { useState } from "react";
import Header from "@/components/Header";
import ModelCard from "@/components/ModelCard";
import {
  Search,
  Wand2,
  Filter,
  Zap,
  Clock,
  Box,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import styles from "./page.module.css";

export default function Home() {
  const [prompt, setPrompt] = useState("");

  const handleGenerate = () => {
    if (!prompt) return;
    console.log("Generating model for:", prompt);
    // Add generation logic here
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleGenerate();
    }
  };

  const demoModels = [
    {
      id: "1",
      title: "Cyberpunk Motorcycle Girl",
      prompt:
        "Futuristic style, cyberpunk, neon lights, mechanically enhanced girl riding a hover motorcycle, high detail, 8k resolution",
      image:
        "https://images.unsplash.com/photo-1615840287214-7ff58936c4cf?w=800&auto=format&fit=crop&q=60",
      type: "realistic",
      resolution: "4k",
    },
    {
      id: "2",
      title: "Low Poly Forest Cabin",
      prompt:
        "Low poly style, cozy forest cabin, soft lighting, minimalism, isometric view",
      image:
        "https://images.unsplash.com/photo-1516216628259-22240502a800?w=800&auto=format&fit=crop&q=60",
      type: "low-poly",
      resolution: "2k",
    },
    {
      id: "3",
      title: "Chibi Dragon Warrior",
      prompt:
        "Cartoon style, chibi character, small dragon wearing golden armor, cute, 3D rendered, Pixar style",
      image:
        "https://images.unsplash.com/photo-1627637819846-52269a8448b1?w=800&auto=format&fit=crop&q=60",
      type: "cartoon",
      resolution: "4k",
    },
    {
      id: "4",
      title: "Vintage Typewriter",
      prompt:
        "Realistic style, black vintage typewriter with brass details, worn texture, studio lighting",
      image:
        "https://images.unsplash.com/photo-1510655610660-3164a66e04d4?w=800&auto=format&fit=crop&q=60",
      type: "realistic",
      resolution: "4k",
    },
    {
      id: "5",
      title: "Dream Crystal Castle",
      prompt:
        "Fantasy style, crystal castle on floating island, translucent material, glowing particles, epic feel",
      image:
        "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=800&auto=format&fit=crop&q=60",
      type: "realistic",
      resolution: "4k",
    },
    {
      id: "6",
      title: "Mech Armor Helmet",
      prompt:
        "Hard surface modeling, sci-fi armor helmet, weathered metal texture, glowing blue eyes, cinematic lighting",
      image:
        "https://images.unsplash.com/photo-1542779283-429940ce8336?w=800&auto=format&fit=crop&q=60",
      type: "realistic",
      resolution: "4k",
    },
    {
      id: "7",
      title: "Clay Style Kitten",
      prompt:
        "Claymation style, cute little kitten playing with yarn ball, fingerprint texture, macro photography",
      image:
        "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=800&auto=format&fit=crop&q=60",
      type: "cartoon",
      resolution: "2k",
    },
    {
      id: "8",
      title: "Minimalist Abstract Sculpture",
      prompt:
        "Modern art, fluid lines, white marble material, minimalism, soft lighting",
      image:
        "https://images.unsplash.com/photo-1554188248-986adbb73be0?w=800&auto=format&fit=crop&q=60",
      type: "realistic",
      resolution: "4k",
    },
  ] as const;

  return (
    <div className={styles.container}>
      <Header />

      <main className={styles.main}>
        <div className={styles.content}>
          {/* Hero Section */}
          <div className={styles.hero}>
            {/* Ambient Background Image for Input Area */}
            <div className={styles.ambientBg}>
              <img
                src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2864&auto=format&fit=crop"
                alt="Ambient Tech Background"
                className={styles.ambientImg}
              />
            </div>

            <h1 className={styles.title}>
              AI-Powered,{" "}
              <span className={styles.gradientText}>
                Generate 3D Models with One Sentence
              </span>
            </h1>
            <p className={styles.subtitle}>
              Enter a prompt and transform your imagination into high-quality 3D
              assets in seconds. Export to GLB, FBX, OBJ and more formats.
            </p>

            {/* Main Input Area */}
            <div className={styles.inputWrapper}>
              {/* Gradient border glow */}
              <div className={styles.inputGlow}></div>

              <div className={styles.inputContainer}>
                <div className={styles.inputIcon}>
                  <Wand2 size={24} />
                </div>
                <input
                  type="text"
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Describe the 3D model you want to generate, e.g.: A corgi in a spacesuit, cyberpunk style..."
                  className={styles.input}
                />
                <Button onClick={handleGenerate} className={styles.generateBtn}>
                  Generate 3D Model
                  <ArrowRight size={16} className={styles.arrowIcon} />
                </Button>
              </div>
            </div>

            {/* Quick Actions */}
            <div className={styles.quickActions}>
              <Button variant="ghost" className={styles.actionBtn}>
                <Box size={14} /> Template Library
              </Button>
              <Button variant="ghost" className={styles.actionBtn}>
                <Clock size={14} /> Recent Generations
              </Button>
              <Button variant="ghost" className={styles.actionBtn}>
                <Zap size={14} /> Popular Styles
              </Button>
            </div>
          </div>

          {/* Gallery Section */}
          <div className={styles.gallery}>
            {/* Search and Filters Bar */}
            <div className={styles.filterBar}>
              <div className={styles.filterContent}>
                <div className={styles.filterLeft}>
                  <Tabs defaultValue="all" className={styles.tabs}>
                    <TabsList className={styles.tabsList}>
                      <TabsTrigger value="all">All</TabsTrigger>
                      <TabsTrigger value="character">Characters</TabsTrigger>
                      <TabsTrigger value="scene">Scenes</TabsTrigger>
                      <TabsTrigger value="prop">Prop</TabsTrigger>
                    </TabsList>
                  </Tabs>
                </div>

                <div className={styles.filterRight}>
                  <div className={styles.searchWrapper}>
                    <Search className={styles.searchIcon} size={16} />
                    <Input
                      placeholder="Search model styles, keywords..."
                      className={styles.searchInput}
                    />
                  </div>
                  <Button variant="outline" className={styles.filterBtn}>
                    <Filter size={14} /> Filter
                  </Button>
                </div>
              </div>
            </div>

            {/* Grid */}
            <div className={styles.grid}>
              {demoModels.map((model) => (
                <ModelCard key={model.id} {...model} />
              ))}
            </div>

            {/* Load More */}
            <div className={styles.loadMore}>
              <Button variant="outline" className={styles.loadMoreBtn}>
                Load More Inspiration
              </Button>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className={styles.footer}>
        <div className={styles.footerContent}>
          <p>© 2025 VexoAI. All rights reserved.</p>
          <div className={styles.footerLinks}>
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
            <a href="#">Contact Us</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
