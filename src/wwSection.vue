<template>
  <div class="navigation-section" :data-theme="currentTheme" :style="cssVars">

    <!-- TOPBAR -->
    <header class="topbar">
      <div class="toggle-wrapper">
        <wwLayout path="menuToggleZone" direction="row" class="toggle-layout-zone" />
      </div>

      <wwLayout path="topbarZone" direction="row" class="topbar-layout-zone" />

      <div class="topbar-actions">
        <button class="theme-toggle" @click="toggleTheme" :title="currentTheme === 'dark' ? 'Switch to light' : 'Switch to dark'">
          <span v-if="currentTheme === 'dark'" class="theme-icon" v-html="getIconHtml('lucide:sun')"></span>
          <span v-else class="theme-icon" v-html="getIconHtml('lucide:moon')"></span>
        </button>
      </div>
    </header>

    <!-- MOBILE OVERLAY -->
    <transition name="overlay-fade">
      <div
        v-if="isMobile && content.isMobileMenuOpen"
        class="sidebar-overlay"
        @click="closeMobileMenu"
        @touchmove.prevent
        @wheel.prevent
      >
        <wwLayout path="overlayZone" class="overlay-layout-zone" />
      </div>
    </transition>

    <!-- SIDEBAR -->
    <aside class="sidebar" :class="sidebarClasses">
      <!-- Built-in Navigation -->
      <nav v-if="navItems && navItems.length" class="sidebar-nav">
        <button
          v-for="(item, i) in navItems"
          :key="i"
          class="nav-btn"
          :class="{ active: item.isActive }"
          @click="handleNavClick(item, i)"
          :title="isCollapsed ? item.label : ''"
        >
          <span
            class="nav-icon"
            v-html="getIconHtml(item.icon)"
            :style="{ width: content.navIconSize || '18px', height: content.navIconSize || '18px' }"
          ></span>
          <span class="nav-label">{{ item.label }}</span>
        </button>
      </nav>

      <!-- Extra content dropzone -->
      <div class="sidebar-extra">
        <wwLayout path="sidebarZone" direction="column" class="sidebar-layout-zone" />
      </div>

      <!-- Spacer pushes user block to bottom -->
      <div class="sidebar-spacer"></div>

      <!-- User Block -->
      <div v-if="content.showUserBlock !== false" class="user-block">
        <div class="user-avatar" :title="userName">{{ userInitials }}</div>
        <div class="user-info">
          <div class="user-name">{{ userName }}</div>
          <div class="user-email">{{ userEmail }}</div>
        </div>
        <button class="logout-btn" @click="handleLogout" :title="content.logoutLabel || 'Wyloguj'">
          <span
            class="logout-icon"
            v-html="getIconHtml(content.logoutIcon || 'lucide:log-out')"
          ></span>
        </button>
      </div>
    </aside>

  </div>
</template>

<script>
import { createClient } from '@supabase/supabase-js';

