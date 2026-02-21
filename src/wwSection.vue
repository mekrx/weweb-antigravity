<template>
  <div class="dashboard-layout" :style="cssVars">
    
    <!-- TOPBAR (Full Width at Top) -->
    <header class="topbar">
      <!-- Universal Toggle Button Zone -->
      <div class="toggle-wrapper" @click="toggleSidebar">
        <!-- Render minimal height/width to make it easy to drop icons -->
        <wwLayout path="menuToggleZone" direction="row" class="toggle-layout-zone" />
      </div>

      <!-- Main Topbar content (e.g Header Title, Profile, Actions) -->
      <wwLayout path="topbarZone" direction="row" class="topbar-layout-zone" />
    </header>

    <!-- BOTTOM ROW (Sidebar + Content) -->
    <div class="row-wrapper">
      
      <!-- Mobile Overlay -->
      <div class="sidebar-overlay" v-if="isMobile && isMobileOpen" @click="toggleSidebar"></div>

      <!-- SIDEBAR -->
      <aside class="sidebar" :class="sidebarClasses">
        <wwLayout path="sidebarZone" direction="column" class="sidebar-layout-zone" />
      </aside>

      <!-- MAIN CONTENT -->
      <main class="main-content">
        <wwLayout path="contentZone" direction="column" class="content-layout-zone" />
      </main>
      
    </div>

  </div>
</template>

<script>
export default {
  props: {
    content: { type: Object, required: true }
  },
  data() {
    return {
      windowWidth: window.innerWidth,
      isPcCollapsed: false,
      isMobileOpen: false
    };
  },
  computed: {
    isMobile() {
      return this.windowWidth < 992;
    },
    sidebarClasses() {
      return {
        'is-pc-collapsed': !this.isMobile && this.isPcCollapsed,
        'is-mobile-open': this.isMobile && this.isMobileOpen
      };
    },
    cssVars() {
      return {
        '--sidebar-width': this.content.sidebarWidth || '280px',
        '--sidebar-collapsed-width': this.content.sidebarCollapsedWidth || '80px',
        '--topbar-height': this.content.topbarHeight || '70px',
        '--sidebar-bg': this.content.sidebarBgColor || '#ffffff',
        '--topbar-bg': this.content.topbarBgColor || '#ffffff',
        '--content-bg': this.content.contentBgColor || '#F3F4F6',
        '--overlay-bg': this.content.overlayColor || 'rgba(0,0,0,0.4)',
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
    handleResize() {
      this.windowWidth = window.innerWidth;
      if (!this.isMobile && this.isMobileOpen) {
        this.isMobileOpen = false; // Reset mobile state when expanding window
      }
    },
    toggleSidebar() {
      if (this.isMobile) {
        this.isMobileOpen = !this.isMobileOpen;
      } else {
        this.isPcCollapsed = !this.isPcCollapsed;
      }
    }
  }
};
</script>

<style scoped>
/* MAIN CONTAINER */
.dashboard-layout {
  display: flex;
  flex-direction: column;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  font-family: inherit;
  background-color: var(--content-bg);
}

/* TOPBAR */
.topbar {
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  height: var(--topbar-height);
  background-color: var(--topbar-bg);
  border-bottom: 1px solid rgba(0, 0, 0, 0.05); /* Minimal separator */
  flex-shrink: 0;
  z-index: 20;
  position: relative;
}

.toggle-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  cursor: pointer;
  transition: background-color 0.2s ease;
}
.toggle-wrapper:hover {
  background-color: rgba(0,0,0,0.03);
}

.toggle-layout-zone {
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 48px;
  min-height: 48px;
  padding: 0 16px;
}

.topbar-layout-zone {
  flex-grow: 1;
  display: flex;
  align-items: center;
  height: 100%;
  padding-right: 24px;
}
.topbar-layout-zone > * {
  margin-right: 16px;
}

/* BOTTOM SECTION (Sidebar + Content) */
.row-wrapper {
  display: flex;
  flex-direction: row;
  flex-grow: 1;
  height: calc(100vh - var(--topbar-height));
  position: relative;
  overflow: hidden;
}

/* SIDEBAR */
.sidebar {
  width: var(--sidebar-width);
  height: 100%;
  background-color: var(--sidebar-bg);
  border-right: 1px solid rgba(0, 0, 0, 0.05); /* Minimal separator */
  flex-shrink: 0;
  z-index: 10;
  transition: width 0.3s cubic-bezier(0.4, 0, 0.2, 1), transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  overflow-y: auto;
  overflow-x: hidden; /* Important so inner custom text hides when shrinking */
}

/* SIDEBAR COLLAPSED (PC) */
.sidebar.is-pc-collapsed {
  width: var(--sidebar-collapsed-width);
}

.sidebar-layout-zone {
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: 100%;
}
.sidebar-layout-zone > * {
  margin-bottom: 12px;
}

/* MAIN CONTENT */
.main-content {
  flex-grow: 1;
  background-color: var(--content-bg);
  overflow-y: auto;
  overflow-x: hidden;
  padding: 32px;
  position: relative;
}

.content-layout-zone {
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: 100%;
}
.content-layout-zone > * {
  margin-bottom: 16px;
}

/* MOBILE RESPONSIVENESS */
@media (max-width: 991px) {
  .sidebar {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    transform: translateX(-100%);
    box-shadow: 2px 0 12px rgba(0,0,0,0.1);
    z-index: 100;
  }
  
  .sidebar.is-mobile-open {
    transform: translateX(0);
  }
  
  .sidebar-overlay {
    position: absolute;
    inset: 0;
    background-color: var(--overlay-bg, rgba(0,0,0,0.4));
    z-index: 90;
    opacity: 1;
    transition: opacity 0.3s ease;
  }

  .main-content {
    padding: 16px;
  }
}

/* Custom Scrollbars */
::-webkit-scrollbar { width: 6px; height: 6px; }
::-webkit-scrollbar-track { background: transparent; }
::-webkit-scrollbar-thumb { background: rgba(0,0,0,0.15); border-radius: 4px; }
::-webkit-scrollbar-thumb:hover { background: rgba(0,0,0,0.25); }
</style>
