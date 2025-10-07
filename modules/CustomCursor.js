// CustomCursor.js - Enhanced for a Futuristic, Visually Appealing Glow

export default class CustomCursor {
    constructor(options = {}) {
        // Default options matching the neon theme
        this.size = options.size || 25;
        this.color = options.color || "rgba(255, 255, 255, 0.8)"; // Cyan glow color
        this.borderColor = options.borderColor || "#ffffffff";
        this.scaleOnClick = options.scaleOnClick || 0.6; // Smaller scale on click for a "pop" effect
        
        // Enhanced multi-layer shadow for a deeper glow
        this.shadow = options.shadow || "0 0 5px #ffffffff, 0 0 15px #ffffffff, 0 0 25px rgba(255, 255, 255, 0.6)"; 
        
        // Variables for motion smoothing/lag
        this.targetX = 0;
        this.targetY = 0;
        this.currentX = 0;
        this.currentY = 0;
        this.speed = 0.2; // Controls the smoothing/lag effect (0.1 is slow, 1 is instant)

        this.cursor = document.createElement("div");
        this.cursor.classList.add("custom-cursor");
        document.body.appendChild(this.cursor);

        this.applyStyles();
        this.bindEvents();
        this.loop(); // Start the motion loop for smoothing
    }

    applyStyles() {
        Object.assign(this.cursor.style, {
            position: "fixed",
            top: "0",
            left: "0",
            width: this.size + "px",
            height: this.size + "px",
            background: this.color,
            border: `2px solid ${this.borderColor}`,
            borderRadius: "50%",
            pointerEvents: "none",
            transform: "translate(-50%, -50%)",
            // Faster width/height transition for pop, smooth transform transition for trail
            transition: "width 0.2s ease, height 0.2s ease", 
            boxShadow: this.shadow,
            zIndex: 9999,
        });
        document.body.style.cursor = "none";
    }

    bindEvents() {
        document.addEventListener("mousemove", e => this.setTargetPosition(e));
        document.addEventListener("mousedown", () => this.clickCursor());
        document.addEventListener("mouseup", () => this.releaseCursor());
    }
    
    setTargetPosition(e) {
        // Set the final target position immediately upon mouse move
        this.targetX = e.clientX;
        this.targetY = e.clientY;
    }

    // New: Animation loop to create the smoothing/trail effect
    loop() {
        // Calculate the distance to the target position (lag)
        this.currentX += (this.targetX - this.currentX) * this.speed;
        this.currentY += (this.targetY - this.currentY) * this.speed;

        // Apply the smoothed position
        this.cursor.style.transform = `translate(-50%, -50%) translate3d(${this.currentX}px, ${this.currentY}px, 0) scale(1)`;

        requestAnimationFrame(() => this.loop());
    }

    clickCursor() {
        // We use CSS transition for the pop, so we adjust the scale instantly
        this.cursor.style.transform = `translate(-50%, -50%) translate3d(${this.currentX}px, ${this.currentY}px, 0) scale(${this.scaleOnClick})`;
    }

    releaseCursor() {
        // Return to normal size
        this.cursor.style.transform = `translate(-50%, -50%) translate3d(${this.currentX}px, ${this.currentY}px, 0) scale(1)`;
    }
}