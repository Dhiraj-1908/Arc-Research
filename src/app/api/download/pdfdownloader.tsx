import React from 'react';
import { Document, Page, Text, View, StyleSheet, Image } from '@react-pdf/renderer';

// Register custom fonts

// Define theme types
interface ThemeColors {
  primary: string;
  background: string;
  card: string;
  text: {
    primary: string;
    secondary: string;
    muted: string;
  };
  border: string;
  codeBackground: string;
  blockquoteBackground: string;
  blockquoteBorder: string;
  headings: string;
}

interface Theme {
  colors: ThemeColors;
}

// Custom theme colors for light mode and dark mode
const createTheme = (isDarkMode = false): Theme => ({
  colors: {
    primary: isDarkMode ? '#3b82f6' : '#2563eb',
    background: isDarkMode ? '#1f2937' : '#ffffff',
    card: isDarkMode ? '#374151' : '#f9fafb',
    text: {
      primary: isDarkMode ? '#f3f4f6' : '#111827',
      secondary: isDarkMode ? '#d1d5db' : '#4b5563',
      muted: isDarkMode ? '#9ca3af' : '#6b7280',
    },
    border: isDarkMode ? '#4b5563' : '#e5e7eb',
    codeBackground: isDarkMode ? '#111827' : '#f3f4f6',
    blockquoteBackground: isDarkMode ? '#374151' : '#f3f4f6',
    blockquoteBorder: isDarkMode ? '#60a5fa' : '#3b82f6',
    headings: isDarkMode ? '#60a5fa' : '#2563eb',
  }
});