export default {
  props: {
    content: { type: Object, required: true },
  },
  data() {
    return {
      windowWidth: typeof window !== 'undefined' ? window.innerWidth : 1200,
      currentTheme: 'dark',
      supabase: null,
      userName: '',
      userEmail: '',
      _initInProgress: false,
    };
  },
  computed: {
    isMobile() {
      return this.windowWidth < 992;
    },
    isCollapsed() {
      return !this.isMobile && this.content.isSidebarCollapsed;
    },
    sidebarClasses() {
      return {
        'is-pc-collapsed': this.isCollapsed,
        'is-mobile-open': this.isMobile && this.content.isMobileMenuOpen,
      };
    },
    navItems() {
      return this.content.navItems || [];
    },
    userInitials() {
      if (!this.userName) return '?';
      return this.userName
        .split(' ')
        .map(w => w[0])
        .join('')
        .substring(0, 2)
        .toUpperCase();
    },
    topbarShadowValue() {
      const s = this.content.topbarShadow || 'sm';
      if (s === 'none') return 'none';
      if (s === 'md') return '0 2px 8px rgba(0,0,0,0.15)';
      return '0 1px 3px rgba(0,0,0,0.1)';
    },
    cssVars() {
      const c = this.content;
      return {
        '--sidebar-width': c.sidebarWidth || '260px',
        '--sidebar-collapsed-width': c.sidebarCollapsedWidth || '68px',
        '--topbar-height': c.topbarHeight || '56px',
        '--anim-duration': c.animationDuration || '300ms',
        '--anim-timing': c.animationTimingFunction || 'cubic-bezier(0.16,1,0.3,1)',
        '--sidebar-bg': c.sidebarBgColor || 'var(--_sidebar-bg)',
        '--topbar-bg': c.topbarBgColor || 'var(--_topbar-bg)',
        '--overlay-bg': c.overlayColor || 'var(--_overlay-bg)',
        '--accent': c.accentColor || '#4B8765',
        '--sidebar-border-color': c.sidebarBorderColor || 'var(--border)',
        '--topbar-border-color': c.topbarBorderColor || 'var(--border)',
        '--topbar-blur': c.topbarBlur || '12px',
        '--topbar-shadow': this.topbarShadowValue,
        '--scrollbar-thumb': c.scrollbarColor || 'var(--_scrollbar-thumb)',
        '--nav-icon-size': c.navIconSize || '18px',
        '--nav-icon-color': c.navIconColor || 'var(--nav-inactive)',
        '--nav-active-color': c.navActiveColor || 'var(--_nav-active-color)',
        '--nav-active-bg': c.navActiveBg || 'var(--_nav-active-bg)',
        '--nav-hover-bg': c.navHoverBg || 'var(--_nav-hover-bg)',
      };
    },
  },
  watch: {
    'content.isMobileMenuOpen'() {
      this.checkScrollLock();
    },
    isMobile() {
      this.checkScrollLock();
    },
    'content.supabaseUrl'() { this.initSupabase(); },
    'content.supabaseAnonKey'() { this.initSupabase(); },
    'content.theme'(val) {
      if (val && val !== this.currentTheme) {
        this.currentTheme = val;
        localStorage.setItem('app-theme', val);
      }
    },
  },
  mounted() {
    // Theme: read from localStorage first, then config, then default
    const stored = localStorage.getItem('app-theme');
    this.currentTheme = stored || this.content?.theme || 'dark';

    window.addEventListener('resize', this.handleResize);
    window.addEventListener('storage', this.handleStorageChange);
    this.checkScrollLock();
    this.initSupabase();

    // Retry init after short delays (WeWeb plugins may load late)
    setTimeout(() => { if (!this.supabase) this.initSupabase(); }, 1000);
    setTimeout(() => { if (!this.supabase) this.initSupabase(); }, 3000);
  },
  unmounted() {
    window.removeEventListener('resize', this.handleResize);
    window.removeEventListener('storage', this.handleStorageChange);
    this.unlockScroll();
  },
  methods: {
    // --- Resize & Scroll ---
    handleResize() {
      this.windowWidth = window.innerWidth;
    },
    closeMobileMenu(e) {
      if (e) e.stopPropagation();
      this.$emit('trigger-event', { name: 'overlayClick' });
    },
    checkScrollLock() {
      if (this.isMobile && this.content.isMobileMenuOpen) {
        this.lockScroll();
      } else {
        this.unlockScroll();
      }
    },
    lockScroll() {
      document.body.style.setProperty('overflow', 'hidden', 'important');
      document.documentElement.style.setProperty('overflow', 'hidden', 'important');
      const appEl = document.getElementById('app');
      if (appEl) appEl.style.setProperty('overflow', 'hidden', 'important');
    },
    unlockScroll() {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
      const appEl = document.getElementById('app');
      if (appEl) appEl.style.overflow = '';
    },

    // --- Theme ---
    toggleTheme() {
      this.currentTheme = this.currentTheme === 'dark' ? 'light' : 'dark';
      localStorage.setItem('app-theme', this.currentTheme);
      this.$emit('trigger-event', { name: 'themeChange', event: { theme: this.currentTheme } });
    },
    handleStorageChange(e) {
      if (e.key === 'app-theme' && e.newValue) {
        this.currentTheme = e.newValue;
      }
    },

    // --- Navigation ---
    handleNavClick(item, index) {
      this.$emit('trigger-event', {
        name: 'navClick',
        event: { url: item.url, label: item.label, index },
      });
    },

    // --- Supabase ---
    async initSupabase() {
      if (this._initInProgress) return;
      this._initInProgress = true;
      try {
        // Try WeWeb Supabase plugin first
        if (typeof wwLib !== 'undefined') {
          const inst =
            wwLib?.wwPlugins?.supabase?.instance ||
            wwLib?.wwPlugins?.supabaseAuth?.publicInstance;
          if (inst) {
            this.supabase = inst;
            await this.loadUser();
            return;
          }
        }
        // Fallback: manual connection
        const u = this.content.supabaseUrl;
        const k = this.content.supabaseAnonKey;
        if (u && k) {
          this.supabase = createClient(u, k);
          await this.loadUser();
          return;
        }
        this.supabase = null;
      } catch (e) {
        console.warn('[Menu] Supabase init failed:', e.message);
      } finally {
        this._initInProgress = false;
      }
    },
    async loadUser() {
      if (!this.supabase) return;
      try {
        const { data } = await this.supabase.auth.getUser();
        const user = data?.user;
        if (user) {
          this.userName = user.user_metadata?.full_name || user.email?.split('@')[0] || '';
          this.userEmail = user.email || '';
        }
      } catch (e) {
        console.warn('[Menu] loadUser failed:', e.message);
      }
    },
    async handleLogout() {
      this.$emit('trigger-event', { name: 'logout' });
      if (this.supabase) {
        try {
          await this.supabase.auth.signOut();
        } catch (e) {
          console.warn('[Menu] signOut failed:', e.message);
        }
      }
    },

    // --- Icons ---
    getIconHtml(val) {
      if (!val) return '';
      const s = String(val).replace(/\//g, ':');
      if (!/^[a-zA-Z0-9:\-]+$/.test(s)) return '';
      return `<img src="https://api.iconify.design/${s}.svg" style="width:100%;height:100%;object-fit:contain"/>`;
    },
  },
};
</script>

<style scoped>
/* ═══════════════════════════════════════════════════
   DARK THEME — matches admin panel design system
   ═══════════════════════════════════════════════════ */
.navigation-section[data-theme="dark"] {
  --_sidebar-bg: #141416;
  --_topbar-bg: #141416;
  --_overlay-bg: rgba(0, 0, 0, 0.65);
  --_scrollbar-thumb: #27272a;
  --_nav-active-color: #6BAA85;
  --_nav-active-bg: rgba(75, 135, 101, 0.12);
  --_nav-hover-bg: rgba(75, 135, 101, 0.06);

  --accent: #4B8765;
  --accent-hover: rgba(75, 135, 101, 0.10);
  --bg: #111113;
  --bg-raised: #18181b;
  --card-bg: #1c1c20;
  --border: #27272a;
  --border-light: rgba(255, 255, 255, 0.04);
  --text: #ececec;
  --text-secondary: #a1a1aa;
  --text-muted: #71717a;
  --font: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  --body-size: 13px;
  --small-size: 11px;
  --sp-xs: 4px;
  --sp-sm: 8px;
  --sp-md: 16px;
  --sp-lg: 24px;
  --btn-radius: 8px;
  --nav-inactive: #71717a;

  color-scheme: dark;
}

/* ═══════════════════════════════════════════════════
   LIGHT THEME — matches admin panel design system
   ═══════════════════════════════════════════════════ */
.navigation-section[data-theme="light"] {
  --_sidebar-bg: #ffffff;
  --_topbar-bg: rgba(255, 255, 255, 0.85);
  --_overlay-bg: rgba(0, 0, 0, 0.35);
  --_scrollbar-thumb: #d4d4d8;
  --_nav-active-color: #3d7254;
  --_nav-active-bg: rgba(75, 135, 101, 0.08);
  --_nav-hover-bg: rgba(75, 135, 101, 0.04);

  --accent: #4B8765;
  --accent-hover: rgba(75, 135, 101, 0.08);
  --bg: #f8f9fa;
  --bg-raised: #ffffff;
  --card-bg: #ffffff;
  --border: #e4e4e7;
  --border-light: #f4f4f5;
  --text: #18181b;
  --text-secondary: #52525b;
  --text-muted: #71717a;
  --font: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  --body-size: 13px;
  --small-size: 11px;
  --sp-xs: 4px;
  --sp-sm: 8px;
  --sp-md: 16px;
  --sp-lg: 24px;
  --btn-radius: 8px;
  --nav-inactive: #71717a;

  color-scheme: light;
}

/* Light theme specific shadows */
.navigation-section[data-theme="light"] .topbar {
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.06);
}
.navigation-section[data-theme="light"] .sidebar {
  box-shadow: 1px 0 3px rgba(0, 0, 0, 0.04);
}

