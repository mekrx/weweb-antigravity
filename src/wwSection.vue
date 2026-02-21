<template>
  <div class="navigation-section" :style="cssVars">
    
    <!-- TOPBAR -->
    <header class="topbar">
      <!-- Universal Toggle Dropzone -->
      <div class="toggle-wrapper">
        <wwLayout path="menuToggleZone" direction="row" class="toggle-layout-zone" />
      </div>

      <!-- Main Topbar content -->
      <wwLayout path="topbarZone" direction="row" class="topbar-layout-zone" />
    </header>

    <!-- Mobile Overlay -->
    <div 
      class="sidebar-overlay" 
      v-if="isMobile && content.isMobileMenuOpen" 
      @mousedown.prevent="closeMobileMenu"
      @touchstart.prevent="closeMobileMenu"
    ></div>

    <!-- SIDEBAR -->
    <aside class="sidebar" :class="sidebarClasses">
      <wwLayout path="sidebarZone" direction="column" class="sidebar-layout-zone" />
    </aside>

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
        
        '--anim-duration': this.content.animationDuration || '300ms',
        '--anim-timing': this.content.animationTimingFunction || 'ease',
        
        '--sidebar-bg': this.content.sidebarBgColor || '#ffffff',
        '--topbar-bg': this.content.topbarBgColor || '#ffffff',
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
    },
    closeMobileMenu(e) {
      if (e) { e.stopPropagation(); }
      // 1. Emit purely for custom Workflows triggers (e.g user sets "On Mobile Overlay Click -> Change Variable to FALSE")
      this.$emit('trigger-event', { name: 'overlayClick' });
      // 2. Attempt hard override inside the plugin content object (Often works directly in editor)
      this.$emit('update:content', { ...this.content, isMobileMenuOpen: false });
    }
  }
};
</script>

<style scoped>
/* MAIN CONTAINER */
.navigation-section {
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 0;
  z-index: 1000;
  font-family: inherit;
  pointer-events: none;
}

/* Enable pointer events only directly on our panels */
.topbar, .sidebar, .sidebar-overlay {
  pointer-events: auto;
}

/* TOPBAR */
.topbar {
  display: flex;
  flex-direction: row;
  align-items: stretch;
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: var(--topbar-height);
  background-color: var(--topbar-bg);
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
  box-sizing: border-box;
  z-index: 1005; /* Highest level: always over sidebar */
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
  min-height: 100%;
}

/* TOPBAR LAYOUT */
.topbar-layout-zone {
  flex-grow: 1;
  display: flex;
  flex-direction: row;
  height: 100%;
  align-items: stretch;
}


/* SIDEBAR */
.sidebar {
  display: flex;
  flex-direction: column;
  position: fixed;
  top: var(--topbar-height);
  left: 0;
  width: var(--sidebar-width);
  height: calc(100vh - var(--topbar-height));
  background-color: var(--sidebar-bg);
  border-right: 1px solid rgba(0, 0, 0, 0.05);
  box-sizing: border-box;
  z-index: 1000;
  /* Controlled transitions using CSS variables tied to WeWeb properties */
  transition: width var(--anim-duration) var(--anim-timing), transform var(--anim-duration) var(--anim-timing);
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
  flex-grow: 1; 
  min-height: 100%;
}

/* OVERLAY */
.sidebar-overlay {
  position: fixed;
  inset: 0;
  background-color: var(--overlay-bg, rgba(0,0,0,0.4));
  z-index: 990; /* Below sidebar (1000) and topbar (1005) */
  opacity: 1;
  transition: opacity var(--anim-duration) var(--anim-timing);
  cursor: pointer;
}

/* MOBILE RESPONSIVENESS */
@media (max-width: 991px) {
  .sidebar {
    /* Menu starts below topbar and takes remaining height on mobile too */
    top: var(--topbar-height);
    height: calc(100vh - var(--topbar-height));
    transform: translateX(-100%);
    box-shadow: 2px 0 12px rgba(0,0,0,0.1);
    z-index: 1000; /* Stack explicitly UNDER the topbar (1005) */
  }
  
  .sidebar.is-mobile-open {
    transform: translateX(0);
  }
}

/* Custom Scrollbars */
::-webkit-scrollbar { width: 6px; height: 6px; }
::-webkit-scrollbar-track { background: transparent; }
::-webkit-scrollbar-thumb { background: rgba(0,0,0,0.15); border-radius: 4px; }
::-webkit-scrollbar-thumb:hover { background: rgba(0,0,0,0.25); }
</style>
