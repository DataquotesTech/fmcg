// Mock data structure for blogs and network stats

export const blogCategories = [
  "Professional Blogs",
  "Wholesaler Blogs",
  "Retailer Blogs",
  "Distributor Blogs",
  "Aspirant Blogs",
];

export const blogTypes = [
  "Professional Blog",
  "Wholesaler Blog",
  "Retailer Blog",
  "Distributor Blog",
  "Aspirant Blog",
];

// Comprehensive mock blogs with content for each category
export const initialBlogs = [
  // Professional Blogs
  {
    id: 1,
    title: "The Ultimate Guide to FMCG Promotional Campaigns in 2024",
    description:
      "Discover the latest trends and strategies for creating impactful promotional campaigns that drive sales and build brand loyalty in the fast-moving consumer goods sector.",
    content: `The fast-moving consumer goods (FMCG) industry is constantly evolving, and promotional campaigns play a crucial role in driving consumer engagement and sales. In 2024, successful promotional strategies require a blend of traditional marketing wisdom and innovative digital approaches.

Understanding Your Target Audience

Before launching any promotional campaign, it's essential to deeply understand your target audience. Market research, consumer behavior analysis, and demographic studies provide valuable insights into what motivates your customers. This knowledge helps craft messages that resonate and drive action.

Digital Integration

Modern promotional campaigns must seamlessly integrate digital channels. Social media platforms, email marketing, and mobile apps offer unprecedented opportunities to reach consumers where they spend most of their time. Interactive campaigns, influencer partnerships, and user-generated content can significantly amplify your promotional reach.

Measuring Success

Key performance indicators (KPIs) such as sales lift, customer acquisition cost, and return on investment (ROI) are critical for evaluating campaign effectiveness. Regular monitoring and optimization ensure your promotional efforts deliver maximum value.

The future of FMCG promotions lies in personalization, sustainability, and authentic brand storytelling. Brands that successfully combine these elements will stand out in an increasingly competitive marketplace.`,
    author: "Sarah Mitchell",
    category: "Professional Blogs",
    type: "Professional Blog",
    image: "orange",
    createdAt: "2024-01-15",
    featured: true,
    trending: false,
  },
  {
    id: 2,
    title: "Maximizing ROI Through Strategic Promotional Pricing",
    description:
      "Learn how to implement effective promotional pricing strategies that boost sales without eroding profit margins or brand value.",
    content: `Promotional pricing is one of the most powerful tools in the FMCG marketer's arsenal, but it must be used strategically to avoid negative consequences. This comprehensive guide explores best practices for implementing promotional pricing that drives results.

The Psychology of Promotional Pricing

Consumers are naturally drawn to deals and discounts. Understanding the psychological triggers behind promotional pricing helps create campaigns that convert browsers into buyers. Time-limited offers, bundle deals, and volume discounts each appeal to different consumer motivations.

Strategic Implementation

Not all products benefit equally from promotional pricing. High-margin items, new product launches, and seasonal products often respond best to promotional strategies. Careful analysis of historical data helps identify which products and timing deliver optimal results.

Avoiding Common Pitfalls

Over-reliance on promotions can train consumers to wait for deals, eroding brand value and profit margins. A balanced approach that combines promotional pricing with value-building initiatives maintains long-term brand health.

Best practices include setting clear objectives, monitoring competitor activity, and maintaining consistent brand messaging even during promotional periods.`,
    author: "David Chen",
    category: "Professional Blogs",
    type: "Professional Blog",
    image: "red",
    createdAt: "2024-01-20",
    featured: false,
    trending: true,
  },
  {
    id: 3,
    title: "Social Media Promotions: Engaging Modern Consumers",
    description:
      "Explore how social media platforms are revolutionizing FMCG promotional strategies and learn tactics to create viral-worthy campaigns.",
    content: `Social media has transformed how FMCG brands connect with consumers. Platforms like Instagram, TikTok, and Facebook offer unique opportunities to create engaging promotional content that reaches millions.

Creating Shareable Content

The most successful social media promotions are those that consumers want to share. User-generated content campaigns, challenges, and interactive experiences drive organic reach and engagement. Authenticity and creativity are key to standing out in crowded social feeds.

Influencer Partnerships

Collaborating with influencers who align with your brand values can dramatically amplify promotional reach. Micro-influencers often deliver better engagement rates and more authentic connections with their audiences than celebrity endorsements.

Measuring Social Media Impact

Tracking metrics like engagement rate, reach, click-through rate, and conversion rate helps optimize social media promotional campaigns. Tools and analytics platforms provide insights that guide strategy refinement.

The key to social media promotional success is consistency, authenticity, and a deep understanding of platform-specific best practices.`,
    author: "Emily Rodriguez",
    category: "Professional Blogs",
    type: "Professional Blog",
    image: "teal",
    createdAt: "2024-01-25",
    featured: false,
    trending: false,
  },
  {
    id: 4,
    title: "Seasonal Promotions: Timing Your Campaigns for Maximum Impact",
    description:
      "Master the art of seasonal promotional planning to capitalize on consumer buying patterns and maximize campaign effectiveness throughout the year.",
    content: `Seasonal promotions represent some of the most significant revenue opportunities for FMCG brands. Understanding consumer behavior patterns and market dynamics during different seasons enables strategic campaign planning.

Holiday Season Strategies

The holiday season accounts for a substantial portion of annual FMCG sales. Early planning, inventory management, and multi-channel promotional approaches are essential for capitalizing on this critical period. Black Friday, Christmas, and New Year campaigns require careful coordination.

Back-to-School and Seasonal Transitions

Beyond major holidays, seasonal transitions like back-to-school periods, summer, and winter offer promotional opportunities. These periods often see shifts in consumer needs and buying patterns that smart brands can leverage.

Year-Round Planning

Effective seasonal promotion planning requires a year-round approach. Analyzing historical data, monitoring market trends, and maintaining flexibility allows brands to adapt quickly to unexpected opportunities or challenges.

Success in seasonal promotions comes from early planning, clear objectives, and seamless execution across all channels.`,
    author: "Michael Thompson",
    category: "Professional Blogs",
    type: "Professional Blog",
    image: "orange",
    createdAt: "2024-01-28",
    featured: false,
    trending: false,
  },
  {
    id: 5,
    title: "Loyalty Programs: Building Long-Term Customer Relationships",
    description:
      "Discover how well-designed loyalty programs can transform one-time buyers into brand advocates and drive repeat purchases.",
    content: `Loyalty programs are powerful tools for building lasting customer relationships in the FMCG sector. When designed effectively, they create value for both brands and consumers while driving sustainable growth.

Designing Effective Programs

The best loyalty programs offer clear value propositions that align with consumer needs. Points systems, tiered rewards, and exclusive benefits create incentives for repeat purchases while gathering valuable customer data.

Digital Integration

Modern loyalty programs leverage technology to provide seamless experiences. Mobile apps, digital wallets, and personalized offers enhance convenience and engagement. Data analytics enable personalized experiences that increase program effectiveness.

Measuring Program Success

Key metrics include enrollment rates, active participation, redemption rates, and customer lifetime value. Regular program evaluation and optimization ensure continued relevance and effectiveness.

Successful loyalty programs balance simplicity with value, making it easy for customers to participate while delivering meaningful rewards that encourage continued engagement.`,
    author: "Jennifer Walsh",
    category: "Professional Blogs",
    type: "Professional Blog",
    image: "red",
    createdAt: "2024-02-05",
    featured: false,
    trending: false,
  },
  {
    id: 6,
    title: "Cross-Promotional Strategies: Partnering for Success",
    description:
      "Learn how strategic partnerships and cross-promotions can expand your reach and create win-win scenarios for brands and consumers.",
    content: `Cross-promotional strategies allow FMCG brands to leverage complementary partnerships, expanding reach and creating value for all parties involved. Strategic collaborations can unlock new customer segments and drive mutual growth.

Identifying Partnership Opportunities

Successful cross-promotions begin with identifying brands that share similar target audiences but offer complementary products or services. The partnership should create natural synergies that benefit both brands and consumers.

Executing Collaborative Campaigns

Clear communication, aligned objectives, and coordinated execution are essential for successful cross-promotional campaigns. Joint marketing efforts, bundled offers, and co-branded content can amplify promotional impact.

Measuring Partnership ROI

Tracking metrics specific to cross-promotional campaigns helps evaluate partnership effectiveness. New customer acquisition, sales lift, and brand awareness metrics provide insights into campaign success.

The most successful cross-promotional partnerships are built on mutual value creation, clear communication, and shared commitment to campaign success.`,
    author: "Robert Kim",
    category: "Professional Blogs",
    type: "Professional Blog",
    image: "teal",
    createdAt: "2024-02-12",
    featured: false,
    trending: false,
  },
  // Distributor Blogs
  {
    id: 7,
    title: "Optimizing FMCG Distribution Networks for Efficiency",
    description:
      "Explore strategies for building and maintaining efficient distribution networks that reduce costs while improving service levels.",
    content: `Efficient distribution networks are the backbone of successful FMCG operations. Optimizing these networks requires balancing cost, speed, and service quality to meet consumer expectations while maintaining profitability.

Network Design Principles

Effective distribution network design considers factors like geographic coverage, demand patterns, transportation costs, and inventory requirements. Centralized and decentralized models each offer advantages depending on product characteristics and market conditions.

Technology Integration

Modern distribution networks leverage technology for real-time visibility, route optimization, and inventory management. Warehouse management systems, transportation management systems, and IoT sensors enable data-driven decision-making.

Last-Mile Delivery Solutions

The final leg of distribution, last-mile delivery, often represents the highest cost and greatest complexity. Innovative solutions including local fulfillment centers, crowd-sourced delivery, and automated systems are transforming this critical component.

Continuous optimization through data analysis, technology adoption, and process improvement ensures distribution networks remain competitive and responsive to changing market demands.`,
    author: "James Anderson",
    category: "Distributor Blogs",
    type: "Distributor Blog",
    image: "orange",
    createdAt: "2024-01-18",
    featured: true,
    trending: false,
  },
  {
    id: 8,
    title: "Cold Chain Management: Ensuring Product Quality",
    description:
      "Master the complexities of cold chain distribution to maintain product integrity and meet regulatory requirements for temperature-sensitive FMCG products.",
    content: `Cold chain management is critical for many FMCG products, particularly in food and beverage categories. Maintaining proper temperature control throughout the distribution process ensures product safety, quality, and regulatory compliance.

Temperature Monitoring

Advanced monitoring systems provide real-time visibility into temperature conditions throughout the distribution chain. IoT sensors, data loggers, and cloud-based platforms enable proactive management and rapid response to issues.

Regulatory Compliance

Cold chain distribution must comply with various regulations governing food safety, pharmaceutical handling, and environmental standards. Understanding and adhering to these requirements is essential for legal operation and brand protection.

Best Practices

Effective cold chain management requires careful planning, proper equipment, trained personnel, and robust processes. Pre-cooling, proper packaging, and efficient transportation minimize temperature excursions that could compromise product quality.

Investment in cold chain infrastructure and technology pays dividends through reduced waste, improved product quality, and enhanced customer satisfaction.`,
    author: "Patricia Martinez",
    category: "Distributor Blogs",
    type: "Distributor Blog",
    image: "red",
    createdAt: "2024-01-22",
    featured: false,
    trending: true,
  },
  {
    id: 9,
    title: "Warehouse Automation: The Future of FMCG Distribution",
    description:
      "Discover how automation technologies are revolutionizing warehouse operations and distribution efficiency in the FMCG sector.",
    content: `Warehouse automation represents one of the most significant opportunities for improving distribution efficiency in the FMCG industry. Automated systems can dramatically increase throughput while reducing errors and labor costs.

Automation Technologies

From automated storage and retrieval systems (ASRS) to robotic picking and sorting, various technologies offer different benefits. Choosing the right automation solutions requires careful analysis of operations, costs, and expected returns.

Implementation Considerations

Successful automation implementation requires thorough planning, process redesign, and change management. Phased approaches allow organizations to learn and adapt while minimizing disruption to ongoing operations.

ROI and Benefits

While automation requires significant upfront investment, the long-term benefits include increased accuracy, higher throughput, reduced labor costs, and improved working conditions. Calculating ROI requires considering both tangible and intangible benefits.

The future of FMCG distribution lies in intelligent automation that combines robotics, AI, and data analytics to create highly efficient, responsive supply chains.`,
    author: "Thomas Wilson",
    category: "Distributor Blogs",
    type: "Distributor Blog",
    image: "teal",
    createdAt: "2024-01-30",
    featured: false,
    trending: false,
  },
  {
    id: 10,
    title: "Multi-Channel Distribution: Meeting Consumers Where They Are",
    description:
      "Learn how to build and manage multi-channel distribution strategies that serve consumers across online, retail, and emerging channels.",
    content: `Modern consumers expect to purchase FMCG products through multiple channels, from traditional retail stores to e-commerce platforms and subscription services. Multi-channel distribution strategies must seamlessly serve customers across all touchpoints.

Channel Strategy Development

Effective multi-channel distribution begins with understanding customer preferences and behaviors across different channels. Each channel serves different needs and requires tailored approaches to inventory, pricing, and service levels.

Inventory Management

Managing inventory across multiple channels presents unique challenges. Real-time visibility, demand forecasting, and flexible allocation systems enable efficient inventory utilization while meeting channel-specific requirements.

Omnichannel Integration

True omnichannel distribution provides seamless experiences across channels, allowing customers to research, purchase, and receive products through their preferred methods. Integration requires coordination across systems, processes, and partners.

Success in multi-channel distribution requires flexibility, technology investment, and a customer-centric approach that prioritizes convenience and satisfaction across all touchpoints.`,
    author: "Lisa Brown",
    category: "Distributor Blogs",
    type: "Distributor Blog",
    image: "orange",
    createdAt: "2024-02-08",
    featured: false,
    trending: false,
  },
  {
    id: 11,
    title: "Sustainable Distribution: Reducing Environmental Impact",
    description:
      "Explore strategies for creating more sustainable distribution networks that reduce environmental impact while maintaining efficiency.",
    content: `Sustainability has become a critical consideration in FMCG distribution. Consumers and regulators increasingly demand environmentally responsible practices, making sustainable distribution both an ethical imperative and business necessity.

Green Logistics Strategies

Sustainable distribution strategies include route optimization to reduce fuel consumption, use of alternative fuels and electric vehicles, and packaging optimization to minimize waste. Each initiative contributes to reducing the environmental footprint of distribution operations.

Carbon Footprint Reduction

Measuring and reducing carbon emissions requires comprehensive tracking and analysis. Setting reduction targets, implementing efficiency improvements, and offsetting remaining emissions demonstrate commitment to environmental responsibility.

Circular Economy Principles

Applying circular economy principles to distribution involves designing systems for reuse, recycling, and waste minimization. Reverse logistics for packaging and product returns create value while reducing environmental impact.

Sustainable distribution practices not only benefit the environment but also often reduce costs, improve brand reputation, and meet evolving regulatory requirements.`,
    author: "Daniel Garcia",
    category: "Distributor Blogs",
    type: "Distributor Blog",
    image: "red",
    createdAt: "2024-02-15",
    featured: false,
    trending: false,
  },
  // Wholesaler Blogs
  {
    id: 12,
    title: "Building Strong Wholesaler-Retailer Relationships",
    description:
      "Discover strategies for developing mutually beneficial partnerships with retailers that drive growth for both parties.",
    content: `Strong relationships between wholesalers and retailers form the foundation of successful FMCG distribution. These partnerships require trust, communication, and shared commitment to mutual success.

Communication and Collaboration

Effective communication is essential for successful wholesaler-retailer relationships. Regular meetings, shared planning, and transparent information exchange enable both parties to align strategies and address challenges proactively.

Value Creation

Wholesalers create value for retailers through competitive pricing, reliable service, product availability, and support services. Understanding retailer needs and priorities helps tailor offerings that strengthen partnerships.

Technology Integration

Modern technology facilitates seamless collaboration between wholesalers and retailers. Electronic data interchange (EDI), shared platforms, and automated ordering systems reduce friction and improve efficiency.

Long-term partnerships built on mutual respect, clear communication, and shared value creation drive sustainable growth for both wholesalers and retailers.`,
    author: "Mark Johnson",
    category: "Wholesaler Blogs",
    type: "Wholesaler Blog",
    image: "orange",
    createdAt: "2024-01-16",
    featured: true,
    trending: false,
  },
  {
    id: 13,
    title: "Inventory Management for Wholesalers: Best Practices",
    description:
      "Learn proven strategies for managing inventory effectively to minimize costs while ensuring product availability for retail partners.",
    content: `Effective inventory management is crucial for wholesaler profitability and service levels. Balancing inventory investment with availability requirements requires sophisticated planning and execution.

Demand Forecasting

Accurate demand forecasting forms the foundation of effective inventory management. Historical data analysis, market trend monitoring, and collaboration with retail partners improve forecast accuracy and reduce stockouts or excess inventory.

Inventory Optimization

Optimizing inventory levels requires balancing multiple factors including carrying costs, service level requirements, and supply chain variability. Advanced analytics and optimization tools help identify optimal stock levels for different product categories.

Technology Solutions

Modern inventory management systems provide real-time visibility, automated reordering, and analytics capabilities that enable data-driven decision-making. Integration with retail systems further improves coordination and efficiency.

Continuous improvement in inventory management through technology adoption, process refinement, and collaboration with partners drives operational excellence and competitive advantage.`,
    author: "Nancy Davis",
    category: "Wholesaler Blogs",
    type: "Wholesaler Blog",
    image: "red",
    createdAt: "2024-01-24",
    featured: false,
    trending: true,
  },
  {
    id: 14,
    title: "Pricing Strategies for Wholesale Operations",
    description:
      "Explore pricing strategies that maintain profitability while remaining competitive in the wholesale FMCG market.",
    content: `Pricing strategy is a critical component of wholesale operations, directly impacting profitability, competitiveness, and customer relationships. Effective pricing requires understanding costs, market dynamics, and customer value perceptions.

Cost-Based Pricing

Understanding true costs including product costs, handling, storage, and overhead is essential for setting profitable prices. Cost-plus pricing provides a baseline, but market conditions and competitive positioning also influence pricing decisions.

Volume Discounts and Incentives

Volume-based pricing structures incentivize larger orders, improving operational efficiency and customer loyalty. Tiered pricing, rebates, and promotional pricing can drive desired behaviors while maintaining margins.

Market Positioning

Pricing strategy must align with market positioning. Premium pricing requires superior service or product differentiation, while competitive pricing focuses on efficiency and volume. Understanding customer price sensitivity guides strategy development.

Successful wholesale pricing strategies balance profitability with competitiveness, creating value for both the wholesaler and retail customers.`,
    author: "Steven Lee",
    category: "Wholesaler Blogs",
    type: "Wholesaler Blog",
    image: "teal",
    createdAt: "2024-02-01",
    featured: false,
    trending: false,
  },
  {
    id: 15,
    title: "Digital Transformation in Wholesale Operations",
    description:
      "Discover how digital technologies are transforming wholesale operations and creating new opportunities for efficiency and growth.",
    content: `Digital transformation is reshaping wholesale operations, creating opportunities for improved efficiency, better customer service, and new business models. Embracing digital technologies is essential for remaining competitive.

E-Commerce Platforms

Online ordering platforms provide convenience for retail customers while reducing transaction costs for wholesalers. Mobile apps, web portals, and automated systems streamline the ordering process and improve customer experience.

Data Analytics

Advanced analytics enable wholesalers to gain insights into customer behavior, inventory optimization, and operational efficiency. Predictive analytics support better decision-making across all aspects of operations.

Automation and Efficiency

Automation technologies including warehouse management systems, automated picking, and route optimization improve operational efficiency while reducing errors and costs.

Digital transformation requires investment in technology, process redesign, and change management, but delivers significant benefits in efficiency, customer satisfaction, and competitive positioning.`,
    author: "Karen White",
    category: "Wholesaler Blogs",
    type: "Wholesaler Blog",
    image: "orange",
    createdAt: "2024-02-10",
    featured: false,
    trending: false,
  },
  {
    id: 16,
    title: "Expanding Wholesale Operations: Growth Strategies",
    description:
      "Learn strategies for scaling wholesale operations successfully, from geographic expansion to product line diversification.",
    content: `Growth in wholesale operations requires careful planning and execution to maintain service quality and profitability while expanding reach and capabilities.

Geographic Expansion

Expanding into new geographic markets requires understanding local demand, competition, and regulatory requirements. Phased approaches allow learning and adaptation while minimizing risk.

Product Line Diversification

Adding new product categories or brands can drive growth but requires careful evaluation of market demand, operational capabilities, and competitive positioning. Strategic partnerships can facilitate expansion.

Infrastructure Investment

Growth often requires investment in facilities, technology, and personnel. Planning for scalable infrastructure ensures operations can support growth without compromising service levels.

Successful expansion requires clear strategy, adequate resources, and careful execution that maintains the quality and efficiency that drive customer loyalty.`,
    author: "Christopher Taylor",
    category: "Wholesaler Blogs",
    type: "Wholesaler Blog",
    image: "red",
    createdAt: "2024-02-18",
    featured: false,
    trending: false,
  },
  // Retailer Blogs
  {
    id: 17,
    title: "Retail Store Layout Optimization for FMCG Products",
    description:
      "Master the art of store layout design to maximize sales, improve customer experience, and optimize space utilization for FMCG products.",
    content: `Store layout significantly impacts customer behavior, sales performance, and operational efficiency. Strategic layout design creates positive shopping experiences while maximizing revenue per square foot.

Customer Flow Analysis

Understanding how customers move through stores enables strategic product placement. High-traffic areas command premium positioning, while strategic placement of complementary products can increase basket size.

Category Management

Effective category management involves organizing products logically, creating clear navigation, and optimizing space allocation based on sales performance and profitability. Planogram compliance ensures consistent execution.

Visual Merchandising

Attractive displays, clear signage, and strategic use of promotional space enhance the shopping experience and drive impulse purchases. Seasonal adjustments and promotional displays create visual interest.

Regular analysis of sales data, customer feedback, and shopping patterns enables continuous optimization of store layouts to improve performance and customer satisfaction.`,
    author: "Amanda Foster",
    category: "Retailer Blogs",
    type: "Retailer Blog",
    image: "orange",
    createdAt: "2024-01-17",
    featured: true,
    trending: false,
  },
  {
    id: 18,
    title: "Omnichannel Retailing: Integrating Online and Offline",
    description:
      "Learn how to create seamless shopping experiences that integrate online and offline channels to serve modern FMCG consumers.",
    content: `Omnichannel retailing has become essential for serving modern consumers who expect seamless experiences across online and offline channels. Integration requires coordination across systems, processes, and customer touchpoints.

Unified Customer Experience

Creating consistent experiences across channels requires shared inventory visibility, unified customer data, and coordinated marketing. Customers should be able to research online, purchase in-store, or vice versa seamlessly.

Click-and-Collect Services

Buy-online-pickup-in-store (BOPIS) and curbside pickup services combine online convenience with immediate gratification. These services require inventory integration and operational coordination.

Inventory Synchronization

Real-time inventory visibility across channels prevents overselling and enables accurate availability information. Integrated systems ensure customers see accurate stock levels regardless of channel.

Success in omnichannel retailing requires technology investment, process integration, and organizational alignment that prioritizes customer experience across all touchpoints.`,
    author: "Brian Moore",
    category: "Retailer Blogs",
    type: "Retailer Blog",
    image: "red",
    createdAt: "2024-01-26",
    featured: false,
    trending: true,
  },
  {
    id: 19,
    title: "Customer Experience Excellence in FMCG Retail",
    description:
      "Discover strategies for creating exceptional customer experiences that drive loyalty and differentiate your retail operation.",
    content: `Exceptional customer experience is a key differentiator in competitive FMCG retail markets. Creating positive experiences requires attention to every customer touchpoint, from store environment to staff interactions.

Store Environment

Clean, well-organized stores with clear signage and logical layouts create positive first impressions. Lighting, music, and temperature all contribute to the shopping atmosphere that influences customer satisfaction.

Staff Training and Engagement

Well-trained, engaged staff who understand products and can assist customers effectively create positive experiences. Training programs, clear communication, and recognition programs support staff excellence.

Personalization and Service

Personalized service, loyalty programs, and special attention to regular customers build relationships that drive repeat business. Technology can enable personalization at scale.

Measuring customer satisfaction through surveys, feedback, and analytics enables continuous improvement in the customer experience that drives loyalty and growth.`,
    author: "Michelle Clark",
    category: "Retailer Blogs",
    type: "Retailer Blog",
    image: "teal",
    createdAt: "2024-02-03",
    featured: false,
    trending: false,
  },
  {
    id: 20,
    title: "Inventory Turnover Optimization for Retailers",
    description:
      "Learn how to optimize inventory turnover rates to improve cash flow, reduce carrying costs, and maintain product freshness.",
    content: `Inventory turnover is a critical metric for retail profitability. Optimizing turnover rates improves cash flow, reduces carrying costs, and ensures product freshness, particularly important for perishable FMCG items.

Demand Forecasting

Accurate demand forecasting enables optimal inventory levels that balance availability with turnover. Historical data, seasonal patterns, and market trends inform forecasting models that guide purchasing decisions.

Supplier Relationships

Strong relationships with suppliers enable flexible ordering, quick replenishment, and favorable terms that support optimal inventory turnover. Communication and collaboration facilitate responsive supply chains.

Technology Solutions

Point-of-sale systems, inventory management software, and analytics tools provide visibility and automation that support optimal inventory turnover. Real-time data enables rapid response to changing demand patterns.

Regular analysis of turnover rates by category, product, and season enables identification of optimization opportunities that improve profitability and operational efficiency.`,
    author: "Kevin Adams",
    category: "Retailer Blogs",
    type: "Retailer Blog",
    image: "orange",
    createdAt: "2024-02-11",
    featured: false,
    trending: false,
  },
  {
    id: 21,
    title: "Private Label Strategies: Building Retailer Brands",
    description:
      "Explore how private label products can differentiate retailers, improve margins, and build customer loyalty in the FMCG sector.",
    content: `Private label products have become increasingly important for retailers seeking differentiation, margin improvement, and customer loyalty. Successful private label strategies require careful planning and execution.

Product Development

Developing private label products that meet or exceed national brand quality while offering value requires understanding customer needs, supplier relationships, and quality control processes.

Brand Positioning

Private label brands can be positioned as premium alternatives, value options, or category-specific solutions. Clear positioning and consistent quality build brand equity that drives customer loyalty.

Marketing and Promotion

Effective marketing of private label products requires strategic placement, promotional support, and clear communication of value propositions. Building brand awareness and trial are essential for success.

Successful private label strategies create value for customers while improving retailer margins and building brand equity that drives long-term competitive advantage.`,
    author: "Rachel Green",
    category: "Retailer Blogs",
    type: "Retailer Blog",
    image: "red",
    createdAt: "2024-02-19",
    featured: false,
    trending: false,
  },
  {
    id: 22,
    title: "Technology Integration in Modern Retail Operations",
    description:
      "Discover how modern technology solutions are transforming retail operations and creating new opportunities for efficiency and customer engagement.",
    content: `Technology integration is transforming retail operations, creating opportunities for improved efficiency, better customer experiences, and data-driven decision-making. Strategic technology adoption drives competitive advantage.

Point-of-Sale Systems

Modern POS systems provide transaction processing, inventory management, customer data collection, and analytics capabilities. Integration with other systems creates comprehensive operational visibility.

Customer Analytics

Data analytics enable retailers to understand customer behavior, preferences, and purchasing patterns. This insight supports personalized marketing, inventory optimization, and strategic decision-making.

Mobile and Digital Tools

Mobile apps, digital signage, and self-service technologies enhance customer convenience while reducing labor costs. These tools create opportunities for engagement and efficiency.

Successful technology integration requires clear strategy, adequate investment, change management, and continuous evaluation to ensure technologies deliver expected benefits and support business objectives.`,
    author: "Jason Miller",
    category: "Retailer Blogs",
    type: "Retailer Blog",
    image: "teal",
    createdAt: "2024-02-25",
    featured: false,
    trending: false,
  },
];

