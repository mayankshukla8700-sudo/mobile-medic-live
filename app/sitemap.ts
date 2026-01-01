import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.themobilemedic.in';
  
  // Add all your major brands here to help Google find them
  const brands = [
    'apple', 'samsung', 'oneplus', 'xiaomi', 'vivo', 
    'oppo', 'realme', 'google', 'poco', 'motorola'
  ];

  const brandUrls = brands.map((brand) => ({
    url: `${baseUrl}/repair/${brand}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/terms`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.5,
    },
    ...brandUrls,
  ];
}