// Create PDF styles
const createPdfStyles = (isDarkMode = false) => {
  const theme = createTheme(isDarkMode);
  
  return StyleSheet.create({
    page: {
      padding: 50,
      backgroundColor: theme.colors.background,
      fontFamily: 'Helvetica',
      fontSize: 11,
      lineHeight: 1.6,
      color: theme.colors.text.primary,
    },
    
    // Header styles
    header: {
      marginBottom: 25,
      paddingBottom: 15,
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.border,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    
    headerContent: {
      flexDirection: 'column',
    },
    
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      color: theme.colors.headings,
      marginBottom: 5,
      fontFamily: 'Helvetica',
    },
    
    subtitle: {
      fontSize: 14,
      color: theme.colors.text.secondary,
      fontFamily: 'Helvetica',
    },
    
    // Section styles
    section: {
      marginVertical: 14,
    },
    
    // Typography
    h1: {
      fontSize: 24,
      fontWeight: 'bold',
      color: theme.colors.headings,
      marginTop: 20,
      marginBottom: 16,
      paddingBottom: 8,
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.border,
      fontFamily: 'Helvetica',
    },
    
    h2: {
      fontSize: 20,
      fontWeight: 'bold',
      color: theme.colors.headings,
      marginTop: 18,
      marginBottom: 14,
      fontFamily: 'Helvetica',
    },
    
    h3: {
      fontSize: 16,
      fontWeight: 'bold',
      color: theme.colors.headings,
      marginTop: 16,
      marginBottom: 12,
      fontFamily: 'Helvetica',
    },
    
    h4: {
      fontSize: 14,
      fontWeight: 'bold',
      color: theme.colors.headings,
      marginTop: 14,
      marginBottom: 10,
      fontFamily: 'Helvetica',
    },
    
    h5: {
      fontSize: 12,
      fontWeight: 'bold',
      color: theme.colors.headings,
      marginTop: 12,
      marginBottom: 8,
      fontFamily: 'Helvetica',
    },
    
    h6: {
      fontSize: 11,
      fontWeight: 'bold',
      color: theme.colors.headings,
      marginTop: 12,
      marginBottom: 6,
      fontFamily: 'Helvetica',
    },
    
    paragraph: {
      fontSize: 11,
      marginBottom: 12,
      lineHeight: 1.6,
      fontFamily: 'Helvetica',
    },
    
    // Code styles
    codeBlock: {
      marginVertical: 12,
      padding: 12,
      backgroundColor: theme.colors.codeBackground,
      borderRadius: 6,
    },
    
    codeContent: {
      fontFamily: 'Courier',
      fontSize: 9,
      color: theme.colors.text.primary,
      lineHeight: 1.4,
    },
    
    inlineCode: {
      fontFamily: 'Courier',
      fontSize: 10,
      backgroundColor: theme.colors.codeBackground,
      padding: 2,
      borderRadius: 3,
    },
    
    // List styles
    listContainer: {
      marginVertical: 12,
      paddingLeft: 8,
    },
    
    listItem: {
      flexDirection: 'row',
      marginBottom: 8,
    },
    
    listBullet: {
      width: 15,
      fontSize: 11,
      color: theme.colors.headings,
      marginRight: 5,
    },
    
    listItemText: {
      flex: 1,
      fontSize: 11,
      lineHeight: 1.6,
      fontFamily: 'Helvetica',
    },
    
    // Quote styles
    blockquote: {
      marginVertical: 12,
      paddingVertical: 8,
      paddingHorizontal: 14,
      backgroundColor: theme.colors.blockquoteBackground,
      borderLeftWidth: 4,
      borderLeftColor: theme.colors.blockquoteBorder,
      borderRadius: 4,
    },
    
    blockquoteText: {
      fontSize: 11,
      fontStyle: 'italic',
      color: theme.colors.text.secondary,
      lineHeight: 1.6,
      fontFamily: 'Helvetica',
    },
    
    // Table styles
    table: {
      marginVertical: 14,
      borderWidth: 1,
      borderColor: theme.colors.border,
    },
    
    tableRow: {
      flexDirection: 'row',
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.border,
    },
    
    tableHeader: {
      backgroundColor: theme.colors.card,
    },
    
    tableCell: {
      padding: 8,
      fontSize: 10,
      color: theme.colors.text.primary,
      fontFamily: 'Helvetica',
      flex: 1,
    },
    
    tableCellHeader: {
      padding: 8,
      fontSize: 10,
      fontWeight: 'bold',
      backgroundColor: theme.colors.card,
      color: theme.colors.text.primary,
      fontFamily: 'Helvetica',
      flex: 1,
    },
    
    // Image styles
    image: {
      marginVertical: 12,
    },
    
    // Divider styles
    divider: {
      marginVertical: 12,
      height: 1,
      backgroundColor: theme.colors.border,
    },
    
    // Footer styles
    footer: {
      position: 'absolute',
      bottom: 30,
      left: 50,
      right: 50,
      paddingTop: 10,
      borderTopWidth: 1,
      borderTopColor: theme.colors.border,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    
    footerText: {
      fontSize: 8,
      color: theme.colors.text.muted,
      fontFamily: 'Helvetica'
    },
    
    pageNumber: {
      fontSize: 8,
      color: theme.colors.text.muted,
      fontFamily: 'Helvetica',
    },
  });
};

// Type definitions for content items
interface ContentItem {
  type: string;
  content?: string;
  level?: number;
  items?: string[];
  headers?: string[];
  rows?: string[][];
  src?: string;
  alt?: string;
  title?: string;
  width?: number;
  height?: number;
  language?: string;
}

interface ContentRendererProps {
    item: ContentItem;
    styles: ReturnType<typeof createPdfStyles>;
  }

// Content renderer component
const ContentRenderer: React.FC<ContentRendererProps> = ({ item, styles }) => {
  switch (item.type) {
    case 'h1':
    case 'h2':
    case 'h3':
    case 'h4':
    case 'h5':
    case 'h6':
      return <Text style={styles[item.type]}>{item.content}</Text>;
      
    case 'paragraph':
      return <Text style={styles.paragraph}>{item.content}</Text>;
      
    case 'code':
      return (
        <View style={styles.codeBlock}>
          <Text style={styles.codeContent}>{item.content}</Text>
        </View>
      );
      
    case 'blockquote':
      return (
        <View style={styles.blockquote}>
          <Text style={styles.blockquoteText}>{item.content}</Text>
        </View>
      );
      
    case 'list':
      return (
        <View style={styles.listContainer}>
          {item.items?.map((listItem: string, i: number) => (
            <View key={i} style={styles.listItem}>
              <Text style={styles.listBullet}>•</Text>
              <Text style={styles.listItemText}>{listItem}</Text>
            </View>
          ))}
        </View>
      );
      
    case 'numbered-list':
      return (
        <View style={styles.listContainer}>
          {item.items?.map((listItem: string, i: number) => (
            <View key={i} style={styles.listItem}>
              <Text style={styles.listBullet}>{`${i + 1}.`}</Text>
              <Text style={styles.listItemText}>{listItem}</Text>
            </View>
          ))}
        </View>
      );
      
    case 'table':
      if (!item.rows || item.rows.length === 0) return null;

      return (
        <View style={styles.table}>
          {/* Header row */}
          {item.headers && (
            <View style={styles.tableRow}>
              {item.headers.map((header: string, i: number) => (
                <Text key={i} style={styles.tableCellHeader}>{header}</Text>
              ))}
            </View>
          )}
          
          {/* Table rows */}
          {item.rows.map((row: string[], rowIndex: number) => (
            <View key={rowIndex} style={styles.tableRow}>
              {row.map((cell: string, cellIndex: number) => (
                <Text key={cellIndex} style={styles.tableCell}>{cell}</Text>
              ))}
            </View>
          ))}
        </View>
      );
      
    case 'image':
      return item.src ? (
        <View style={styles.image}>
            {/* eslint-disable-next-line jsx-a11y/alt-text */}
<Image src={item.src} style={{ width: item.width || 400, height: item.height || 300 }} />
        </View>
      ) : null;
      
    case 'divider':
    case 'hr':
      return <View style={styles.divider} />;
      
    default:
      return null;
  }
};

interface ParserContext {
  inCodeBlock: boolean;
  codeLanguage: string | null;
  inList: boolean;
  inNumberedList: boolean;
  inBlockquote: boolean;
  inTable: boolean;
  tableHeaders: string[];
  tableRows: string[][];
  tempContent: string[];
  listItems: string[];
}

// Enhanced markdown parser for PDF
export const parseMarkdownForPdf = (markdown: string): ContentItem[] => {
  const lines = markdown.split('\n');
  const result: ContentItem[] = [];
  
  let currentContext: ParserContext = {
    inCodeBlock: false,
    codeLanguage: null,
    inList: false,
    inNumberedList: false,
    inBlockquote: false,
    inTable: false,
    tableHeaders: [],
    tableRows: [],
    tempContent: [],
    listItems: [],
  };

  const flushContext = () => {
    if (currentContext.inCodeBlock && currentContext.tempContent.length > 0) {
      result.push({
        type: 'code',
        content: currentContext.tempContent.join('\n'),
        language: currentContext.codeLanguage || undefined,
      });
    } else if (currentContext.inList && currentContext.listItems.length > 0) {
      result.push({
        type: 'list',
        items: [...currentContext.listItems]
      });
    } else if (currentContext.inNumberedList && currentContext.listItems.length > 0) {
      result.push({
        type: 'numbered-list',
        items: [...currentContext.listItems]
      });
    } else if (currentContext.inBlockquote && currentContext.tempContent.length > 0) {
      result.push({
        type: 'blockquote',
        content: currentContext.tempContent.join('\n').replace(/^>\s*/gm, '')
      });
    } else if (currentContext.inTable) {
      result.push({
        type: 'table',
        headers: currentContext.tableHeaders,
        rows: currentContext.tableRows
      });
    } else if (currentContext.tempContent.length > 0) {
      const content = currentContext.tempContent.join('\n').trim();
      if (content) {
        result.push({
          type: 'paragraph',
          content
        });
      }
    }

    // Reset context
    currentContext = {
      inCodeBlock: false,
      codeLanguage: null,
      inList: false,
      inNumberedList: false,
      inBlockquote: false,
      inTable: false,
      tableHeaders: [],
      tableRows: [],
      tempContent: [],
      listItems: [],
    };
  };

  // Process each line
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    
    // Handle code blocks
    if (line.trim().startsWith('```')) {
      if (!currentContext.inCodeBlock) {
        flushContext();
        currentContext.inCodeBlock = true;
        // Extract language if specified
        const langMatch = line.trim().match(/^```(\w+)$/);
        currentContext.codeLanguage = langMatch ? langMatch[1] : null;
      } else {
        flushContext();
      }
      continue;
    }

    if (currentContext.inCodeBlock) {
      currentContext.tempContent.push(line);
      continue;
    }

    // Handle headers
    const headerMatch = line.match(/^(#{1,6})\s+(.+)$/);
    if (headerMatch) {
      flushContext();
      const level = headerMatch[1].length;
      result.push({
        type: `h${level}`,
        content: headerMatch[2].trim(),
        level
      });
      continue;
    }

    // Handle horizontal rules
    if (line.trim().match(/^[-*_]{3,}$/)) {
      flushContext();
      result.push({ type: 'divider' });
      continue;
    }

    // Handle tables
    if (line.includes('|')) {
      const cells = line.split('|').filter(cell => cell !== '');
      
      if (cells.length > 0) {
        // Check if this is a table header separator line
        if (line.trim().match(/^\|?\s*[-:]+[-:|\s]*$/)) {
          currentContext.inTable = true;
          continue;
        }
        
        if (!currentContext.inTable) {
          flushContext();
          currentContext.inTable = true;
          currentContext.tableHeaders = cells.map(cell => cell.trim());
        } else if (cells.length === currentContext.tableHeaders.length) {
          // Add table row
          currentContext.tableRows.push(cells.map(cell => cell.trim()));
        }
        continue;
      }
    } else if (currentContext.inTable) {
      // End of table
      flushContext();
    }

    // Handle lists
    const unorderedListMatch = line.match(/^[\s]*[-*+]\s+(.+)$/);
    if (unorderedListMatch) {
      if (!currentContext.inList) {
        flushContext();
        currentContext.inList = true;
      }
      currentContext.listItems.push(unorderedListMatch[1]);
      continue;
    }

    const orderedListMatch = line.match(/^[\s]*\d+\.\s+(.+)$/);
    if (orderedListMatch) {
      if (!currentContext.inNumberedList) {
        flushContext();
        currentContext.inNumberedList = true;
      }
      currentContext.listItems.push(orderedListMatch[1]);
      continue;
    }

    // Handle blockquotes
    if (line.trim().startsWith('>')) {
      if (!currentContext.inBlockquote) {
        flushContext();
        currentContext.inBlockquote = true;
      }
      currentContext.tempContent.push(line);
      continue;
    }

    // Handle images
    const imageMatch = line.match(/!\[(.*?)\]\((.*?)(?:\s+"(.*?)")?\)/);
    if (imageMatch) {
      flushContext();
      result.push({
        type: 'image',
        alt: imageMatch[1],
        src: imageMatch[2],
        title: imageMatch[3] || '',
      });
      continue;
    }

    // Handle empty lines
    if (line.trim() === '') {
      if (currentContext.inList || currentContext.inNumberedList || 
          currentContext.inBlockquote || currentContext.inTable) {
        flushContext();
      } else if (currentContext.tempContent.length > 0) {
        flushContext();
      }
      continue;
    }

    // Regular content
    if (!currentContext.inList && !currentContext.inNumberedList && 
        !currentContext.inBlockquote && !currentContext.inTable) {
      currentContext.tempContent.push(line);
    } else {
      flushContext();
      currentContext.tempContent.push(line);
    }
  }

  // Flush any remaining content
  flushContext();

  return result;
};

interface ResearchReportPdfProps {
  topic: string;
  content: string;
  isDarkMode?: boolean;
}

// Main PDF Document Component
const ResearchReportPdf: React.FC<ResearchReportPdfProps> = ({ topic, content, isDarkMode = false }) => {
  const parsedContent = parseMarkdownForPdf(content);
  const styles = createPdfStyles(isDarkMode);
  
  return (
    <Document>
      <Page 
        size="A4" 
        style={styles.page}
        wrap
      >
        {/* Header section */}
        <View style={styles.header}>
          <View style={styles.headerContent}>
            <Text style={styles.title}>{topic}</Text>
            <Text style={styles.subtitle}>Research Report</Text>
          </View>
        </View>

        {/* Document Content */}
        <View style={styles.section}>
          {parsedContent.map((item, index) => (
            <ContentRenderer key={index} item={item} styles={styles} />
          ))}
        </View>

        {/* Footer */}
        <View fixed style={styles.footer}>
          <Text style={styles.footerText}>{topic} | Research Report</Text>
          <Text 
            style={styles.pageNumber}
            render={({ pageNumber, totalPages }) => `${pageNumber} / ${totalPages}`}
          />
        </View>
      </Page>
    </Document>
  );
};

// PDF Generation Service
export class EnhancedPdfGenerationService {
  static async generatePdf(topic: string, content: string, isDarkMode = false) {
    try {
      // Import the pdf function only when needed to avoid SSR issues
      const { pdf } = await import('@react-pdf/renderer');
      return await pdf(<ResearchReportPdf topic={topic} content={content} isDarkMode={isDarkMode} />).toBlob();
    } catch (error) {
      console.error("PDF generation failed:", error);
      throw new Error(`Failed to generate PDF: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  static async downloadPdf(topic: string, content: string, isDarkMode = false) {
    try {
      const blob = await this.generatePdf(topic, content, isDarkMode);
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${topic.toLowerCase().replace(/\s+/g, '-')}-research-report.pdf`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error("PDF download failed:", error);
      throw error;
    }
  }
}