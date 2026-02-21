<template>
  <div class="weweb-crm-section" :style="cssVars">
    
    <!-- DESKTOP / TABLET LANDSCAPE: SIDEBAR -->
    <nav class="sidebar" :class="{ 'is-collapsed': isCollapsed }" v-if="!isMobile">
      <!-- Top Zone (e.g. Logo) -->
      <div class="sidebar-top-zone">
        <wwLayout path="sidebarTopZone" class="layout-zone" />
      </div>

      <div class="sidebar-header">
        <button class="toggle-btn" @click="toggleSidebar" :style="{ color: content.iconColor }">
          <wwEditorIcon name="lucide:menu" :icon="content.iconColor" class="native-icon" />
        </button>
      </div>

      <!-- Scrollable Main Menu -->
      <div class="menu-items-scroll">
        <div 
          v-for="(category, catIdx) in content.menuCategories" 
          :key="'cat-'+catIdx"
          class="menu-category"
        >
          <!-- Category Header -->
          <div 
            class="category-header" 
            v-if="!isCollapsed"
            @click="toggleCategory(catIdx)"
            :style="{ color: content.iconColor }"
          >
            <span class="category-title">{{ category.title }}</span>
            <wwEditorIcon 
              :name="expandedCategories[catIdx] ? 'lucide:chevron-up' : 'lucide:chevron-down'" 
              class="chevron-icon native-icon"
            />
          </div>
          
          <!-- Category Items list -->
          <div class="menu-items-list" v-show="expandedCategories[catIdx] || isCollapsed">
            <wwLink
              v-for="(item, index) in category.items" 
              :key="'item-'+index"
              :link="item.link"
              class="menu-item"
              :style="{ '--hover-bg': content.hoverBgColor }"
            >
              <div class="icon-wrapper">
                <wwEditorIcon 
                  :name="item.icon"
                  :icon="item.icon"
                  :style="{ color: content.iconColor }"
                  class="native-icon"
                />
              </div>
              <span v-if="!isCollapsed" class="item-text" :style="{ color: content.textColor }">
                {{ item.text }}
              </span>
            </wwLink>
          </div>
        </div>
      </div>

      <!-- Bottom System Menu (Settings etc.) -->
      <div class="system-menu">
        <div class="menu-items-list">
          <wwLink 
            v-for="(sysItem, sysIdx) in content.systemMenu" 
            :key="'sys-'+sysIdx"
            :link="sysItem.link"
            class="menu-item"
            :style="{ '--hover-bg': content.hoverBgColor }"
          >
            <div class="icon-wrapper">
              <wwEditorIcon 
                :name="sysItem.icon" 
                :icon="sysItem.icon"
                :style="{ color: content.iconColor }"
                class="native-icon"
              />
            </div>
            <span v-if="!isCollapsed" class="item-text" :style="{ color: content.textColor }">
              {{ sysItem.text }}
            </span>
          </wwLink>
        </div>
        
        <!-- Bottom Layout Zone (e.g User Profile block) -->
        <div class="sidebar-bottom-zone" v-show="!isCollapsed">
          <wwLayout path="sidebarBottomZone" class="layout-zone" />
        </div>
      </div>
    </nav>

    <!-- MOBILE / TABLET PORTRAIT: TOPBAR -->
    <nav class="topbar" v-if="isMobile">
      <div class="topbar-header">
        <button class="toggle-btn" @click="toggleMobileMenu" :style="{ color: content.iconColor }">
          <wwEditorIcon name="lucide:menu" class="native-icon" />
        </button>
        <span class="topbar-title" v-if="!isMobileMenuOpen" :style="{ color: content.textColor }">
          Menu
        </span>
      </div>

      <!-- Mobile Dropdown -->
      <div class="mobile-dropdown" v-if="isMobileMenuOpen">
        <!-- Main Categories -->
        <div v-for="(category, catIdx) in content.menuCategories" :key="'mob-cat-'+catIdx">
          <div class="mobile-category-title" :style="{ color: content.iconColor }">
            {{ category.title }}
          </div>
          <wwLink 
            v-for="(item, index) in category.items" 
            :key="'mob-item-'+index"
            :link="item.link"
            class="mobile-menu-item"
          >
            <wwEditorIcon 
              :name="item.icon" 
              :icon="item.icon"
              :style="{ color: content.iconColor }"
              class="mobile-icon native-icon"
            />
            <span class="item-text" :style="{ color: content.textColor }">
              {{ item.text }}
            </span>
          </wwLink>
        </div>
        
        <div class="mobile-divider"></div>
        
        <!-- System Menu -->
        <wwLink 
          v-for="(sysItem, sysIdx) in content.systemMenu" 
          :key="'mob-sys-'+sysIdx"
          :link="sysItem.link"
          class="mobile-menu-item"
        >
          <wwEditorIcon 
            :name="sysItem.icon"
            :icon="sysItem.icon"
            :style="{ color: content.iconColor }"
            class="mobile-icon native-icon"
          />
          <span class="item-text" :style="{ color: content.textColor }">
            {{ sysItem.text }}
          </span>
        </wwLink>
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
  },
  data() {
    return {
      isCollapsed: false,
      isMobileMenuOpen: false,
      windowWidth: window.innerWidth,
      expandedCategories: {}, // tracks which categories are open
    };
  },
  computed: {
    isMobile() {
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
        '--font-size': this.content.fontSize || '14px',
        '--active-color': this.content.activeColor || '#3B82F6'
      };
    }
  },
  watch: {
    'content.menuCategories': {
      immediate: true,
      handler(newCats) {
        if (!newCats) return;
        newCats.forEach((_, idx) => {
          if (this.expandedCategories[idx] === undefined) {
             this.expandedCategories[idx] = true;
          }
        });
      }
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
    toggleCategory(idx) {
      this.expandedCategories[idx] = !this.expandedCategories[idx];
    },
    handleResize() {
      this.windowWidth = window.innerWidth;
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

.native-icon {
  font-size: 1.25em;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

/* SIDEBAR (DESKTOP) */
.sidebar {
  display: flex;
  flex-direction: column;
  width: var(--menu-width);
  height: 100vh;
  background-color: var(--menu-bg);
  padding: var(--menu-padding) 0;
  box-sizing: border-box;
  transition: width 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 2px 0 8px rgba(0,0,0,0.05);
  flex-shrink: 0;
  z-index: 10;
}

.sidebar.is-collapsed {
  width: calc(48px + (var(--menu-padding) * 2));
}

.sidebar-top-zone {
  padding: 0 var(--menu-padding);
  margin-bottom: 24px;
  min-height: 48px; /* Force minimum height so dragging works */
  width: 100%;
}

.sidebar-header {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin-bottom: 24px;
  padding: 0 var(--menu-padding);
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

.menu-items-scroll {
  flex-grow: 1;
  overflow-y: auto;
  overflow-x: hidden;
  padding: 0 var(--menu-padding);
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.category-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 12px;
  cursor: pointer;
  font-size: 0.8em;
  font-weight: 700;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  opacity: 0.6;
  transition: opacity 0.2s;
}

.category-header:hover {
  opacity: 0.9;
}

.menu-items-list {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.menu-item {
  display: flex;
  align-items: center;
  text-decoration: none;
  padding: 10px 12px;
  border-radius: 8px;
  transition: all 0.2s ease;
  cursor: pointer;
  color: inherit;
  width: 100%;
  box-sizing: border-box;
}

.sidebar.is-collapsed .menu-item {
  justify-content: center;
  padding: 10px;
}

.menu-item:hover {
  background-color: var(--hover-bg, rgba(0,0,0,0.04));
}

.menu-item.router-link-active,
.menu-item.ww-active-state {
  background-color: rgba(59, 130, 246, 0.1);
}
.menu-item.router-link-active .native-icon,
.menu-item.ww-active-state .native-icon,
.menu-item.router-link-active .item-text,
.menu-item.ww-active-state .item-text {
  color: var(--active-color) !important;
  font-weight: 600;
}

.icon-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  flex-shrink: 0;
}

.item-text {
  margin-left: 14px;
  font-weight: 500;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.system-menu {
  margin-top: auto;
  padding: 24px var(--menu-padding) 0;
  border-top: 1px solid rgba(0,0,0,0.05);
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.sidebar-bottom-zone {
  min-height: 48px; /* Force minimum height */
  width: 100%;
}

.layout-zone {
  width: 100%;
  height: 100%;
  min-height: 48px;
  display: flex;
  flex-direction: column;
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
  padding: 16px var(--menu-padding);
  border-top: 1px solid rgba(0,0,0,0.05);
  background-color: var(--menu-bg);
  max-height: calc(100vh - 60px);
  overflow-y: auto;
  gap: 12px;
}

.mobile-category-title {
  font-size: 0.8em;
  font-weight: 700;
  text-transform: uppercase;
  margin: 12px 12px 4px 12px;
  opacity: 0.6;
}

.mobile-menu-item {
  display: flex;
  align-items: center;
  padding: 12px;
  text-decoration: none;
  border-radius: 6px;
  color: inherit;
}

.mobile-menu-item:hover {
  background-color: rgba(0,0,0,0.04);
}

.mobile-icon {
  width: 24px;
  text-align: center;
}

.mobile-divider {
  height: 1px;
  background-color: rgba(0,0,0,0.05);
  margin: 8px 0;
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
  margin-top: 60px;
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