/* ═══════════════════════════════════════════════════
   BASE CONTAINER
   ═══════════════════════════════════════════════════ */
.navigation-section {
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 0;
  z-index: 9000;
  font-family: var(--font);
  font-size: var(--body-size);
  color: var(--text);
  pointer-events: none;
}

.topbar,
.sidebar,
.sidebar-overlay {
  pointer-events: auto;
}

/* ═══════════════════════════════════════════════════
   TOPBAR
   ═══════════════════════════════════════════════════ */
.topbar {
  display: flex;
  flex-direction: row;
  align-items: stretch;
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: var(--topbar-height);
  background: var(--topbar-bg);
  backdrop-filter: blur(var(--topbar-blur));
  -webkit-backdrop-filter: blur(var(--topbar-blur));
  border-bottom: 1px solid var(--topbar-border-color);
  box-shadow: var(--topbar-shadow);
  box-sizing: border-box;
  z-index: 1005;
  padding: 0;
  transition: background var(--anim-duration) var(--anim-timing),
              box-shadow var(--anim-duration) var(--anim-timing);
}

.toggle-wrapper {
  display: flex;
  align-items: stretch;
}

.toggle-layout-zone {
  display: flex;
  flex-direction: row;
  min-height: 100%;
}

.topbar-layout-zone {
  flex-grow: 1;
  display: flex;
  flex-direction: row;
  height: 100%;
  align-items: stretch;
}

