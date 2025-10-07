// UnicornBackground.js
export default class UnicornBackground {
  constructor(projectId) {
    this.projectId = projectId;
    this.init();
  }

  init() {
    if (!window.UnicornStudio) {
      window.UnicornStudio = { isInitialized: false };
      const script = document.createElement("script");
      script.src = "https://cdn.jsdelivr.net/gh/hiunicornstudio/unicornstudio.js@v1.4.33/dist/unicornStudio.umd.js";
      script.onload = () => {
        if (!window.UnicornStudio.isInitialized) {
          UnicornStudio.init();
          window.UnicornStudio.isInitialized = true;
          console.log("✅ Unicorn Studio initialized successfully");
        }
      };
      document.head.appendChild(script);
    } else if (!window.UnicornStudio.isInitialized) {
      UnicornStudio.init();
      window.UnicornStudio.isInitialized = true;
      console.log("✅ Unicorn Studio re-initialized");
    }
  }
}
