<template>
  <div class="dashboard-layout" :style="cssVars">
    
    <!-- TOPBAR -->
    <header class="topbar">
      <!-- Universal Toggle Dropzone. No hardcoded padding, no inherent click, just pure drag and drop space. -->
      <div class="toggle-wrapper">
        <wwLayout path="menuToggleZone" direction="row" class="toggle-layout-zone" />
      </div>

      <!-- Main Topbar content -->
      <wwLayout path="topbarZone" direction="row" class="topbar-layout-zone" />
    </header>

    <!-- BOTTOM ROW -->
    <div class="row-wrapper">
      
      <!-- Mobile Overlay -->
      <div 
        class="sidebar-overlay" 
        v-if="isMobile && content.isMobileMenuOpen" 
        @click="$emit('trigger-event', { name: 'overlayClick' })"
      ></div>

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
    };
  },
  computed: {
    isMobile() {
      return this.windowWidth < 992;
    },
    sidebarClasses() {
      return {
        'is-pc-collapsed': !this.isMobile && this.content.isSidebarCollapsed,
        'is-mobile-open': this.isMobile && this.content.isMobileMenuOpen
      };
    },
    cssVars() {
      return {
        '--sidebar-width': this.content.sidebarWidth || '280px',
        '--sidebar-collapsed-width': this.content.sidebarCollapsedWidth || '80px',
        '--topbar-height': this.content.topbarHeight || '70px',
        
        '--pad-top': this.content.contentPaddingTop || '32px',
        '--pad-bottom': this.content.contentPaddingBottom || '32px',
        '--pad-left': this.content.contentPaddingLeft || '32px',
        '--pad-right': this.content.contentPaddingRight || '32px',
        
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
  align-items: stretch;
  width: 100%;
  height: var(--topbar-height);
  background-color: var(--topbar-bg);
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
  flex-shrink: 0;
  z-index: 20;
  position: relative;
  /* Reset padding entirely */
  padding: 0; 
}

/* TOGGLE Dropzone Wrapper */
.toggle-wrapper {
  display: flex;
  align-items: stretch;
}

.toggle-layout-zone {
  display: flex;
  flex-direction: row;
  height: 100%;
  /* Removed arbitrary min-widths so it acts strictly like a native raw empty div */
}

/* TOPBAR LAYOUT */
.topbar-layout-zone {
  flex-grow: 1;
  display: flex;
  flex-direction: row;
  height: 100%;
  align-items: stretch;
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
  display: flex;
  flex-direction: column;
  width: var(--sidebar-width);
  height: 100%;
  background-color: var(--sidebar-bg);
  border-right: 1px solid rgba(0, 0, 0, 0.05);
  flex-shrink: 0;
  z-index: 10;
  transition: width 0.3s cubic-bezier(0.4, 0, 0.2, 1), transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  overflow-y: auto;
  overflow-x: hidden; 
  white-space: nowrap; 
}

/* SIDEBAR COLLAPSED (PC) */
.sidebar.is-pc-collapsed {
  width: var(--sidebar-collapsed-width);
}

.sidebar-layout-zone {
  display: flex;
  flex-direction: column;
  width: 100%;
  
  /* THIS is what forces the children's 100% height configuration to stretch fully */
  flex-grow: 1; 
  min-height: 100%;
}

/* MAIN CONTENT */
.main-content {
  flex-grow: 1;
  background-color: var(--content-bg);
  overflow-y: auto;
  overflow-x: hidden;
  
  /* Explicit 4-way padding */
  padding-top: var(--pad-top);
  padding-bottom: var(--pad-bottom);
  padding-left: var(--pad-left);
  padding-right: var(--pad-right);
  
  position: relative;
}

.content-layout-zone {
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: 100%;
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
}

/* Custom Scrollbars */
::-webkit-scrollbar { width: 6px; height: 6px; }
::-webkit-scrollbar-track { background: transparent; }
::-webkit-scrollbar-thumb { background: rgba(0,0,0,0.15); border-radius: 4px; }
::-webkit-scrollbar-thumb:hover { background: rgba(0,0,0,0.25); }
</style>
