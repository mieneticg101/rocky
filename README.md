# 🎨 Rocky Icons - Modern Icon Library 2025

> **ไลบรารีไอคอนทันสมัยที่ใหญ่ที่สุด** พร้อม **5,000+ ไอคอน** ทั้งแบบปกติและเคลื่อนไหว

[![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)](https://github.com/mieneticg101/Rocky)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)
[![Icons](https://img.shields.io/badge/icons-5000%2B-orange.svg)](https://rocky-icons.dev)
[![Animated](https://img.shields.io/badge/animated-2000%2B-purple.svg)](https://rocky-icons.dev/animated)

## ✨ Features | คุณสมบัติเด่น

- 🎯 **5,000+ Premium Icons** - ไอคอนคุณภาพสูง ครอบคลุมทุกหมวดหมู่
- ⚡ **Animated Icons** - ไอคอนเคลื่อนไหวสวยงาม 2,000+ แบบ
- 🎨 **2025 Design Trends** - ออกแบบตามเทรนด์โลกล่าสุด
- 🔥 **Modern & Unique** - ดีไซน์ทันสมัย มีเอกลักษณ์เฉพาะตัว
- 📦 **Multiple Formats** - รองรับ SVG, PNG, React, Vue, Web Components
- 🎭 **Customizable** - ปรับแต่งสี ขนาด และ Animation ได้
- 🚀 **Lightweight** - Optimized สำหรับประสิทธิภาพสูงสุด
- 📱 **Responsive** - ใช้งานได้ทุกขนาดหน้าจอ
- 🌐 **Universal** - ใช้ได้กับทุก Framework

## 📚 Icon Categories | หมวดหมู่ไอคอน

### 🎯 Essential Icons (ไอคอนพื้นฐาน)
- **UI/UX** - 500+ icons: Buttons, Navigation, Form elements
- **Actions** - 400+ icons: Edit, Delete, Save, Share, Download
- **Arrows** - 300+ icons: All directions, Curved, Animated
- **Media** - 350+ icons: Play, Pause, Volume, Camera, Gallery

### 💼 Business & Finance (ธุรกิจและการเงิน)
- **E-commerce** - 450+ icons: Shopping, Payment, Cart, Checkout
- **Finance** - 400+ icons: Banking, Currency, Investment, Analytics
- **Office** - 350+ icons: Documents, Charts, Calendar, Tasks
- **Marketing** - 300+ icons: SEO, Ads, Social Media, Analytics

### 💻 Technology & Development (เทคโนโลยีและการพัฒนา)
- **Code** - 400+ icons: Programming languages, Git, Terminal
- **Devices** - 350+ icons: Mobile, Desktop, Tablet, Wearables
- **Cloud** - 300+ icons: Storage, Server, Database, API
- **Security** - 350+ icons: Lock, Shield, Authentication, Encryption

### 🎮 Entertainment & Lifestyle (บันเทิงและไลฟ์สไตล์)
- **Games** - 300+ icons: Gaming, Console, VR, Esports
- **Music** - 250+ icons: Instruments, Audio, Streaming
- **Sports** - 300+ icons: All major sports, Fitness, Activities
- **Travel** - 350+ icons: Transport, Accommodation, Destinations

### 🏥 Healthcare & Education (สุขภาพและการศึกษา)
- **Medical** - 400+ icons: Hospital, Medicine, Health, Wellness
- **Education** - 350+ icons: School, Learning, Books, Certificates
- **Science** - 300+ icons: Lab, Research, Chemistry, Biology

### 🌟 Social & Communication (โซเชียลและการสื่อสาร)
- **Social Media** - 350+ icons: All major platforms, Interactions
- **Communication** - 300+ icons: Chat, Email, Call, Video
- **Emoji & Reactions** - 400+ icons: Emotions, Gestures, Reactions

### 🏠 Home & Living (บ้านและการใช้ชีวิต)
- **Food & Drink** - 350+ icons: Restaurant, Cuisine, Beverages
- **Shopping** - 300+ icons: Retail, Fashion, Products
- **Home** - 250+ icons: Furniture, Appliances, Decor

### 🌍 Nature & Weather (ธรรมชาติและสภาพอากาศ)
- **Weather** - 200+ icons: Conditions, Forecast, Seasons
- **Nature** - 250+ icons: Plants, Animals, Environment
- **Maps & Location** - 300+ icons: Navigation, Places, Pins

## 🎬 Animation Styles | รูปแบบ Animation

1. **Hover Animations** - เคลื่อนไหวเมื่อ hover
2. **Click Animations** - เคลื่อนไหวเมื่อคลิก
3. **Loading Animations** - สำหรับสถานะ loading
4. **Morphing** - เปลี่ยนรูปร่างแบบ smooth
5. **Bounce & Spring** - เด้งและยืดหยุ่น
6. **Rotate & Spin** - หมุนและปั่น
7. **Scale & Pulse** - ขยายและเต้น
8. **Path Drawing** - วาดเส้นแบบ progressive

## 🚀 Quick Start | เริ่มต้นใช้งาน

### Installation

```bash
npm install @rocky-icons/library
```

### Usage Examples

#### React
```jsx
import { IconHome, IconSearch, IconUser } from '@rocky-icons/library/react';

function App() {
  return (
    <div>
      <IconHome size={24} color="#1890ff" />
      <IconSearch size={24} className="icon-search" />
      <IconUser size={24} animated hover="bounce" />
    </div>
  );
}
```

#### Vue
```vue
<template>
  <div>
    <IconHome :size="24" color="#1890ff" />
    <IconSearch :size="24" animated />
    <IconUser :size="24" :hover="'bounce'" />
  </div>
</template>

<script setup>
import { IconHome, IconSearch, IconUser } from '@rocky-icons/library/vue';
</script>
```

#### Vanilla JS / HTML
```html
<script type="module">
  import { IconHome } from '@rocky-icons/library';

  const icon = IconHome({ size: 24, color: '#1890ff' });
  document.getElementById('app').appendChild(icon);
</script>
```

#### SVG Direct Usage
```html
<img src="@rocky-icons/library/icons/home.svg" alt="Home" />
```

## 🎨 Design System | ระบบออกแบบ

### Design Principles (หลักการออกแบบ)

1. **Clarity** - ชัดเจน เข้าใจง่าย
2. **Consistency** - สม่ำเสมอ ลงตัว
3. **Simplicity** - เรียบง่าย ไม่ซับซ้อน
4. **Scalability** - ปรับขนาดได้ดี
5. **Accessibility** - เข้าถึงได้ทุกคน

### Grid System
- **Base Grid**: 24x24px
- **Stroke Width**: 1.5px (default), 1px (thin), 2px (bold)
- **Corner Radius**: 2px (sharp), 4px (rounded), 8px (soft)
- **Padding**: 2px internal padding

### Color Palette 2025
```css
--primary: #6366F1;      /* Indigo */
--secondary: #8B5CF6;    /* Purple */
--success: #10B981;      /* Emerald */
--warning: #F59E0B;      /* Amber */
--error: #EF4444;        /* Red */
--info: #3B82F6;         /* Blue */
--neutral: #64748B;      /* Slate */
```

### Style Variants
- **Outline** - เส้นขอบ (default)
- **Filled** - เติมสี
- **Duotone** - สองสี
- **Gradient** - ไล่สี (2025 trend)
- **3D** - มิติ 3 มิติ (2025 trend)
- **Glassmorphism** - แก้วโปร่งแสง (2025 trend)

## 📦 Export Formats | รูปแบบไฟล์

- ✅ **SVG** - Vector graphics (recommended)
- ✅ **PNG** - Raster images (24px, 48px, 96px, 192px)
- ✅ **React Components** - JSX/TSX
- ✅ **Vue Components** - SFC
- ✅ **Web Components** - Custom elements
- ✅ **Icon Font** - WOFF2, TTF
- ✅ **Lottie JSON** - For animations
- ✅ **Figma** - Design files

## 🛠️ Customization | การปรับแต่ง

### Props / Options

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `size` | number \| string | 24 | Icon size in pixels |
| `color` | string | 'currentColor' | Icon color (hex, rgb, named) |
| `strokeWidth` | number | 1.5 | Stroke width |
| `fill` | string | 'none' | Fill color |
| `className` | string | - | CSS class name |
| `style` | object | - | Inline styles |
| `animated` | boolean | false | Enable animation |
| `hover` | string | - | Hover animation type |
| `onClick` | function | - | Click handler |

### Animation Options

```jsx
<IconHeart
  animated
  hover="pulse"
  duration={1000}
  delay={0}
  loop={true}
  direction="normal"
/>
```

## 🌐 Browser Support | รองรับ Browser

- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+
- ✅ Opera 76+

## 📖 Documentation | เอกสารประกอบ

Visit our documentation site: [https://rocky-icons.dev/docs](https://rocky-icons.dev/docs)

- 📘 [Getting Started Guide](docs/getting-started.md)
- 🎨 [Design Guidelines](docs/design-guidelines.md)
- 💻 [API Reference](docs/api-reference.md)
- 🎬 [Animation Guide](docs/animation-guide.md)
- 🔧 [Customization](docs/customization.md)
- 📦 [Export Guide](docs/export-guide.md)

## 🤝 Contributing | การมีส่วนร่วม

We welcome contributions! Please read our [Contributing Guide](CONTRIBUTING.md) for details.

## 📄 License

MIT License - see [LICENSE](LICENSE) file for details

## 🎯 Roadmap

- [x] Design 5000+ static icons
- [x] Create 2000+ animated icons
- [x] React & Vue support
- [x] Documentation site
- [ ] Figma plugin
- [ ] VS Code extension
- [ ] Icon builder/customizer
- [ ] AI-powered icon search
- [ ] Icon pack marketplace

## 💬 Support

- 📧 Email: support@rocky-icons.dev
- 💬 Discord: [Join our community](https://discord.gg/rocky-icons)
- 🐛 Issues: [GitHub Issues](https://github.com/mieneticg101/Rocky/issues)

---

Made with ❤️ by Rocky Icons Team | สร้างด้วยความตั้งใจโดยทีม Rocky Icons

**#RockyIcons #IconLibrary #2025DesignTrends #ModernIcons #AnimatedIcons**
