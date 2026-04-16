import { CanvasPreset, TemplatePreset, BackgroundConfig, TextElement } from '@/types/editor';

export const CANVAS_PRESETS: CanvasPreset[] = [
  { id: 'ig-post', name: 'Instagram Post', platform: 'Instagram', width: 1080, height: 1080, icon: '📷' },
  { id: 'ig-story', name: 'Instagram Story', platform: 'Instagram', width: 1080, height: 1920, icon: '📱' },
  { id: 'twitter-post', name: 'X/Twitter Post', platform: 'X', width: 1600, height: 900, icon: '𝕏' },
  { id: 'linkedin-post', name: 'LinkedIn Post', platform: 'LinkedIn', width: 1200, height: 627, icon: '💼' },
  { id: 'fb-cover', name: 'Facebook Cover', platform: 'Facebook', width: 820, height: 312, icon: '📘' },
  { id: 'pinterest-pin', name: 'Pinterest Pin', platform: 'Pinterest', width: 1000, height: 1500, icon: '📌' },
  { id: 'yt-thumb', name: 'YouTube Thumbnail', platform: 'YouTube', width: 1280, height: 720, icon: '▶️' },
  { id: 'custom', name: 'Custom Size', platform: 'Custom', width: 1080, height: 1080, icon: '✏️' },
];

export const FONTS = [
  { family: 'Inter', category: 'Sans-serif' },
  { family: 'Space Grotesk', category: 'Sans-serif' },
  { family: 'Playfair Display', category: 'Serif' },
  { family: 'Montserrat', category: 'Sans-serif' },
  { family: 'Poppins', category: 'Sans-serif' },
  { family: 'Roboto', category: 'Sans-serif' },
  { family: 'Open Sans', category: 'Sans-serif' },
  { family: 'Lato', category: 'Sans-serif' },
  { family: 'Oswald', category: 'Sans-serif' },
  { family: 'Raleway', category: 'Sans-serif' },
  { family: 'Merriweather', category: 'Serif' },
  { family: 'Source Code Pro', category: 'Monospace' },
  { family: 'JetBrains Mono', category: 'Monospace' },
  { family: 'Bebas Neue', category: 'Display' },
  { family: 'Dancing Script', category: 'Handwriting' },
  { family: 'Pacifico', category: 'Handwriting' },
  { family: 'Lobster', category: 'Display' },
  { family: 'Archivo Black', category: 'Display' },
  { family: 'Righteous', category: 'Display' },
  { family: 'Bitter', category: 'Serif' },
];

export const FONT_WEIGHTS = [
  { label: 'Light', value: 300 },
  { label: 'Regular', value: 400 },
  { label: 'Medium', value: 500 },
  { label: 'Semi Bold', value: 600 },
  { label: 'Bold', value: 700 },
  { label: 'Extra Bold', value: 800 },
];

export const PRESET_COLORS = [
  '#FFFFFF', '#F8F9FC', '#F1F3F8', '#E4E7EF',
  '#000000', '#161A2B', '#252B3E', '#3A4158',
  '#6366F1', '#8B5CF6', '#06B6D4', '#3B82F6',
  '#10B981', '#F59E0B', '#EF4444', '#EC4899',
  '#F97316', '#84CC16', '#14B8A6', '#A855F7',
];

export const GRADIENT_PRESETS = [
  { name: 'Indigo Flow', start: '#6366F1', end: '#06B6D4', direction: 'to right' },
  { name: 'Sunset', start: '#F59E0B', end: '#EF4444', direction: 'to bottom right' },
  { name: 'Violet Dream', start: '#8B5CF6', end: '#EC4899', direction: 'to right' },
  { name: 'Ocean', start: '#06B6D4', end: '#3B82F6', direction: 'to bottom' },
  { name: 'Forest', start: '#10B981', end: '#84CC16', direction: 'to right' },
  { name: 'Night', start: '#161A2B', end: '#3A4158', direction: 'to bottom' },
  { name: 'Peach', start: '#F97316', end: '#EC4899', direction: 'to right' },
  { name: 'Arctic', start: '#E4E7EF', end: '#06B6D4', direction: 'to bottom' },
];

