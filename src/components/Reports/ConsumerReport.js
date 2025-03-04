import React from 'react';
import styled from 'styled-components';
import ReportView from './ReportView';

const SectionTitle = styled.h3`
  color: #444;
  margin: 30px 0 10px;
`;

const ConsumerReport = ({ createThread }) => {
  return (
    <ReportView
      title="Consumer Report"
      description="Analysis of consumer segments, needs, preferences, and behavior patterns in the functional beverage market."
      createThread={createThread}
    >
      <SectionTitle>Consumer Landscape</SectionTitle>
      <p>
        The functional beverage consumer landscape has evolved significantly over the past five years, 
        characterized by increasing fragmentation and specialized needs. Our analysis identifies several key 
        dynamics shaping consumer behavior in this category:
      </p>
      <ul>
        <li>
          <strong>Health Consciousness:</strong> 72% of consumers now report reading nutrition labels before 
          purchasing beverages, up from 58% five years ago. Clean ingredient lists and nutritional benefits 
          are primary purchase drivers.
        </li>
        <li>
          <strong>Benefit Specificity:</strong> Consumers are increasingly seeking beverages that address specific 
          health needs or functional benefits, moving beyond general "wellness" claims to targeted solutions 
          for energy, immunity, digestion, or cognitive performance.
        </li>
        <li>
          <strong>Digital Discovery:</strong> 64% of new functional beverage consumers discover brands through 
          social media, significantly higher than the 38% average across all beverage categories. Instagram 
          and TikTok are particularly influential channels.
        </li>
        <li>
          <strong>Experimentation:</strong> The average functional beverage consumer regularly purchases 4.2 different 
          brands, compared to 1.8 brands for conventional beverage categories, indicating higher willingness 
          to experiment with new products.
        </li>
      </ul>
      
      <SectionTitle>Consumer Segments</SectionTitle>
      <p>
        Our research identifies four primary consumer segments within the functional beverage market, each with 
        distinct needs, behaviors, and growth potential:
      </p>
      <p>
        <strong>Health Optimizers (32% of category consumers):</strong> Predominantly aged 28-42, these consumers view 
        functional beverages as part of a comprehensive wellness routine. They are highly educated about ingredients 
        and benefits, skeptical of marketing claims, and willing to pay premium prices for products with scientific 
        backing. This segment shows the highest loyalty to brands they trust.
      </p>
      <p>
        <strong>Performance Seekers (26% of category consumers):</strong> Primarily aged 22-35, these consumers use 
        functional beverages to enhance physical or mental performance for specific activities. They are results-oriented, 
        responsive to measurable benefit claims, and often consume products around specific occasions like workouts, 
        studying, or productivity sessions.
      </p>
      <p>
        <strong>Wellness Explorers (24% of category consumers):</strong> Spanning ages 18-60, these consumers are driven 
        by curiosity and interest in new health trends. They demonstrate high trial rates but lower loyalty, constantly 
        seeking novel ingredients, flavors, or benefits. Social media influence and packaging aesthetics significantly 
        impact their purchase decisions.
      </p>
      <p>
        <strong>Convenient Health Seekers (18% of category consumers):</strong> Predominantly aged 30-55, these time-constrained 
        consumers view functional beverages as a convenient way to address health needs. They prioritize familiar ingredients, 
        trusted brands, and convenient formats that fit into busy lifestyles. Value perception is particularly important for this segment.
      </p>
      
      <SectionTitle>Consumption Occasions</SectionTitle>
      <p>
        Functional beverage consumption is strongly occasion-based, with distinct usage occasions driving 
        category growth:
      </p>
      <ul>
        <li>
          <strong>Morning Boost (36% of consumption occasions):</strong> The largest occasion, occurring between 6am-10am, 
          centered on energy, nutrition, and setting a healthy tone for the day. Products containing natural caffeine, 
          adaptogens, and proteins perform particularly well in this occasion.
        </li>
        <li>
          <strong>Workout Support (22% of consumption occasions):</strong> Pre-, during, and post-exercise consumption focused 
          on hydration, electrolytes, energy, and recovery. This occasion shows the strongest consumer willingness to pay 
          premium prices for performance-specific benefits.
        </li>
        <li>
          <strong>Afternoon Recharge (16% of consumption occasions):</strong> Typically occurring between 1pm-4pm, focused on 
          combating the "afternoon slump" with energy and mental focus benefits. Products positioning around sustainable energy 
          (versus a "spike and crash") perform particularly well.
        </li>
        <li>
          <strong>Evening Wind-Down (15% of consumption occasions):</strong> A growing occasion centered on relaxation, stress 
          reduction, and sleep support. Products containing adaptogens, magnesium, or L-theanine are gaining popularity in this occasion.
        </li>
        <li>
          <strong>On-the-Go Hydration (11% of consumption occasions):</strong> Characterized by combined hydration and functional 
          benefits consumed during commutes or while running errands. Convenience of packaging is particularly important for this occasion.
        </li>
      </ul>
      
      <SectionTitle>Purchase Journey</SectionTitle>
      <p>
        The consumer purchase journey for functional beverages exhibits several distinctive characteristics:
      </p>
      <p>
        <strong>Discovery Phase:</strong> More fragmented than traditional beverages, with 43% of discovery occurring through digital 
        channels (social media, influencers, targeted ads), 28% through in-store visibility, 18% through word-of-mouth, and 
        11% through traditional media. The path from awareness to first purchase averages 8.2 days.
      </p>
      <p>
        <strong>Evaluation Process:</strong> Highly information-driven, with 68% of consumers conducting some research before 
        purchase. Key evaluation criteria include ingredient transparency (cited by 72%), specific functional benefits (67%), 
        taste expectations (63%), and brand credibility (58%).
      </p>
      <p>
        <strong>Purchase Channels:</strong> While natural/specialty retail remains the leading channel (42% of purchases), 
        direct-to-consumer e-commerce is the fastest-growing channel (currently 22% of purchases, growing at 34% annually), 
        followed by conventional retail (19%), convenience (11%), and foodservice (6%).
      </p>
      <p>
        <strong>Post-Purchase Behavior:</strong> Functional beverage consumers are highly engaged post-purchase, with 36% 
        posting on social media about their purchases, 42% subscribing to brand communications, and 28% providing product feedback. 
        This engagement presents significant opportunities for building consumer relationships and driving repeat purchases.
      </p>
    </ReportView>
  );
};

export default ConsumerReport;