// Initial network stats
export const initialNetworkStats = {
  professional: "0",
  retailers: "0",
  wholesalers: "0",
  distributors: "0",
  aspirants: "0",
};

// Supabase helper functions
import { supabase } from "../../lib/supabase";
import { cache } from "react";

// Get all blogs from Supabase
// Pass { includeContent: true } when you need the full HTML content (e.g., admin edit form)
export const getBlogs = async ({ includeContent = false } = {}) => {
  try {
    const columns = [
      "id",
      "title",
      "description",
      "author",
      "category",
      "type",
      "image",
      "created_at",
      "featured",
      "trending",
    ];

    if (includeContent) {
      columns.push("content");
    }

    const { data, error } = await supabase
      .from("blogs")
      .select(columns.join(", "))
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching blogs:", error);
      return initialBlogs; // Fallback to initial data
    }

    // Transform data to match expected format
    return (data || []).map((blog) => ({
      id: blog.id,
      title: blog.title,
      description: blog.description,
      ...(includeContent && { content: blog.content }),
      author: blog.author,
      category: blog.category,
      type: blog.type,
      image: blog.image || "orange",
      createdAt: blog.created_at
        ? new Date(blog.created_at).toISOString().split("T")[0]
        : new Date().toISOString().split("T")[0],
      featured: blog.featured || false,
      trending: blog.trending || false,
    }));
  } catch (error) {
    console.error("Error in getBlogs:", error);
    return initialBlogs;
  }
};