export const TEMPLATE_PRESETS: TemplatePreset[] = [
  {
    id: 'minimal-light',
    name: 'Minimal Light',
    thumbnail: '',
    category: 'Minimal',
    background: {
      type: 'solid',
      solidColor: '#F8F9FC',
      gradientStart: '#6366F1',
      gradientEnd: '#06B6D4',
      gradientDirection: 'to right',
      gradientType: 'linear',
      imageUrl: '',
      templateId: '',
    },
  },
  {
    id: 'gradient-indigo',
    name: 'Indigo Flow',
    thumbnail: '',
    category: 'Gradient',
    background: {
      type: 'gradient',
      solidColor: '#FFFFFF',
      gradientStart: '#6366F1',
      gradientEnd: '#06B6D4',
      gradientDirection: 'to right',
      gradientType: 'linear',
      imageUrl: '',
      templateId: '',
    },
  },
  {
    id: 'gradient-sunset',
    name: 'Sunset Warm',
    thumbnail: '',
    category: 'Gradient',
    background: {
      type: 'gradient',
      solidColor: '#FFFFFF',
      gradientStart: '#F59E0B',
      gradientEnd: '#EF4444',
      gradientDirection: 'to bottom right',
      gradientType: 'linear',
      imageUrl: '',
      templateId: '',
    },
  },
  {
    id: 'gradient-violet',
    name: 'Violet Dream',
    thumbnail: '',
    category: 'Gradient',
    background: {
      type: 'gradient',
      solidColor: '#FFFFFF',
      gradientStart: '#8B5CF6',
      gradientEnd: '#EC4899',
      gradientDirection: 'to right',
      gradientType: 'linear',
      imageUrl: '',
      templateId: '',
    },
  },
  {
    id: 'dark-elegant',
    name: 'Dark Elegant',
    thumbnail: '',
    category: 'Dark',
    background: {
      type: 'solid',
      solidColor: '#161A2B',
      gradientStart: '#161A2B',
      gradientEnd: '#3A4158',
      gradientDirection: 'to bottom',
      gradientType: 'linear',
      imageUrl: '',
      templateId: '',
    },
  },
  {
    id: 'dark-gradient',
    name: 'Night Shift',
    thumbnail: '',
    category: 'Dark',
    background: {
      type: 'gradient',
      solidColor: '#FFFFFF',
      gradientStart: '#252B3E',
      gradientEnd: '#3A4158',
      gradientDirection: 'to bottom',
      gradientType: 'linear',
      imageUrl: '',
      templateId: '',
    },
  },
  {
    id: 'ocean-deep',
    name: 'Ocean Deep',
    thumbnail: '',
    category: 'Gradient',
    background: {
      type: 'gradient',
      solidColor: '#FFFFFF',
      gradientStart: '#06B6D4',
      gradientEnd: '#3B82F6',
      gradientType: 'linear',
      gradientDirection: 'to bottom',
      imageUrl: '',
      templateId: '',
    },
  },
  {
    id: 'fresh-green',
    name: 'Fresh Green',
    thumbnail: '',
    category: 'Gradient',
    background: {
      type: 'gradient',
      solidColor: '#FFFFFF',
      gradientStart: '#10B981',
      gradientEnd: '#84CC16',
      gradientDirection: 'to right',
      gradientType: 'linear',
      imageUrl: '',
      templateId: '',
    },
  },
];

export function getBackgroundCSS(bg: BackgroundConfig): string {
  switch (bg.type) {
    case 'solid':
      return bg.solidColor;
    case 'gradient':
      if (bg.gradientType === 'radial') {
        return `radial-gradient(circle, ${bg.gradientStart}, ${bg.gradientEnd})`;
      }
      return `linear-gradient(${bg.gradientDirection}, ${bg.gradientStart}, ${bg.gradientEnd})`;
    case 'image':
      return `url(${bg.imageUrl}) center/cover no-repeat`;
    default:
      return bg.solidColor || '#FFFFFF';
  }
}

