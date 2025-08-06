// PDF generation service using jsPDF
class PDFService {
  constructor() {
    this.jsPDF = window.jspdf?.jsPDF;
    this.pageWidth = 210; // A4 width in mm
    this.pageHeight = 297; // A4 height in mm
    this.margin = 20;
    this.maxLineWidth = this.pageWidth - (this.margin * 2);
    this.currentY = this.margin;
  }

  async generatePDF(documentationData, searchResults) {
    if (!this.jsPDF) {
      throw new Error('jsPDF library not loaded');
    }

    const doc = new this.jsPDF();
    this.currentY = this.margin;

    // Title page
    this.addTitle(doc, documentationData.title);
    this.addSpace(doc, 10);
    
    // Metadata
    this.addText(doc, `Generated on: ${new Date().toLocaleDateString()}`, 10, 'italic');
    this.addText(doc, `Search Results: ${searchResults.length} sources`, 10, 'italic');
    this.addSpace(doc, 15);

    // Table of Contents
    this.addHeading(doc, 'Table of Contents', 14);
    this.addText(doc, '1. Quick Guide', 10);
    this.addText(doc, '2. Search Results Summary', 10);
    this.addText(doc, '3. Complete Documentation', 10);
    this.addSpace(doc, 15);

    // Quick Guide Section
    this.addNewPageIfNeeded(doc, 50);
    this.addHeading(doc, '1. Quick Guide', 14);
    this.addSpace(doc, 5);
    
    // Convert markdown-style content to plain text and add to PDF
    const quickGuideText = this.markdownToPlainText(documentationData.quickGuide);
    this.addFormattedText(doc, quickGuideText);
    
    this.addSpace(doc, 15);

    // Search Results Section
    this.addNewPageIfNeeded(doc, 80);
    this.addHeading(doc, '2. Search Results Summary', 14);
    this.addSpace(doc, 5);
    
    searchResults.forEach((result, index) => {
      this.addNewPageIfNeeded(doc, 40);
      this.addText(doc, `${index + 1}. ${result.title}`, 11, 'bold');
      this.addText(doc, `Source: ${result.source}`, 9, 'italic');
      this.addText(doc, `URL: ${result.url}`, 9, 'normal');
      this.addText(doc, result.snippet, 10, 'normal');
      this.addSpace(doc, 8);
    });

    // Complete Documentation Section
    this.addNewPageIfNeeded(doc, 50);
    this.addHeading(doc, '3. Complete Documentation', 14);
    this.addSpace(doc, 5);
    
    const documentationText = this.markdownToPlainText(documentationData.detailedDocumentation);
    this.addFormattedText(doc, documentationText);

    // Footer on each page
    const totalPages = doc.internal.getNumberOfPages();
    for (let i = 1; i <= totalPages; i++) {
      doc.setPage(i);
      doc.setFontSize(8);
      doc.text('SearchDocs AI - Generated Documentation', this.margin, this.pageHeight - 10);
      doc.text(`Page ${i} of ${totalPages}`, this.pageWidth - this.margin - 20, this.pageHeight - 10);
    }

    return doc;
  }

  addTitle(doc, title) {
    doc.setFontSize(20);
    doc.setFont(undefined, 'bold');
    const textWidth = doc.getTextWidth(title);
    const x = (this.pageWidth - textWidth) / 2;
    doc.text(title, x, this.currentY);
    this.currentY += 15;
  }

  addHeading(doc, text, size = 12) {
    doc.setFontSize(size);
    doc.setFont(undefined, 'bold');
    doc.text(text, this.margin, this.currentY);
    this.currentY += size * 0.6;
  }

  addText(doc, text, size = 10, style = 'normal') {
    doc.setFontSize(size);
    doc.setFont(undefined, style);
    
    // Split text into lines that fit within the page width
    const lines = doc.splitTextToSize(text, this.maxLineWidth);
    
    lines.forEach(line => {
      this.addNewPageIfNeeded(doc, 10);
      doc.text(line, this.margin, this.currentY);
      this.currentY += size * 0.6;
    });
  }

  addFormattedText(doc, text) {
    const lines = text.split('\n');
    
    lines.forEach(line => {
      if (line.trim() === '') {
        this.addSpace(doc, 4);
      } else if (line.startsWith('# ')) {
        this.addSpace(doc, 8);
        this.addHeading(doc, line.substring(2), 14);
        this.addSpace(doc, 4);
      } else if (line.startsWith('## ')) {
        this.addSpace(doc, 6);
        this.addHeading(doc, line.substring(3), 12);
        this.addSpace(doc, 3);
      } else if (line.startsWith('### ')) {
        this.addSpace(doc, 4);
        this.addHeading(doc, line.substring(4), 11);
        this.addSpace(doc, 2);
      } else if (line.startsWith('- ') || line.startsWith('• ')) {
        this.addText(doc, '  • ' + line.substring(2), 10);
      } else if (line.match(/^\d+\./)) {
        this.addText(doc, line, 10);
      } else {
        this.addText(doc, line, 10);
      }
    });
  }

  addSpace(doc, space) {
    this.currentY += space;
  }

  addNewPageIfNeeded(doc, requiredSpace) {
    if (this.currentY + requiredSpace > this.pageHeight - this.margin) {
      doc.addPage();
      this.currentY = this.margin;
    }
  }

  markdownToPlainText(markdown) {
    return markdown
      .replace(/#+\s/g, '') // Remove markdown headers
      .replace(/\*\*(.*?)\*\*/g, '$1') // Remove bold markers
      .replace(/\*(.*?)\*/g, '$1') // Remove italic markers
      .replace(/\[(.*?)\]\(.*?\)/g, '$1') // Remove links, keep text
      .replace(/`(.*?)`/g, '$1') // Remove code markers
      .trim();
  }

  async downloadPDF(doc, filename) {
    try {
      doc.save(filename);
      return true;
    } catch (error) {
      console.error('PDF download error:', error);
      throw error;
    }
  }
}

export default PDFService;