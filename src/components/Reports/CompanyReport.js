import React from 'react';
import styled from 'styled-components';
import ReportView from './ReportView';

const SectionTitle = styled.h3`
  color: #444;
  margin: 30px 0 10px;
`;

const CompanyReport = ({ createThread }) => {
  return (
    <ReportView
      title="Company Report"
      description="Strategic analysis of NaturaBev Inc., including capabilities, competitive positioning, and growth opportunities."
      createThread={createThread}
    >
      <SectionTitle>Company Overview</SectionTitle>
      <p>
        NaturaBev Inc. is a mid-sized beverage company founded in 2012, specializing in plant-based and functional beverages. 
        The company has shown impressive growth over the past five years, with revenue increasing from $28 million to $72 million, 
        representing a CAGR of 20.8%.
      </p>
      <p>
        NaturaBev's product portfolio includes plant-based milks, functional waters, and kombucha drinks, with recent expansions 
        into ready-to-drink coffee alternatives and adaptogenic elixirs. The company operates primarily in North America, with a 
        growing presence in Western Europe and select Asian markets.
      </p>
      <p>
        The company employs approximately 230 people across its headquarters in Portland, Oregon, and manufacturing facilities 
        in California and Wisconsin. NaturaBev has received several industry awards for product innovation and sustainability initiatives.
      </p>
      
      <SectionTitle>Core Capabilities</SectionTitle>
      <p>
        NaturaBev demonstrates several distinctive capabilities that have contributed to its growth and market positioning:
      </p>
      <ul>
        <li>
          <strong>Formulation Expertise:</strong> The company employs a team of food scientists and nutritionists who have 
          developed proprietary ingredient blends and processing techniques. Their R&D capabilities have yielded 8 patents 
          related to plant-protein stability and natural preservation methods.
        </li>
        <li>
          <strong>Brand Development:</strong> NaturaBev has built strong consumer loyalty through authentic storytelling and community engagement. 
          Their flagship brand, "Everbright," has achieved 67% aided awareness among health-conscious consumers in core markets.
        </li>
        <li>
          <strong>Agile Manufacturing:</strong> The company's production facilities are designed for flexibility, allowing for rapid 
          reformulation and packaging changes. This capability enables NaturaBev to bring new products to market in an average of 
          4.5 months, compared to the industry average of 8.2 months.
        </li>
        <li>
          <strong>Channel Relationships:</strong> NaturaBev has established strong relationships with natural and specialty retailers, 
          securing premium shelf placement and promotional support. The company's products are currently distributed in over 2,800 retail locations.
        </li>
      </ul>
      
      <SectionTitle>Growth Challenges</SectionTitle>
      <p>
        Despite its strong performance, NaturaBev faces several key challenges that may constrain future growth:
      </p>
      <ul>
        <li>
          <strong>Scale Economics:</strong> As a mid-sized player, NaturaBev faces cost disadvantages in procurement, manufacturing, 
          and distribution relative to larger competitors. Their COGS is approximately 18% higher than market leaders on comparable products.
        </li>
        <li>
          <strong>International Expansion:</strong> The company's limited international infrastructure and experience have led to several 
          false starts in overseas markets. Their European market entry has achieved only 40% of projected sales after two years.
        </li>
        <li>
          <strong>Portfolio Complexity:</strong> Rapid innovation has resulted in a proliferating SKU count (86 active SKUs), creating 
          operational complexity and inventory management challenges. The bottom 30% of SKUs contribute only 8% of revenue.
        </li>
        <li>
          <strong>Talent Acquisition:</strong> As the company grows, attracting specialized talent in food science, international business, 
          and advanced manufacturing has become more challenging, particularly for their facilities outside of major urban centers.
        </li>
      </ul>
      
      <SectionTitle>Strategic Recommendations</SectionTitle>
      <p>
        Based on our analysis, we recommend the following strategic priorities for NaturaBev:
      </p>
      <ol>
        <li>
          <strong>Portfolio Rationalization:</strong> Conduct a comprehensive SKU rationalization to reduce complexity and redirect 
          resources to highest-potential products. We estimate this could improve overall margins by 2.4 percentage points while 
          freeing up manufacturing capacity.
        </li>
        <li>
          <strong>Strategic Partnerships:</strong> Pursue co-manufacturing and distribution partnerships to address scale disadvantages 
          in non-core markets. Potential partners include regional dairy companies with excess capacity and complementary distribution networks.
        </li>
        <li>
          <strong>Channel Diversification:</strong> Accelerate e-commerce and direct-to-consumer initiatives to reduce dependency on 
          traditional retail. Our analysis suggests D2C channels could deliver 3.2x the margin of retail while providing valuable consumer data.
        </li>
        <li>
          <strong>Focused International Strategy:</strong> Concentrate international expansion efforts on three high-potential markets 
          (UK, Germany, and Japan) rather than pursuing broad regional coverage. These markets show the strongest alignment with NaturaBev's 
          consumer value proposition and have developed specialty retail infrastructure.
        </li>
      </ol>
    </ReportView>
  );
};

export default CompanyReport;
