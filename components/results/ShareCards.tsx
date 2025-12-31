'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Share2, Download, Twitter, Linkedin, Link, Check } from 'lucide-react';
import { AptitudeId, APTITUDES } from '@/types/aptitudes';

interface ShareCardData {
  userName: string;
  topAptitudes: { name: string; percentile: number }[];
  careerType: string;
  profileId: string;
}

interface ShareCardsProps {
  scores: Record<AptitudeId, number>;
  userName: string;
  topCareer: string;
  profileId: string;
}

export default function ShareCards({
  scores,
  userName,
  topCareer,
  profileId,
}: ShareCardsProps) {
  const [copied, setCopied] = useState(false);

  const topAptitudes = Object.entries(scores)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 3)
    .map(([id, score]) => ({
      name: APTITUDES.find((a) => a.id === id)?.shortName || id,
      percentile: score,
    }));

  const shareUrl = `https://pathfinder.app/results/${profileId}`;
  const shareText = `I just discovered I'm a ${topCareer} type! My top strengths: ${topAptitudes
    .map((a) => a.name)
    .join(', ')}. Find your cognitive profile:`;

  const shareToTwitter = () => {
    window.open(
      `https://twitter.com/intent/tweet?text=${encodeURIComponent(
        shareText
      )}&url=${encodeURIComponent(shareUrl)}`,
      '_blank'
    );
  };

  const shareToLinkedIn = () => {
    window.open(
      `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
        shareUrl
      )}`,
      '_blank'
    );
  };

  const copyLink = async () => {
    await navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="glass p-6 rounded-[28px]">
      <div className="flex items-center gap-2 mb-4">
        <Share2 className="w-5 h-5 text-[var(--color-primary)]" />
        <h3 className="text-lg font-semibold">Share Your Results</h3>
      </div>

      {/* Preview Card */}
      <div className="bg-gradient-to-br from-[var(--color-indigo)] to-[var(--color-purple)] rounded-xl p-6 text-white mb-4">
        <p className="text-sm opacity-80 mb-1">I discovered my cognitive profile</p>
        <p className="text-2xl font-bold mb-2">{topCareer}</p>
        <p className="text-sm opacity-80">
          {topAptitudes.map((a) => a.name).join(' • ')}
        </p>
        <p className="text-xs opacity-60 mt-4">pathfinder.app</p>
      </div>

      {/* Share Buttons */}
      <div className="grid grid-cols-3 gap-3">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={shareToTwitter}
          className="flex flex-col items-center gap-2 p-4 bg-[#1DA1F2] text-white rounded-xl"
        >
          <Twitter className="w-5 h-5" />
          <span className="text-xs font-medium">Twitter</span>
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={shareToLinkedIn}
          className="flex flex-col items-center gap-2 p-4 bg-[#0A66C2] text-white rounded-xl"
        >
          <Linkedin className="w-5 h-5" />
          <span className="text-xs font-medium">LinkedIn</span>
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={copyLink}
          className="flex flex-col items-center gap-2 p-4 bg-[var(--fill-tertiary)] rounded-xl"
        >
          {copied ? (
            <Check className="w-5 h-5 text-[var(--color-success)]" />
          ) : (
            <Link className="w-5 h-5" />
          )}
          <span className="text-xs font-medium">
            {copied ? 'Copied!' : 'Copy Link'}
          </span>
        </motion.button>
      </div>
    </div>
  );
}
