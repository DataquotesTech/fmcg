# SEO Verification Guide for Vercel Deployment

After deploying your site to Vercel, use these tools and methods to verify your SEO implementation.

## 1. Quick Visual Checks

### Check Meta Tags in Browser

1. **View Page Source**:

   - Right-click on your deployed page → "View Page Source"
   - Search for `<meta` tags
   - Verify you see:
     - `<meta name="description" content="...">`
     - `<meta property="og:title" content="...">`
     - `<meta property="og:image" content="...">`
     - `<meta name="twitter:card" content="...">`

2. **Browser DevTools**:
   - Open DevTools (F12)
   - Go to "Elements" tab
   - Check `<head>` section for all meta tags

## 2. Online SEO Testing Tools

### Google Rich Results Test

**URL**: https://search.google.com/test/rich-results

**How to use**:

1. Enter your deployed blog post URL (e.g., `https://your-site.vercel.app/blog/1`)
2. Click "Test URL"
3. Check for:
   - ✅ BlogPosting structured data
   - ✅ BreadcrumbList structured data
   - ✅ Any errors or warnings

**What to look for**:

- Green checkmarks = Valid structured data
- Yellow warnings = Non-critical issues
- Red errors = Fix required

### Google Search Console

**URL**: https://search.google.com/search-console

**Setup**:

1. Add your Vercel domain
2. Verify ownership (Vercel provides DNS records)
3. Submit sitemap (if you create one)
4. Monitor:
   - Index coverage
   - Performance metrics
   - Mobile usability

### Schema Markup Validator

**URL**: https://validator.schema.org/

**How to use**:

1. Enter your blog post URL
2. Check structured data validation
3. Verify all schema types are recognized

## 3. Social Media Preview Tools

### Facebook Sharing Debugger

**URL**: https://developers.facebook.com/tools/debug/

**How to use**:

1. Enter your homepage or blog post URL
2. Click "Debug"
3. Check:
   - ✅ Open Graph title
   - ✅ Open Graph description
   - ✅ Open Graph image (should show `fmcg-removebg-preview.png`)
   - ✅ URL canonicalization

**Important**: Click "Scrape Again" after making changes to clear Facebook's cache.

### Twitter Card Validator

**URL**: https://cards-dev.twitter.com/validator

**How to use**:

1. Enter your blog post URL
2. Check preview:
   - ✅ Card type (should be "summary_large_image")
   - ✅ Title
   - ✅ Description
   - ✅ Image preview

### LinkedIn Post Inspector

**URL**: https://www.linkedin.com/post-inspector/

**How to use**:

1. Enter your URL
2. Check Open Graph preview
3. Verify image and metadata

## 4. Technical SEO Checks

### Lighthouse (Chrome DevTools)

**How to use**:

1. Open your deployed site in Chrome
2. Open DevTools (F12)
3. Go to "Lighthouse" tab
4. Select "SEO" checkbox
5. Click "Analyze page load"
6. Check SEO score (aim for 90+)

**What it checks**:

- Meta description
- Title tag
- Valid HTML
- Image alt text
- Mobile-friendly
- Structured data

### PageSpeed Insights

**URL**: https://pagespeed.web.dev/

**How to use**:

1. Enter your Vercel URL
2. Click "Analyze"
3. Check:
   - Performance score
   - SEO score
   - Best practices

### W3C Markup Validator

**URL**: https://validator.w3.org/

**How to use**:

1. Enter your URL or paste HTML
2. Check for HTML validation errors
3. Fix any critical issues

## 5. Check Structured Data (JSON-LD)

### View in Browser

1. Open your blog post page
2. View page source (Ctrl+U or Cmd+U)
3. Search for `application/ld+json`
4. You should see structured data like:
   ```json
   <script type="application/ld+json">
   {
     "@context": "https://schema.org",
     "@type": "BlogPosting",
     ...
   }
   </script>
   ```

### Google Rich Results Test

- Already mentioned above - this is the best tool for structured data

## 6. Check Favicon

### Browser Tab

