import React from 'react';
import styled from 'styled-components';
import ReportView from './ReportView';

const SectionTitle = styled.h3`
  color: #444;
  margin: 30px 0 10px;
`;

const CategoryReport = ({ createThread }) => {
  return (
    <ReportView 
      title="Category Report" 
      description="Strategic analysis of the beverage market category, including trends, growth opportunities, and competitive landscape."
      createThread={createThread}
    >
      <SectionTitle>Executive Summary</SectionTitle>
      <p>
        The beverage industry is experiencing significant shifts driven by changing consumer preferences, 
        health consciousness, and innovative product offerings. This report examines the current state 
        of the beverage market, identifying key growth opportunities, emerging trends, and strategic 
        recommendations for market positioning.
      </p>

      <SectionTitle>Market Overview</SectionTitle>
      <p>
        The global beverage market is currently valued at approximately $1.5 trillion, with projected growth 
        of 3.1% CAGR through 2027. Non-alcoholic beverages represent 65% of the market, with carbonated 
        soft drinks seeing declining growth (-0.5%) while functional beverages (+8.2%) and premium water 
        categories (+5.7%) continue to expand rapidly.
      </p>
      <p>
        Regional analysis indicates North America and Europe as mature markets with modest growth (1-2%), 
        while Asia-Pacific and Latin America demonstrate stronger expansion opportunities (6-8% growth) 
        due to rising disposable incomes and urbanization trends.
      </p>

      <SectionTitle>Key Consumer Trends</SectionTitle>
      <p>
        Several pivotal consumer trends are reshaping the beverage landscape:
      </p>
      <ul>
        <li>
          <strong>Health & Wellness Focus:</strong> 73% of consumers actively seek beverages with functional 
          benefits including immunity support, cognitive enhancement, and digestive health properties.
        </li>
        <li>
          <strong>Sustainability Commitment:</strong> 68% of consumers express willingness to pay a premium 
          for beverages with sustainable packaging and ethical sourcing credentials.
        </li>
        <li>
          <strong>Premiumization:</strong> Consumers demonstrate increased interest in craft, authentic, 
          and story-driven beverage brands, with premium segment growth outpacing mass market by 3.2x.
        </li>
        <li>
          <strong>Reduced Sugar & Clean Labels:</strong> 82% of consumers check ingredient labels, 
          with 65% actively avoiding artificial ingredients and seeking natural alternatives.
        </li>
      </ul>

      <SectionTitle>Competitive Landscape</SectionTitle>
      <p>
        The beverage market features a mix of established global corporations and disruptive startups:
      </p>
      <ul>
        <li>
          <strong>Market Leaders:</strong> Traditional players like Coca-Cola, PepsiCo, and Nestlé 
          maintain dominant market share (combined 43%) but face growth challenges in core categories.
        </li>
        <li>
          <strong>Challenger Brands:</strong> Companies like Celsius, Liquid Death, and Olipop 
          are capturing market share through innovative positioning and digital-native marketing approaches.
        </li>
        <li>
          <strong>Acquisition Trends:</strong> Major beverage companies completed 37 acquisitions 
          of smaller, innovative brands in the past 24 months, primarily targeting functional and 
          plant-based categories.
        </li>
      </ul>

      <SectionTitle>Growth Opportunities</SectionTitle>
      <p>
        Analysis reveals several high-potential growth avenues within the beverage category:
      </p>
      <ul>
        <li>
          <strong>Functional Hydration:</strong> The enhanced water segment presents a $14.5B opportunity 
          with 12.7% projected annual growth, particularly products featuring natural electrolytes, 
          adaptogens, and nootropic ingredients.
        </li>
        <li>
          <strong>Plant-Based Innovations:</strong> Plant-based milk alternatives beyond the established 
          almond and oat varieties show significant growth potential, with emerging options like pistachio, 
          barley, and potato-based alternatives gaining traction.
        </li>
        <li>
          <strong>Ready-to-Drink Premium:</strong> Premium RTD cocktails and mocktails represent a 
          $11.6B category growing at 18.3% annually, with craft and authentic positioning driving consumer interest.
        </li>
        <li>
          <strong>Mood-Enhancement:</strong> Beverages targeting specific emotional states (focus, relaxation, 
          energy) utilizing natural adaptogens and nootropics show promising early-stage growth.
        </li>
      </ul>

      <SectionTitle>Strategic Recommendations</SectionTitle>
      <p>
        Based on comprehensive market analysis, we recommend the following strategic approaches:
      </p>
      <ul>
        <li>
          <strong>Portfolio Diversification:</strong> Develop a balanced product portfolio with 60% core 
          established categories and 40% high-growth emerging segments to ensure both stability and innovation.
        </li>
        <li>
          <strong>Sustainability Leadership:</strong> Implement a comprehensive sustainability roadmap 
          covering packaging, ingredients, and water usage, with transparent consumer communication to build brand equity.
        </li>
        <li>
          <strong>Personalization Strategy:</strong> Explore direct-to-consumer channels that enable 
          personalized beverage options tailored to individual health profiles, preferences, and usage occasions.
        </li>
        <li>
          <strong>Strategic Partnerships:</strong> Consider collaboration with complementary wellness 
          brands (fitness, nutrition, mindfulness) to create integrated consumer experiences beyond the beverage itself.
        </li>
        <li>
          <strong>Digital Transformation:</strong> Invest in data capabilities to develop predictive consumer 
          insights and drive innovation cycles based on real-time feedback and emerging preference patterns.
        </li>
      </ul>

      <SectionTitle>Conclusion</SectionTitle>
      <p>
        The beverage category is undergoing significant transformation driven by changing consumer preferences 
        and innovative product development. Companies that can successfully navigate the shifts toward health 
        functionality, sustainability, and premium experiences while maintaining operational efficiency will 
        be positioned for long-term success. The key strategic imperative is balancing core business stability 
        with calculated innovation that addresses emerging consumer needs.
      </p>
    </ReportView>
  );
};

export default CategoryReport;
