const mockSearchData = {
  searchResults: (query) => ({
    query: query,
    totalResults: Math.floor(Math.random() * 1000000) + 100000,
    searchTime: (Math.random() * 0.8 + 0.2).toFixed(2),
    results: [
      {
        title: `Understanding ${query}: A Comprehensive Overview`,
        url: `https://example.com/${query.toLowerCase().replace(/\s+/g, '-')}`,
        snippet: `${query} is a complex and multifaceted topic that has gained significant attention in recent years. This comprehensive guide explores the fundamental concepts, applications, and implications of ${query} across various domains. Learn about the latest developments, best practices, and future trends in this rapidly evolving field.`,
        source: "Google"
      },
      {
        title: `${query}: Complete Guide and Best Practices`,
        url: `https://techguide.com/${query.toLowerCase().replace(/\s+/g, '-')}`,
        snippet: `Discover everything you need to know about ${query} with this detailed guide. From basic concepts to advanced techniques, this resource covers all aspects of ${query} implementation, troubleshooting, and optimization. Perfect for beginners and experts alike.`,
        source: "Bing"
      },
      {
        title: `Latest Trends and Developments in ${query}`,
        url: `https://research.org/${query.toLowerCase().replace(/\s+/g, '-')}-trends`,
        snippet: `Stay up-to-date with the latest trends, innovations, and research developments in ${query}. This article provides insights from industry experts, case studies, and practical examples that demonstrate the current state and future direction of ${query}.`,
        source: "DuckDuckGo"
      },
      {
        title: `${query}: Tools, Resources, and Implementation Strategies`,
        url: `https://devtools.com/${query.toLowerCase().replace(/\s+/g, '-')}-tools`,
        snippet: `Explore the essential tools, resources, and implementation strategies for working with ${query}. This comprehensive resource includes tool comparisons, setup guides, configuration tips, and real-world examples to help you get started quickly.`,
        source: "Google"
      },
      {
        title: `Common Challenges and Solutions in ${query}`,
        url: `https://solutions.net/${query.toLowerCase().replace(/\s+/g, '-')}-solutions`,
        snippet: `Learn about common challenges faced when working with ${query} and discover proven solutions and workarounds. This practical guide includes troubleshooting tips, error resolution strategies, and preventive measures to ensure smooth implementation.`,
        source: "Bing"
      }
    ]
  }),

  generateDocumentation: (query) => ({
    title: `Complete Guide to ${query}`,
    quickGuide: `# Quick Start Guide for ${query}

## What is ${query}?
${query} is an important topic that encompasses various concepts, technologies, and methodologies. This quick guide provides essential information to get you started.

## Key Benefits:
• Improved efficiency and productivity
• Enhanced capabilities and functionality  
• Better integration and compatibility
• Reduced complexity and learning curve

## Getting Started:
1. **Understand the Basics**: Learn fundamental concepts and terminology
2. **Explore Use Cases**: Identify how ${query} applies to your specific needs
3. **Choose Tools**: Select appropriate tools and technologies
4. **Start Small**: Begin with simple implementations
5. **Scale Gradually**: Expand your usage as you gain experience

## Essential Resources:
• Official documentation and guides
• Community forums and discussions
• Training materials and tutorials
• Best practice examples and case studies

## Next Steps:
- Review the complete documentation below
- Explore recommended tools and platforms
- Join relevant communities and forums
- Stay updated with latest developments`,

    detailedDocumentation: `# Complete Documentation for ${query}

## Table of Contents
1. Introduction
2. Core Concepts
3. Implementation Guide
4. Best Practices
5. Common Use Cases
6. Troubleshooting
7. Advanced Topics
8. Resources and References

## 1. Introduction

${query} represents a comprehensive approach to solving complex challenges in modern technology and business environments. This documentation provides detailed insights, practical examples, and step-by-step guidance for implementing ${query} effectively.

### Why ${query} Matters
In today's rapidly evolving landscape, ${query} has become increasingly important for organizations seeking to optimize their operations, enhance user experiences, and maintain competitive advantages.

## 2. Core Concepts

### Fundamental Principles
- **Principle 1**: Core foundation and theoretical framework
- **Principle 2**: Practical application and implementation strategies
- **Principle 3**: Integration and scalability considerations
- **Principle 4**: Performance optimization and monitoring

### Key Components
Understanding the essential components of ${query} is crucial for successful implementation:
- Component A: Primary functionality and core features
- Component B: Supporting infrastructure and dependencies
- Component C: User interface and interaction layers
- Component D: Data management and processing systems

## 3. Implementation Guide

### Prerequisites
Before implementing ${query}, ensure you have:
- Technical infrastructure and system requirements
- Necessary skills and knowledge base
- Required tools and development environments
- Proper planning and project management structure

### Step-by-Step Implementation
1. **Planning Phase**: Define objectives, scope, and success criteria
2. **Setup Phase**: Prepare environment and install dependencies
3. **Development Phase**: Build core functionality and features
4. **Testing Phase**: Conduct thorough testing and validation
5. **Deployment Phase**: Release and monitor system performance
6. **Maintenance Phase**: Ongoing support and continuous improvement

## 4. Best Practices

### Development Best Practices
- Follow industry standards and coding conventions
- Implement proper error handling and logging
- Use version control and collaborative development workflows
- Conduct regular code reviews and quality assessments

### Security Considerations
- Implement robust authentication and authorization
- Follow security best practices and compliance requirements
- Regular security audits and vulnerability assessments
- Keep systems updated with latest security patches

## 5. Common Use Cases

### Use Case 1: Enterprise Applications
Large organizations often implement ${query} to streamline operations, improve data management, and enhance decision-making processes.

### Use Case 2: Small Business Solutions
Small and medium businesses can leverage ${query} to compete more effectively, reduce costs, and improve customer satisfaction.

### Use Case 3: Personal Projects
Individual developers and enthusiasts use ${query} for learning, experimentation, and building innovative solutions.

## 6. Troubleshooting

### Common Issues and Solutions
- **Issue 1**: Performance degradation - Solution: Optimize queries and implement caching
- **Issue 2**: Integration problems - Solution: Review API documentation and update configurations
- **Issue 3**: User experience issues - Solution: Conduct user testing and gather feedback

### Debugging Strategies
- Use systematic debugging approaches
- Implement comprehensive logging and monitoring
- Create reproducible test environments
- Document issues and solutions for future reference

## 7. Advanced Topics

### Scaling and Performance
Advanced scaling strategies for handling increased load and complexity:
- Horizontal and vertical scaling approaches
- Load balancing and distribution strategies
- Caching mechanisms and optimization techniques
- Performance monitoring and analysis tools

### Integration Patterns
- API design and implementation best practices
- Microservices architecture considerations
- Event-driven architecture patterns
- Data synchronization and consistency strategies

## 8. Resources and References

### Official Documentation
- Primary documentation and reference materials
- API documentation and specifications
- Release notes and changelog information
- Official tutorials and getting started guides

### Community Resources
- Forums and discussion platforms
- Open source projects and contributions
- Blog posts and articles from experts
- Video tutorials and conference presentations

### Tools and Utilities
- Development tools and IDEs
- Testing frameworks and utilities
- Monitoring and analytics platforms
- Deployment and infrastructure tools

## Conclusion

This comprehensive guide provides the foundation for understanding and implementing ${query} effectively. Continue exploring the resources provided, engage with the community, and apply these concepts to your specific use cases for optimal results.

---

*Last updated: ${new Date().toLocaleDateString()}*`
  })
};

export default mockSearchData;