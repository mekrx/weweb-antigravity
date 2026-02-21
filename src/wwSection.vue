<template>
  <div class="weweb-crm-section" :style="cssVars">
    
    <!-- DESKTOP / TABLET LANDSCAPE: SIDEBAR -->
    <nav class="sidebar" :class="{ 'is-collapsed': isCollapsed }" v-if="!isMobile">
      <div class="sidebar-header">
        <button class="toggle-btn" @click="toggleSidebar" :style="{ color: content.iconColor }">
          <i class="fas fa-bars"></i>
        </button>
      </div>

      <div class="menu-items">
        <a 
          v-for="(item, index) in content.menuItems" 
          :key="index"
          :href="item.link"
          class="menu-item"
        >
          <div class="icon-wrapper">
            <i :class="item.icon" :style="{ color: content.iconColor }"></i>
          </div>
          <span v-if="!isCollapsed" class="item-text" :style="{ color: content.textColor }">
            {{ item.text }}
          </span>
        </a>
      </div>
    </nav>

    <!-- MOBILE / TABLET PORTRAIT: TOPBAR -->
    <nav class="topbar" v-if="isMobile">
      <div class="topbar-header">
        <button class="toggle-btn" @click="toggleMobileMenu" :style="{ color: content.iconColor }">
          <i class="fas fa-bars"></i>
        </button>
        <span class="topbar-title" v-if="!isMobileMenuOpen" :style="{ color: content.textColor }">
          CRM Menu
        </span>
      </div>

      <div class="mobile-dropdown" v-if="isMobileMenuOpen">
        <a 
          v-for="(item, index) in content.menuItems" 
          :key="index"
          :href="item.link"
          class="mobile-menu-item"
        >
          <i :class="item.icon" :style="{ color: content.iconColor }" class="mobile-icon"></i>
          <span class="item-text" :style="{ color: content.textColor }">
            {{ item.text }}
          </span>
        </a>
      </div>
    </nav>

    <!-- MAIN CONTENT CONTAINER -->
    <main class="main-content" :class="{ 'mobile-margin': isMobile }">
      <!-- WeWeb layout zone for drag-and-drop components -->
      <wwLayout path="contentZone" class="content-zone" />
    </main>
    
  </div>
</template>

<script>
export default {
  props: {
    content: { type: Object, required: true },
    /* WeWeb automatically passes global props like wwFront, isEditing etc. */
  },
  data() {
    return {
      isCollapsed: false,
      isMobileMenuOpen: false,
      windowWidth: window.innerWidth,
    };
  },
  computed: {
    isMobile() {
      // 992px breakpoint for responsive behavior (Mobile and small tablets)
      return this.windowWidth < 992;
    },
    cssVars() {
      return {
        '--menu-width': this.content.menuWidth || '260px',
        '--menu-bg': this.content.menuBgColor || '#ffffff',
        '--content-bg': this.content.contentBgColor || '#F3F4F6',
        '--text-color': this.content.textColor || '#374151',
        '--icon-color': this.content.iconColor || '#6B7280',
        '--menu-padding': this.content.menuPadding || '16px',
        '--content-padding': this.content.contentPadding || '32px',
        '--font-size': this.content.fontSize || '15px'
      };
    }
  },
  mounted() {
    window.addEventListener('resize', this.handleResize);
  },
  unmounted() {
    window.removeEventListener('resize', this.handleResize);
  },
  methods: {
    toggleSidebar() {
      this.isCollapsed = !this.isCollapsed;
    },
    toggleMobileMenu() {
      this.isMobileMenuOpen = !this.isMobileMenuOpen;
    },
    handleResize() {
      this.windowWidth = window.innerWidth;
      // Auto-close mobile dropdown when resizing to desktop
      if (!this.isMobile && this.isMobileMenuOpen) {
        this.isMobileMenuOpen = false;
      }
    }
  }
};
</script>

<style scoped>
.weweb-crm-section {
  display: flex;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  font-family: inherit;
  font-size: var(--font-size);
  background-color: var(--content-bg);
}

/* SIDEBAR (DESKTOP) */
.sidebar {
  display: flex;
  flex-direction: column;
  width: var(--menu-width);
  height: 100vh;
  background-color: var(--menu-bg);
  padding: var(--menu-padding);
  box-sizing: border-box;
  transition: width 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 2px 0 8px rgba(0,0,0,0.05);
  flex-shrink: 0;
  z-index: 10;
}

.sidebar.is-collapsed {
  width: calc(48px + (var(--menu-padding) * 2));
}

.sidebar-header {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin-bottom: 32px;
}

.sidebar.is-collapsed .sidebar-header {
  justify-content: center;
}

.toggle-btn {
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 8px;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.2s;
}

.toggle-btn:hover {
  background-color: rgba(0,0,0,0.05);
}

.toggle-btn i {
  font-size: 1.25em;
}

.menu-items {
  display: flex;
  flex-direction: column;
  gap: 8px;
  overflow-y: auto;
  overflow-x: hidden;
}

.menu-item {
  display: flex;
  align-items: center;
  text-decoration: none;
  padding: 10px 12px;
  border-radius: 8px;
  transition: background-color 0.2s;
  cursor: pointer;
}

.sidebar.is-collapsed .menu-item {
  justify-content: center;
}

.menu-item:hover {
  background-color: rgba(0,0,0,0.04);
}

.icon-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
}

.icon-wrapper i {
  font-size: 1.2em;
}

.item-text {
  margin-left: 16px;
  font-weight: 500;
  white-space: nowrap;
  opacity: 1;
  transition: opacity 0.2s;
}

/* TOPBAR (MOBILE) */
.topbar {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  background-color: var(--menu-bg);
  box-shadow: 0 2px 8px rgba(0,0,0,0.05);
  z-index: 20;
  display: flex;
  flex-direction: column;
}

.topbar-header {
  display: flex;
  align-items: center;
  height: 60px;
  padding: 0 var(--menu-padding);
}

.topbar-title {
  margin-left: 16px;
  font-weight: 600;
  font-size: 1.1em;
}

.mobile-dropdown {
  display: flex;
  flex-direction: column;
  padding: var(--menu-padding);
  border-top: 1px solid rgba(0,0,0,0.05);
  background-color: var(--menu-bg);
}

.mobile-menu-item {
  display: flex;
  align-items: center;
  padding: 14px 12px;
  text-decoration: none;
  border-radius: 6px;
}

.mobile-menu-item:hover {
  background-color: rgba(0,0,0,0.04);
}

.mobile-icon {
  width: 24px;
  text-align: center;
  font-size: 1.2em;
}

/* MAIN CONTENT */
.main-content {
  flex-grow: 1;
  height: 100vh;
  padding: var(--content-padding);
  box-sizing: border-box;
  overflow-y: auto;
  position: relative;
}

.main-content.mobile-margin {
  margin-top: 60px; /* Offset for topbar */
  height: calc(100vh - 60px);
}

.content-zone {
  width: 100%;
  min-height: 100%;
}

/* Scrollbar tweaks */
::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}
::-webkit-scrollbar-track {
  background: transparent;
}
::-webkit-scrollbar-thumb {
  background: rgba(0,0,0,0.15);
  border-radius: 4px;
}
::-webkit-scrollbar-thumb:hover {
  background: rgba(0,0,0,0.25);
}
</style>
