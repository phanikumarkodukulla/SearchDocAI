// Legacy mock data - now replaced with real search services
// This file is kept for fallback purposes only

const mockSearchData = {
  searchResults: (query) => ({
    query: query,
    totalResults: Math.floor(Math.random() * 100000) + 50000,
    searchTime: (Math.random() * 0.8 + 0.2).toFixed(2),
    results: [
      {
        title: `Understanding ${query}: Fallback Result`,
        url: `https://example.com/${query.toLowerCase().replace(/\s+/g, '-')}`,
        snippet: `This is a fallback result for ${query}. The system is currently using real search engines (Wikipedia, DuckDuckGo, Open Library) but provides this as backup in case of API failures.`,
        source: "Fallback"
      }
    ]
  }),

  generateDocumentation: (query) => ({
    title: `Fallback Guide to ${query}`,
    quickGuide: `# Fallback Quick Start Guide for ${query}\n\nThis is a fallback documentation generated when real search services are unavailable. The system normally uses real data from multiple search engines to create comprehensive documentation.`,
    detailedDocumentation: `# Fallback Documentation for ${query}\n\nThis documentation is generated as a fallback when real search services are not available. The system typically uses real data from Wikipedia, DuckDuckGo, and Open Library to create comprehensive guides.`
  })
};

export default mockSearchData;