export const INSPIRATIONAL_QUOTES = [
  { text: 'The only way to do great work is to love what you do.' },
  { text: 'Stay hungry, stay foolish.' },
  { text: 'Be the change you wish to see in the world.' },
  { text: 'Dream big, start small, act now.' },
  { text: 'In the middle of difficulty lies opportunity.' },
  { text: 'Create the things you wish existed.' },
  { text: 'Less ego, more action.' },
  { text: 'Progress over perfection.' },
  { text: 'Your limitation—it\'s only your imagination.' },
  { text: 'Don\'t watch the clock; do what it does. Keep going.' },
  { text: 'Great things never come from comfort zones.' },
  { text: 'Success is not final, failure is not fatal.' },
  { text: 'Hustle in silence. Let success make the noise.' },
  { text: 'The future depends on what you do today.' },
  { text: 'Believe you can and you\'re halfway there.' },
  { text: 'Make today so awesome that yesterday gets jealous.' },
  { text: 'Start where you are. Use what you have. Do what you can.' },
  { text: 'It always seems impossible until it\'s done.' },
  { text: 'Everything you can imagine is real.' },
  { text: 'Simplicity is the ultimate sophistication.' },
];

export interface MemePreset {
  id: string;
  name: string;
  emoji: string;
  topText: string;
  bottomText: string;
  background: BackgroundConfig;
  topStyle: Partial<TextElement>;
  bottomStyle: Partial<TextElement>;
}