.topbar-actions {
  display: flex;
  align-items: center;
  gap: var(--sp-sm);
  padding: 0 var(--sp-md);
  flex-shrink: 0;
}

/* Theme Toggle Button */
.theme-toggle {
  width: 36px;
  height: 36px;
  border-radius: var(--btn-radius);
  background: transparent;
  border: 1px solid var(--border);
  color: var(--text-muted);
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  transition: all var(--anim-duration) var(--anim-timing);
  padding: 0;
  flex-shrink: 0;
}

.theme-toggle:hover {
  border-color: var(--accent);
  color: var(--text);
  background: var(--accent-hover);
}

.theme-icon {
  width: 18px;
  height: 18px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  line-height: 0;
}

.theme-icon :deep(img) {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

/* ═══════════════════════════════════════════════════
   SIDEBAR
   ═══════════════════════════════════════════════════ */
.sidebar {
  display: flex;
  flex-direction: column;
  position: fixed;
  top: var(--topbar-height);
  left: 0;
  width: var(--sidebar-width);
  height: calc(100vh - var(--topbar-height));
  height: calc(100dvh - var(--topbar-height));
  background: var(--sidebar-bg);
  border-right: 1px solid var(--sidebar-border-color);
  box-sizing: border-box;
  z-index: 1000;
  transition: width var(--anim-duration) var(--anim-timing),
              transform var(--anim-duration) var(--anim-timing),
              background var(--anim-duration) var(--anim-timing);
  overflow-y: auto;
  overflow-x: hidden;
  overscroll-behavior: contain;
}

/* Collapsed sidebar (PC) */
.sidebar.is-pc-collapsed {
  width: var(--sidebar-collapsed-width);
}

.sidebar.is-pc-collapsed .nav-label,
.sidebar.is-pc-collapsed .user-info,
.sidebar.is-pc-collapsed .sidebar-extra {
  opacity: 0;
  width: 0;
  overflow: hidden;
  white-space: nowrap;
  transition: opacity var(--anim-duration) var(--anim-timing);
}

.sidebar.is-pc-collapsed .nav-btn {
  justify-content: center;
  padding: 10px;
}

.sidebar.is-pc-collapsed .user-block {
  justify-content: center;
  padding: var(--sp-sm);
}

.sidebar.is-pc-collapsed .user-avatar {
  margin: 0;
}

.sidebar.is-pc-collapsed .logout-btn {
  display: none;
}

/* ═══════════════════════════════════════════════════
   SIDEBAR NAV
   ═══════════════════════════════════════════════════ */
.sidebar-nav {
  padding: var(--sp-sm);
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.nav-btn {
  display: flex;
  align-items: center;
  gap: 10px;
  width: 100%;
  padding: 10px 12px;
  background: transparent;
  border: 0;
  border-radius: var(--btn-radius);
  cursor: pointer;
  color: var(--nav-inactive);
  font-size: var(--body-size);
  font-family: var(--font);
  text-align: left;
  transition: all 150ms var(--anim-timing);
  white-space: nowrap;
  overflow: hidden;
}

.nav-btn:hover {
  background: var(--nav-hover-bg);
  color: var(--text);
}

.nav-btn.active {
  background: var(--nav-active-bg);
  color: var(--nav-active-color);
  font-weight: 600;
}

.nav-btn:focus-visible {
  outline: 2px solid var(--accent);
  outline-offset: 2px;
}

.nav-icon {
  width: var(--nav-icon-size);
  height: var(--nav-icon-size);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  line-height: 0;
  opacity: 0.8;
}

.nav-btn.active .nav-icon {
  opacity: 1;
}

.nav-icon :deep(img) {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.nav-label {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  transition: opacity var(--anim-duration) var(--anim-timing);
}

/* ═══════════════════════════════════════════════════
   SIDEBAR EXTRA & SPACER
   ═══════════════════════════════════════════════════ */
.sidebar-extra {
  transition: opacity var(--anim-duration) var(--anim-timing);
}

.sidebar-layout-zone {
  display: flex;
  flex-direction: column;
  width: 100%;
}

.sidebar-spacer {
  flex: 1;
  min-height: var(--sp-sm);
}

/* ═══════════════════════════════════════════════════
   USER BLOCK
   ═══════════════════════════════════════════════════ */
.user-block {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px;
  border-top: 1px solid var(--border);
  transition: all var(--anim-duration) var(--anim-timing);
}

.user-avatar {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: var(--accent);
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 11px;
  font-weight: 700;
  flex-shrink: 0;
  letter-spacing: 0.5px;
}

.user-info {
  flex: 1;
  min-width: 0;
  overflow: hidden;
  transition: opacity var(--anim-duration) var(--anim-timing);
}

.user-name {
  font-size: var(--body-size);
  font-weight: 600;
  color: var(--text);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.user-email {
  font-size: var(--small-size);
  color: var(--text-muted);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-top: 1px;
}

.logout-btn {
  width: 32px;
  height: 32px;
  border-radius: var(--btn-radius);
  background: transparent;
  border: 1px solid transparent;
  color: var(--text-muted);
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  transition: all 150ms var(--anim-timing);
  padding: 0;
  flex-shrink: 0;
}

.logout-btn:hover {
  border-color: #ef4444;
  color: #ef4444;
  background: rgba(239, 68, 68, 0.08);
}

.logout-icon {
  width: 16px;
  height: 16px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  line-height: 0;
}

.logout-icon :deep(img) {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

/* ═══════════════════════════════════════════════════
   OVERLAY
   ═══════════════════════════════════════════════════ */
.sidebar-overlay {
  position: fixed;
  inset: 0;
  width: 100vw;
  height: 100vh;
  height: 100dvh;
  background: var(--overlay-bg);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  z-index: 999;
  cursor: pointer;
  display: flex;
  overscroll-behavior: none;
}

.overlay-layout-zone {
  flex-grow: 1;
  width: 100%;
  height: 100%;
}

/* Overlay fade transition */
.overlay-fade-enter-active {
  animation: fadeIn var(--anim-duration) var(--anim-timing);
}
.overlay-fade-leave-active {
  animation: fadeOut var(--anim-duration) ease-in forwards;
}

/* ═══════════════════════════════════════════════════
   ANIMATIONS
   ═══════════════════════════════════════════════════ */
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes fadeOut {
  from { opacity: 1; }
  to { opacity: 0; }
}

/* ═══════════════════════════════════════════════════
   MOBILE RESPONSIVENESS
   ═══════════════════════════════════════════════════ */
@media (max-width: 991px) {
  .sidebar {
    top: var(--topbar-height);
    height: calc(100vh - var(--topbar-height));
    height: calc(100dvh - var(--topbar-height));
    transform: translateX(-100%);
    box-shadow: 4px 0 16px rgba(0, 0, 0, 0.15);
    z-index: 1000;
  }

  .sidebar.is-mobile-open {
    transform: translateX(0);
  }

  /* On mobile, always show labels (not collapsed) */
  .sidebar .nav-label,
  .sidebar .user-info,
  .sidebar .sidebar-extra {
    opacity: 1 !important;
    width: auto !important;
    overflow: visible !important;
  }
  .sidebar .nav-btn {
    justify-content: flex-start !important;
    padding: 10px 12px !important;
  }
  .sidebar .user-block {
    justify-content: flex-start !important;
    padding: 12px !important;
  }
  .sidebar .logout-btn {
    display: inline-flex !important;
  }
}

/* ═══════════════════════════════════════════════════
   SCROLLBAR
   ═══════════════════════════════════════════════════ */
.sidebar::-webkit-scrollbar { width: 5px; }
.sidebar::-webkit-scrollbar-track { background: transparent; }
.sidebar::-webkit-scrollbar-thumb { background: var(--scrollbar-thumb); border-radius: 3px; }
.sidebar::-webkit-scrollbar-thumb:hover { background: var(--text-muted); }
</style>
