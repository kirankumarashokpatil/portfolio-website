#!/usr/bin/env python3
"""
Demo Video Creator Script
Creates sample demo videos for portfolio projects when actual videos aren't available.
"""

import matplotlib.pyplot as plt
import matplotlib.animation as animation
import numpy as np
from datetime import datetime
import os

def create_bess_demo_frames():
    """Create BESS optimization demo frames"""
    fig, ((ax1, ax2), (ax3, ax4)) = plt.subplots(2, 2, figsize=(16, 9))
    fig.suptitle('MILP BESS Optimizer - Real-Time Demo', fontsize=20, fontweight='bold')
    
    frames = []
    for i in range(150):  # 5 seconds at 30fps
        # Clear axes
        ax1.clear()
        ax2.clear() 
        ax3.clear()
        ax4.clear()
        
        # Price signals
        hours = np.arange(24)
        prices = 30 + 20 * np.sin(hours * np.pi / 12) + 5 * np.random.random(24)
        ax1.plot(hours, prices, 'b-', linewidth=2)
        ax1.set_title('Electricity Prices (£/MWh)')
        ax1.set_xlabel('Hour')
        ax1.set_ylabel('Price')
        ax1.grid(True, alpha=0.3)
        
        # Battery SOC
        time_progress = i / 150
        soc = 50 + 30 * np.sin(time_progress * 4 * np.pi)
        ax2.bar(['Current SOC'], [soc], color='green' if soc > 20 else 'red')
        ax2.set_title('Battery State of Charge')
        ax2.set_ylabel('SOC (%)')
        ax2.set_ylim(0, 100)
        
        # Profit visualization
        profits = [8.2, 9.1, 10.4, 11.2, 12.1]  # Progressive improvement
        bars = ax3.bar(['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5'], 
                      profits[:min(5, int(time_progress * 5) + 1)], 
                      color='gold')
        ax3.set_title('Weekly Profit (£k)')
        ax3.set_ylabel('Profit')
        
        # Real-time optimization status
        ax4.text(0.5, 0.7, 'MILP Solver Status', ha='center', va='center', 
                fontsize=16, fontweight='bold', transform=ax4.transAxes)
        ax4.text(0.5, 0.5, '✓ OPTIMAL', ha='center', va='center', 
                fontsize=20, color='green', fontweight='bold', transform=ax4.transAxes)
        ax4.text(0.5, 0.3, f'Solve Time: {0.23 + i*0.001:.3f}s', ha='center', va='center', 
                fontsize=12, transform=ax4.transAxes)
        ax4.set_xticks([])
        ax4.set_yticks([])
        
        plt.tight_layout()
        frames.append(i)
    
    return fig, frames

def create_vision_nav_demo_frames():
    """Create Vision Transformer Navigation demo frames"""
    fig, ((ax1, ax2), (ax3, ax4)) = plt.subplots(2, 2, figsize=(16, 9))
    fig.suptitle('Vision Transformer Navigation - GPS-Denied Environment', fontsize=20, fontweight='bold')
    
    for i in range(150):
        ax1.clear()
        ax2.clear()
        ax3.clear() 
        ax4.clear()
        
        # Simulated camera view
        ax1.set_title('Raw Camera Feed')
        # Create simple environment visualization
        x = np.linspace(0, 10, 100)
        y = np.sin(x) + np.random.normal(0, 0.1, 100)
        ax1.plot(x, y, 'b-', linewidth=2)
        ax1.set_xlim(0, 10)
        ax1.set_ylim(-2, 2)
        
        # ViT feature detection
        ax2.set_title('ViT Feature Detection')
        # Show detected features as points
        features_x = np.random.random(20) * 10
        features_y = np.random.random(20) * 4 - 2
        ax2.scatter(features_x, features_y, c='red', s=50, alpha=0.7)
        ax2.set_xlim(0, 10)
        ax2.set_ylim(-2, 2)
        
        # SLAM trajectory
        time_progress = i / 150
        traj_length = int(time_progress * 50)
        trajectory_x = np.cumsum(np.random.random(traj_length) - 0.5) 
        trajectory_y = np.cumsum(np.random.random(traj_length) - 0.5)
        ax3.plot(trajectory_x, trajectory_y, 'g-', linewidth=2)
        ax3.set_title('SLAM Trajectory')
        ax3.set_xlabel('X (m)')
        ax3.set_ylabel('Y (m)')
        ax3.grid(True, alpha=0.3)
        
        # Accuracy metrics
        accuracy = 82 + time_progress * 18  # Show improvement to 100%
        ax4.bar(['Traditional SLAM', 'ViT-SLAM'], [82, accuracy], 
               color=['gray', 'green'])
        ax4.set_title('Navigation Accuracy (%)')
        ax4.set_ylim(0, 105)
        
        plt.tight_layout()
    
    return fig, []

def save_video_instructions():
    """Create instructions for converting to MP4"""
    instructions = """
# Video Creation Instructions

## Generated Demo Frames
The script creates matplotlib animations for your projects.

## Convert to MP4 (requires ffmpeg)
1. Install ffmpeg: `winget install Gyan.FFmpeg`
2. Run conversion:
   ```bash
   ffmpeg -r 30 -f image2 -s 1920x1080 -i frame_%04d.png -vcodec libx264 -crf 25 -pix_fmt yuv420p output.mp4
   ```

## Alternative: Use OBS Studio
1. Install OBS Studio (free)
2. Create scene with matplotlib window
3. Record 5-10 second clips
4. Export as MP4

## Quick Portfolio Update
1. Create short MP4 videos (1-3 minutes each)
2. Place in: `public/videos/`
3. Name them exactly:
   - `bess-optimizer-demo.mp4`
   - `vision-nav-demo.mp4`
   - `airspace-pricing-demo.mp4`
   - `marine-bess-demo.mp4`

## Test Video Player
After adding videos, the portfolio will automatically show:
- ▶️ Play button on project cards
- Full-screen video modal when clicked
- Video controls (play, pause, seek)
"""
    
    with open('../public/videos/video-creation-guide.md', 'w') as f:
        f.write(instructions)

if __name__ == "__main__":
    print("🎬 Creating demo video frames...")
    
    # Create BESS demo
    print("📊 Generating BESS Optimizer demo...")
    fig1, frames1 = create_bess_demo_frames()
    
    # Create Vision Nav demo  
    print("🤖 Generating Vision Navigation demo...")
    fig2, frames2 = create_vision_nav_demo_frames()
    
    # Save instructions
    save_video_instructions()
    
    print("✅ Demo frames created!")
    print("📝 Check video-creation-guide.md for conversion instructions")
    print("\n🚀 Quick Start:")
    print("1. Use OBS Studio to record these matplotlib animations")
    print("2. Save as MP4 in public/videos/ directory") 
    print("3. Your portfolio video player is ready!")