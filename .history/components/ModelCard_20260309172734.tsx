import React from "react";
import { Heart, Download, MoreHorizontal, Box } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import styles from "./ModelCard.module.css";
import Image from "next/image";

export interface ModelProps {
  id: string;
  title: string;
  image: string;
  prompt: string;
  type: "cartoon" | "realistic" | "low-poly";
  resolution: "2k" | "4k";
  author?: string;
  date?: string;
  isWorkbench?: boolean;
}

const ModelCard: React.FC<ModelProps> = ({
  title,
  image,
  prompt,
  type,
  resolution,
  isWorkbench = false,
}) => {
  return (
    <div data-cmp="ModelCard" className={styles.card}>
      {/* Thumbnail Area */}
      <div className={styles.imageContainer}>
        {/* Top Badges */}
        <div className={styles.badges}>
          <Badge
            variant="secondary"
            className={`${styles.badge} ${styles.badgeType}`}
          >
            {type === "cartoon"
              ? "Cartoon"
              : type === "realistic"
                ? "Realistic"
                : "Low Poly"}
          </Badge>
          <Badge
            variant="secondary"
            className={`${styles.badge} ${styles.badgeResolution}`}
          >
            {resolution.toUpperCase()}
          </Badge>
        </div>

        {/* Hover Overlay - Only visible on hover */}
        <div className={styles.overlay}>
          <div className={styles.overlayActions}>
            {isWorkbench ? (
              <div className={styles.workbenchActions}>
                <Button size="icon" className={styles.overlayButton}>
                  <Download className="h-4 w-4" />
                </Button>
                <Button
                  size="icon"
                  className={`${styles.overlayButton} ${styles.overlayButtonPurple}`}
                >
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </div>
            ) : (
              <Button size="sm" className={styles.reuseButton}>
                Reuse Prompt
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Content Info */}
      <div className={styles.content}>
        <div className={styles.titleRow}></div>

        <Image
          src={"/image/mmi.jpg"}
          alt="Model"
          width={30}
          height={30}
          className={styles.examplemimage}
        />

        {isWorkbench && (
          <div className={styles.footer}>
            <span className={styles.footerTime}>2 hours ago</span>
            <div className={styles.footerActions}>
              <Button
                variant="ghost"
                size="icon"
                className={styles.footerButton}
              >
                <Heart className="h-3.5 w-3.5" />
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ModelCard;