// Get blog by ID (with caching for better performance)
export const getBlogById = cache(async (id) => {
  try {
    if (!id) {
      console.error("getBlogById: No ID provided");
      return null;
    }

    const { data, error } = await supabase
      .from("blogs")
      .select(
        "id, title, description, content, author, category, type, image, created_at, featured, trending"
      )
      .eq("id", id)
      .single();

    if (error) {
      console.error("Supabase error in getBlogById:", {
        error: error.message,
        code: error.code,
        details: error.details,
        hint: error.hint,
        id: id,
        idType: typeof id,
      });
      return null;
    }

    if (!data) {
      console.warn("getBlogById: No data returned for ID:", id);
      return null;
    }

    return {
      id: data.id,
      title: data.title,
      description: data.description,
      content: data.content,
      author: data.author,
      category: data.category,
      type: data.type,
      image: data.image || "orange",
      createdAt: data.created_at
        ? new Date(data.created_at).toISOString().split("T")[0]
        : new Date().toISOString().split("T")[0],
      featured: data.featured || false,
      trending: data.trending || false,
    };
  } catch (error) {
    console.error("Error in getBlogById:", error);
    return null;
  }
});

// Get blogs by category (excluding featured and trending) - optimized without content
export const getBlogsByCategory = cache(async (category) => {
  try {
    const { data, error } = await supabase
      .from("blogs")
      .select(
        "id, title, description, author, category, type, image, created_at, featured, trending"
      )
      .eq("category", category)
      .eq("featured", false)
      .eq("trending", false)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching blogs by category:", error);
      return [];
    }

    return (data || []).map((blog) => ({
      id: blog.id,
      title: blog.title,
      description: blog.description,
      author: blog.author,
      category: blog.category,
      type: blog.type,
      image: blog.image || "orange",
      createdAt: blog.created_at
        ? new Date(blog.created_at).toISOString().split("T")[0]
        : new Date().toISOString().split("T")[0],
      featured: blog.featured || false,
      trending: blog.trending || false,
    }));
  } catch (error) {
    console.error("Error in getBlogsByCategory:", error);
    return [];
  }
});

