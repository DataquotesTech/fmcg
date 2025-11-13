// Server Component - uses CSS module instead of styled-jsx
import styles from "./blog-content.module.css";

export default function BlogContent({ content }) {
  return (
    <div className="prose prose-lg md:prose-xl max-w-none mb-12 md:mb-16">
      <div
        className={`${styles.blogContent} text-gray-700 leading-relaxed`}
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </div>
  );
}