1. Open your deployed site
2. Check browser tab - should show your `favicon.svg`
3. If not showing:
   - Clear browser cache
   - Hard refresh (Ctrl+Shift+R or Cmd+Shift+R)
   - Check that `/favicon.svg` is accessible

### Verify File Accessibility

Visit directly: `https://your-site.vercel.app/favicon.svg`

- Should load the SVG file
- If 404, check file is in `/public` folder

## 7. Check OG Image

### Verify Image URL

Visit directly: `https://your-site.vercel.app/fmcg-removebg-preview.png`

- Should load the PNG image
- If 404, check file is in `/public` folder

### Test in Social Media Tools

- Use Facebook Debugger (mentioned above)
- Use Twitter Card Validator (mentioned above)
- Both should show your image preview

## 8. Environment Variables Check

### Verify in Vercel Dashboard

1. Go to your Vercel project
2. Settings → Environment Variables
3. Ensure `NEXT_PUBLIC_SITE_URL` is set:
   ```
   NEXT_PUBLIC_SITE_URL=https://your-actual-domain.com
   ```
4. If using custom domain, use that instead of `.vercel.app`

### Check in Code

Your site should use the correct URL in:

- Open Graph tags
- Canonical URLs
- Structured data

## 9. Quick Checklist

After deployment, verify:

- [ ] Favicon appears in browser tab
- [ ] Meta description shows in search results
- [ ] Open Graph image appears in social shares
- [ ] Structured data validates (Google Rich Results)
- [ ] Twitter card preview works
- [ ] Facebook preview works
- [ ] Canonical URLs are correct
- [ ] No console errors related to SEO
- [ ] All images load correctly
- [ ] Mobile-friendly (responsive)

## 10. Common Issues & Fixes

### Issue: Favicon not showing

**Fix**:

- Ensure `favicon.svg` is in `/public` folder
- Clear browser cache
- Check file permissions in Vercel

### Issue: OG image not showing

**Fix**:

- Verify `fmcg-removebg-preview.png` is in `/public` folder
- Check image URL in meta tags
- Use Facebook Debugger to clear cache

### Issue: Structured data errors

**Fix**:

- Check JSON-LD syntax in StructuredData.js
- Verify all required fields are present
- Test with Schema.org validator

### Issue: Meta tags not updating

**Fix**:

- Rebuild and redeploy on Vercel
- Clear CDN cache (Vercel does this automatically on new deployments)
- Hard refresh browser

## 11. Monitoring SEO Over Time

### Google Search Console

- Monitor search performance
- Track which pages are indexed
- See search queries bringing traffic

### Vercel Analytics (Optional)

- Add Vercel Analytics to track:
  - Page views
  - User behavior
  - Performance metrics

### Google Analytics (Optional)

- Track:
  - Organic search traffic
  - User engagement
  - Conversion rates

## 12. Testing Different Pages

Test these URLs after deployment:

1. **Homepage**: `https://your-site.vercel.app/`

   - Check website structured data
   - Verify category structured data

2. **Blog Post**: `https://your-site.vercel.app/blog/[id]`

   - Check BlogPosting structured data
   - Verify breadcrumbs
   - Test OG image

3. **Category Pages**: (filtered on homepage)
   - Check CollectionPage structured data
   - Verify dynamic meta tags

## Quick Test Commands

After deployment, you can quickly test:

```bash
# Check if favicon is accessible
curl -I https://your-site.vercel.app/favicon.svg

# Check if OG image is accessible
curl -I https://your-site.vercel.app/fmcg-removebg-preview.png

# View page source (check meta tags)
curl https://your-site.vercel.app/blog/1 | grep -i "meta\|og:"
```

## Summary

The most important tools to use:

1. **Google Rich Results Test** - For structured data
2. **Facebook Sharing Debugger** - For OG tags
3. **Twitter Card Validator** - For Twitter cards
4. **Lighthouse** - For overall SEO score
5. **Browser DevTools** - For quick meta tag checks

All of these are free and give you immediate feedback on your SEO implementation!