// Get featured blog for a category (optimized - excludes content for list view)
export const getFeaturedBlog = cache(async (category) => {
  try {
    const { data, error } = await supabase
      .from("blogs")
      .select(
        "id, title, description, author, category, type, image, created_at, featured, trending"
      )
      .eq("category", category)
      .eq("featured", true)
      .single();

    if (error || !data) {
      return null;
    }

    return {
      id: data.id,
      title: data.title,
      description: data.description,
      author: data.author,
      category: data.category,
      type: data.type,
      image: data.image || "orange",
      createdAt: data.created_at
        ? new Date(data.created_at).toISOString().split("T")[0]
        : new Date().toISOString().split("T")[0],
      featured: data.featured || false,
      trending: data.trending || false,
    };
  } catch (error) {
    return null;
  }
});

// Get trending blog for a category (optimized - excludes content for list view)
export const getTrendingBlog = cache(async (category) => {
  try {
    const { data, error } = await supabase
      .from("blogs")
      .select(
        "id, title, description, author, category, type, image, created_at, featured, trending"
      )
      .eq("category", category)
      .eq("trending", true)
      .single();

    if (error || !data) {
      return null;
    }

    return {
      id: data.id,
      title: data.title,
      description: data.description,
      author: data.author,
      category: data.category,
      type: data.type,
      image: data.image || "orange",
      createdAt: data.created_at
        ? new Date(data.created_at).toISOString().split("T")[0]
        : new Date().toISOString().split("T")[0],
      featured: data.featured || false,
      trending: data.trending || false,
    };
  } catch (error) {
    return null;
  }
});

