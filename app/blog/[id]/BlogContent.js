// Server Component - uses CSS module instead of styled-jsx
import styles from "./blog-content.module.css";

const inlineAdMarkup = `
  <div class="w-full my-12 md:my-16 bg-gray-100 rounded-xl p-6 md:p-8 relative min-h-[220px] flex items-center justify-center shadow-sm">
    <div class="absolute top-0 right-0 bg-primary px-3  rounded-tr">
      <p class="text-secondary text-xs md:text-sm font-bold tracking-wide">Advertisement</p>
    </div>
    <div class="text-gray-400 text-sm md:text-base text-center">
      Advertisement Space
    </div>
  </div>
`;

function injectInlineAd(html) {
  if (!html) {
    return html;
  }

  const paragraphMatches = html.match(/<\/p>/gi);
  const totalParagraphs = paragraphMatches ? paragraphMatches.length : 0;

  if (totalParagraphs === 0) {
    // No paragraph tags found; append the ad near the middle by defaulting after first heading or at the end
    return `${inlineAdMarkup}${html}`;
  }

  const insertAfter = Math.max(1, Math.ceil(totalParagraphs / 2));
  let current = 0;

  return html.replace(/<\/p>/gi, (match) => {
    current += 1;
    if (current === insertAfter) {
      return `${match}${inlineAdMarkup}`;
    }
    return match;
  });
}

export default function BlogContent({ content }) {
  const contentWithAd = injectInlineAd(content);

  return (
    <div className="prose prose-lg md:prose-xl max-w-none mb-12 md:mb-16">
      <div
        className={`${styles.blogContent} text-gray-700 leading-relaxed`}
        dangerouslySetInnerHTML={{ __html: contentWithAd }}
      />
    </div>
  );
}
