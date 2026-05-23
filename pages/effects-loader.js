(() => {
  "use strict";

  const CURRENT_SCRIPT = document.currentScript;
  const BASE_PATH = CURRENT_SCRIPT?.src ? new URL(".", CURRENT_SCRIPT.src).href : "";

  function loadEffects() {
    if (window.__ordoGlobalEffectsLoaded) return;
    const script = document.createElement("script");
    script.src = `${BASE_PATH}effects.js`;
    script.defer = true;
    script.dataset.ordoEffects = "global";
    document.head.appendChild(script);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", loadEffects, { once: true });
  } else {
    loadEffects();
  }
})();