// Save/create a blog
export const saveBlogs = async (blogs) => {
  // This function is kept for backward compatibility but now handles single blog creation
  // For bulk operations, use createBlog or updateBlog directly
  console.warn(
    "saveBlogs is deprecated. Use createBlog or updateBlog instead."
  );
};

// Create a new blog
export const createBlog = async (blogData) => {
  try {
    let user = null;
    try {
      const {
        data: { user: authUser },
      } = await supabase.auth.getUser();
      user = authUser;
    } catch (authError) {
      // User might not be authenticated, continue without user ID
      console.log("No authenticated user, creating blog without user ID");
    }

    // Generate description from HTML content (strip HTML tags)
    const textContent = blogData.content
      ? blogData.content.replace(/<[^>]*>/g, " ").trim()
      : "";
    const description =
      blogData.description ||
      (textContent
        ? textContent.substring(0, 150) +
          (textContent.length > 150 ? "..." : "")
        : "");

    // If no image provided, randomly select from orange, red, or teal
    const getRandomImage = () => {
      const options = ["orange", "red", "teal"];
      return options[Math.floor(Math.random() * options.length)];
    };

    const blogToInsert = {
      title: blogData.title,
      content: blogData.content,
      description: description,
      author: blogData.author,
      category: blogData.category,
      type: blogData.type,
      image: blogData.image || getRandomImage(),
      featured: blogData.featured || false,
      trending: blogData.trending || false,
      created_by: user?.id || null,
    };

    const { data, error } = await supabase
      .from("blogs")
      .insert([blogToInsert])
      .select()
      .single();

    if (error) {
      console.error("Error creating blog:", error);
      // Create a more descriptive error
      const errorMessage = error.message || error.error || "Unknown error";
      const detailedError = new Error(`Failed to create blog: ${errorMessage}`);
      detailedError.originalError = error;
      throw detailedError;
    }

    return data;
  } catch (error) {
    console.error("Error in createBlog:", error);
    throw error;
  }
};

