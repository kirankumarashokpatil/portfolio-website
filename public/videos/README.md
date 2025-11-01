# Demo Videos Setup

This directory contains demo videos for your portfolio projects. Here's how to add your actual project demo videos:

## 📹 Required Demo Videos

### 1. BESS Optimizer Demo (bess-optimizer-demo.mp4)
**Duration**: 2-3 minutes
**Content to include**:
- Dashboard showing real-time optimization
- Price charts and battery SOC visualization
- Profit calculations and performance metrics
- Before/after comparison showing 12% improvement

**Recording suggestions**:
- Screen recording of your optimization dashboard
- Show the MILP solver in action
- Highlight key performance metrics
- Include voice-over explaining the process

### 2. Vision Navigation Demo (vision-nav-demo.mp4)
**Duration**: 2-3 minutes
**Content to include**:
- Robot/drone navigating in GPS-denied environment
- Real-time SLAM visualization
- Vision Transformer feature detection
- Comparison with traditional methods

**Recording suggestions**:
- First-person view from camera
- Side-by-side comparison: raw camera vs processed features
- Show accuracy improvements in challenging conditions
- Demonstrate real-time performance

### 3. Airspace Pricing Demo (airspace-pricing-demo.mp4)
**Duration**: 2-3 minutes
**Content to include**:
- Multi-agent simulation environment
- Dynamic pricing visualization
- Throughput improvements over time
- Safety protocol compliance monitoring

### 4. Marine BESS Demo (marine-bess-demo.mp4)
**Duration**: 1-2 minutes
**Content to include**:
- Port charging optimization dashboard
- Power constraint management
- Revenue maximization visualization
- Real-time scheduling algorithm

## 🎬 Video Creation Tools

### Free Options:
- **OBS Studio**: For screen recording
- **DaVinci Resolve**: For video editing
- **OpenShot**: Simple video editor
- **Blender**: For 3D animations

### Professional Options:
- **Adobe Premiere Pro**: Professional editing
- **Camtasia**: Screen recording + editing
- **Final Cut Pro**: Mac video editing

## 📱 Alternative Options if No Videos Available

### 1. Create Animated Demos
```python
# Example: Create animated plots showing optimization results
import matplotlib.pyplot as plt
import matplotlib.animation as animation
import numpy as np

# Create animated BESS optimization
fig, (ax1, ax2) = plt.subplots(2, 1, figsize=(10, 8))

def animate(frame):
    # Animate price data and battery response
    # Export as MP4 using matplotlib
    pass

anim = animation.FuncAnimation(fig, animate, frames=200, interval=50)
anim.save('bess-optimizer-demo.mp4', writer='ffmpeg')
```

### 2. Use Screenshots with Transitions
- Create slideshow of key screenshots
- Add smooth transitions between images
- Include performance metrics and results
- Export as video with audio narration

### 3. Simulation Recordings
- Run your algorithms with visualizations
- Record the simulation output
- Show convergence and optimization process
- Highlight key performance improvements

## 📋 Video Specifications

**Technical Requirements**:
- **Format**: MP4 (H.264 codec)
- **Resolution**: 1920x1080 (Full HD)
- **Frame Rate**: 30 FPS
- **Duration**: 1-3 minutes per video
- **File Size**: < 50MB per video
- **Audio**: Optional but recommended

**Content Guidelines**:
- Start with project title and brief description
- Show the problem being solved
- Demonstrate your solution in action
- Highlight key results and improvements
- End with impact metrics
- Keep it professional and engaging

## 🚀 Quick Video Creation Script

```bash
# If you have screenshots, create a simple slideshow video
ffmpeg -framerate 1/3 -pattern_type glob -i "screenshots/*.png" -c:v libx264 -pix_fmt yuv420p output.mp4

# Add audio narration
ffmpeg -i video.mp4 -i audio.mp3 -c:v copy -c:a aac -strict experimental final_demo.mp4
```

## 📁 File Organization

Place your demo videos in this directory:
```
portfolio/
├── public/
│   └── videos/
│       ├── bess-optimizer-demo.mp4
│       ├── vision-nav-demo.mp4
│       ├── airspace-pricing-demo.mp4
│       └── marine-bess-demo.mp4
```

## 💡 Pro Tips

1. **Keep it Short**: 2-3 minutes max per video
2. **Show Results**: Focus on the impact and improvements
3. **Professional Quality**: Good lighting, clear audio, steady recording
4. **Tell a Story**: Problem → Solution → Results
5. **Add Captions**: For accessibility and professional appearance

---

Once you create your demo videos, simply replace the placeholder files in this directory with your actual recordings!