import React from 'react';
import styled from 'styled-components';
import ReportView from './ReportView';

const SectionTitle = styled.h3`
  color: #444;
  margin: 30px 0 10px;
`;

const CommercialReport = ({ createThread }) => {
  return (
    <ReportView
      title="Commercial Report"
      description="Analysis of market size, distribution channels, pricing strategies, and revenue opportunities."
      createThread={createThread}
    >
      <SectionTitle>Market Size & Growth</SectionTitle>
      <p>
        The global functional beverage market was valued at $128.7 billion in 2024 and is projected to reach $196.5 billion by 2029, 
        growing at a CAGR of 8.8% during the forecast period. North America represents the largest market, accounting for 38% of global sales, 
        followed by Asia-Pacific (33%) and Europe (22%).
      </p>
      <p>
        Within the functional beverage category, several segments show particularly strong growth trajectories:
      </p>
      <ul>
        <li>
          <strong>Functional Waters:</strong> Growing at 12.3% CAGR, driven by consumer preference for low/no sugar options and clean labels. 
          This segment is expected to reach $28.4 billion by 2029.
        </li>
        <li>
          <strong>Plant-Based Functional Drinks:</strong> Growing at 14.7% CAGR, fueled by increasing plant-based diets and sustainability concerns. 
          This segment is projected to reach $22.1 billion by 2029.
        </li>
        <li>
          <strong>Functional RTD Coffee:</strong> Growing at 11.8% CAGR, driven by demand for energy-boosting and functional benefits. 
          This segment is projected to reach $18.7 billion by 2029.
        </li>
      </ul>

      <SectionTitle>Distribution Channels</SectionTitle>
      <p>
        Distribution of functional beverages is evolving rapidly with significant channel shifts observed in the past 24 months:
      </p>
      <ul>
        <li>
          <strong>Traditional Retail (62% of sales volume):</strong> Growth at 5.3% annually, below the category average. 
          Grocery and mass retailers remain dominant but are losing share to other channels.
        </li>
        <li>
          <strong>Specialty & Natural Retailers (18% of sales):</strong> Growing at 11.2% annually, outpacing category average. 
          These channels attract higher-income consumers willing to pay premium prices.
        </li>
        <li>
          <strong>Direct-to-Consumer (12% of sales):</strong> The fastest-growing channel at 26.8% annually. 
          Subscription models are becoming increasingly popular, with 43% of D2C functional beverage sales occurring through subscriptions.
        </li>
        <li>
          <strong>Foodservice (8% of sales):</strong> Growing at 9.3% annually as cafes, restaurants, and on-premise locations expand their functional offerings.
        </li>
      </ul>

      <SectionTitle>Competitive Landscape</SectionTitle>
      <p>
        The functional beverage market features a diverse competitive landscape with four primary competitor types:
      </p>
      <p>
        <strong>Global Beverage Leaders (38% market share):</strong> Companies like Coca-Cola, PepsiCo, and Nestlé are rapidly expanding their functional beverage portfolios 
        through both internal innovation and acquisitions of successful smaller brands. They leverage extensive distribution networks and marketing power but often struggle 
        with agility in responding to emerging trends.
      </p>
      <p>
        <strong>Established Specialty Players (46% market share):</strong> Companies focused primarily on functional beverages with strong brand equity in specific benefit areas. 
        These companies typically have 10+ years of market presence and well-developed retail relationships. They benefit from focused expertise but face increasing pressure 
        from both larger and smaller competitors.
      </p>
      <p>
        <strong>Emerging Disruptors (12% market share but growing at 35% annually):</strong> Venture-backed startups targeting niche functional benefits or novel ingredient combinations. 
        They typically launch direct-to-consumer and expand into retail as they grow. This group sees the highest rate of both new entrants and failures.
      </p>
      <p>
        <strong>Private Label (4% market share but growing at 19% annually):</strong> Retailer-owned brands are increasing their presence in the functional beverage space, 
        particularly in functional waters and plant-based segments. They typically compete on price while closely mimicking successful branded products.
      </p>
      <p>
        The competitive intensity varies significantly by segment and channel, with plant-based functional beverages and mental performance drinks seeing the highest rates of new product introduction.
      </p>
    </ReportView>
  );
};

export default CommercialReport;
