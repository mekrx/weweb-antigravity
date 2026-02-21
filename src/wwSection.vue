<template>
  <div class="dashboard-layout" :style="cssVars">
    <!-- Overlay for mobile sidebar -->
    <div 
      class="sidebar-overlay" 
      v-if="isMobile && isSidebarOpen" 
      @click="toggleSidebar"
    ></div>

    <!-- SIDEBAR -->
    <aside 
      class="sidebar" 
      :class="{ 'is-open': !isMobile || isSidebarOpen }"
    >
      <wwLayout path="sidebarZone" direction="column" class="sidebar-layout-zone" />
    </aside>

    <!-- RIGHT PANEL (Topbar + Content) -->
    <div class="right-panel">
      <!-- TOPBAR -->
      <header class="topbar">
        <!-- Burger menu for mobile only -->
        <button 
          v-if="isMobile" 
          class="burger-btn" 
          @click="toggleSidebar"
        >
          <wwEditorIcon name="lucide:menu" />
        </button>
        <!-- Topbar Dropzone (e.g. Search, Profile) -->
        <wwLayout path="topbarZone" direction="row" class="topbar-layout-zone" />
      </header>

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
      isSidebarOpen: false
    };
  },
  computed: {
    isMobile() {
      return this.windowWidth < 992;
    },
    cssVars() {
      return {
        '--sidebar-width': this.content.sidebarWidth || '280px',
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
      if (!this.isMobile && this.isSidebarOpen) {
        this.isSidebarOpen = false;
      }
    },
    toggleSidebar() {
      this.isSidebarOpen = !this.isSidebarOpen;
    }
  }
};
</script>

<style scoped>
.dashboard-layout {
  display: flex;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  font-family: inherit;
  background-color: var(--content-bg);
}

.sidebar {
  width: var(--sidebar-width);
  height: 100vh;
  background-color: var(--sidebar-bg);
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  border-right: 1px solid rgba(0,0,0,0.05); /* Architect minimal look */
  z-index: 10;
  transition: transform 0.3s ease;
}

.right-panel {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  height: 100vh;
}

.topbar {
  height: var(--topbar-height);
  background-color: var(--topbar-bg);
  display: flex;
  align-items: center;
  padding: 0 24px;
  flex-shrink: 0;
  border-bottom: 1px solid rgba(0,0,0,0.05); /* Architect minimal look */
  z-index: 5;
}

.burger-btn {
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 8px;
  margin-right: 16px;
  margin-left: -8px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 6px;
  color: inherit;
  font-size: 24px;
}
.burger-btn:hover { background: rgba(0,0,0,0.05); }

.main-content {
  flex-grow: 1;
  background-color: var(--content-bg);
  overflow-y: auto;
  overflow-x: hidden;
  position: relative;
  /* Minimal padding so user can drop content inside */
  padding: 32px;
}

/* Base states for layout zones to make them fill available space */
.sidebar-layout-zone {
  min-height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
}

.topbar-layout-zone {
  flex-grow: 1;
  min-height: 100%;
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
}

.content-layout-zone {
  min-height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
}

/* Sub-elements gap handling inside layout dropzones (optional, makes it cleaner default) */
.sidebar-layout-zone > *,
.content-layout-zone > * {
  margin-bottom: 16px;
}
.topbar-layout-zone > * {
  margin-right: 16px;
}

/* Custom Scrollbars */
::-webkit-scrollbar { width: 6px; height: 6px; }
::-webkit-scrollbar-track { background: transparent; }
::-webkit-scrollbar-thumb { background: rgba(0,0,0,0.15); border-radius: 4px; }
::-webkit-scrollbar-thumb:hover { background: rgba(0,0,0,0.25); }

/* MOBILE RESPONSIVENESS */
@media (max-width: 991px) {
  .sidebar {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    transform: translateX(-100%);
    box-shadow: 2px 0 12px rgba(0,0,0,0.1);
    z-index: 100;
  }
  .sidebar.is-open {
    transform: translateX(0);
  }
  
  .sidebar-overlay {
    position: fixed;
    inset: 0;
    background-color: var(--overlay-bg, rgba(0,0,0,0.4));
    z-index: 90;
    opacity: 1;
    transition: opacity 0.3s ease;
  }
  
  .topbar {
    padding: 0 16px;
  }
  
  .main-content {
    padding: 16px;
  }
}
</style>
