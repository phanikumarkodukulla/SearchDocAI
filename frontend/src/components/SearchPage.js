import React, { useState, useRef } from 'react';
import { Search, FileText, Download, Globe, BookOpen, Zap } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Progress } from './ui/progress';
import { toast } from '../hooks/use-toast';
import SearchService from '../services/searchService';
import DocumentationService from '../services/documentationService';
import PDFService from '../services/pdfService';

const SearchPage = () => {
  const [query, setQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [searchProgress, setSearchProgress] = useState(0);
  const [searchResults, setSearchResults] = useState(null);
  const [documentationData, setDocumentationData] = useState(null);
  const resultsRef = useRef(null);

  // Initialize services
  const searchService = new SearchService();
  const documentationService = new DocumentationService();
  const pdfService = new PDFService();

  const handleSearch = async () => {
    if (!query.trim()) {
      toast({
        title: "Please enter a search query",
        variant: "destructive"
      });
      return;
    }

    setIsSearching(true);
    setSearchProgress(0);
    
    try {
      // Progress callback
      const onProgress = (progress, message) => {
        setSearchProgress(progress);
        toast({
          title: message,
          duration: 1500
        });
      };

      // Perform real search across multiple engines
      const results = await searchService.searchMultipleSources(query, onProgress);
      
      // Generate documentation from search results
      onProgress(95, 'Generating documentation...');
      const docs = documentationService.generateDocumentation(query, results.results);
      
      setSearchResults(results);
      setDocumentationData(docs);
      setIsSearching(false);
      setSearchProgress(100);
      
      // Scroll to results
      setTimeout(() => {
        resultsRef.current?.scrollIntoView({ behavior: 'smooth' });
      }, 100);

      toast({
        title: "Search completed successfully!",
        description: `Found ${results.totalResults.toLocaleString()} results across multiple search engines`
      });
      
    } catch (error) {
      console.error('Search error:', error);
      setIsSearching(false);
      toast({
        title: "Search failed",
        description: "Please try again with a different query",
        variant: "destructive"
      });
    }
  };

  const handleDownloadPDF = async () => {
    if (!documentationData || !searchResults) {
      toast({
        title: "No data to export",
        description: "Please perform a search first",
        variant: "destructive"
      });
      return;
    }
    
    toast({
      title: "Generating PDF...",
      description: "Your documentation is being prepared..."
    });
    
    try {
      // Generate PDF using the real PDF service
      const pdfDoc = await pdfService.generatePDF(documentationData, searchResults.results);
      const filename = `${query.replace(/\s+/g, '_')}_documentation.pdf`;
      
      await pdfService.downloadPDF(pdfDoc, filename);
      
      toast({
        title: "Download Complete!",
        description: "Your documentation has been downloaded as PDF"
      });
    } catch (error) {
      console.error('PDF generation error:', error);
      
      // Fallback to text download if PDF fails
      const textContent = `${documentationData.title}\n\n${documentationData.quickGuide}\n\n${documentationData.detailedDocumentation}`;
      const element = document.createElement('a');
      element.href = 'data:text/plain;charset=utf-8,' + encodeURIComponent(textContent);
      element.download = `${query.replace(/\s+/g, '_')}_documentation.txt`;
      element.click();
      
      toast({
        title: "PDF generation failed",
        description: "Downloaded as text file instead",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-indigo-50 via-white to-cyan-50">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="relative container mx-auto px-6 py-20">
          <div className="text-center max-w-4xl mx-auto">
            <div className="mb-8">
              <div className="inline-flex items-center gap-2 bg-indigo-100 text-indigo-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
                <Zap className="w-4 h-4" />
                AI-Powered Deep Search & Documentation
              </div>
              <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-indigo-600 to-cyan-600 bg-clip-text text-transparent mb-6">
                SearchDocs AI
              </h1>
              <p className="text-xl text-slate-600 mb-8 leading-relaxed">
                Search the web deeply across multiple engines, generate comprehensive documentation, 
                and get instant downloadable guides - all in one powerful platform.
              </p>
            </div>
            
            {/* Search Interface */}
            <div className="max-w-2xl mx-auto mb-12">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-slate-400" />
                </div>
                <Input
                  type="text"
                  placeholder="Search anything - AI, technology, science, business..."
                  className="pl-12 pr-32 py-6 text-lg rounded-2xl border-2 border-slate-200 focus:border-indigo-400 shadow-lg"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                />
                <div className="absolute inset-y-0 right-0 pr-2 flex items-center">
                  <Button 
                    onClick={handleSearch}
                    disabled={isSearching}
                    className="bg-gradient-to-r from-indigo-600 to-cyan-600 hover:from-indigo-700 hover:to-cyan-700 px-8 py-3 rounded-xl font-medium shadow-md transition-all duration-200 transform hover:scale-105"
                  >
                    {isSearching ? (
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        Searching...
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <Search className="w-4 h-4" />
                        Search Deep
                      </div>
                    )}
                  </Button>
                </div>
              </div>
              
              {isSearching && (
                <div className="mt-6">
                  <Progress value={searchProgress} className="h-2 bg-slate-200" />
                  <div className="mt-2 text-sm text-slate-600">
                    Searching across multiple engines...
                  </div>
                </div>
              )}
            </div>

            {/* Feature Cards */}
            <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                <CardContent className="p-6 text-center">
                  <Globe className="w-12 h-12 text-indigo-600 mx-auto mb-4" />
                  <h3 className="font-bold text-lg mb-2">Multi-Engine Search</h3>
                  <p className="text-slate-600 text-sm">Search across Google, Bing, DuckDuckGo and more simultaneously</p>
                </CardContent>
              </Card>
              <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                <CardContent className="p-6 text-center">
                  <FileText className="w-12 h-12 text-cyan-600 mx-auto mb-4" />
                  <h3 className="font-bold text-lg mb-2">Auto Documentation</h3>
                  <p className="text-slate-600 text-sm">Generate comprehensive guides and documentation automatically</p>
                </CardContent>
              </Card>
              <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                <CardContent className="p-6 text-center">
                  <Download className="w-12 h-12 text-purple-600 mx-auto mb-4" />
                  <h3 className="font-bold text-lg mb-2">PDF Export</h3>
                  <p className="text-slate-600 text-sm">Download professional PDFs with all your research and guides</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

      {/* Search Results */}
      {searchResults && (
        <div ref={resultsRef} className="container mx-auto px-6 py-16">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-3xl font-bold text-slate-800 mb-2">
                  Search Results for "{query}"
                </h2>
                <div className="flex items-center gap-4 text-sm text-slate-600">
                  <span>Found {searchResults.totalResults.toLocaleString()} results</span>
                  <Separator orientation="vertical" className="h-4" />
                  <span>Search time: {searchResults.searchTime}s</span>
                </div>
              </div>
              {documentationData && (
                <Button
                  onClick={handleDownloadPDF}
                  className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 shadow-lg"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Download PDF
                </Button>
              )}
            </div>

            <Tabs defaultValue="results" className="w-full">
              <TabsList className="grid w-full grid-cols-3 mb-8">
                <TabsTrigger value="results">Search Results</TabsTrigger>
                <TabsTrigger value="quick-guide">Quick Guide</TabsTrigger>
                <TabsTrigger value="documentation">Full Documentation</TabsTrigger>
              </TabsList>

              <TabsContent value="results" className="space-y-4">
                {searchResults.results.map((result, index) => (
                  <Card key={index} className="hover:shadow-md transition-shadow duration-200">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <h3 className="font-semibold text-lg text-indigo-700 hover:text-indigo-800 cursor-pointer mb-1">
                            {result.title}
                          </h3>
                          <div className="flex items-center gap-2 mb-2">
                            <Badge variant="outline" className="text-xs">
                              {result.source}
                            </Badge>
                            <span className="text-xs text-slate-500">{result.url}</span>
                          </div>
                        </div>
                      </div>
                      <p className="text-slate-700 leading-relaxed">
                        {result.snippet}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>

              <TabsContent value="quick-guide">
                {documentationData && (
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <BookOpen className="w-5 h-5" />
                        Quick Guide
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="prose max-w-none">
                        <div dangerouslySetInnerHTML={{ __html: documentationData.quickGuide.replace(/\n/g, '<br>') }} />
                      </div>
                    </CardContent>
                  </Card>
                )}
              </TabsContent>

              <TabsContent value="documentation">
                {documentationData && (
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <FileText className="w-5 h-5" />
                        Complete Documentation
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="prose max-w-none">
                        <div dangerouslySetInnerHTML={{ __html: documentationData.detailedDocumentation.replace(/\n/g, '<br>') }} />
                      </div>
                    </CardContent>
                  </Card>
                )}
              </TabsContent>
            </Tabs>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchPage;