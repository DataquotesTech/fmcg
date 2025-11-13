"use client";

// Client component for handling image errors
export default function BlogImage({ src, alt }) {
  return (
    <img
      src={src}
      alt={alt}
      className="w-full h-full object-cover"
      onError={(e) => {
        // Hide broken image and show placeholder
        e.target.style.display = "none";
        const parent = e.target.parentElement;
        if (parent) {
          const placeholder = document.createElement("div");
          placeholder.className =
            "w-full h-full bg-orange-50 flex items-center justify-center relative overflow-hidden";
          placeholder.innerHTML = `
            <div class="absolute inset-0 bg-linear-to-br from-orange-100 to-orange-200"></div>
            <svg class="w-20 h-20 text-orange-300 relative z-10" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm-5 14H4v-4h11v4zm0-5H4V9h11v4zm5 5h-4V9h4v9z" />
            </svg>
          `;
          parent.appendChild(placeholder);
        }
      }}
    />
  );
}

