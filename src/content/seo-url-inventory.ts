export type SeoUrlEntry = {
  type: "pages" | "blog-post" | "blog-category";
  oldPath: string;
  path: string;
  action: "keep-200" | "301";
  lastmod: string;
};

export const seoUrlInventory = [
  {
    "type": "pages",
    "oldPath": "/blog",
    "path": "/blog",
    "action": "keep-200",
    "lastmod": "2026-06-06"
  },
  {
    "type": "pages",
    "oldPath": "/company",
    "path": "/company",
    "action": "keep-200",
    "lastmod": "2026-06-06"
  },
  {
    "type": "pages",
    "oldPath": "/privacy-policy",
    "path": "/privacy-policy",
    "action": "keep-200",
    "lastmod": "2026-06-06"
  },
  {
    "type": "pages",
    "oldPath": "/",
    "path": "/",
    "action": "keep-200",
    "lastmod": "2026-06-06"
  },
  {
    "type": "pages",
    "oldPath": "/recruit",
    "path": "/recruit",
    "action": "keep-200",
    "lastmod": "2026-06-06"
  },
  {
    "type": "pages",
    "oldPath": "/works",
    "path": "/works",
    "action": "keep-200",
    "lastmod": "2026-06-06"
  },
  {
    "type": "blog-post",
    "oldPath": "/post/%E5%BA%97%E8%88%97%E5%86%85%E3%83%97%E3%83%AD%E3%82%B8%E3%82%A7%E3%82%AF%E3%82%B7%E3%83%A7%E3%83%B3%E3%83%9E%E3%83%83%E3%83%94%E3%83%B3%E3%82%B0%E3%81%A8%E3%81%AF%EF%BC%9F%E5%B0%8E%E5%85%A5%E3%83%A1%E3%83%AA%E3%83%83%E3%83%88%E3%81%A8%E6%88%90%E5%8A%9F%E4%BA%8B%E4%BE%8B%E3%82%92%E7%B4%B9%E4%BB%8B",
    "path": "/post/%E5%BA%97%E8%88%97%E5%86%85%E3%83%97%E3%83%AD%E3%82%B8%E3%82%A7%E3%82%AF%E3%82%B7%E3%83%A7%E3%83%B3%E3%83%9E%E3%83%83%E3%83%94%E3%83%B3%E3%82%B0%E3%81%A8%E3%81%AF%EF%BC%9F%E5%B0%8E%E5%85%A5%E3%83%A1%E3%83%AA%E3%83%83%E3%83%88%E3%81%A8%E6%88%90%E5%8A%9F%E4%BA%8B%E4%BE%8B%E3%82%92%E7%B4%B9%E4%BB%8B",
    "action": "keep-200",
    "lastmod": "2025-10-20"
  },
  {
    "type": "blog-post",
    "oldPath": "/post/%E3%80%90nft%E9%B3%B4%E9%96%80%E7%BE%8E%E8%A1%93%E9%A4%A8%E3%80%91%E6%97%A5%E6%9C%AC%E7%99%BA%E3%81%AE%E7%94%BB%E6%9C%9F%E7%9A%84%E3%81%AA%E6%8A%80%E6%B3%95%E3%81%A8%E3%83%90%E3%83%BC%E3%83%81%E3%83%A3%E3%83%AB%E6%98%A0%E5%83%8F%E3%81%8C%E8%9E%8D%E5%90%88%EF%BC%81mirasisone%E3%81%8C%E5%9C%B0%E5%9F%9F%E6%B4%BB%E6%80%A7%E5%8C%96%E3%82%92%E7%9B%AE%E6%8C%87%E3%81%99%E7%89%B9%E5%88%A5%E5%B1%95%E3%80%8C%E3%82%A2%E3%83%BC%E3%83%AB%E3%83%BB%E3%82%B0%E3%83%A9%E3%83%BC%E3%82%B8%E3%83%A5%E7%89%B9%E5%88%A5%E5%B1%95%E7%A4%BA%E4%BC%9A%E3%80%8D%E3%81%A7%E3%83%9E%E3%83%83%E3%83%94%E3%83%B3%E3%82%B0%E3%82%92%E6%8A%AB%E9%9C%B2%E3%81%97%E3%81%BE%E3%81%97%E3%81%9F",
    "path": "/post/%E3%80%90nft%E9%B3%B4%E9%96%80%E7%BE%8E%E8%A1%93%E9%A4%A8%E3%80%91%E6%97%A5%E6%9C%AC%E7%99%BA%E3%81%AE%E7%94%BB%E6%9C%9F%E7%9A%84%E3%81%AA%E6%8A%80%E6%B3%95%E3%81%A8%E3%83%90%E3%83%BC%E3%83%81%E3%83%A3%E3%83%AB%E6%98%A0%E5%83%8F%E3%81%8C%E8%9E%8D%E5%90%88%EF%BC%81mirasisone%E3%81%8C%E5%9C%B0%E5%9F%9F%E6%B4%BB%E6%80%A7%E5%8C%96%E3%82%92%E7%9B%AE%E6%8C%87%E3%81%99%E7%89%B9%E5%88%A5%E5%B1%95%E3%80%8C%E3%82%A2%E3%83%BC%E3%83%AB%E3%83%BB%E3%82%B0%E3%83%A9%E3%83%BC%E3%82%B8%E3%83%A5%E7%89%B9%E5%88%A5%E5%B1%95%E7%A4%BA%E4%BC%9A%E3%80%8D%E3%81%A7%E3%83%9E%E3%83%83%E3%83%94%E3%83%B3%E3%82%B0%E3%82%92%E6%8A%AB%E9%9C%B2%E3%81%97%E3%81%BE%E3%81%97%E3%81%9F",
    "action": "keep-200",
    "lastmod": "2024-08-28"
  },
  {
    "type": "blog-post",
    "oldPath": "/post/%E7%84%BC%E8%82%89%E3%83%AC%E3%82%B9%E3%83%88%E3%83%A9%E3%83%B3%E3%81%AB%E3%83%97%E3%83%AD%E3%82%B8%E3%82%A7%E3%82%AF%E3%82%B7%E3%83%A7%E3%83%B3%E3%83%9E%E3%83%83%E3%83%94%E3%83%B3%E3%82%B0%E5%B0%8E%E5%85%A5%EF%BC%81%E4%B8%80%E6%97%A5%E4%B8%80%E7%B5%84%E9%99%90%E5%AE%9A%E3%81%AE%E5%80%8B%E5%AE%A4%E3%81%8C%E9%9D%9E%E7%8F%BE%E5%AE%9F%E7%A9%BA%E9%96%93%E3%81%AB%E5%A4%89%E5%8C%96",
    "path": "/post/%E7%84%BC%E8%82%89%E3%83%AC%E3%82%B9%E3%83%88%E3%83%A9%E3%83%B3%E3%81%AB%E3%83%97%E3%83%AD%E3%82%B8%E3%82%A7%E3%82%AF%E3%82%B7%E3%83%A7%E3%83%B3%E3%83%9E%E3%83%83%E3%83%94%E3%83%B3%E3%82%B0%E5%B0%8E%E5%85%A5%EF%BC%81%E4%B8%80%E6%97%A5%E4%B8%80%E7%B5%84%E9%99%90%E5%AE%9A%E3%81%AE%E5%80%8B%E5%AE%A4%E3%81%8C%E9%9D%9E%E7%8F%BE%E5%AE%9F%E7%A9%BA%E9%96%93%E3%81%AB%E5%A4%89%E5%8C%96",
    "action": "keep-200",
    "lastmod": "2025-08-30"
  },
  {
    "type": "blog-post",
    "oldPath": "/post/%E6%96%B0%E5%AE%BF%E3%82%B7%E3%83%BC%E3%82%B7%E3%83%A3%E3%83%90%E3%83%BC-%E5%B9%BB%E6%83%B3%E7%9A%84%E6%98%A0%E5%83%8F%E3%81%A7%E3%82%A2%E3%83%83%E3%83%97%E3%82%B0%E3%83%AC%E3%83%BC%E3%83%89%E3%80%82%E3%83%97%E3%83%AD%E3%82%B8%E3%82%A7%E3%82%AF%E3%82%B7%E3%83%A7%E3%83%B3%E3%83%9E%E3%83%83%E3%83%94%E3%83%B3%E3%82%B0%E3%81%8C%E5%89%B5%E3%82%8B-%E4%BD%93%E9%A8%93%E7%A9%BA%E9%96%93",
    "path": "/post/%E6%96%B0%E5%AE%BF%E3%82%B7%E3%83%BC%E3%82%B7%E3%83%A3%E3%83%90%E3%83%BC-%E5%B9%BB%E6%83%B3%E7%9A%84%E6%98%A0%E5%83%8F%E3%81%A7%E3%82%A2%E3%83%83%E3%83%97%E3%82%B0%E3%83%AC%E3%83%BC%E3%83%89%E3%80%82%E3%83%97%E3%83%AD%E3%82%B8%E3%82%A7%E3%82%AF%E3%82%B7%E3%83%A7%E3%83%B3%E3%83%9E%E3%83%83%E3%83%94%E3%83%B3%E3%82%B0%E3%81%8C%E5%89%B5%E3%82%8B-%E4%BD%93%E9%A8%93%E7%A9%BA%E9%96%93",
    "action": "keep-200",
    "lastmod": "2025-07-31"
  },
  {
    "type": "blog-post",
    "oldPath": "/post/projection-mapping-seisaku-cost",
    "path": "/post/projection-mapping-seisaku-cost",
    "action": "keep-200",
    "lastmod": "2026-05-07"
  },
  {
    "type": "blog-post",
    "oldPath": "/post/sauna-japon-projection-mapping",
    "path": "/post/sauna-japon-projection-mapping",
    "action": "keep-200",
    "lastmod": "2025-12-15"
  },
  {
    "type": "blog-post",
    "oldPath": "/post/%E3%80%90%E6%98%A0%E5%83%8F%E3%81%82%E3%82%8A%E3%80%91-%E7%A9%BA%E9%96%93%E3%81%8C%E5%8B%95%E3%81%8D%E5%87%BA%E3%81%99%E7%9E%AC%E9%96%93-%E3%83%97%E3%83%AD%E3%82%B8%E3%82%A7%E3%82%AF%E3%82%B7%E3%83%A7%E3%83%B3%E3%83%9E%E3%83%83%E3%83%94%E3%83%B3%E3%82%B0%E3%81%A7%E5%89%B5%E3%82%8B%E6%96%B0%E3%81%97%E3%81%84%E4%BD%93%E9%A8%93",
    "path": "/post/%E3%80%90%E6%98%A0%E5%83%8F%E3%81%82%E3%82%8A%E3%80%91-%E7%A9%BA%E9%96%93%E3%81%8C%E5%8B%95%E3%81%8D%E5%87%BA%E3%81%99%E7%9E%AC%E9%96%93-%E3%83%97%E3%83%AD%E3%82%B8%E3%82%A7%E3%82%AF%E3%82%B7%E3%83%A7%E3%83%B3%E3%83%9E%E3%83%83%E3%83%94%E3%83%B3%E3%82%B0%E3%81%A7%E5%89%B5%E3%82%8B%E6%96%B0%E3%81%97%E3%81%84%E4%BD%93%E9%A8%93",
    "action": "keep-200",
    "lastmod": "2025-09-04"
  },
  {
    "type": "blog-post",
    "oldPath": "/post/%E7%BE%8E%E3%81%97%E3%81%95-%E3%82%92%E5%8F%AF%E8%A6%96%E5%8C%96%E3%81%99%E3%82%8B-%E7%BE%8E%E5%AE%B9%E6%A5%AD%E7%95%8C-%E6%98%A0%E5%83%8F%E5%88%B6%E4%BD%9C%E3%81%AE%E6%96%B0%E6%8F%90%E6%A1%88%E3%80%823dcg%E3%81%A7%E5%BA%83%E3%81%8C%E3%82%8B%E8%A1%A8%E7%8F%BE%E3%81%AE%E5%8F%AF%E8%83%BD%E6%80%A7",
    "path": "/post/%E7%BE%8E%E3%81%97%E3%81%95-%E3%82%92%E5%8F%AF%E8%A6%96%E5%8C%96%E3%81%99%E3%82%8B-%E7%BE%8E%E5%AE%B9%E6%A5%AD%E7%95%8C-%E6%98%A0%E5%83%8F%E5%88%B6%E4%BD%9C%E3%81%AE%E6%96%B0%E6%8F%90%E6%A1%88%E3%80%823dcg%E3%81%A7%E5%BA%83%E3%81%8C%E3%82%8B%E8%A1%A8%E7%8F%BE%E3%81%AE%E5%8F%AF%E8%83%BD%E6%80%A7",
    "action": "keep-200",
    "lastmod": "2025-05-15"
  },
  {
    "type": "blog-post",
    "oldPath": "/post/3dcg-video-production-guide",
    "path": "/post/3dcg-video-production-guide",
    "action": "keep-200",
    "lastmod": "2026-07-13"
  },
  {
    "type": "blog-post",
    "oldPath": "/post/%E3%83%9E%E3%83%83%E3%83%94%E3%83%B3%E3%82%B0%E3%81%A8%E3%81%AF%EF%BC%9F%E3%83%97%E3%83%AD%E3%82%B8%E3%82%A7%E3%82%AF%E3%82%B7%E3%83%A7%E3%83%B3%E3%83%9E%E3%83%83%E3%83%94%E3%83%B3%E3%82%B0%E3%81%AE%E4%BB%95%E7%B5%84%E3%81%BF%E3%82%92%E5%88%9D%E5%BF%83%E8%80%85%E5%90%91%E3%81%91%E3%81%AB%E8%A7%A3%E8%AA%AC",
    "path": "/post/%E3%83%9E%E3%83%83%E3%83%94%E3%83%B3%E3%82%B0%E3%81%A8%E3%81%AF%EF%BC%9F%E3%83%97%E3%83%AD%E3%82%B8%E3%82%A7%E3%82%AF%E3%82%B7%E3%83%A7%E3%83%B3%E3%83%9E%E3%83%83%E3%83%94%E3%83%B3%E3%82%B0%E3%81%AE%E4%BB%95%E7%B5%84%E3%81%BF%E3%82%92%E5%88%9D%E5%BF%83%E8%80%85%E5%90%91%E3%81%91%E3%81%AB%E8%A7%A3%E8%AA%AC",
    "action": "keep-200",
    "lastmod": "2026-07-30"
  },
  {
    "type": "blog-post",
    "oldPath": "/post/restaurant-projection-mapping-failure-guide",
    "path": "/post/restaurant-projection-mapping-failure-guide",
    "action": "keep-200",
    "lastmod": "2026-03-23"
  },
  {
    "type": "blog-post",
    "oldPath": "/post/projection-mapping-tokyo",
    "path": "/post/projection-mapping-tokyo",
    "action": "keep-200",
    "lastmod": "2026-05-11"
  },
  {
    "type": "blog-post",
    "oldPath": "/post/%E6%98%BC%E3%81%A8%E5%A4%9C%E3%81%A7%E5%A4%89%E3%82%8F%E3%82%8B%E3%80%81%E5%B9%BB%E6%83%B3%E3%81%AE%E6%9E%AF%E5%B1%B1%E6%B0%B4%E3%80%82%E4%BA%AC%E9%83%BD%E3%83%91%E3%83%93%E3%83%AA%E3%82%AA%E3%83%B3-%E3%83%97%E3%83%AD%E3%82%B8%E3%82%A7%E3%82%AF%E3%82%B7%E3%83%A7%E3%83%B3%E3%83%9E%E3%83%83%E3%83%94%E3%83%B3%E3%82%B0%E4%BD%93%E9%A8%93",
    "path": "/post/%E6%98%BC%E3%81%A8%E5%A4%9C%E3%81%A7%E5%A4%89%E3%82%8F%E3%82%8B%E3%80%81%E5%B9%BB%E6%83%B3%E3%81%AE%E6%9E%AF%E5%B1%B1%E6%B0%B4%E3%80%82%E4%BA%AC%E9%83%BD%E3%83%91%E3%83%93%E3%83%AA%E3%82%AA%E3%83%B3-%E3%83%97%E3%83%AD%E3%82%B8%E3%82%A7%E3%82%AF%E3%82%B7%E3%83%A7%E3%83%B3%E3%83%9E%E3%83%83%E3%83%94%E3%83%B3%E3%82%B0%E4%BD%93%E9%A8%93",
    "action": "keep-200",
    "lastmod": "2025-04-17"
  },
  {
    "type": "blog-post",
    "oldPath": "/post/%E3%80%909%E6%9C%881%E6%97%A5%E3%81%BE%E3%81%A7%E9%96%8B%E5%82%AC%E3%80%91%E3%81%99%E3%81%BF%E3%81%A0%E6%B0%B4%E6%97%8F%E9%A4%A8%E3%81%AE%E5%A4%8F%E3%82%A4%E3%83%99%E3%83%B3%E3%83%88%E3%80%8Ccool-coool-cooool-%E3%80%8D%E3%81%A7%E3%83%97%E3%83%AD%E3%82%B8%E3%82%A7%E3%82%AF%E3%82%B7%E3%83%A7%E3%83%B3%E3%83%9E%E3%83%83%E3%83%94%E3%83%B3%E3%82%B0%E3%82%92%E6%8A%AB%E9%9C%B2%E3%81%97%E3%81%BE%E3%81%97%E3%81%9F",
    "path": "/post/%E3%80%909%E6%9C%881%E6%97%A5%E3%81%BE%E3%81%A7%E9%96%8B%E5%82%AC%E3%80%91%E3%81%99%E3%81%BF%E3%81%A0%E6%B0%B4%E6%97%8F%E9%A4%A8%E3%81%AE%E5%A4%8F%E3%82%A4%E3%83%99%E3%83%B3%E3%83%88%E3%80%8Ccool-coool-cooool-%E3%80%8D%E3%81%A7%E3%83%97%E3%83%AD%E3%82%B8%E3%82%A7%E3%82%AF%E3%82%B7%E3%83%A7%E3%83%B3%E3%83%9E%E3%83%83%E3%83%94%E3%83%B3%E3%82%B0%E3%82%92%E6%8A%AB%E9%9C%B2%E3%81%97%E3%81%BE%E3%81%97%E3%81%9F",
    "action": "keep-200",
    "lastmod": "2025-07-15"
  },
  {
    "type": "blog-post",
    "oldPath": "/post/ai-human-creativity-film",
    "path": "/post/ai-human-creativity-film",
    "action": "keep-200",
    "lastmod": "2025-12-01"
  },
  {
    "type": "blog-post",
    "oldPath": "/post/%E3%81%8A%E6%B4%92%E8%90%BD%E7%84%BC%E8%82%89%E3%83%AC%E3%82%B9%E3%83%88%E3%83%A9%E3%83%B3%E3%81%AE%E6%96%B0%E5%B8%B8%E8%AD%98%E3%80%82%E9%9B%86%E5%AE%A2%E3%82%92%E7%94%9F%E3%82%80%E3%83%97%E3%83%AD%E3%82%B8%E3%82%A7%E3%82%AF%E3%82%B7%E3%83%A7%E3%83%B3%E3%83%9E%E3%83%83%E3%83%94%E3%83%B3%E3%82%B0%E6%BC%94%E5%87%BA",
    "path": "/post/%E3%81%8A%E6%B4%92%E8%90%BD%E7%84%BC%E8%82%89%E3%83%AC%E3%82%B9%E3%83%88%E3%83%A9%E3%83%B3%E3%81%AE%E6%96%B0%E5%B8%B8%E8%AD%98%E3%80%82%E9%9B%86%E5%AE%A2%E3%82%92%E7%94%9F%E3%82%80%E3%83%97%E3%83%AD%E3%82%B8%E3%82%A7%E3%82%AF%E3%82%B7%E3%83%A7%E3%83%B3%E3%83%9E%E3%83%83%E3%83%94%E3%83%B3%E3%82%B0%E6%BC%94%E5%87%BA",
    "action": "keep-200",
    "lastmod": "2025-09-06"
  },
  {
    "type": "blog-post",
    "oldPath": "/post/%E9%A3%B2%E9%A3%9F%E5%BA%97%E3%81%8B%E3%82%89%E5%BA%83%E5%91%8A%E3%81%BE%E3%81%A7%E3%80%82%E3%83%97%E3%83%AD%E3%82%B8%E3%82%A7%E3%82%AF%E3%82%B7%E3%83%A7%E3%83%B3%E3%83%9E%E3%83%83%E3%83%94%E3%83%B3%E3%82%B0%E3%80%81%E7%A9%BA%E9%96%93%E6%BC%94%E5%87%BA%E3%81%AE%E5%8F%AF%E8%83%BD%E6%80%A7",
    "path": "/post/%E9%A3%B2%E9%A3%9F%E5%BA%97%E3%81%8B%E3%82%89%E5%BA%83%E5%91%8A%E3%81%BE%E3%81%A7%E3%80%82%E3%83%97%E3%83%AD%E3%82%B8%E3%82%A7%E3%82%AF%E3%82%B7%E3%83%A7%E3%83%B3%E3%83%9E%E3%83%83%E3%83%94%E3%83%B3%E3%82%B0%E3%80%81%E7%A9%BA%E9%96%93%E6%BC%94%E5%87%BA%E3%81%AE%E5%8F%AF%E8%83%BD%E6%80%A7",
    "action": "keep-200",
    "lastmod": "2025-10-16"
  },
  {
    "type": "blog-post",
    "oldPath": "/post/projection-mapping-guide-2026",
    "path": "/post/projection-mapping-guide-2026",
    "action": "keep-200",
    "lastmod": "2026-03-18"
  },
  {
    "type": "blog-post",
    "oldPath": "/post/projection-mapping-tokyo-guide",
    "path": "/post/projection-mapping-tokyo-guide",
    "action": "keep-200",
    "lastmod": "2026-06-08"
  },
  {
    "type": "blog-post",
    "oldPath": "/post/%E3%83%97%E3%83%AD%E3%82%B8%E3%82%A7%E3%82%AF%E3%82%B7%E3%83%A7%E3%83%B3%E3%83%9E%E3%83%83%E3%83%94%E3%83%B3%E3%82%B0%E3%81%A8%E3%81%AF%EF%BC%9F%E5%88%9D%E5%BF%83%E8%80%85%E3%81%AB%E3%82%82%E3%82%8F%E3%81%8B%E3%82%8A%E3%82%84%E3%81%99%E3%81%8F%E8%A7%A3%E8%AA%AC-%E4%BB%95%E7%B5%84%E3%81%BF%E3%83%BB%E8%B2%BB%E7%94%A8%E3%83%BB%E6%B4%BB%E7%94%A8%E4%BA%8B",
    "path": "/post/%E3%83%97%E3%83%AD%E3%82%B8%E3%82%A7%E3%82%AF%E3%82%B7%E3%83%A7%E3%83%B3%E3%83%9E%E3%83%83%E3%83%94%E3%83%B3%E3%82%B0%E3%81%A8%E3%81%AF%EF%BC%9F%E5%88%9D%E5%BF%83%E8%80%85%E3%81%AB%E3%82%82%E3%82%8F%E3%81%8B%E3%82%8A%E3%82%84%E3%81%99%E3%81%8F%E8%A7%A3%E8%AA%AC-%E4%BB%95%E7%B5%84%E3%81%BF%E3%83%BB%E8%B2%BB%E7%94%A8%E3%83%BB%E6%B4%BB%E7%94%A8%E4%BA%8B",
    "action": "keep-200",
    "lastmod": "2025-08-09"
  },
  {
    "type": "blog-post",
    "oldPath": "/post/creator-recruit",
    "path": "/post/creator-recruit",
    "action": "keep-200",
    "lastmod": "2026-02-04"
  },
  {
    "type": "blog-post",
    "oldPath": "/post/projection-mapping-seisaku-guide-1",
    "path": "/post/projection-mapping-seisaku-guide-1",
    "action": "keep-200",
    "lastmod": "2026-06-19"
  },
  {
    "type": "blog-post",
    "oldPath": "/post/%E5%8B%95%E3%81%8F%E3%83%A2%E3%83%8E%E3%81%AB%E3%82%82%E6%98%A0%E5%83%8F%E3%82%92%E3%80%823dcg%E3%83%97%E3%83%AD%E3%83%A2%E3%81%A7%E6%8C%91%E6%88%A6%E3%81%97%E3%81%9F%E6%96%B0%E3%81%9F%E3%81%AA%E8%A1%A8%E7%8F%BE",
    "path": "/post/%E5%8B%95%E3%81%8F%E3%83%A2%E3%83%8E%E3%81%AB%E3%82%82%E6%98%A0%E5%83%8F%E3%82%92%E3%80%823dcg%E3%83%97%E3%83%AD%E3%83%A2%E3%81%A7%E6%8C%91%E6%88%A6%E3%81%97%E3%81%9F%E6%96%B0%E3%81%9F%E3%81%AA%E8%A1%A8%E7%8F%BE",
    "action": "keep-200",
    "lastmod": "2025-05-08"
  },
  {
    "type": "blog-post",
    "oldPath": "/post/projection-mapping-trend-2026-05",
    "path": "/post/projection-mapping-trend-2026-05",
    "action": "keep-200",
    "lastmod": "2026-05-21"
  },
  {
    "type": "blog-post",
    "oldPath": "/post/%E3%83%97%E3%83%AD%E3%82%B8%E3%82%A7%E3%82%AF%E3%82%B7%E3%83%A7%E3%83%B3%E3%83%9E%E3%83%83%E3%83%94%E3%83%B3%E3%82%B0%E3%81%AE%E5%B0%8E%E5%85%A5%E4%BA%8B%E4%BE%8B%E3%81%A8%E5%A4%9A%E6%A5%AD%E7%A8%AE%E3%81%A7%E3%81%AE%E6%B4%BB%E7%94%A8%E6%B3%95-%E3%82%B5%E3%82%A6%E3%83%8A%E3%83%BB%E6%B0%B4%E6%97%8F%E9%A4%A8%E3%83%BB%E7%BE%8E%E8%A1%93%E5%B1%95%E3%81%8B%E3%82%89%E3%83%9B%E3%83%86%E3%83%AB%E3%81%BE%E3%81%A7",
    "path": "/post/%E3%83%97%E3%83%AD%E3%82%B8%E3%82%A7%E3%82%AF%E3%82%B7%E3%83%A7%E3%83%B3%E3%83%9E%E3%83%83%E3%83%94%E3%83%B3%E3%82%B0%E3%81%AE%E5%B0%8E%E5%85%A5%E4%BA%8B%E4%BE%8B%E3%81%A8%E5%A4%9A%E6%A5%AD%E7%A8%AE%E3%81%A7%E3%81%AE%E6%B4%BB%E7%94%A8%E6%B3%95-%E3%82%B5%E3%82%A6%E3%83%8A%E3%83%BB%E6%B0%B4%E6%97%8F%E9%A4%A8%E3%83%BB%E7%BE%8E%E8%A1%93%E5%B1%95%E3%81%8B%E3%82%89%E3%83%9B%E3%83%86%E3%83%AB%E3%81%BE%E3%81%A7",
    "action": "keep-200",
    "lastmod": "2025-09-15"
  },
  {
    "type": "blog-post",
    "oldPath": "/post/%E3%80%9010-1-%E7%81%AB-open%EF%BC%81%E3%80%91%E3%82%B9%E3%83%8A%E3%83%83%E3%82%AF%E3%81%AE%E5%A5%A5%E3%81%AB%E4%BD%87%E3%82%80%E7%95%B0%E4%B8%96%E7%95%8C%E7%A9%BA%E9%96%93%E3%81%AE%E5%AE%8C%E5%85%A8%E4%BA%88%E7%B4%84%E5%88%B6%E3%81%AE%E3%83%97%E3%83%A9%E3%82%A4%E3%83%99%E3%83%BC%E3%83%88%E3%82%B5%E3%82%A6%E3%83%8A%E3%80%8C%E3%82%B5%E3%82%A6%E3%83%8A-%E3%82%B9%E3%83%8A%E3%83%83%E3%82%AF-%E3%81%8B%E3%81%AA%E3%81%93%E3%80%8D%E3%81%8C%E5%93%81%E5%B7%9D%E3%83%BB%E9%9D%92%E7%89%A9%E6%A8%AA%E4%B8%81%E3%81%AB%E3%82%AA%E3%83%BC%E3%83%97%E3%83%B3%EF%BC%81",
    "path": "/post/%E3%80%9010-1-%E7%81%AB-open%EF%BC%81%E3%80%91%E3%82%B9%E3%83%8A%E3%83%83%E3%82%AF%E3%81%AE%E5%A5%A5%E3%81%AB%E4%BD%87%E3%82%80%E7%95%B0%E4%B8%96%E7%95%8C%E7%A9%BA%E9%96%93%E3%81%AE%E5%AE%8C%E5%85%A8%E4%BA%88%E7%B4%84%E5%88%B6%E3%81%AE%E3%83%97%E3%83%A9%E3%82%A4%E3%83%99%E3%83%BC%E3%83%88%E3%82%B5%E3%82%A6%E3%83%8A%E3%80%8C%E3%82%B5%E3%82%A6%E3%83%8A-%E3%82%B9%E3%83%8A%E3%83%83%E3%82%AF-%E3%81%8B%E3%81%AA%E3%81%93%E3%80%8D%E3%81%8C%E5%93%81%E5%B7%9D%E3%83%BB%E9%9D%92%E7%89%A9%E6%A8%AA%E4%B8%81%E3%81%AB%E3%82%AA%E3%83%BC%E3%83%97%E3%83%B3%EF%BC%81",
    "action": "keep-200",
    "lastmod": "2024-09-30"
  },
  {
    "type": "blog-post",
    "oldPath": "/post/%E5%BA%97%E5%86%85%E3%81%AE%E6%BC%94%E5%87%BA%E3%81%AB-%E6%98%A0%E5%83%8F-%E3%81%A8%E3%81%84%E3%81%86%E6%96%B0%E3%81%97%E3%81%84%E9%81%B8%E6%8A%9E%E8%82%A2-%E2%80%95-%E3%83%97%E3%83%AD%E3%82%B8%E3%82%A7%E3%82%AF%E3%82%B7%E3%83%A7%E3%83%B3%E3%83%9E%E3%83%83%E3%83%94%E3%83%B3%E3%82%B0%E5%B0%8E%E5%85%A5%E4%BA%8B%E4%BE%8B-%E8%B5%A4%E5%9D%82%E3%83%AC%E3%82%B9%E3%83%88%E3%83%A9%E3%83%B3",
    "path": "/post/%E5%BA%97%E5%86%85%E3%81%AE%E6%BC%94%E5%87%BA%E3%81%AB-%E6%98%A0%E5%83%8F-%E3%81%A8%E3%81%84%E3%81%86%E6%96%B0%E3%81%97%E3%81%84%E9%81%B8%E6%8A%9E%E8%82%A2-%E2%80%95-%E3%83%97%E3%83%AD%E3%82%B8%E3%82%A7%E3%82%AF%E3%82%B7%E3%83%A7%E3%83%B3%E3%83%9E%E3%83%83%E3%83%94%E3%83%B3%E3%82%B0%E5%B0%8E%E5%85%A5%E4%BA%8B%E4%BE%8B-%E8%B5%A4%E5%9D%82%E3%83%AC%E3%82%B9%E3%83%88%E3%83%A9%E3%83%B3",
    "action": "keep-200",
    "lastmod": "2025-06-05"
  },
  {
    "type": "blog-post",
    "oldPath": "/post/projection-mapping-cost-guide",
    "path": "/post/projection-mapping-cost-guide",
    "action": "keep-200",
    "lastmod": "2026-07-24"
  },
  {
    "type": "blog-post",
    "oldPath": "/post/ar-content-production-guide",
    "path": "/post/ar-content-production-guide",
    "action": "keep-200",
    "lastmod": "2026-07-27"
  },
  {
    "type": "blog-post",
    "oldPath": "/post/outdoor-projection-mapping-guide-2026",
    "path": "/post/outdoor-projection-mapping-guide-2026",
    "action": "keep-200",
    "lastmod": "2026-07-07"
  },
  {
    "type": "blog-post",
    "oldPath": "/post/projection-mapping-use-cases",
    "path": "/post/projection-mapping-use-cases",
    "action": "keep-200",
    "lastmod": "2026-03-23"
  },
  {
    "type": "blog-post",
    "oldPath": "/post/%E6%97%A5%E6%9C%AC%E5%88%9D%EF%BC%81%E3%83%97%E3%83%AD%E3%82%B8%E3%82%A7%E3%82%AF%E3%82%B7%E3%83%A7%E3%83%B3%E3%83%9E%E3%83%83%E3%83%94%E3%83%B3%E3%82%B0%E3%81%A8%E3%82%B7%E3%83%BC%E3%82%B7%E3%83%A3%E3%81%AE%E6%96%B0%E4%BD%93%E9%A8%93%E3%81%8C%E6%96%B0%E5%AE%BF%E3%83%BB%E6%AD%8C%E8%88%9E%E4%BC%8E%E7%94%BA%E3%80%8Cshisha-boutique-freaks%E3%80%8D%E3%81%A7%E5%91%B3%E3%82%8F%E3%81%88%E3%82%8B%EF%BC%81",
    "path": "/post/%E6%97%A5%E6%9C%AC%E5%88%9D%EF%BC%81%E3%83%97%E3%83%AD%E3%82%B8%E3%82%A7%E3%82%AF%E3%82%B7%E3%83%A7%E3%83%B3%E3%83%9E%E3%83%83%E3%83%94%E3%83%B3%E3%82%B0%E3%81%A8%E3%82%B7%E3%83%BC%E3%82%B7%E3%83%A3%E3%81%AE%E6%96%B0%E4%BD%93%E9%A8%93%E3%81%8C%E6%96%B0%E5%AE%BF%E3%83%BB%E6%AD%8C%E8%88%9E%E4%BC%8E%E7%94%BA%E3%80%8Cshisha-boutique-freaks%E3%80%8D%E3%81%A7%E5%91%B3%E3%82%8F%E3%81%88%E3%82%8B%EF%BC%81",
    "action": "keep-200",
    "lastmod": "2024-09-18"
  },
  {
    "type": "blog-post",
    "oldPath": "/post/%E5%BA%97%E5%86%85%E3%81%8C%E4%B8%80%E7%9E%AC%E3%81%A7%E5%A4%89%E3%82%8F%E3%82%8B%E9%AD%94%E6%B3%95-%E3%82%A4%E3%83%9E%E3%83%BC%E3%82%B7%E3%83%96%E3%82%B3%E3%83%B3%E3%83%86%E3%83%B3%E3%83%84-%E3%81%A7%E6%96%B0%E3%81%97%E3%81%84%E9%9B%86%E5%AE%A2%E3%81%AE%E3%82%AB%E3%82%BF%E3%83%81%E3%82%92%E3%80%82%E3%81%8A%E5%AE%A2%E6%A7%98%E3%81%8C%E6%80%9D%E3%82%8F%E3%81%9Asns%E3%81%A7%E3%82%B7%E3%82%A7%E3%82%A2%E3%81%97%E3%81%9F%E3%81%8F%E3%81%AA%E3%82%8B%E3%80%81mirasisone%E3%81%8C%E6%8F%90%E4%BE%9B%E3%81%99%E3%82%8B%E5%BA%97%E8%88%97%E7%89%B9%E5%8C%96%E5%9E%8B%E3%83%97%E3%83%AD%E3%82%B8%E3%82%A7%E3%82%AF%E3%82%B7%E3%83%A7%E3%83%B3%E3%83%9E%E3%83%83%E3%83%94%E3%83%B3%E3%82%B0%E3%80%8C%E3%82%B9%E3%83%88%E3%82%A2%E3%83%9E%E3%83%83%E3%83%94%E3%83%B3%E3%82%B0%E3%80%8D%E3%81%A8%E3%81%AF",
    "path": "/post/%E5%BA%97%E5%86%85%E3%81%8C%E4%B8%80%E7%9E%AC%E3%81%A7%E5%A4%89%E3%82%8F%E3%82%8B%E9%AD%94%E6%B3%95-%E3%82%A4%E3%83%9E%E3%83%BC%E3%82%B7%E3%83%96%E3%82%B3%E3%83%B3%E3%83%86%E3%83%B3%E3%83%84-%E3%81%A7%E6%96%B0%E3%81%97%E3%81%84%E9%9B%86%E5%AE%A2%E3%81%AE%E3%82%AB%E3%82%BF%E3%83%81%E3%82%92%E3%80%82%E3%81%8A%E5%AE%A2%E6%A7%98%E3%81%8C%E6%80%9D%E3%82%8F%E3%81%9Asns%E3%81%A7%E3%82%B7%E3%82%A7%E3%82%A2%E3%81%97%E3%81%9F%E3%81%8F%E3%81%AA%E3%82%8B%E3%80%81mirasisone%E3%81%8C%E6%8F%90%E4%BE%9B%E3%81%99%E3%82%8B%E5%BA%97%E8%88%97%E7%89%B9%E5%8C%96%E5%9E%8B%E3%83%97%E3%83%AD%E3%82%B8%E3%82%A7%E3%82%AF%E3%82%B7%E3%83%A7%E3%83%B3%E3%83%9E%E3%83%83%E3%83%94%E3%83%B3%E3%82%B0%E3%80%8C%E3%82%B9%E3%83%88%E3%82%A2%E3%83%9E%E3%83%83%E3%83%94%E3%83%B3%E3%82%B0%E3%80%8D%E3%81%A8%E3%81%AF",
    "action": "keep-200",
    "lastmod": "2024-10-15"
  },
  {
    "type": "blog-post",
    "oldPath": "/post/indoor-projection-mapping-guide",
    "path": "/post/indoor-projection-mapping-guide",
    "action": "keep-200",
    "lastmod": "2026-07-01"
  },
  {
    "type": "blog-post",
    "oldPath": "/post/projection-mapping-cafe-guide",
    "path": "/post/projection-mapping-cafe-guide",
    "action": "keep-200",
    "lastmod": "2026-07-20"
  },
  {
    "type": "blog-post",
    "oldPath": "/post/3dcg-promotion-video",
    "path": "/post/3dcg-promotion-video",
    "action": "keep-200",
    "lastmod": "2026-02-10"
  },
  {
    "type": "blog-post",
    "oldPath": "/post/%E3%80%90%E3%83%97%E3%83%AD%E3%82%B8%E3%82%A7%E3%82%AF%E3%82%B7%E3%83%A7%E3%83%B3%E3%83%9E%E3%83%83%E3%83%94%E3%83%B3%E3%82%B0%E3%80%91%E3%82%A2%E3%83%BC%E3%83%88%E3%81%8C%E5%8B%95%E3%81%8F%EF%BC%81%EF%BC%9Fmirasisone%E3%81%8B%E3%82%89%E9%81%B8%E3%81%B0%E3%82%8C%E3%81%9F%E3%83%97%E3%83%AD%E3%82%B8%E3%82%A7%E3%82%AF%E3%82%B7%E3%83%A7%E3%83%B3%E3%83%9E%E3%83%83%E3%83%94%E3%83%B3%E3%82%B0%E3%83%81%E3%83%BC%E3%83%A0%E3%80%8Cmagic-the-light-%E3%83%9E%E3%82%B8%E3%83%83%E3%82%AF-%E3%82%B6-%E3%83%A9%E3%82%A4%E3%83%88-%E3%80%8D%E3%81%8C%E6%89%8B%E3%81%8C%E3%81%91%E3%82%8B-%E3%82%A2%E3%83%BC%E3%83%88%E3%83%9E%E3%83%83%E3%83%94%E3%83%B3%E3%82%B0-%E3%81%A8",
    "path": "/post/%E3%80%90%E3%83%97%E3%83%AD%E3%82%B8%E3%82%A7%E3%82%AF%E3%82%B7%E3%83%A7%E3%83%B3%E3%83%9E%E3%83%83%E3%83%94%E3%83%B3%E3%82%B0%E3%80%91%E3%82%A2%E3%83%BC%E3%83%88%E3%81%8C%E5%8B%95%E3%81%8F%EF%BC%81%EF%BC%9Fmirasisone%E3%81%8B%E3%82%89%E9%81%B8%E3%81%B0%E3%82%8C%E3%81%9F%E3%83%97%E3%83%AD%E3%82%B8%E3%82%A7%E3%82%AF%E3%82%B7%E3%83%A7%E3%83%B3%E3%83%9E%E3%83%83%E3%83%94%E3%83%B3%E3%82%B0%E3%83%81%E3%83%BC%E3%83%A0%E3%80%8Cmagic-the-light-%E3%83%9E%E3%82%B8%E3%83%83%E3%82%AF-%E3%82%B6-%E3%83%A9%E3%82%A4%E3%83%88-%E3%80%8D%E3%81%8C%E6%89%8B%E3%81%8C%E3%81%91%E3%82%8B-%E3%82%A2%E3%83%BC%E3%83%88%E3%83%9E%E3%83%83%E3%83%94%E3%83%B3%E3%82%B0-%E3%81%A8",
    "action": "keep-200",
    "lastmod": "2024-09-21"
  },
  {
    "type": "blog-post",
    "oldPath": "/post/restaurant-projection-mapping-guide",
    "path": "/post/restaurant-projection-mapping-guide",
    "action": "keep-200",
    "lastmod": "2026-05-25"
  },
  {
    "type": "blog-post",
    "oldPath": "/post/%E6%98%A0%E5%83%8F%E5%88%B6%E4%BD%9C%E4%BC%9A%E7%A4%BE%E3%81%AE%E9%81%B8%E3%81%B3%E6%96%B9-%E4%B8%96%E7%95%8C%E5%9F%BA%E6%BA%96%E3%81%AE%E6%BC%94%E5%87%BA%E3%82%92%E5%AE%9F%E7%8F%BE%E3%81%99%E3%82%8B%E3%81%9F%E3%82%81%E3%81%AB%E7%A2%BA%E8%AA%8D%E3%81%99%E3%81%B9%E3%81%8D5%E3%81%A4%E3%81%AE%E6%9D%A1%E4%BB%B6",
    "path": "/post/%E6%98%A0%E5%83%8F%E5%88%B6%E4%BD%9C%E4%BC%9A%E7%A4%BE%E3%81%AE%E9%81%B8%E3%81%B3%E6%96%B9-%E4%B8%96%E7%95%8C%E5%9F%BA%E6%BA%96%E3%81%AE%E6%BC%94%E5%87%BA%E3%82%92%E5%AE%9F%E7%8F%BE%E3%81%99%E3%82%8B%E3%81%9F%E3%82%81%E3%81%AB%E7%A2%BA%E8%AA%8D%E3%81%99%E3%81%B9%E3%81%8D5%E3%81%A4%E3%81%AE%E6%9D%A1%E4%BB%B6",
    "action": "keep-200",
    "lastmod": "2026-07-10"
  },
  {
    "type": "blog-post",
    "oldPath": "/post/%E6%A0%AA%E5%BC%8F%E4%BC%9A%E7%A4%BEmirasisone%EF%BC%9A%E3%83%9B%E3%83%BC%E3%83%A0%E3%83%9A%E3%83%BC%E3%82%B8%E3%83%AA%E3%83%8B%E3%83%A5%E3%83%BC%E3%82%A2%E3%83%AB%E3%81%AE%E3%81%8A%E7%9F%A5%E3%82%89%E3%81%9B",
    "path": "/post/%E6%A0%AA%E5%BC%8F%E4%BC%9A%E7%A4%BEmirasisone%EF%BC%9A%E3%83%9B%E3%83%BC%E3%83%A0%E3%83%9A%E3%83%BC%E3%82%B8%E3%83%AA%E3%83%8B%E3%83%A5%E3%83%BC%E3%82%A2%E3%83%AB%E3%81%AE%E3%81%8A%E7%9F%A5%E3%82%89%E3%81%9B",
    "action": "keep-200",
    "lastmod": "2025-07-15"
  },
  {
    "type": "blog-post",
    "oldPath": "/post/%E5%85%89%E3%81%A7%E5%91%B3%E3%82%8F%E3%81%86%E4%BC%9D%E7%B5%B1-%E6%97%A5%E6%9C%AC%E9%85%92%E3%81%8C%E7%94%9F%E3%81%BE%E3%82%8C%E3%82%8B%E5%A0%B4%E6%89%80%E3%81%AB%E3%80%81%E4%BD%93%E9%A8%93%E3%82%92%E3%80%82",
    "path": "/post/%E5%85%89%E3%81%A7%E5%91%B3%E3%82%8F%E3%81%86%E4%BC%9D%E7%B5%B1-%E6%97%A5%E6%9C%AC%E9%85%92%E3%81%8C%E7%94%9F%E3%81%BE%E3%82%8C%E3%82%8B%E5%A0%B4%E6%89%80%E3%81%AB%E3%80%81%E4%BD%93%E9%A8%93%E3%82%92%E3%80%82",
    "action": "keep-200",
    "lastmod": "2025-10-27"
  },
  {
    "type": "blog-post",
    "oldPath": "/post/2025%E5%B9%B4%E6%9C%80%E6%96%B0%EF%BC%81%E3%83%97%E3%83%AD%E3%82%B8%E3%82%A7%E3%82%AF%E3%82%B7%E3%83%A7%E3%83%B3%E3%83%9E%E3%83%83%E3%83%94%E3%83%B3%E3%82%B0%EF%BC%863dcg%E6%98%A0%E5%83%8F%E3%81%A7%E5%89%B5%E3%82%8B%E3%80%81%E9%AD%85%E3%81%9B%E3%82%8B%E6%96%B0%E3%81%97%E3%81%84%E4%BD%93%E9%A8%93",
    "path": "/post/2025%E5%B9%B4%E6%9C%80%E6%96%B0%EF%BC%81%E3%83%97%E3%83%AD%E3%82%B8%E3%82%A7%E3%82%AF%E3%82%B7%E3%83%A7%E3%83%B3%E3%83%9E%E3%83%83%E3%83%94%E3%83%B3%E3%82%B0%EF%BC%863dcg%E6%98%A0%E5%83%8F%E3%81%A7%E5%89%B5%E3%82%8B%E3%80%81%E9%AD%85%E3%81%9B%E3%82%8B%E6%96%B0%E3%81%97%E3%81%84%E4%BD%93%E9%A8%93",
    "action": "keep-200",
    "lastmod": "2025-09-22"
  },
  {
    "type": "blog-post",
    "oldPath": "/post/%E3%80%8C%E3%83%97%E3%83%AD%E3%82%B8%E3%82%A7%E3%82%AF%E3%82%B7%E3%83%A7%E3%83%B3%E3%83%9E%E3%83%83%E3%83%94%E3%83%B3%E3%82%B0%E3%81%A3%E3%81%A6%E3%81%93%E3%82%93%E3%81%AA%E5%A0%B4%E6%89%80%E3%81%A7%E3%82%82%EF%BC%9F%E3%82%B9%E3%83%8A%E3%83%83%E3%82%AF%E3%81%AE%E5%A5%A5%E3%81%AB%E5%BA%83%E3%81%8C%E3%82%8B%E7%95%B0%E4%B8%96%E7%95%8C%E3%82%B5%E3%82%A6%E3%83%8A%E7%A9%BA%E9%96%93%E3%80%8D",
    "path": "/post/%E3%80%8C%E3%83%97%E3%83%AD%E3%82%B8%E3%82%A7%E3%82%AF%E3%82%B7%E3%83%A7%E3%83%B3%E3%83%9E%E3%83%83%E3%83%94%E3%83%B3%E3%82%B0%E3%81%A3%E3%81%A6%E3%81%93%E3%82%93%E3%81%AA%E5%A0%B4%E6%89%80%E3%81%A7%E3%82%82%EF%BC%9F%E3%82%B9%E3%83%8A%E3%83%83%E3%82%AF%E3%81%AE%E5%A5%A5%E3%81%AB%E5%BA%83%E3%81%8C%E3%82%8B%E7%95%B0%E4%B8%96%E7%95%8C%E3%82%B5%E3%82%A6%E3%83%8A%E7%A9%BA%E9%96%93%E3%80%8D",
    "action": "keep-200",
    "lastmod": "2025-05-22"
  },
  {
    "type": "blog-post",
    "oldPath": "/post/experience-design-visual-2026",
    "path": "/post/experience-design-visual-2026",
    "action": "keep-200",
    "lastmod": "2026-01-19"
  },
  {
    "type": "blog-post",
    "oldPath": "/post/%E9%A3%B2%E9%A3%9F%E7%A9%BA%E9%96%93%E3%82%92-%E8%A8%98%E6%86%B6%E3%81%AB%E6%AE%8B%E3%82%8B%E4%BD%93%E9%A8%93-%E3%81%B8%E3%80%82%E3%83%97%E3%83%AD%E3%82%B8%E3%82%A7%E3%82%AF%E3%82%B7%E3%83%A7%E3%83%B3%E3%83%9E%E3%83%83%E3%83%94%E3%83%B3%E3%82%B0%E3%81%A7%E5%B7%AE%E3%82%92%E3%81%A4%E3%81%91%E3%82%8B%E6%96%B9%E6%B3%95",
    "path": "/post/%E9%A3%B2%E9%A3%9F%E7%A9%BA%E9%96%93%E3%82%92-%E8%A8%98%E6%86%B6%E3%81%AB%E6%AE%8B%E3%82%8B%E4%BD%93%E9%A8%93-%E3%81%B8%E3%80%82%E3%83%97%E3%83%AD%E3%82%B8%E3%82%A7%E3%82%AF%E3%82%B7%E3%83%A7%E3%83%B3%E3%83%9E%E3%83%83%E3%83%94%E3%83%B3%E3%82%B0%E3%81%A7%E5%B7%AE%E3%82%92%E3%81%A4%E3%81%91%E3%82%8B%E6%96%B9%E6%B3%95",
    "action": "keep-200",
    "lastmod": "2025-06-19"
  },
  {
    "type": "blog-post",
    "oldPath": "/post/facility-lighting-flow",
    "path": "/post/facility-lighting-flow",
    "action": "keep-200",
    "lastmod": "2025-11-17"
  },
  {
    "type": "blog-post",
    "oldPath": "/post/projectionmapping-partner-technical-direction",
    "path": "/post/projectionmapping-partner-technical-direction",
    "action": "keep-200",
    "lastmod": "2026-02-24"
  },
  {
    "type": "blog-post",
    "oldPath": "/post/%E3%80%90%E5%A4%A7%E9%98%AA%E4%B8%87%E5%8D%9A%E3%80%91%E3%83%97%E3%83%AD%E3%82%B8%E3%82%A7%E3%82%AF%E3%82%B7%E3%83%A7%E3%83%B3%E3%83%9E%E3%83%83%E3%83%94%E3%83%B3%E3%82%B0%E3%81%A7-%E6%9C%AA%E6%9D%A5%E3%81%AE%E9%A3%9F%E6%96%87%E5%8C%96-%E3%82%92%E6%BC%94%E5%87%BA-%E3%83%8A%E3%83%AC%E3%83%BC%E3%82%B7%E3%83%A7%E3%83%B3%E5%88%B6%E4%BD%9C%E3%82%82%E6%8B%85%E5%BD%93",
    "path": "/post/%E3%80%90%E5%A4%A7%E9%98%AA%E4%B8%87%E5%8D%9A%E3%80%91%E3%83%97%E3%83%AD%E3%82%B8%E3%82%A7%E3%82%AF%E3%82%B7%E3%83%A7%E3%83%B3%E3%83%9E%E3%83%83%E3%83%94%E3%83%B3%E3%82%B0%E3%81%A7-%E6%9C%AA%E6%9D%A5%E3%81%AE%E9%A3%9F%E6%96%87%E5%8C%96-%E3%82%92%E6%BC%94%E5%87%BA-%E3%83%8A%E3%83%AC%E3%83%BC%E3%82%B7%E3%83%A7%E3%83%B3%E5%88%B6%E4%BD%9C%E3%82%82%E6%8B%85%E5%BD%93",
    "action": "keep-200",
    "lastmod": "2025-07-18"
  },
  {
    "type": "blog-post",
    "oldPath": "/post/%E3%83%97%E3%83%AD%E3%82%B8%E3%82%A7%E3%82%AF%E3%82%B7%E3%83%A7%E3%83%B3%E3%83%9E%E3%83%83%E3%83%94%E3%83%B3%E3%82%B0%E4%BA%8B%E6%A5%AD%E3%81%A7%E9%AB%98%E3%81%84%E8%A9%95%E4%BE%A1%E3%82%92%E5%8F%97%E3%81%91%E3%81%A6%E3%81%8D%E3%81%9Fmirasisone-%E3%83%9F%E3%83%A9%E3%82%B7%E3%82%B9%E3%83%AF%E3%83%B3-%E3%81%8C%E3%80%81%E5%88%9D%E3%81%AE%E3%83%89%E3%83%90%E3%82%A4%E9%80%B2%E5%87%BA%EF%BC%81%E6%97%A5%E6%9C%AC%E9%A3%9F%E3%83%AC%E3%82%B9%E3%83%88%E3%83%A9%E3%83%B3%E3%81%A7%E6%97%A5%E6%9C%AC%E3%81%A8%E3%83%89%E3%83%90%E3%82%A4%E3%81%AE%E6%96%87%E5%8C%96%E3%82%92%E8%9E%8D%E5%90%88%E3%81%97%E3%81%9F%E3%82%A4%E3%83%9E%E3%83%BC%E3%82%B7%E3%83%96%E7%A9%BA%E9%96%93%E6%98%A0%E5%83%8F%E3%82%92%E5%88%B6%E4%BD%9C%E3%80%82",
    "path": "/post/%E3%83%97%E3%83%AD%E3%82%B8%E3%82%A7%E3%82%AF%E3%82%B7%E3%83%A7%E3%83%B3%E3%83%9E%E3%83%83%E3%83%94%E3%83%B3%E3%82%B0%E4%BA%8B%E6%A5%AD%E3%81%A7%E9%AB%98%E3%81%84%E8%A9%95%E4%BE%A1%E3%82%92%E5%8F%97%E3%81%91%E3%81%A6%E3%81%8D%E3%81%9Fmirasisone-%E3%83%9F%E3%83%A9%E3%82%B7%E3%82%B9%E3%83%AF%E3%83%B3-%E3%81%8C%E3%80%81%E5%88%9D%E3%81%AE%E3%83%89%E3%83%90%E3%82%A4%E9%80%B2%E5%87%BA%EF%BC%81%E6%97%A5%E6%9C%AC%E9%A3%9F%E3%83%AC%E3%82%B9%E3%83%88%E3%83%A9%E3%83%B3%E3%81%A7%E6%97%A5%E6%9C%AC%E3%81%A8%E3%83%89%E3%83%90%E3%82%A4%E3%81%AE%E6%96%87%E5%8C%96%E3%82%92%E8%9E%8D%E5%90%88%E3%81%97%E3%81%9F%E3%82%A4%E3%83%9E%E3%83%BC%E3%82%B7%E3%83%96%E7%A9%BA%E9%96%93%E6%98%A0%E5%83%8F%E3%82%92%E5%88%B6%E4%BD%9C%E3%80%82",
    "action": "keep-200",
    "lastmod": "2025-02-26"
  },
  {
    "type": "blog-post",
    "oldPath": "/post/3dcg-digital-signage",
    "path": "/post/3dcg-digital-signage",
    "action": "keep-200",
    "lastmod": "2026-04-27"
  },
  {
    "type": "blog-post",
    "oldPath": "/post/outdoor-pm-cost-and-ordering-guide-2026",
    "path": "/post/outdoor-pm-cost-and-ordering-guide-2026",
    "action": "keep-200",
    "lastmod": "2026-07-14"
  },
  {
    "type": "blog-post",
    "oldPath": "/post/%E3%80%90%E7%A9%BA%E9%96%93%E6%BC%94%E5%87%BA%E4%BA%8B%E4%BE%8B%E3%80%91%E7%84%BC%E8%82%89-%E7%89%9B%E7%89%9B-%E8%A5%BF%E9%BA%BB%E5%B8%83%E7%B7%8F%E6%9C%AC%E5%BA%97-%E3%83%97%E3%83%AD%E3%82%B8%E3%82%A7%E3%82%AF%E3%82%B7%E3%83%A7%E3%83%B3%E3%83%9E%E3%83%83%E3%83%94%E3%83%B3%E3%82%B0%E3%81%A7%E5%85%A5%E5%8F%A3%E3%81%8B%E3%82%89-%E9%AD%85%E3%81%9B%E3%82%8B-%E4%BD%93%E9%A8%93%E3%81%B8",
    "path": "/post/%E3%80%90%E7%A9%BA%E9%96%93%E6%BC%94%E5%87%BA%E4%BA%8B%E4%BE%8B%E3%80%91%E7%84%BC%E8%82%89-%E7%89%9B%E7%89%9B-%E8%A5%BF%E9%BA%BB%E5%B8%83%E7%B7%8F%E6%9C%AC%E5%BA%97-%E3%83%97%E3%83%AD%E3%82%B8%E3%82%A7%E3%82%AF%E3%82%B7%E3%83%A7%E3%83%B3%E3%83%9E%E3%83%83%E3%83%94%E3%83%B3%E3%82%B0%E3%81%A7%E5%85%A5%E5%8F%A3%E3%81%8B%E3%82%89-%E9%AD%85%E3%81%9B%E3%82%8B-%E4%BD%93%E9%A8%93%E3%81%B8",
    "action": "keep-200",
    "lastmod": "2025-05-29"
  },
  {
    "type": "blog-post",
    "oldPath": "/post/projection-mapping-what-is",
    "path": "/post/projection-mapping-what-is",
    "action": "keep-200",
    "lastmod": "2026-06-23"
  },
  {
    "type": "blog-post",
    "oldPath": "/post/projection-mapping-customer-attraction",
    "path": "/post/projection-mapping-customer-attraction",
    "action": "keep-200",
    "lastmod": "2026-06-29"
  },
  {
    "type": "blog-post",
    "oldPath": "/post/hotel-projection-mapping",
    "path": "/post/hotel-projection-mapping",
    "action": "keep-200",
    "lastmod": "2026-04-20"
  },
  {
    "type": "blog-post",
    "oldPath": "/post/projection-mapping-company-guide",
    "path": "/post/projection-mapping-company-guide",
    "action": "keep-200",
    "lastmod": "2026-04-13"
  },
  {
    "type": "blog-post",
    "oldPath": "/post/wedding-venue-projection-mapping",
    "path": "/post/wedding-venue-projection-mapping",
    "action": "keep-200",
    "lastmod": "2026-07-29"
  },
  {
    "type": "blog-post",
    "oldPath": "/post/%E6%98%A0%E3%81%88%E3%82%8B%E5%BA%97%E8%88%97%E3%81%AF%E3%81%93%E3%81%86%E4%BD%9C%E3%82%8B-%E4%BB%8A%E3%80%81%E9%A3%B2%E9%A3%9F%E5%BA%97%E3%81%A7-%E6%98%A0%E5%83%8F%E6%BC%94%E5%87%BA-%E3%81%8C%E3%83%90%E3%82%BA%E3%82%8B%E7%90%86%E7%94%B1",
    "path": "/post/%E6%98%A0%E3%81%88%E3%82%8B%E5%BA%97%E8%88%97%E3%81%AF%E3%81%93%E3%81%86%E4%BD%9C%E3%82%8B-%E4%BB%8A%E3%80%81%E9%A3%B2%E9%A3%9F%E5%BA%97%E3%81%A7-%E6%98%A0%E5%83%8F%E6%BC%94%E5%87%BA-%E3%81%8C%E3%83%90%E3%82%BA%E3%82%8B%E7%90%86%E7%94%B1",
    "action": "keep-200",
    "lastmod": "2025-12-08"
  },
  {
    "type": "blog-post",
    "oldPath": "/post/%E9%A3%B2%E9%A3%9F%E5%BA%97%E3%81%AE%E4%BE%A1%E5%80%A4%E3%82%92%E9%AB%98%E3%82%81%E3%82%8B%E3%80%82%E3%83%97%E3%83%AD%E3%82%B8%E3%82%A7%E3%82%AF%E3%82%B7%E3%83%A7%E3%83%B3%E3%83%9E%E3%83%83%E3%83%94%E3%83%B3%E3%82%B0%E7%A9%BA%E9%96%93%E6%BC%94%E5%87%BA%E4%BA%8B%E4%BE%8B%E3%81%A8%E6%88%90%E5%8A%9F%E3%83%9D%E3%82%A4%E3%83%B3%E3%83%88",
    "path": "/post/%E9%A3%B2%E9%A3%9F%E5%BA%97%E3%81%AE%E4%BE%A1%E5%80%A4%E3%82%92%E9%AB%98%E3%82%81%E3%82%8B%E3%80%82%E3%83%97%E3%83%AD%E3%82%B8%E3%82%A7%E3%82%AF%E3%82%B7%E3%83%A7%E3%83%B3%E3%83%9E%E3%83%83%E3%83%94%E3%83%B3%E3%82%B0%E7%A9%BA%E9%96%93%E6%BC%94%E5%87%BA%E4%BA%8B%E4%BE%8B%E3%81%A8%E6%88%90%E5%8A%9F%E3%83%9D%E3%82%A4%E3%83%B3%E3%83%88",
    "action": "keep-200",
    "lastmod": "2025-08-06"
  },
  {
    "type": "blog-post",
    "oldPath": "/post/%E3%80%902025%E5%B9%B4%E7%89%88%E3%80%91%E3%83%97%E3%83%AD%E3%82%B8%E3%82%A7%E3%82%AF%E3%82%B7%E3%83%A7%E3%83%B3%E3%83%9E%E3%83%83%E3%83%94%E3%83%B3%E3%82%B0%E5%B0%8E%E5%85%A5%E8%B2%BB%E7%94%A8%E3%81%A8%E6%88%90%E5%8A%9F%E3%83%91%E3%82%BF%E3%83%BC%E3%83%B3-%E7%84%A1%E6%96%99%E8%A6%8B%E7%A9%8D%E3%82%82%E3%82%8A%E3%82%AC%E3%82%A4%E3%83%89",
    "path": "/post/%E3%80%902025%E5%B9%B4%E7%89%88%E3%80%91%E3%83%97%E3%83%AD%E3%82%B8%E3%82%A7%E3%82%AF%E3%82%B7%E3%83%A7%E3%83%B3%E3%83%9E%E3%83%83%E3%83%94%E3%83%B3%E3%82%B0%E5%B0%8E%E5%85%A5%E8%B2%BB%E7%94%A8%E3%81%A8%E6%88%90%E5%8A%9F%E3%83%91%E3%82%BF%E3%83%BC%E3%83%B3-%E7%84%A1%E6%96%99%E8%A6%8B%E7%A9%8D%E3%82%82%E3%82%8A%E3%82%AC%E3%82%A4%E3%83%89",
    "action": "keep-200",
    "lastmod": "2025-09-30"
  },
  {
    "type": "blog-post",
    "oldPath": "/post/kakichanpon-3dcg-foodcm",
    "path": "/post/kakichanpon-3dcg-foodcm",
    "action": "keep-200",
    "lastmod": "2025-11-24"
  },
  {
    "type": "blog-post",
    "oldPath": "/post/%E3%81%8A%E5%AE%A2%E6%A7%98%E3%81%AE-%E3%82%8F%E3%81%81%EF%BC%81-%E3%82%92%E7%94%9F%E3%82%80%E9%A3%B2%E9%A3%9F%E5%BA%97%E3%83%9E%E3%83%83%E3%83%94%E3%83%B3%E3%82%B0-%E5%B0%8E%E5%85%A5%E4%BA%8B%E4%BE%8B%E3%81%A8%E6%88%90%E5%8A%9F%E3%83%9D%E3%82%A4%E3%83%B3%E3%83%88",
    "path": "/post/%E3%81%8A%E5%AE%A2%E6%A7%98%E3%81%AE-%E3%82%8F%E3%81%81%EF%BC%81-%E3%82%92%E7%94%9F%E3%82%80%E9%A3%B2%E9%A3%9F%E5%BA%97%E3%83%9E%E3%83%83%E3%83%94%E3%83%B3%E3%82%B0-%E5%B0%8E%E5%85%A5%E4%BA%8B%E4%BE%8B%E3%81%A8%E6%88%90%E5%8A%9F%E3%83%9D%E3%82%A4%E3%83%B3%E3%83%88",
    "action": "keep-200",
    "lastmod": "2025-10-19"
  },
  {
    "type": "blog-post",
    "oldPath": "/post/%E3%80%90%E6%B8%8B%E8%B0%B7-%E3%83%97%E3%83%AD%E3%82%B8%E3%82%A7%E3%82%AF%E3%82%B7%E3%83%A7%E3%83%B3%E3%83%9E%E3%83%83%E3%83%94%E3%83%B3%E3%82%B0%E3%80%911%E6%97%A54%E7%B5%84%E9%99%90%E5%AE%9A%E3%80%8Cwhitely-%E5%B0%8F%E4%BA%BA%E3%82%B7%E3%82%A7%E3%83%95%E3%80%8D%E3%81%AE%E4%B8%96%E7%95%8C%E3%82%92mirasisone%E3%81%8C%E6%BC%94%E5%87%BA",
    "path": "/post/%E3%80%90%E6%B8%8B%E8%B0%B7-%E3%83%97%E3%83%AD%E3%82%B8%E3%82%A7%E3%82%AF%E3%82%B7%E3%83%A7%E3%83%B3%E3%83%9E%E3%83%83%E3%83%94%E3%83%B3%E3%82%B0%E3%80%911%E6%97%A54%E7%B5%84%E9%99%90%E5%AE%9A%E3%80%8Cwhitely-%E5%B0%8F%E4%BA%BA%E3%82%B7%E3%82%A7%E3%83%95%E3%80%8D%E3%81%AE%E4%B8%96%E7%95%8C%E3%82%92mirasisone%E3%81%8C%E6%BC%94%E5%87%BA",
    "action": "keep-200",
    "lastmod": "2025-04-24"
  },
  {
    "type": "blog-post",
    "oldPath": "/post/naked-eye-3d-signage-guide",
    "path": "/post/naked-eye-3d-signage-guide",
    "action": "keep-200",
    "lastmod": "2026-07-22"
  },
  {
    "type": "blog-post",
    "oldPath": "/post/%E3%80%90%E3%83%97%E3%83%AD%E3%82%B8%E3%82%A7%E3%82%AF%E3%82%B7%E3%83%A7%E3%83%B3%E3%83%9E%E3%83%83%E3%83%94%E3%83%B3%E3%82%B0%E3%80%91mirasisone%E5%88%9D%E3%81%AE%E6%B5%B7%E5%A4%96%E9%80%B2%E5%87%BA%EF%BC%81%E3%83%95%E3%82%A3%E3%83%AA%E3%83%94%E3%83%B3-%E3%83%9E%E3%83%8B%E3%83%A9%E3%81%AE%E3%82%B9%E3%83%9D%E3%83%BC%E3%83%84%E3%83%90%E3%83%BC%E3%81%A7%E3%83%97%E3%83%AD%E3%82%B8%E3%82%A7%E3%82%AF%E3%82%B7%E3%83%A7%E3%83%B3%E3%83%9E%E3%83%83%E3%83%94%E3%83%B3%E3%82%B0%E3%82%92%E6%8A%AB%E9%9C%B2",
    "path": "/post/%E3%80%90%E3%83%97%E3%83%AD%E3%82%B8%E3%82%A7%E3%82%AF%E3%82%B7%E3%83%A7%E3%83%B3%E3%83%9E%E3%83%83%E3%83%94%E3%83%B3%E3%82%B0%E3%80%91mirasisone%E5%88%9D%E3%81%AE%E6%B5%B7%E5%A4%96%E9%80%B2%E5%87%BA%EF%BC%81%E3%83%95%E3%82%A3%E3%83%AA%E3%83%94%E3%83%B3-%E3%83%9E%E3%83%8B%E3%83%A9%E3%81%AE%E3%82%B9%E3%83%9D%E3%83%BC%E3%83%84%E3%83%90%E3%83%BC%E3%81%A7%E3%83%97%E3%83%AD%E3%82%B8%E3%82%A7%E3%82%AF%E3%82%B7%E3%83%A7%E3%83%B3%E3%83%9E%E3%83%83%E3%83%94%E3%83%B3%E3%82%B0%E3%82%92%E6%8A%AB%E9%9C%B2",
    "action": "keep-200",
    "lastmod": "2024-11-03"
  },
  {
    "type": "blog-post",
    "oldPath": "/post/instagram%E3%81%A7%E8%A9%B1%E9%A1%8C%E6%B2%B8%E9%A8%B0%E4%B8%AD%EF%BC%81%E6%9D%B1%E4%BA%AC-%E6%B8%8B%E8%B0%B7%E3%81%AB%E3%81%82%E3%82%8B%E3%83%97%E3%83%AD%E3%82%B8%E3%82%A7%E3%82%AF%E3%82%B7%E3%83%A7%E3%83%B3%E3%83%9E%E3%83%83%E3%83%94%E3%83%B3%E3%82%B0%E3%82%92%E4%BD%BF%E7%94%A8%E3%81%97%E3%81%9Fcafe-%E3%83%AC%E3%82%B9%E3%83%88%E3%83%A9%E3%83%B3%E3%80%90whitely-%E5%B0%8F%E4%BA%BA%E3%82%B7%E3%82%A7%E3%83%95%E3%80%91",
    "path": "/post/instagram%E3%81%A7%E8%A9%B1%E9%A1%8C%E6%B2%B8%E9%A8%B0%E4%B8%AD%EF%BC%81%E6%9D%B1%E4%BA%AC-%E6%B8%8B%E8%B0%B7%E3%81%AB%E3%81%82%E3%82%8B%E3%83%97%E3%83%AD%E3%82%B8%E3%82%A7%E3%82%AF%E3%82%B7%E3%83%A7%E3%83%B3%E3%83%9E%E3%83%83%E3%83%94%E3%83%B3%E3%82%B0%E3%82%92%E4%BD%BF%E7%94%A8%E3%81%97%E3%81%9Fcafe-%E3%83%AC%E3%82%B9%E3%83%88%E3%83%A9%E3%83%B3%E3%80%90whitely-%E5%B0%8F%E4%BA%BA%E3%82%B7%E3%82%A7%E3%83%95%E3%80%91",
    "action": "keep-200",
    "lastmod": "2025-07-15"
  },
  {
    "type": "blog-post",
    "oldPath": "/post/%E3%80%90%E5%90%8D%E5%88%BA%E3%82%92%E3%82%82%E3%81%A3%E3%81%A8%E3%83%AF%E3%82%AF%E3%83%AF%E3%82%AF%E3%81%99%E3%82%8B%E3%82%82%E3%81%AE%E3%81%AB%E3%80%91mirasisone%E3%82%AA%E3%83%AA%E3%82%B8%E3%83%8A%E3%83%AB%E3%83%88%E3%83%AC%E3%82%AB%E5%90%8D%E5%88%BA%E3%81%8C%E5%AE%8C%E6%88%90%EF%BC%81",
    "path": "/post/%E3%80%90%E5%90%8D%E5%88%BA%E3%82%92%E3%82%82%E3%81%A3%E3%81%A8%E3%83%AF%E3%82%AF%E3%83%AF%E3%82%AF%E3%81%99%E3%82%8B%E3%82%82%E3%81%AE%E3%81%AB%E3%80%91mirasisone%E3%82%AA%E3%83%AA%E3%82%B8%E3%83%8A%E3%83%AB%E3%83%88%E3%83%AC%E3%82%AB%E5%90%8D%E5%88%BA%E3%81%8C%E5%AE%8C%E6%88%90%EF%BC%81",
    "action": "keep-200",
    "lastmod": "2025-05-01"
  },
  {
    "type": "blog-post",
    "oldPath": "/post/%E5%B8%B8%E8%A8%AD%E3%83%97%E3%83%AD%E3%82%B8%E3%82%A7%E3%82%AF%E3%82%B7%E3%83%A7%E3%83%B3%E3%83%9E%E3%83%83%E3%83%94%E3%83%B3%E3%82%B0%E5%AE%8C%E5%85%A8%E3%82%AC%E3%82%A4%E3%83%892026-%E9%A3%B2%E9%A3%9F%E5%BA%97%E3%83%BB%E3%83%9B%E3%83%86%E3%83%AB%E3%83%BB%E5%95%86%E6%A5%AD%E6%96%BD%E8%A8%AD%E3%81%AE%E5%B0%8E%E5%85%A5%E8%A8%AD%E8%A8%88%E3%81%A8%E8%B2%BB%E7%94%A8",
    "path": "/post/%E5%B8%B8%E8%A8%AD%E3%83%97%E3%83%AD%E3%82%B8%E3%82%A7%E3%82%AF%E3%82%B7%E3%83%A7%E3%83%B3%E3%83%9E%E3%83%83%E3%83%94%E3%83%B3%E3%82%B0%E5%AE%8C%E5%85%A8%E3%82%AC%E3%82%A4%E3%83%892026-%E9%A3%B2%E9%A3%9F%E5%BA%97%E3%83%BB%E3%83%9B%E3%83%86%E3%83%AB%E3%83%BB%E5%95%86%E6%A5%AD%E6%96%BD%E8%A8%AD%E3%81%AE%E5%B0%8E%E5%85%A5%E8%A8%AD%E8%A8%88%E3%81%A8%E8%B2%BB%E7%94%A8",
    "action": "keep-200",
    "lastmod": "2026-07-24"
  },
  {
    "type": "blog-post",
    "oldPath": "/post/sauna-visual-immersive-experience",
    "path": "/post/sauna-visual-immersive-experience",
    "action": "keep-200",
    "lastmod": "2025-12-22"
  },
  {
    "type": "blog-post",
    "oldPath": "/post/%E5%A4%A7%E9%98%AA%E4%B8%87%E5%8D%9A%E3%81%A7-%E6%9C%AA%E6%9D%A5%E3%81%AE%E9%A3%9F%E6%96%87%E5%8C%96%E4%BD%93%E9%A8%93-%E3%82%92%E5%89%B5%E3%82%8B-mirasisone%E3%81%AE%E6%8C%91%E6%88%A6",
    "path": "/post/%E5%A4%A7%E9%98%AA%E4%B8%87%E5%8D%9A%E3%81%A7-%E6%9C%AA%E6%9D%A5%E3%81%AE%E9%A3%9F%E6%96%87%E5%8C%96%E4%BD%93%E9%A8%93-%E3%82%92%E5%89%B5%E3%82%8B-mirasisone%E3%81%AE%E6%8C%91%E6%88%A6",
    "action": "keep-200",
    "lastmod": "2025-07-03"
  },
  {
    "type": "blog-post",
    "oldPath": "/post/local-company-3dcg-projectionmapping",
    "path": "/post/local-company-3dcg-projectionmapping",
    "action": "keep-200",
    "lastmod": "2026-02-17"
  },
  {
    "type": "blog-post",
    "oldPath": "/post/%E3%83%97%E3%83%AD%E3%82%B8%E3%82%A7%E3%82%AF%E3%82%B7%E3%83%A7%E3%83%B3%E3%83%9E%E3%83%83%E3%83%94%E3%83%B3%E3%82%B0%E4%BC%9A%E7%A4%BE%E3%81%AE%E9%81%B8%E3%81%B3%E6%96%B9%E3%81%A8%E5%B0%8E%E5%85%A5%E4%BA%8B%E4%BE%8B-%E5%9B%BD%E5%86%85%E5%A4%96%E5%AF%BE%E5%BF%9C%E3%81%AEmirasisone",
    "path": "/post/%E3%83%97%E3%83%AD%E3%82%B8%E3%82%A7%E3%82%AF%E3%82%B7%E3%83%A7%E3%83%B3%E3%83%9E%E3%83%83%E3%83%94%E3%83%B3%E3%82%B0%E4%BC%9A%E7%A4%BE%E3%81%AE%E9%81%B8%E3%81%B3%E6%96%B9%E3%81%A8%E5%B0%8E%E5%85%A5%E4%BA%8B%E4%BE%8B-%E5%9B%BD%E5%86%85%E5%A4%96%E5%AF%BE%E5%BF%9C%E3%81%AEmirasisone",
    "action": "keep-200",
    "lastmod": "2025-08-16"
  },
  {
    "type": "blog-post",
    "oldPath": "/post/%E7%A9%BA%E9%96%93%E3%81%8C%E8%AA%9E%E3%82%8A%E5%87%BA%E3%81%99%E3%80%82%E7%A7%81%E3%81%9F%E3%81%A1%E3%81%AF-%E3%83%87%E3%82%B8%E3%82%BF%E3%83%AB%E7%A9%BA%E9%96%93%E6%BC%94%E5%87%BA%E5%AE%B6-%E3%81%A7%E3%81%99%E3%80%82",
    "path": "/post/%E7%A9%BA%E9%96%93%E3%81%8C%E8%AA%9E%E3%82%8A%E5%87%BA%E3%81%99%E3%80%82%E7%A7%81%E3%81%9F%E3%81%A1%E3%81%AF-%E3%83%87%E3%82%B8%E3%82%BF%E3%83%AB%E7%A9%BA%E9%96%93%E6%BC%94%E5%87%BA%E5%AE%B6-%E3%81%A7%E3%81%99%E3%80%82",
    "action": "keep-200",
    "lastmod": "2025-08-06"
  },
  {
    "type": "blog-post",
    "oldPath": "/post/projection-mapping-cost-2026",
    "path": "/post/projection-mapping-cost-2026",
    "action": "keep-200",
    "lastmod": "2026-06-15"
  },
  {
    "type": "blog-post",
    "oldPath": "/post/%E9%A3%B2%E9%A3%9F%E5%BA%97%E3%83%97%E3%83%AD%E3%82%B8%E3%82%A7%E3%82%AF%E3%82%B7%E3%83%A7%E3%83%B3%E3%83%9E%E3%83%83%E3%83%94%E3%83%B3%E3%82%B0%E4%BA%8B%E4%BE%8B-%E3%81%9F%E3%81%A0%E3%81%AE%E6%98%A0%E5%83%8F%E3%81%98%E3%82%83%E3%81%AA%E3%81%84-%E4%BD%93%E9%A8%93%E3%81%99%E3%82%8B%E7%A9%BA%E9%96%93%E6%BC%94%E5%87%BA-%E3%81%A8%E3%81%AF",
    "path": "/post/%E9%A3%B2%E9%A3%9F%E5%BA%97%E3%83%97%E3%83%AD%E3%82%B8%E3%82%A7%E3%82%AF%E3%82%B7%E3%83%A7%E3%83%B3%E3%83%9E%E3%83%83%E3%83%94%E3%83%B3%E3%82%B0%E4%BA%8B%E4%BE%8B-%E3%81%9F%E3%81%A0%E3%81%AE%E6%98%A0%E5%83%8F%E3%81%98%E3%82%83%E3%81%AA%E3%81%84-%E4%BD%93%E9%A8%93%E3%81%99%E3%82%8B%E7%A9%BA%E9%96%93%E6%BC%94%E5%87%BA-%E3%81%A8%E3%81%AF",
    "action": "keep-200",
    "lastmod": "2025-07-30"
  },
  {
    "type": "blog-post",
    "oldPath": "/post/projection-mapping-company",
    "path": "/post/projection-mapping-company",
    "action": "keep-200",
    "lastmod": "2026-04-06"
  },
  {
    "type": "blog-post",
    "oldPath": "/post/winter-pm",
    "path": "/post/winter-pm",
    "action": "keep-200",
    "lastmod": "2025-11-11"
  },
  {
    "type": "blog-post",
    "oldPath": "/post/projection-mapping-restaurant-guide",
    "path": "/post/projection-mapping-restaurant-guide",
    "action": "keep-200",
    "lastmod": "2026-03-30"
  },
  {
    "type": "blog-post",
    "oldPath": "/post/projection-mapping-seisaku-guide",
    "path": "/post/projection-mapping-seisaku-guide",
    "action": "keep-200",
    "lastmod": "2026-06-01"
  },
  {
    "type": "blog-post",
    "oldPath": "/post/%E9%A3%B2%E9%A3%9F%E3%83%9E%E3%83%83%E3%83%94%E3%83%B3%E3%82%B0%E3%81%A8%E3%81%AF%EF%BC%9Fmirasisone%E3%81%8C%E6%89%8B%E3%81%8C%E3%81%91%E3%82%8B%E3%83%97%E3%83%AD%E3%82%B8%E3%82%A7%E3%82%AF%E3%82%B7%E3%83%A7%E3%83%B3%E3%83%9E%E3%83%83%E3%83%94%E3%83%B3%E3%82%B0%E3%81%AE%E9%AD%85%E5%8A%9B",
    "path": "/post/%E9%A3%B2%E9%A3%9F%E3%83%9E%E3%83%83%E3%83%94%E3%83%B3%E3%82%B0%E3%81%A8%E3%81%AF%EF%BC%9Fmirasisone%E3%81%8C%E6%89%8B%E3%81%8C%E3%81%91%E3%82%8B%E3%83%97%E3%83%AD%E3%82%B8%E3%82%A7%E3%82%AF%E3%82%B7%E3%83%A7%E3%83%B3%E3%83%9E%E3%83%83%E3%83%94%E3%83%B3%E3%82%B0%E3%81%AE%E9%AD%85%E5%8A%9B",
    "action": "keep-200",
    "lastmod": "2025-06-12"
  },
  {
    "type": "blog-post",
    "oldPath": "/post/whitely-space-visual",
    "path": "/post/whitely-space-visual",
    "action": "keep-200",
    "lastmod": "2026-01-27"
  },
  {
    "type": "blog-post",
    "oldPath": "/post/%E5%B1%8B%E5%86%85%E3%83%97%E3%83%AD%E3%82%B8%E3%82%A7%E3%82%AF%E3%82%B7%E3%83%A7%E3%83%B3%E3%83%9E%E3%83%83%E3%83%94%E3%83%B3%E3%82%B0%E3%81%A7%E7%A9%BA%E9%96%93%E3%81%AF%E5%A4%89%E3%82%8F%E3%82%8B%E3%80%82%E2%80%95-%E5%BA%97%E8%88%97%E5%B0%82%E7%94%A8%E3%83%9E%E3%83%83%E3%83%94%E3%83%B3%E3%82%B0%E3%82%92%E6%89%8B%E3%81%8C%E3%81%91%E3%82%8B-mirasisone-%E3%81%AE%E6%96%B0%E3%81%97%E3%81%84%E6%8C%91%E6%88%A6-%E2%80%95",
    "path": "/post/%E5%B1%8B%E5%86%85%E3%83%97%E3%83%AD%E3%82%B8%E3%82%A7%E3%82%AF%E3%82%B7%E3%83%A7%E3%83%B3%E3%83%9E%E3%83%83%E3%83%94%E3%83%B3%E3%82%B0%E3%81%A7%E7%A9%BA%E9%96%93%E3%81%AF%E5%A4%89%E3%82%8F%E3%82%8B%E3%80%82%E2%80%95-%E5%BA%97%E8%88%97%E5%B0%82%E7%94%A8%E3%83%9E%E3%83%83%E3%83%94%E3%83%B3%E3%82%B0%E3%82%92%E6%89%8B%E3%81%8C%E3%81%91%E3%82%8B-mirasisone-%E3%81%AE%E6%96%B0%E3%81%97%E3%81%84%E6%8C%91%E6%88%A6-%E2%80%95",
    "action": "keep-200",
    "lastmod": "2025-11-04"
  },
  {
    "type": "blog-post",
    "oldPath": "/post/%E3%80%9012-1-%E6%97%A5-%E3%80%9C%E6%94%BE%E6%98%A0%E9%96%8B%E5%A7%8B%E3%80%91%E6%96%B0%E5%A4%A7%E4%B9%85%E4%BF%9D%E6%9C%80%E5%A4%A7%E3%81%AE%E3%83%87%E3%82%B8%E3%82%BF%E3%83%AB%E3%82%B5%E3%82%A4%E3%83%8D%E3%83%BC%E3%82%B8%E3%80%8C%E6%96%B0%E5%A4%A7%E4%B9%85%E4%BF%9D%E3%82%B7%E3%83%B3%E3%82%AF%E3%83%AD%E3%83%93%E3%82%B8%E3%83%A7%E3%83%B3%E3%80%8D%E3%81%8C%E7%99%BD%E8%99%8E%E3%81%AE%E8%BA%8D%E5%8B%95%E3%81%A7%E5%BD%A9%E3%82%89%E3%82%8C%E3%82%8B",
    "path": "/post/%E3%80%9012-1-%E6%97%A5-%E3%80%9C%E6%94%BE%E6%98%A0%E9%96%8B%E5%A7%8B%E3%80%91%E6%96%B0%E5%A4%A7%E4%B9%85%E4%BF%9D%E6%9C%80%E5%A4%A7%E3%81%AE%E3%83%87%E3%82%B8%E3%82%BF%E3%83%AB%E3%82%B5%E3%82%A4%E3%83%8D%E3%83%BC%E3%82%B8%E3%80%8C%E6%96%B0%E5%A4%A7%E4%B9%85%E4%BF%9D%E3%82%B7%E3%83%B3%E3%82%AF%E3%83%AD%E3%83%93%E3%82%B8%E3%83%A7%E3%83%B3%E3%80%8D%E3%81%8C%E7%99%BD%E8%99%8E%E3%81%AE%E8%BA%8D%E5%8B%95%E3%81%A7%E5%BD%A9%E3%82%89%E3%82%8C%E3%82%8B",
    "action": "keep-200",
    "lastmod": "2024-11-28"
  },
  {
    "type": "blog-category",
    "oldPath": "/blog/categories/%E3%83%9B%E3%83%BC%E3%83%A0%E3%83%9A%E3%83%BC%E3%82%B8%E3%83%AA%E3%83%8B%E3%83%A5%E3%83%BC%E3%82%A2%E3%83%AB",
    "path": "/blog/categories/%E3%83%9B%E3%83%BC%E3%83%A0%E3%83%9A%E3%83%BC%E3%82%B8%E3%83%AA%E3%83%8B%E3%83%A5%E3%83%BC%E3%82%A2%E3%83%AB",
    "action": "keep-200",
    "lastmod": "2025-07-16"
  },
  {
    "type": "blog-category",
    "oldPath": "/blog/categories/3d%E6%98%A0%E5%83%8F%E5%88%B6%E4%BD%9C",
    "path": "/blog/categories/3d%E6%98%A0%E5%83%8F%E5%88%B6%E4%BD%9C",
    "action": "keep-200",
    "lastmod": "2026-07-22"
  },
  {
    "type": "blog-category",
    "oldPath": "/blog",
    "path": "/blog",
    "action": "keep-200",
    "lastmod": "2026-07-30"
  },
  {
    "type": "blog-category",
    "oldPath": "/blog/categories/%E5%86%85%E8%A3%85",
    "path": "/blog/categories/%E5%86%85%E8%A3%85",
    "action": "keep-200",
    "lastmod": "2026-05-18"
  },
  {
    "type": "blog-category",
    "oldPath": "/blog/categories/vr/ar%E3%82%B3%E3%83%B3%E3%83%86%E3%83%B3%E3%83%84",
    "path": "/blog/categories/vr/ar%E3%82%B3%E3%83%B3%E3%83%86%E3%83%B3%E3%83%84",
    "action": "keep-200",
    "lastmod": "2026-07-27"
  },
  {
    "type": "blog-category",
    "oldPath": "/blog/categories/%E3%83%87%E3%82%B8%E3%82%BF%E3%83%AB%E3%82%B5%E3%82%A4%E3%83%8D%E3%83%BC%E3%82%B8",
    "path": "/blog/categories/%E3%83%87%E3%82%B8%E3%82%BF%E3%83%AB%E3%82%B5%E3%82%A4%E3%83%8D%E3%83%BC%E3%82%B8",
    "action": "keep-200",
    "lastmod": "2026-07-27"
  },
  {
    "type": "blog-category",
    "oldPath": "/blog/categories/%EF%BC%93dcg",
    "path": "/blog/categories/%EF%BC%93dcg",
    "action": "keep-200",
    "lastmod": "2026-07-13"
  },
  {
    "type": "blog-category",
    "oldPath": "/blog/categories/%E7%A9%BA%E9%96%93%E6%BC%94%E5%87%BA",
    "path": "/blog/categories/%E7%A9%BA%E9%96%93%E6%BC%94%E5%87%BA",
    "action": "keep-200",
    "lastmod": "2026-07-30"
  },
  {
    "type": "blog-category",
    "oldPath": "/blog/categories/%E3%82%AF%E3%83%AA%E3%82%A8%E3%82%A4%E3%82%BF%E3%83%BC",
    "path": "/blog/categories/%E3%82%AF%E3%83%AA%E3%82%A8%E3%82%A4%E3%82%BF%E3%83%BC",
    "action": "keep-200",
    "lastmod": "2026-02-04"
  },
  {
    "type": "blog-category",
    "oldPath": "/blog/categories/%E3%83%97%E3%83%AD%E3%82%B8%E3%82%A7%E3%82%AF%E3%82%B7%E3%83%A7%E3%83%B3%E3%83%9E%E3%83%83%E3%83%94%E3%83%B3%E3%82%B0",
    "path": "/blog/categories/%E3%83%97%E3%83%AD%E3%82%B8%E3%82%A7%E3%82%AF%E3%82%B7%E3%83%A7%E3%83%B3%E3%83%9E%E3%83%83%E3%83%94%E3%83%B3%E3%82%B0",
    "action": "keep-200",
    "lastmod": "2026-07-30"
  },
  {
    // 2026-07-31 の棚卸し後に Wix で公開された記事。www 側で 200 を確認済み
    "type": "blog-post",
    "oldPath": "/post/autumn-winter-event-projection-mapping-guide",
    "path": "/post/autumn-winter-event-projection-mapping-guide",
    "action": "keep-200",
    "lastmod": "2026-08-03"
  }
] as const satisfies readonly SeoUrlEntry[];