// Update a blog
export const updateBlog = async (id, blogData) => {
  try {
    let user = null;
    try {
      const {
        data: { user: authUser },
      } = await supabase.auth.getUser();
      user = authUser;
    } catch (authError) {
      // User might not be authenticated, continue without user ID
      console.log("No authenticated user, updating blog without user ID");
    }

    // Generate description from HTML content (strip HTML tags) if not provided
    let description = blogData.description;
    if (!description && blogData.content) {
      const textContent = blogData.content.replace(/<[^>]*>/g, " ").trim();
      description =
        textContent.substring(0, 150) + (textContent.length > 150 ? "..." : "");
    }

    const updateData = {
      title: blogData.title,
      content: blogData.content,
      description: description,
      author: blogData.author,
      category: blogData.category,
      type: blogData.type,
      image: blogData.image,
      featured: blogData.featured,
      trending: blogData.trending,
      updated_by: user?.id || null,
    };

    const { data, error } = await supabase
      .from("blogs")
      .update(updateData)
      .eq("id", id)
      .select()
      .single();

    if (error) {
      console.error("Error updating blog:", error);
      // Create a more descriptive error
      const errorMessage = error.message || error.error || "Unknown error";
      const detailedError = new Error(`Failed to update blog: ${errorMessage}`);
      detailedError.originalError = error;
      throw detailedError;
    }

    return data;
  } catch (error) {
    console.error("Error in updateBlog:", error);
    throw error;
  }
};