export const MEME_PRESETS: MemePreset[] = [
  {
    id: 'drake',
    name: 'Drake Meme',
    emoji: '😏',
    topText: 'NOPE',
    bottomText: 'YEP',
    background: { type: 'solid', solidColor: '#FFFFFF', gradientStart: '#6366F1', gradientEnd: '#06B6D4', gradientDirection: 'to right', gradientType: 'linear', imageUrl: '', templateId: '' },
    topStyle: { fontSize: 72, fontFamily: 'Impact', fontColor: '#000000', fontWeight: 700, fontStyle: 'normal', textAlign: 'center', fillGradientEnable: false, fillGradientStart: '#6366F1', fillGradientEnd: '#06B6D4', textShadowEnabled: false, textShadowColor: '#000000', textShadowBlur: 0, textShadowOffsetX: 0, textShadowOffsetY: 0, textStrokeEnabled: true, textStrokeColor: '#FFFFFF', textStrokeWidth: 3, letterSpacing: 2, lineHeight: 1, width: 0 },
    bottomStyle: { fontSize: 72, fontFamily: 'Impact', fontColor: '#000000', fontWeight: 700, fontStyle: 'normal', textAlign: 'center', fillGradientEnable: false, fillGradientStart: '#6366F1', fillGradientEnd: '#06B6D4', textShadowEnabled: false, textShadowColor: '#000000', textShadowBlur: 0, textShadowOffsetX: 0, textShadowOffsetY: 0, textStrokeEnabled: true, textStrokeColor: '#FFFFFF', textStrokeWidth: 3, letterSpacing: 2, lineHeight: 1, width: 0 },
  },
  {
    id: ' motivational-dark',
    name: 'Dark Motivation',
    emoji: '🌙',
    topText: '',
    bottomText: 'THE GRIND DOESN\'T STOP',
    background: { type: 'gradient', solidColor: '#FFFFFF', gradientStart: '#161A2B', gradientEnd: '#3A4158', gradientDirection: 'to bottom', gradientType: 'linear', imageUrl: '', templateId: '' },
    topStyle: { fontSize: 48, fontFamily: 'Bebas Neue', fontColor: '#FFFFFF', fontWeight: 400, fontStyle: 'normal', textAlign: 'center', fillGradientEnable: false, fillGradientStart: '#6366F1', fillGradientEnd: '#06B6D4', textShadowEnabled: false, textShadowColor: '#000000', textShadowBlur: 0, textShadowOffsetX: 0, textShadowOffsetY: 0, textStrokeEnabled: false, textStrokeColor: '#000000', textStrokeWidth: 0, letterSpacing: 6, lineHeight: 1, width: 0 },
    bottomStyle: { fontSize: 48, fontFamily: 'Bebas Neue', fontColor: '#FFFFFF', fontWeight: 400, fontStyle: 'normal', textAlign: 'center', fillGradientEnable: true, fillGradientStart: '#6366F1', fillGradientEnd: '#06B6D4', textShadowEnabled: true, textShadowColor: '#000000', textShadowBlur: 8, textShadowOffsetX: 0, textShadowOffsetY: 4, textStrokeEnabled: false, textStrokeColor: '#000000', textStrokeWidth: 0, letterSpacing: 6, lineHeight: 1, width: 0 },
  },
  {
    id: 'neon-quote',
    name: 'Neon Quote',
    emoji: '💜',
    topText: '',
    bottomText: 'CREATE YOUR OWN MAGIC',
    background: { type: 'gradient', solidColor: '#FFFFFF', gradientStart: '#6366F1', gradientEnd: '#EC4899', gradientDirection: 'to bottom right', gradientType: 'linear', imageUrl: '', templateId: '' },
    topStyle: { fontSize: 36, fontFamily: 'Inter', fontColor: '#FFFFFF', fontWeight: 600, fontStyle: 'normal', textAlign: 'center', fillGradientEnable: false, fillGradientStart: '#6366F1', fillGradientEnd: '#06B6D4', textShadowEnabled: false, textShadowColor: '#000000', textShadowBlur: 0, textShadowOffsetX: 0, textShadowOffsetY: 0, textStrokeEnabled: false, textStrokeColor: '#000000', textStrokeWidth: 0, letterSpacing: 0, lineHeight: 1.2, width: 0 },
    bottomStyle: { fontSize: 56, fontFamily: 'Archivo Black', fontColor: '#FFFFFF', fontWeight: 400, fontStyle: 'normal', textAlign: 'center', fillGradientEnable: false, fillGradientStart: '#6366F1', fillGradientEnd: '#06B6D4', textShadowEnabled: true, textShadowColor: 'rgba(0,0,0,0.5)', textShadowBlur: 12, textShadowOffsetX: 0, textShadowOffsetY: 4, textStrokeEnabled: false, textStrokeColor: '#000000', textStrokeWidth: 0, letterSpacing: 3, lineHeight: 1.2, width: 800 },
  },
  {
    id: 'bold-statement',
    name: 'Bold Statement',
    emoji: '🔥',
    topText: '',
    bottomText: 'NEW DROP\nCOMING SOON',
    background: { type: 'solid', solidColor: '#000000', gradientStart: '#6366F1', gradientEnd: '#06B6D4', gradientDirection: 'to right', gradientType: 'linear', imageUrl: '', templateId: '' },
    topStyle: { fontSize: 36, fontFamily: 'Inter', fontColor: '#FFFFFF', fontWeight: 600, fontStyle: 'normal', textAlign: 'center', fillGradientEnable: false, fillGradientStart: '#6366F1', fillGradientEnd: '#06B6D4', textShadowEnabled: false, textShadowColor: '#000000', textShadowBlur: 0, textShadowOffsetX: 0, textShadowOffsetY: 0, textStrokeEnabled: false, textStrokeColor: '#000000', textStrokeWidth: 0, letterSpacing: 0, lineHeight: 1.2, width: 0 },
    bottomStyle: { fontSize: 80, fontFamily: 'Oswald', fontColor: '#FFFFFF', fontWeight: 700, fontStyle: 'normal', textAlign: 'center', fillGradientEnable: true, fillGradientStart: '#F59E0B', fillGradientEnd: '#EF4444', textShadowEnabled: false, textShadowColor: '#000000', textShadowBlur: 0, textShadowOffsetX: 0, textShadowOffsetY: 0, textStrokeEnabled: false, textStrokeColor: '#000000', textStrokeWidth: 0, letterSpacing: 4, lineHeight: 1.1, width: 800 },
  },
  {
    id: 'aesthetic-minimal',
    name: 'Aesthetic Minimal',
    emoji: '✨',
    topText: '',
    bottomText: 'less is more',
    background: { type: 'solid', solidColor: '#F8F9FC', gradientStart: '#6366F1', gradientEnd: '#06B6D4', gradientDirection: 'to right', gradientType: 'linear', imageUrl: '', templateId: '' },
    topStyle: { fontSize: 48, fontFamily: 'Inter', fontColor: '#161A2B', fontWeight: 600, fontStyle: 'normal', textAlign: 'center', fillGradientEnable: false, fillGradientStart: '#6366F1', fillGradientEnd: '#06B6D4', textShadowEnabled: false, textShadowColor: '#000000', textShadowBlur: 0, textShadowOffsetX: 0, textShadowOffsetY: 0, textStrokeEnabled: false, textStrokeColor: '#000000', textStrokeWidth: 0, letterSpacing: 0, lineHeight: 1.2, width: 0 },
    bottomStyle: { fontSize: 64, fontFamily: 'Space Grotesk', fontColor: '#161A2B', fontWeight: 300, fontStyle: 'normal', textAlign: 'center', fillGradientEnable: false, fillGradientStart: '#6366F1', fillGradientEnd: '#06B6D4', textShadowEnabled: false, textShadowColor: '#000000', textShadowBlur: 0, textShadowOffsetX: 0, textShadowOffsetY: 0, textStrokeEnabled: false, textStrokeColor: '#000000', textStrokeWidth: 0, letterSpacing: 8, lineHeight: 1, width: 600 },
  },
];