// Delete a blog
export const deleteBlog = async (id) => {
  try {
    const { error } = await supabase.from("blogs").delete().eq("id", id);

    if (error) {
      console.error("Error deleting blog:", error);
      throw error;
    }

    return true;
  } catch (error) {
    console.error("Error in deleteBlog:", error);
    throw error;
  }
};

// Get network stats
export const getNetworkStats = async () => {
  try {
    const { data, error } = await supabase
      .from("network_stats")
      .select("*")
      .order("updated_at", { ascending: false })
      .limit(1)
      .single();

    if (error || !data) {
      return initialNetworkStats;
    }

    return {
      professional: data.professional || initialNetworkStats.professional,
      retailers: data.retailers || initialNetworkStats.retailers,
      wholesalers: data.wholesalers || initialNetworkStats.wholesalers,
      distributors: data.distributors || initialNetworkStats.distributors,
      aspirants: data.aspirants || initialNetworkStats.aspirants,
    };
  } catch (error) {
    console.error("Error fetching network stats:", error);
    return initialNetworkStats;
  }
};

// Save network stats - only update existing record, don't create new ones
export const saveNetworkStats = async (stats) => {
  try {
    let user = null;
    try {
      const {
        data: { user: authUser },
      } = await supabase.auth.getUser();
      user = authUser;
    } catch (authError) {
      // User might not be authenticated, continue without user ID
      console.log(
        "No authenticated user, updating network stats without user ID"
      );
    }

    // Get the first existing record (there should only be one)
    const { data: existingData, error: fetchError } = await supabase
      .from("network_stats")
      .select("id")
      .order("id", { ascending: true })
      .limit(1)
      .maybeSingle();

    const updateData = {
      professional: stats.professional,
      retailers: stats.retailers,
      wholesalers: stats.wholesalers,
      distributors: stats.distributors,
      aspirants: stats.aspirants,
      updated_by: user?.id || null,
    };

    if (existingData && existingData.id) {
      // Update the existing record (only one should exist)
      const { error } = await supabase
        .from("network_stats")
        .update(updateData)
        .eq("id", existingData.id);

      if (error) {
        console.error("Error updating network stats:", error);
        throw error;
      }
    } else {
      // No record exists, create one
      // Try with id=1 first, if that fails due to conflict, just insert without id
      const { error: insertError } = await supabase
        .from("network_stats")
        .insert([{ id: 1, ...updateData }]);

      if (insertError) {
        // If id=1 fails, try without specifying id (let database auto-generate)
        const { error: insertError2 } = await supabase
          .from("network_stats")
          .insert([updateData]);

        if (insertError2) {
          console.error("Error creating network stats:", insertError2);
          throw insertError2;
        }
      }
    }

    return true;
  } catch (error) {
    console.error("Error in saveNetworkStats:", error);
    throw error;
  }
};

// Draft helpers
export const getCurrentUserDraft = async () => {
  try {
    let user = null;
    try {
      const {
        data: { user: authUser },
      } = await supabase.auth.getUser();
      user = authUser;
    } catch (authError) {
      // User might not be authenticated via Supabase, return null
      return null;
    }

    if (!user) {
      return null;
    }

    const { data, error } = await supabase
      .from("blog_drafts")
      .select(
        "id, author_name, blog_title, blog_content, blog_type, blog_category, image_url, image_preview, word_count, updated_at"
      )
      .eq("created_by", user.id)
      .order("updated_at", { ascending: false })
      .limit(1)
      .maybeSingle();

    if (error) {
      console.error("Error fetching draft:", error);
      return null;
    }

    if (!data) {
      return null;
    }

    return {
      id: data.id,
      authorName: data.author_name || "",
      blogTitle: data.blog_title || "",
      blogContent: data.blog_content || "",
      blogType: data.blog_type || "",
      blogCategory: data.blog_category || "",
      imageUrl: data.image_url || "",
      imagePreview: data.image_preview || null,
      wordCount: data.word_count || 0,
      updatedAt: data.updated_at || null,
    };
  } catch (error) {
    console.error("Error in getCurrentUserDraft:", error);
    return null;
  }
};

export const saveBlogDraft = async (draftData) => {
  try {
    let user = null;
    try {
      const {
        data: { user: authUser },
      } = await supabase.auth.getUser();
      user = authUser;
    } catch (authError) {
      // User might not be authenticated via Supabase, continue without user ID
      console.log("No authenticated user, saving draft without user ID");
    }

    const payload = {
      author_name: draftData.authorName || "",
      blog_title: draftData.blogTitle || "",
      blog_content: draftData.blogContent || "",
      blog_type: draftData.blogType || "",
      blog_category: draftData.blogCategory || "",
      image_url: draftData.imageUrl || "",
      image_preview: draftData.imagePreview || null,
      word_count: draftData.wordCount || 0,
      created_by: user?.id || null,
    };

    let result;
    if (draftData.id) {
      let query = supabase
        .from("blog_drafts")
        .update({
          ...payload,
          updated_at: new Date().toISOString(),
        })
        .eq("id", draftData.id);

      // Only filter by created_by if user exists
      if (user?.id) {
        query = query.eq("created_by", user.id);
      }

      const { data, error } = await query.select().single();

      if (error) {
        console.error("Error updating draft:", error);
        throw error;
      }
      result = data;
    } else {
      const { data, error } = await supabase
        .from("blog_drafts")
        .insert([
          {
            ...payload,
            updated_at: new Date().toISOString(),
          },
        ])
        .select()
        .single();

      if (error) {
        console.error("Error creating draft:", error);
        throw error;
      }
      result = data;
    }

    return {
      id: result.id,
      authorName: result.author_name || "",
      blogTitle: result.blog_title || "",
      blogContent: result.blog_content || "",
      blogType: result.blog_type || "",
      blogCategory: result.blog_category || "",
      imageUrl: result.image_url || "",
      imagePreview: result.image_preview || null,
      wordCount: result.word_count || 0,
      updatedAt: result.updated_at || null,
    };
  } catch (error) {
    console.error("Error in saveBlogDraft:", error);
    throw error;
  }
};

export const deleteDraft = async (id) => {
  try {
    const { error } = await supabase.from("blog_drafts").delete().eq("id", id);

    if (error) {
      console.error("Error deleting draft:", error);
      throw error;
    }
  } catch (error) {
    console.error("Error in deleteDraft:", error);
    throw error;
  }
};

export const getDrafts = async () => {
  try {
    const { data, error } = await supabase
      .from("blog_drafts")
      .select(
        "id, author_name, blog_title, blog_type, blog_category, updated_at, created_at, created_by"
      )
      .order("updated_at", { ascending: false });

    if (error) {
      console.error("Error fetching drafts:", error);
      return [];
    }

    return (data || []).map((draft) => ({
      id: draft.id,
      authorName: draft.author_name || "",
      blogTitle: draft.blog_title || "",
      blogType: draft.blog_type || "",
      blogCategory: draft.blog_category || "",
      updatedAt: draft.updated_at
        ? new Date(draft.updated_at).toISOString()
        : null,
      createdAt: draft.created_at
        ? new Date(draft.created_at).toISOString()
        : null,
      createdBy: draft.created_by || null,
    }));
  } catch (error) {
    console.error("Error in getDrafts:", error);
    return [];
  }
};

export const getDraftById = async (id) => {
  try {
    const { data, error } = await supabase
      .from("blog_drafts")
      .select(
        "id, author_name, blog_title, blog_content, blog_type, blog_category, image_url, image_preview, word_count, updated_at, created_by"
      )
      .eq("id", id)
      .maybeSingle();

    if (error || !data) {
      console.error("Error fetching draft by id:", error);
      return null;
    }

    return {
      id: data.id,
      authorName: data.author_name || "",
      blogTitle: data.blog_title || "",
      blogContent: data.blog_content || "",
      blogType: data.blog_type || "",
      blogCategory: data.blog_category || "",
      imageUrl: data.image_url || "",
      imagePreview: data.image_preview || null,
      wordCount: data.word_count || 0,
      updatedAt: data.updated_at
        ? new Date(data.updated_at).toISOString()
        : null,
      createdBy: data.created_by || null,
    };
  } catch (error) {
    console.error("Error in getDraftById:", error);
    return null;
  }
};

// Legacy functions for backward compatibility
export const getFeaturedBlogs = async () => {
  const blogs = await getBlogs();
  const featured = {};
  blogCategories.forEach((category) => {
    const blog = blogs.find((b) => b.featured && b.category === category);
    if (blog) featured[category] = blog.id;
  });
  return featured;
};

export const getTrendingBlogs = async () => {
  const blogs = await getBlogs();
  const trending = {};
  blogCategories.forEach((category) => {
    const blog = blogs.find((b) => b.trending && b.category === category);
    if (blog) trending[category] = blog.id;
  });
  return trending;
};