export const QUICK_TEXT_STYLES: { id: string; name: string; emoji: string; style: Partial<TextElement>; bg?: BackgroundConfig }[] = [
  {
    id: 'meme-impact',
    name: 'Meme Classic',
    emoji: '😂',
    style: { fontSize: 64, fontFamily: 'Impact', fontColor: '#FFFFFF', fontWeight: 700, fontStyle: 'normal', textAlign: 'center', textStrokeEnabled: true, textStrokeColor: '#000000', textStrokeWidth: 3, letterSpacing: 1, lineHeight: 1.1, width: 0 },
  },
  {
    id: 'neon-glow',
    name: 'Neon Glow',
    emoji: '💜',
    style: { fontSize: 48, fontFamily: 'Space Grotesk', fontColor: '#FFFFFF', fontWeight: 600, fontStyle: 'normal', textAlign: 'center', fillGradientEnable: true, fillGradientStart: '#6366F1', fillGradientEnd: '#EC4899', textShadowEnabled: true, textShadowColor: '#6366F1', textShadowBlur: 20, textShadowOffsetX: 0, textShadowOffsetY: 0, letterSpacing: 2, lineHeight: 1.2, width: 0 },
    bg: { type: 'gradient', solidColor: '#FFFFFF', gradientStart: '#161A2B', gradientEnd: '#3A4158', gradientDirection: 'to bottom', gradientType: 'linear', imageUrl: '', templateId: '' },
  },
  {
    id: 'bold-black',
    name: 'Bold Black',
    emoji: '⬛',
    style: { fontSize: 72, fontFamily: 'Archivo Black', fontColor: '#000000', fontWeight: 400, fontStyle: 'normal', textAlign: 'center', letterSpacing: 2, lineHeight: 1.1, width: 0 },
  },
  {
    id: 'clean-white',
    name: 'Clean White',
    emoji: '⬜',
    style: { fontSize: 48, fontFamily: 'Inter', fontColor: '#FFFFFF', fontWeight: 600, fontStyle: 'normal', textAlign: 'center', letterSpacing: 0, lineHeight: 1.2, width: 0 },
    bg: { type: 'solid', solidColor: '#161A2B', gradientStart: '#161A2B', gradientEnd: '#3A4158', gradientDirection: 'to bottom', gradientType: 'linear', imageUrl: '', templateId: '' },
  },
  {
    id: 'gradient-pop',
    name: 'Gradient Pop',
    emoji: '🎨',
    style: { fontSize: 56, fontFamily: 'Poppins', fontColor: '#FFFFFF', fontWeight: 700, fontStyle: 'normal', textAlign: 'center', fillGradientEnable: true, fillGradientStart: '#F59E0B', fillGradientEnd: '#EF4444', letterSpacing: 1, lineHeight: 1.1, width: 0 },
  },
  {
    id: 'elegant-serif',
    name: 'Elegant Serif',
    emoji: '📜',
    style: { fontSize: 40, fontFamily: 'Playfair Display', fontColor: '#161A2B', fontWeight: 400, fontStyle: 'italic', textAlign: 'center', letterSpacing: 0, lineHeight: 1.4, width: 0 },
  },
];

export function generateId(): string {
  return Math.random().toString(36).substring(2, 11);
}